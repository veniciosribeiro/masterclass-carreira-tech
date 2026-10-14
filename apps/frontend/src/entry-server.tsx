import React from 'react';
import { prerender } from 'react-dom/static';
import { StaticRouter } from 'react-router-dom';
import App from './App';

/**
 * Rotas pré-renderizadas no build (scripts/prerender.mjs). Ficam de fora as
 * que dependem do navegador para saber o que mostrar: /webinario-carreira-tech/obrigado
 * (lê o lead do sessionStorage), /teste (progresso salvo) e /admin (login).
 * O HTML pré-renderizado tem que ser igual ao que o cliente renderiza na
 * hidratação; por isso só entram páginas cujo conteúdo não varia por visitante.
 * A home ('/') também fica de fora: dist/index.html é o fallback do Nginx para
 * toda rota sem HTML próprio (ex.: /admin/resultado/:id), e esse arquivo
 * precisa continuar com o root vazio, senão essas rotas hidratariam em cima
 * do HTML da home e o React descartaria tudo.
 */
export const PRERENDER_ROUTES = [
  '/v2',
  '/bussola-aceleracao-de-carreira-para-desenvolvedores',
  '/webinario-carreira-tech',
  '/politica-de-privacidade',
] as const;

export async function render(url: string): Promise<string> {
  const { prelude } = await prerender(
    <React.StrictMode>
      <StaticRouter location={url}>
        <App />
      </StaticRouter>
    </React.StrictMode>,
    // Sem isso o React tira boundaries grandes (FAQ, rodapé) do fluxo e as
    // devolve num <div hidden> + script de troca; aqui tudo vai inline.
    { progressiveChunkSize: Infinity }
  );
  return new Response(prelude).text();
}
