import { expect, test } from './fixtures';

// As landing pages saem do build com o HTML do hero já pronto
// (scripts/prerender.mjs): o navegador desenha sem esperar o JS, e o React
// hidrata em cima. Os dois testes cobrem as duas pontas.
// A barra no fim é de propósito: o `vite preview` do E2E só devolve o HTML da
// rota (dist/<rota>/index.html) com ela; sem a barra cai no index.html genérico.
// Em produção o Nginx (try_files $uri/index.html) serve o da rota nos dois casos.
const PAGINAS = [
  ['webinário', '/webinario-carreira-tech/'],
  ['Bússola', '/bussola-aceleracao-de-carreira-para-desenvolvedores/'],
] as const;

for (const [nome, rota] of PAGINAS) {
  test(`${nome}: o HTML já traz o conteúdo, mesmo sem JavaScript`, async ({
    browser,
  }) => {
    const context = await browser.newContext({ javaScriptEnabled: false });
    await context.route('**/*', (route) => {
      const { host } = new URL(route.request().url());
      return host === '127.0.0.1:3100' ? route.continue() : route.abort();
    });
    const page = await context.newPage();
    await page.goto(rota);
    await expect(page.locator('h1')).toBeVisible();
    await expect(page.locator('footer')).toBeAttached();
    await context.close();
  });

  test(`${nome}: o React hidrata o HTML pré-renderizado sem refazer a página`, async ({
    page,
    errosDoNavegador,
  }) => {
    // Se a hidratação divergir, o React descarta o HTML e monta de novo: o
    // <h1> seria removido do DOM (e o navegador registraria um erro).
    await page.addInitScript(() => {
      const w = window as unknown as { __h1Removido: number };
      w.__h1Removido = 0;
      new MutationObserver((mudancas) => {
        for (const m of mudancas) {
          m.removedNodes.forEach((n) => {
            if (
              n instanceof Element &&
              (n.tagName === 'H1' || n.querySelector('h1'))
            ) {
              w.__h1Removido++;
            }
          });
        }
      }).observe(document, { childList: true, subtree: true });
    });
    await page.goto(rota);
    await page.waitForLoadState('networkidle');
    await expect(page.locator('h1')).toBeVisible();
    const removido = await page.evaluate(
      () => (window as unknown as { __h1Removido: number }).__h1Removido,
    );
    expect(removido).toBe(0);
    expect(errosDoNavegador).toEqual([]);
  });
}
