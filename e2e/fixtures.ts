import { test as base, expect } from '@playwright/test';

export interface EventoEnviado {
  eventType?: string;
  [chave: string]: unknown;
}

const LOCAIS = new Set(['127.0.0.1:3100', '127.0.0.1:4100']);

// Nenhum teste fala com a internet: a API de eventos é simulada (e registrada
// para os testes conferirem o que seria enviado à Meta), o checkout da Cakto
// vira uma página vazia e todo o resto é bloqueado.
export const test = base.extend<{
  eventos: EventoEnviado[];
  externos: Set<string>;
  errosDoNavegador: string[];
}>({
  eventos: async ({}, use) => use([]),
  externos: async ({}, use) => use(new Set()),
  errosDoNavegador: async ({}, use) => use([]),

  page: async ({ page, eventos, externos, errosDoNavegador }, use) => {
    page.on('pageerror', (e) =>
      errosDoNavegador.push(`pageerror: ${e.message}`),
    );
    page.on('console', (m) => {
      if (
        m.type() === 'error' &&
        !/Failed to load resource|ERR_FAILED|net::/.test(m.text())
      ) {
        errosDoNavegador.push(m.text());
      }
    });

    await page.route('**/*', async (route) => {
      const request = route.request();
      const url = new URL(request.url());
      if (LOCAIS.has(url.host)) return route.continue();

      externos.add(url.host);
      const origin = request.headers()['origin'] ?? '*';
      const cors = {
        'access-control-allow-origin': origin,
        'access-control-allow-credentials': 'true',
        'access-control-allow-headers': 'content-type',
      };

      if (
        url.host === 'api.foconoobjetivo.com' &&
        url.pathname === '/events/send'
      ) {
        if (request.method() === 'OPTIONS') {
          return route.fulfill({ status: 204, headers: cors });
        }
        const corpo = (request.postDataJSON() ?? {}) as EventoEnviado;
        eventos.push(corpo);
        return route.fulfill({
          status: 200,
          headers: cors,
          contentType: 'application/json',
          body: JSON.stringify(
            corpo.eventType === 'Init'
              ? { external_id: 'ext-e2e-1' }
              : { eventID: `ev-${corpo.eventType}` },
          ),
        });
      }
      if (url.host === 'pay.cakto.com.br') {
        return route.fulfill({
          status: 200,
          contentType: 'text/html',
          body: '<title>Checkout simulado</title>',
        });
      }
      return route.abort();
    });

    await use(page);
  },
});

export { expect };
