/**
 * Config da API de eventos compartilhada entre o runtime (metaPixel.ts) e o
 * build (vite.config.ts, que injeta o Init antecipado no index.html).
 * Sem `import.meta.env` aqui de propósito — o vite.config.ts roda em Node.
 */
export const DEFAULT_EVENTS_API_URL =
  'https://api.foconoobjetivo.com/events/send';

// Content_id oficial da masterclass/webinário, mapeado no config/conversions.php
// da API de eventos pro pixel correto.
export const DEFAULT_CONTENT_ID = '123456';

// Rotas que montam <MetaPixel>. Só nelas o Init antecipado faz sentido — nas
// demais (teste, admin, landing V1/V2) o handshake seria uma request à toa.
export const PIXEL_ROUTE_PREFIXES = [
  '/webinario-carreira-tech',
  '/bussola-aceleracao-de-carreira-para-desenvolvedores',
];
