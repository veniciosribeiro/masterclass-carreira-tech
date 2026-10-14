import path from 'path';
import { fileURLToPath } from 'url';
import { defineConfig, loadEnv, type Plugin, type Rollup } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { ROUTE_TITLES } from './src/seo/routeTitles';
import {
  DEFAULT_CONTENT_ID,
  DEFAULT_EVENTS_API_URL,
  PIXEL_ROUTE_PREFIXES,
} from './src/utils/metaEventsConfig';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

/**
 * Injeta no <head> um script inline que dispara o POST 'Init' da API de
 * eventos assim que o HTML é lido, antes do bundle JS (~370 kB) baixar,
 * executar e o React montar. O Init é o request mais lento da sessão (paga
 * DNS, handshake e a conexão fria Cloudflare -> origem, mais o preflight
 * CORS) e tudo o mais espera por ele; começar cedo esconde essa latência
 * atrás do download do bundle. O metaPixel.ts consome a promise em
 * window.__earlyEventsInit e, se ela falhar, refaz o request normalmente.
 *
 * O fetch é async (o script executa em microssegundos e só dispara o request)
 * e vai pra outra origem, então não bloqueia o parse nem disputa conexão com
 * o CSS/JS. Em link lento ele ainda divide a banda com esses recursos, por
 * isso `priority: 'low'` — medido em celular emulado (150ms, 1,6Mbps, CPU 4x)
 * o FCP com o script ficou dentro do ruído (~1,5-1,6s nos dois casos).
 *
 * Só nas rotas que montam <MetaPixel>. _fbc/_fbp seguem como cookies — a API
 * resolve o fbclid da URL e gera o _fbp sozinha (ResolveFbpFbc) e o client
 * adota o valor devolvido.
 */
function earlyEventsInit(env: Record<string, string>): Plugin {
  const url = env.VITE_META_EVENTS_API_URL || DEFAULT_EVENTS_API_URL;
  const contentId = env.VITE_META_EVENTS_CONTENT_ID || DEFAULT_CONTENT_ID;
  const routes = PIXEL_ROUTE_PREFIXES.map((r) =>
    r.replace(/[.*+?^${}()|[\]\\/]/g, '\\$&')
  ).join('|');

  const script = `(function(){try{
if(!/^(${routes})(\\/|$)/.test(location.pathname))return;
function c(n){var m=document.cookie.match(new RegExp('(?:^|; )'+n+'=([^;]*)'));return m?decodeURIComponent(m[1]):null}
var p=fetch(${JSON.stringify(url)},{method:'POST',credentials:'include',priority:'low',headers:{'Content-Type':'application/json'},body:JSON.stringify({contentId:${JSON.stringify(contentId)},eventType:'Init',event_source_url:location.href,_fbc:c('_fbc'),_fbp:c('_fbp')})}).then(function(r){if(!r.ok)throw new Error('events API returned '+r.status);return r.json()});
p.catch(function(){});
window.__earlyEventsInit=p;
}catch(e){}})();`;

  return {
    name: 'early-events-init',
    // 'pre' + inserção logo depois do <meta charset>: um script inline só
    // executa quando não há folha de estilo pendente antes dele, então se ele
    // ficasse depois do <link rel="stylesheet"> (onde o Vite injeta o CSS) o
    // Init esperaria o CSS baixar — medido: com CSS atrasado em 1,5s o Init
    // saía em 1,5s. O charset tem que continuar nos primeiros 1024 bytes.
    transformIndexHtml: {
      order: 'pre',
      handler(html) {
        const tag = `<script>${script}</script>`;
        return /<meta charset[^>]*>/i.test(html)
          ? html.replace(/(<meta charset[^>]*>)/i, `$1\n    ${tag}`)
          : html.replace('<head>', `<head>\n    ${tag}`);
      },
    },
  };
}

const escapeHtml = (v: string) =>
  v.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

/**
 * Grava, no build, uma cópia do index.html por rota estática com o <title>
 * certo (`dist/<rota>/index.html`). O Nginx serve essa cópia no lugar do
 * index.html genérico (try_files $uri/), então o título já vem no HTML: o
 * page_view do GA, os previews de link e os crawlers não dependem do React
 * montar para ver o título da página. O <PageTitle> segue cuidando das
 * navegações internas e das rotas dinâmicas.
 *
 * As rotas são chunks separados (React.lazy no App.tsx). Sem ajuda, o
 * navegador só descobriria o chunk da rota depois de baixar e executar o
 * bundle principal (uma cascata a mais no caminho do primeiro render). Por
 * isso cada cópia também ganha <link rel="modulepreload"> do chunk da rota e
 * das dependências estáticas dele, que baixam em paralelo com o bundle.
 */
const ROUTE_COMPONENTS: Record<string, string> = {
  '/': 'src/components/LandingPage.tsx',
  '/v2': 'src/components/v2/LandingPageV2.tsx',
  '/bussola-aceleracao-de-carreira-para-desenvolvedores':
    'src/components/bussola/LandingPageBussola.tsx',
  '/webinario-carreira-tech': 'src/components/semente/LandingPageSemente.tsx',
  '/webinario-carreira-tech/obrigado':
    'src/components/semente/ObrigadoSemente.tsx',
  '/teste': 'src/components/test/AptitudeTest.tsx',
  '/admin': 'src/components/admin/Dashboard.tsx',
  '/politica-de-privacidade': 'src/components/legal/PrivacyPolicy.tsx',
};

function routeHtml(): Plugin {
  return {
    name: 'route-html',
    apply: 'build',
    enforce: 'post',
    generateBundle: {
      order: 'post',
      handler(_, bundle) {
        const index = bundle['index.html'];
        if (!index || index.type !== 'asset') return;
        const html = String(index.source);
        const chunks = Object.values(bundle).filter(
          (f): f is Rollup.OutputChunk => f.type === 'chunk'
        );
        const entry = chunks.find((c) => c.isEntry);

        // Chunk da rota + dependências estáticas (recursivo), menos o que o
        // HTML já carrega por ser do entry.
        const preloadTags = (route: string) => {
          const source = ROUTE_COMPONENTS[route];
          const chunk = chunks.find((c) =>
            Object.keys(c.modules).some((m) => m.endsWith(`/${source}`))
          );
          if (!chunk || chunk === entry) return '';
          const skip = new Set<string>(
            entry ? [entry.fileName, ...entry.imports] : []
          );
          const files = new Set<string>();
          const visit = (name: string) => {
            if (skip.has(name) || files.has(name)) return;
            const c = bundle[name];
            if (!c || c.type !== 'chunk') return;
            files.add(name);
            c.imports.forEach(visit);
          };
          visit(chunk.fileName);
          return [...files]
            .map((f) => `<link rel="modulepreload" crossorigin href="/${f}" />`)
            .join('\n    ');
        };

        const render = (route: string, title: string) => {
          const withTitle = html.replace(
            /<title>[^<]*<\/title>/,
            `<title>${escapeHtml(title)}</title>`
          );
          const tags = preloadTags(route);
          return tags
            ? withTitle.replace('</head>', `${tags}\n  </head>`)
            : withTitle;
        };

        for (const [route, title] of Object.entries(ROUTE_TITLES)) {
          if (route === '/') {
            index.source = render(route, title);
            continue;
          }
          this.emitFile({
            type: 'asset',
            fileName: `${route.slice(1)}/index.html`,
            source: render(route, title),
          });
        }
      },
    },
  };
}

export default defineConfig(({ mode, isSsrBuild }) => ({
  server: {
    port: 3000,
    host: '0.0.0.0',
    proxy: {
      '/api': {
        target: 'http://localhost:4000',
        changeOrigin: true,
      },
    },
  },
  plugins: [
    tailwindcss(),
    react(),
    earlyEventsInit(loadEnv(mode, __dirname, 'VITE_')),
    routeHtml(),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    cssCodeSplit: true,
    minify: 'esbuild',
    rollupOptions: {
      output: {
        // No build SSR o React fica externo (node_modules), sem chunk vendor.
        manualChunks: isSsrBuild
          ? undefined
          : {
              vendor: ['react', 'react-dom'],
            },
      },
    },
  },
}));
