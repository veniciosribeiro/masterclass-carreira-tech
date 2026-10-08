/**
 * Título de cada rota estática. Usado pelas páginas (<PageTitle>) e pelo
 * plugin `routeHtml` do Vite, que grava o mesmo título no HTML de cada rota
 * no build — assim o GA, os previews de link e os crawlers veem o título
 * certo sem esperar o React montar.
 */
export const ROUTE_TITLES = {
  '/': 'Masterclass Test-Drive da Carreira Tech',
  '/v2': 'Masterclass Test-Drive da Carreira Tech',
  '/bussola-aceleracao-de-carreira-para-desenvolvedores':
    'Bússola — Aceleração de Carreira Para Desenvolvedores',
  '/webinario-carreira-tech':
    'Webinário Gratuito — Aceleração de Carreira Para Desenvolvedores',
  '/webinario-carreira-tech/obrigado':
    'Inscrição Realizada — Webinário Gratuito — Aceleração de Carreira Para Desenvolvedores',
  '/teste':
    'Teste de Aptidão para Programação — Masterclass Test-Drive da Carreira Tech',
  '/admin': 'Painel Administrativo — Masterclass Test-Drive da Carreira Tech',
} as const;

export type RouteTitlePath = keyof typeof ROUTE_TITLES;
