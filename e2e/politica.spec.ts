import { expect, test } from './fixtures';

test('a Política de Privacidade carrega completa', async ({
  page,
  errosDoNavegador,
}) => {
  await page.goto('/politica-de-privacidade');
  await expect(page).toHaveTitle('Política de Privacidade — Carreira Tech');
  await expect(page.locator('h1')).toHaveCount(1);
  expect(await page.locator('h2').count()).toBeGreaterThanOrEqual(5);
  const texto = await page.locator('body').innerText();
  expect(texto).toMatch(/Media Labs/);
  expect(texto).toMatch(/16\.577\.628\/0001-94/);
  expect(errosDoNavegador).toEqual([]);
});

for (const [nome, rota] of [
  ['home', '/'],
  ['Bússola', '/bussola-aceleracao-de-carreira-para-desenvolvedores'],
  ['webinário', '/webinario-carreira-tech'],
] as const) {
  test(`o rodapé da página ${nome} tem o link da política`, async ({
    page,
  }) => {
    await page.goto(rota);
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await expect(
      page.locator('a[href="/politica-de-privacidade"]').last(),
    ).toBeAttached({ timeout: 10_000 });
  });
}
