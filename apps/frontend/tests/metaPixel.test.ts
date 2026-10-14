import { beforeEach, describe, expect, it, vi } from 'vitest';
import {
  DEFAULT_CONTENT_ID,
  DEFAULT_EVENTS_API_URL,
} from '../src/utils/metaEventsConfig';

type FbqCall = unknown[];
const PIXEL_ID = '2915608258822003';
const fbq = () => (window as unknown as { fbq: ReturnType<typeof vi.fn> }).fbq;
const fbqCalls = (): FbqCall[] => fbq().mock.calls;

const ok = (body: unknown) => ({
  ok: true,
  status: 200,
  json: async () => body,
});
let fetchMock: ReturnType<typeof vi.fn>;
const bodies = () =>
  fetchMock.mock.calls.map(([, init]) => JSON.parse(init.body));

// O módulo guarda estado (handshake Init feito, external_id): cada teste
// carrega uma cópia nova dele.
async function load() {
  vi.resetModules();
  return import('../src/utils/metaPixel');
}

beforeEach(() => {
  for (const c of document.cookie.split(';')) {
    const name = c.split('=')[0].trim();
    if (name)
      document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/`;
  }
  window.history.replaceState({}, '', '/webinario-carreira-tech');
  (window as unknown as { fbq: unknown }).fbq = vi.fn();
  (window as unknown as { __earlyEventsInit: unknown }).__earlyEventsInit =
    undefined;
  fetchMock = vi.fn(async (_url: string, init: { body: string }) => {
    const { eventType } = JSON.parse(init.body);
    return ok(
      eventType === 'Init'
        ? { external_id: 'ext-1' }
        : { eventID: `ev-${eventType}` }
    );
  });
  vi.stubGlobal('fetch', fetchMock);
  vi.spyOn(console, 'error').mockImplementation(() => undefined);
  vi.spyOn(console, 'warn').mockImplementation(() => undefined);
});

describe('sendEvent', () => {
  it('faz o handshake Init antes do primeiro evento e só uma vez', async () => {
    const { sendEvent } = await load();
    await sendEvent('PageView');
    await sendEvent('ViewContent');
    expect(bodies().map((b) => b.eventType)).toEqual([
      'Init',
      'PageView',
      'ViewContent',
    ]);
  });

  it('envia para a API de eventos com cookies, JSON e keepalive', async () => {
    const { sendEvent } = await load();
    await sendEvent('PageView');
    const [url, init] = fetchMock.mock.calls[1];
    expect(url).toBe(DEFAULT_EVENTS_API_URL);
    expect(init).toMatchObject({
      method: 'POST',
      credentials: 'include',
      keepalive: true,
      headers: { 'Content-Type': 'application/json' },
    });
  });

  it('o corpo leva contentId, tipo, URL da página e os dados do evento', async () => {
    const { sendEvent } = await load();
    await sendEvent('InitiateCheckout', { value: 297, currency: 'BRL' });
    expect(bodies()[1]).toMatchObject({
      contentId: DEFAULT_CONTENT_ID,
      eventType: 'InitiateCheckout',
      event_source_url: window.location.href,
      value: 297,
      currency: 'BRL',
    });
  });

  it('eventSourceUrl sobrescreve a URL da página (Lead enviado depois de navegar)', async () => {
    const { sendEvent } = await load();
    await sendEvent(
      'Lead',
      {},
      { eventSourceUrl: 'https://site.teste/webinario-carreira-tech' }
    );
    expect(bodies()[1].event_source_url).toBe(
      'https://site.teste/webinario-carreira-tech'
    );
  });

  it('espelha no Pixel do navegador com o mesmo eventID da API (deduplicação)', async () => {
    const { sendEvent } = await load();
    await sendEvent('InitiateCheckout', { value: 297, currency: 'BRL' });
    const track = fbqCalls().find((c) => c[0] === 'track');
    expect(track).toEqual([
      'track',
      'InitiateCheckout',
      { content_ids: [DEFAULT_CONTENT_ID], value: 297, currency: 'BRL' },
      { eventID: 'ev-InitiateCheckout' },
    ]);
  });

  it('o Init é só um handshake: não dispara evento no Pixel', async () => {
    const { sendEvent } = await load();
    await sendEvent('Init');
    expect(fbqCalls().filter((c) => c[0] === 'track')).toHaveLength(0);
  });

  it('dados pessoais vão ao servidor e ao Advanced Matching, nunca nos parâmetros do evento', async () => {
    const { sendEvent } = await load();
    await sendEvent(
      'Lead',
      { value: 0, currency: 'BRL', source: 'webinar_semente' },
      {
        userData: {
          em: 'maria@exemplo.com',
          full_name: 'Maria  Silva',
          fn: ' Maria ',
          ln: 'SILVA',
        },
      }
    );
    // servidor: recebe tudo como veio (ele faz o hash)
    expect(bodies()[1]).toMatchObject({
      em: 'maria@exemplo.com',
      full_name: 'Maria  Silva',
      fn: ' Maria ',
      ln: 'SILVA',
    });
    // Pixel, parâmetros do evento: sem dado pessoal
    const track = fbqCalls().find((c) => c[0] === 'track')!;
    expect(JSON.stringify(track[2])).not.toMatch(/maria|silva/i);
    // Pixel, Advanced Matching: fn/ln em minúsculas e sem o nome completo
    const matching = fbqCalls()
      .filter((c) => c[0] === 'init')
      .pop()![2] as Record<string, unknown>;
    expect(matching).toMatchObject({
      em: 'maria@exemplo.com',
      fn: 'maria',
      ln: 'silva',
      external_id: 'ext-1',
    });
    expect(matching).not.toHaveProperty('full_name');
  });

  it('o Init inicializa o Pixel com o external_id devolvido pela API', async () => {
    const { sendEvent } = await load();
    await sendEvent('PageView');
    expect(fbqCalls()[0]).toEqual([
      'init',
      PIXEL_ID,
      expect.objectContaining({ external_id: 'ext-1' }),
    ]);
  });

  it('falha da API de eventos não derruba a página: devolve null e não dispara o Pixel', async () => {
    fetchMock.mockResolvedValue({
      ok: false,
      status: 500,
      json: async () => ({}),
    });
    const { sendEvent } = await load();
    await expect(sendEvent('Lead')).resolves.toBeNull();
    expect(fbqCalls().filter((c) => c[0] === 'track')).toHaveLength(0);
  });

  it('erro de rede também é absorvido', async () => {
    fetchMock.mockRejectedValue(new TypeError('Failed to fetch'));
    const { sendEvent } = await load();
    await expect(sendEvent('PageView')).resolves.toBeNull();
  });

  it('adota _fbp e _fbc devolvidos pela API nos cookies', async () => {
    fetchMock.mockImplementation(async (_u: string, init: { body: string }) => {
      const { eventType } = JSON.parse(init.body);
      return ok(
        eventType === 'Init'
          ? { external_id: 'ext-1', fbp: 'fb.1.111.222', fbc: 'fb.1.333.abc' }
          : { eventID: 'e' }
      );
    });
    const { sendEvent, readCookie } = await load();
    await sendEvent('PageView');
    expect(readCookie('_fbp')).toBe('fb.1.111.222');
    expect(readCookie('_fbc')).toBe('fb.1.333.abc');
  });

  it('fbclid na URL vira o cookie _fbc depois do evento', async () => {
    window.history.replaceState(
      {},
      '',
      '/webinario-carreira-tech?fbclid=ABC123'
    );
    const { sendEvent, readCookie } = await load();
    await sendEvent('PageView');
    expect(readCookie('_fbc')).toMatch(/^fb\.1\.\d+\.ABC123$/);
  });
});

describe('getExternalId', () => {
  it('devolve o external_id resolvido pelo handshake', async () => {
    const { getExternalId } = await load();
    await expect(getExternalId()).resolves.toBe('ext-1');
  });

  it('devolve null quando a API de eventos está fora do ar', async () => {
    fetchMock.mockRejectedValue(new TypeError('Failed to fetch'));
    const { getExternalId } = await load();
    await expect(getExternalId()).resolves.toBeNull();
  });
});

describe('readCookie', () => {
  it('lê e decodifica o valor do cookie, ou null quando não existe', async () => {
    document.cookie = 'teste=a%20b';
    const { readCookie } = await load();
    expect(readCookie('teste')).toBe('a b');
    expect(readCookie('inexistente')).toBeNull();
  });
});
