// @vitest-environment node
import { describe, expect, it } from 'vitest';
import { PRERENDER_ROUTES, render } from '../src/entry-server';
import { ROUTE_TITLES } from '../src/seo/routeTitles';

// O build grava esse HTML em dist/<rota>/index.html (scripts/prerender.mjs) e o
// cliente hidrata em cima dele. Estes testes cuidam da parte do servidor: toda
// rota pré-renderizada precisa render sem erro e já trazer o conteúdo.
describe('pré-renderização das landing pages', () => {
  it('só pré-renderiza rotas que existem no mapa de títulos', () => {
    for (const rota of PRERENDER_ROUTES) {
      expect(ROUTE_TITLES).toHaveProperty([rota]);
    }
  });

  it.each(PRERENDER_ROUTES)(
    '%s renderiza com título e conteúdo',
    async (rota) => {
      const html = await render(rota);
      expect(html).toContain('<h1');
      expect(html).toContain('<footer');
      // Sem Suspense pendente: o conteúdo lazy já veio resolvido.
      expect(html).not.toContain('<!--$!-->');
      expect(html).not.toContain('<!--$?-->');
    }
  );

  it('o webinário já traz o formulário de inscrição no HTML', async () => {
    const html = await render('/webinario-carreira-tech');
    expect(html).toContain('<form');
    expect(html).toContain('type="checkbox"');
  });

  it('não pré-renderiza páginas que dependem do navegador', () => {
    for (const rota of [
      '/', // dist/index.html é o fallback das demais rotas: root tem que ficar vazio
      '/webinario-carreira-tech/obrigado',
      '/teste',
      '/admin',
    ]) {
      expect(PRERENDER_ROUTES).not.toContain(rota);
    }
  });
});
