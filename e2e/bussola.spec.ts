import { expect, test } from './fixtures';

const PAGINA = '/bussola-aceleracao-de-carreira-para-desenvolvedores';

test.describe('página de vendas da Bússola (desktop)', () => {
  test.use({ viewport: { width: 1280, height: 900 } });

  test('carrega com as seções principais e rastreia a visita', async ({
    page,
    eventos,
    errosDoNavegador,
  }) => {
    await page.goto(PAGINA);
    await expect(page.locator('h1').first()).toBeVisible();
    for (const id of [
      'diagnostico',
      'jornada',
      'provas',
      'mentor',
      'pricing',
    ]) {
      await expect(page.locator(`#${id}`)).toBeAttached();
    }
    await page.locator('#faq').scrollIntoViewIfNeeded();
    await expect(page.locator('#faq')).toBeAttached();

    await expect
      .poll(() => eventos.map((e) => e.eventType))
      .toEqual(expect.arrayContaining(['Init', 'PageView']));
    expect(errosDoNavegador).toEqual([]);
  });

  test('o botão de compra dispara InitiateCheckout uma vez e leva ao checkout', async ({
    page,
    eventos,
  }) => {
    await page.goto(PAGINA);
    const cta = page.getByRole('link', { name: /Entrar na turma inaugural/ });
    await cta.scrollIntoViewIfNeeded();
    await expect(cta).toHaveAttribute(
      'href',
      /^https:\/\/pay\.cakto\.com\.br\//,
    );

    await cta.click();
    await expect(page).toHaveURL(/^https:\/\/pay\.cakto\.com\.br\//, {
      timeout: 10_000,
    });

    const checkouts = eventos.filter((e) => e.eventType === 'InitiateCheckout');
    expect(checkouts).toHaveLength(1);
    expect(checkouts[0]).toMatchObject({
      content_name: 'Turma inaugural',
      value: 297,
      currency: 'BRL',
    });
  });

  test('o rodapé leva à Política de Privacidade', async ({ page }) => {
    await page.goto(PAGINA);
    const link = page.locator('a[href="/politica-de-privacidade"]').first();
    await link.scrollIntoViewIfNeeded();
    await expect(link).toBeVisible();
  });
});

test.describe('página de vendas da Bússola (celular)', () => {
  test.use({
    viewport: { width: 390, height: 844 },
    hasTouch: true,
    isMobile: true,
  });

  test('sem rolagem horizontal e com o botão de compra alcançável', async ({
    page,
  }) => {
    await page.goto(PAGINA);
    const cta = page.getByRole('link', { name: /Entrar na turma inaugural/ });
    await cta.scrollIntoViewIfNeeded();
    await expect(cta).toBeVisible();
    const semRolagem = await page.evaluate(
      () => document.documentElement.scrollWidth <= window.innerWidth + 1,
    );
    expect(semRolagem).toBe(true);
  });
});
