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
  '/politica-de-privacidade': 'Política de Privacidade — Carreira Tech',
} as const;

export type RouteTitlePath = keyof typeof ROUTE_TITLES;

/** Metadescrição por rota (só as páginas que entram em buscas e compartilhamentos). */
export const ROUTE_DESCRIPTIONS: Record<string, string> = {
  '/': 'Masterclass Test-Drive da Carreira Tech: descubra em 130 minutos se você tem aptidão para programação e qual área faz sentido para o seu perfil.',
  '/v2':
    'Masterclass Test-Drive da Carreira Tech: descubra em 130 minutos se você tem aptidão para programação e qual área faz sentido para o seu perfil.',
  '/bussola-aceleracao-de-carreira-para-desenvolvedores':
    'Bússola: aceleração de carreira para desenvolvedores. Seja reconhecido como um profissional pronto para o próximo nível, com mentoria, aulas e comunidade.',
  '/webinario-carreira-tech':
    'Webinário gratuito para desenvolvedores: descubra o que quem decide precisa enxergar para considerar você pronto para o próximo nível.',
  '/politica-de-privacidade':
    'Como a Media Labs trata os seus dados pessoais, com as finalidades, os seus direitos e como falar com o encarregado.',
};
