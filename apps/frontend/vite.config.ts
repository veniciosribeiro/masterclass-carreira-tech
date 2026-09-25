import path from 'path';
import { fileURLToPath } from 'url';
import { defineConfig, loadEnv, type Plugin } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
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
var p=fetch(${JSON.stringify(url)},{method:'POST',credentials:'include',headers:{'Content-Type':'application/json'},body:JSON.stringify({contentId:${JSON.stringify(contentId)},eventType:'Init',event_source_url:location.href,_fbc:c('_fbc'),_fbp:c('_fbp')})}).then(function(r){if(!r.ok)throw new Error('events API returned '+r.status);return r.json()});
p.catch(function(){});
window.__earlyEventsInit=p;
}catch(e){}})();`;

  return {
    name: 'early-events-init',
    transformIndexHtml() {
      return [{ tag: 'script', children: script, injectTo: 'head' }];
    },
  };
}

export default defineConfig(({ mode }) => ({
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
        manualChunks: {
          vendor: ['react', 'react-dom'],
        },
      },
    },
  },
}));
