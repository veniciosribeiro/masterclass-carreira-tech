import { query, resetWebinar } from './db';
import { expect, test } from './fixtures';

const PAGINA = '/webinario-carreira-tech';
const EMAIL = 'e2e-aceite@teste.local';

test.beforeEach(async () => {
  await resetWebinar();
});

async function preencher(
  page: import('@playwright/test').Page,
  { aceitar }: { aceitar: boolean },
) {
  const form = page.locator('form').first();
  await form.getByPlaceholder('Seu nome').fill('Maria Teste Silva');
  await form.getByPlaceholder('Seu melhor e-mail').fill(EMAIL);
  if (aceitar) await form.getByRole('checkbox').check();
  return form;
}

test.describe('página do webinário (desktop)', () => {
  test.use({ viewport: { width: 1280, height: 900 } });

  test('carrega, rastreia a visita e mostra a caixa de aceite em cada formulário', async ({
    page,
    eventos,
    errosDoNavegador,
  }) => {
    await page.goto(PAGINA);
    await expect(page.locator('h1').first()).toBeVisible();
    await expect(page).toHaveTitle(/.+/);

    const caixas = page.getByRole('checkbox');
    const quantidade = await caixas.count();
    expect(quantidade).toBeGreaterThanOrEqual(1);
    for (let i = 0; i < quantidade; i++) {
      await expect(caixas.nth(i)).not.toBeChecked();
      await expect(caixas.nth(i)).toBeVisible();
      expect(
        await caixas.nth(i).evaluate((e: HTMLInputElement) => e.required),
      ).toBe(true);
    }
    await expect(
      page.locator('label a[href="/politica-de-privacidade"]'),
    ).toHaveCount(quantidade);

    await expect
      .poll(() => eventos.map((e) => e.eventType))
      .toEqual(expect.arrayContaining(['Init', 'PageView']));
    expect(eventos.some((e) => e.eventType === 'Lead')).toBe(false);
    expect(errosDoNavegador).toEqual([]);
  });

  test('sem marcar o aceite: não envia, não grava e não dispara Lead', async ({
    page,
    eventos,
  }) => {
    await page.goto(PAGINA);
    const form = await preencher(page, { aceitar: false });
    const cadastros: string[] = [];
    page.on('request', (r) => {
      if (r.url().includes('/webinar/register')) cadastros.push(r.url());
    });

    await form.getByRole('button').click();
    await page.waitForTimeout(1000);

    expect(cadastros).toHaveLength(0);
    expect(
      await form
        .getByRole('checkbox')
        .evaluate((e: HTMLInputElement) => !e.validity.valid),
    ).toBe(true);
    expect(await query('select 1 from webinar_registrations')).toHaveLength(0);
    expect(eventos.some((e) => e.eventType === 'Lead')).toBe(false);
    await expect(page).toHaveURL(new RegExp(`${PAGINA}$`));
  });

  test('inscrição completa: grava o aceite, dispara o Lead e vai para o obrigado', async ({
    page,
    eventos,
  }) => {
    await page.goto(PAGINA);
    const form = await preencher(page, { aceitar: true });

    const [requisicao, resposta] = await Promise.all([
      page.waitForRequest(
        (r) => r.url().includes('/webinar/register') && r.method() === 'POST',
      ),
      page.waitForResponse((r) => r.url().includes('/webinar/register')),
      form.getByRole('button').click(),
    ]);
    expect(resposta.status()).toBe(201);
    expect(requisicao.postDataJSON()).toMatchObject({
      name: 'Maria Teste Silva',
      email: EMAIL,
      externalId: 'ext-e2e-1',
      marketingConsent: true,
      privacyPolicyVersion: '2026-10-14',
    });

    await expect(page).toHaveURL(/\/webinario-carreira-tech\/obrigado$/);

    const [linha] = await query<{
      marketing_consent: boolean;
      aceite_com_data: boolean;
      privacy_policy_version: string;
      external_id: string;
    }>(
      `select marketing_consent, (marketing_consent_at is not null) as aceite_com_data,
              privacy_policy_version, external_id
         from webinar_registrations where email = $1`,
      [EMAIL],
    );
    expect(linha).toEqual({
      marketing_consent: true,
      aceite_com_data: true,
      privacy_policy_version: '2026-10-14',
      external_id: 'ext-e2e-1',
    });

    const [evento] = await query<{
      event_name: string;
      payload: Record<string, unknown>;
    }>(
      `select e.event_name, e.payload from webinar_registration_events e
         join webinar_registrations r on r.id = e.registration_id where r.email = $1`,
      [EMAIL],
    );
    expect(evento.event_name).toBe('webinar.registration.created');
    expect(evento.payload).toMatchObject({
      version: 1,
      marketingConsent: true,
      privacyPolicyVersion: '2026-10-14',
      externalId: 'ext-e2e-1',
    });

    const lead = eventos.find((e) => e.eventType === 'Lead');
    expect(lead).toMatchObject({
      value: 0,
      currency: 'BRL',
      source: 'webinar_semente',
      em: EMAIL,
      full_name: 'Maria Teste Silva',
      fn: 'Maria',
      ln: 'Silva',
    });
  });

  test('erro na API: mostra a mensagem, reabilita o botão e não dispara Lead', async ({
    page,
    eventos,
  }) => {
    await page.route('**/webinar/register', (route) => route.abort());
    await page.goto(PAGINA);
    const form = await preencher(page, { aceitar: true });
    await form.getByRole('button').click();

    await expect(
      page.getByText(/Não conseguimos concluir sua inscrição/),
    ).toBeVisible();
    await expect(form.getByRole('button')).toBeEnabled();
    expect(eventos.some((e) => e.eventType === 'Lead')).toBe(false);
    await expect(page).toHaveURL(new RegExp(`${PAGINA}$`));
  });
});

test.describe('página de obrigado', () => {
  test('depois da inscrição mostra a pesquisa personalizada e o grupo, sem dado pessoal na URL', async ({
    page,
  }) => {
    await page.goto(PAGINA);
    const form = await preencher(page, { aceitar: true });
    await form.getByRole('button').click();
    await expect(page).toHaveURL(/\/obrigado$/);

    expect(page.url()).not.toMatch(/maria|e2e-aceite/i);
    const pesquisa = page.getByRole('link', { name: 'Responder agora' });
    const url = new URL((await pesquisa.getAttribute('href'))!);
    expect(url.host).toBe('survey.foconoobjetivo.com');
    expect(url.searchParams.get('ys8rmlszunb5hy4zzu9u9rq2')).toBe(EMAIL);
    expect(url.searchParams.get('nome')).toBe('Maria Teste Silva');
    await expect(
      page.getByRole('link', { name: 'Entrar no Grupo' }),
    ).toHaveAttribute('href', /^https:\/\/chat\.whatsapp\.com\//);
  });

  test('acesso direto, sem inscrição: omite a pesquisa e destaca o grupo', async ({
    page,
  }) => {
    await page.goto(`${PAGINA}/obrigado`);
    await expect(
      page.getByRole('link', { name: 'Responder agora' }),
    ).toHaveCount(0);
    await expect(page.getByText('Entre no grupo agora')).toBeVisible();
    await expect(
      page.getByRole('link', { name: 'Entrar no Grupo' }),
    ).toBeVisible();
  });
});

test.describe('página do webinário (celular)', () => {
  test.use({
    viewport: { width: 390, height: 844 },
    hasTouch: true,
    isMobile: true,
  });

  test('caixa de aceite e botão acessíveis, sem rolagem horizontal', async ({
    page,
  }) => {
    await page.goto(PAGINA);
    const caixa = page.getByRole('checkbox').first();
    await caixa.scrollIntoViewIfNeeded();
    await expect(caixa).toBeVisible();
    await expect(
      page.locator('form').first().getByRole('button'),
    ).toBeVisible();
    const semRolagem = await page.evaluate(
      () => document.documentElement.scrollWidth <= window.innerWidth + 1,
    );
    expect(semRolagem).toBe(true);
  });
});
