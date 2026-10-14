import {
  afterAll,
  afterEach,
  beforeAll,
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from 'vitest';
import type { FastifyInstance } from 'fastify';
import { deliverPendingWebinarEvent } from '../src/services/n8nWebhook.js';
import { makeApp, register, resetWebinarTables } from './helpers.js';

const log = { info: () => undefined, error: () => undefined };

describe('entrega do evento ao n8n (worker)', () => {
  let app: FastifyInstance;
  let eventId: string;
  const fetchMock = vi.fn();

  beforeAll(async () => {
    app = await makeApp();
  });
  beforeEach(async () => {
    await resetWebinarTables(app);
    vi.stubEnv('N8N_WEBHOOK_URL', 'https://n8n.teste/webhook/x');
    vi.stubEnv('N8N_WEBHOOK_TOKEN', 'token-de-teste');
    vi.stubEnv('N8N_MAX_RETRIES', '3');
    vi.stubEnv('N8N_RETRY_BASE_DELAY_MS', '1000');
    fetchMock.mockReset();
    vi.stubGlobal('fetch', fetchMock);
    await register(app, { name: 'Ana', email: 'ana@exemplo.com' });
    eventId = (await app.prisma.webinarRegistrationEvent.findFirstOrThrow()).id;
  });
  afterEach(() => {
    vi.unstubAllEnvs();
    vi.unstubAllGlobals();
  });
  afterAll(async () => {
    await app.close();
  });

  const evento = () =>
    app.prisma.webinarRegistrationEvent.findUniqueOrThrow({
      where: { id: eventId },
    });
  const resposta = (status: number) => ({
    ok: status >= 200 && status < 300,
    status,
  });

  it('entrega o payload com o token e marca como "sent"', async () => {
    fetchMock.mockResolvedValue(resposta(200));
    await deliverPendingWebinarEvent(app.prisma, eventId, log);

    expect(fetchMock).toHaveBeenCalledTimes(1);
    const [url, init] = fetchMock.mock.calls[0];
    expect(url).toBe('https://n8n.teste/webhook/x');
    expect(init.method).toBe('POST');
    expect(init.headers).toMatchObject({
      Authorization: 'Bearer token-de-teste',
      'Content-Type': 'application/json',
    });
    expect(JSON.parse(init.body)).toEqual((await evento()).payload);

    const ev = await evento();
    expect(ev.status).toBe('sent');
    expect(ev.sentAt).not.toBeNull();
    expect(ev.attempts).toBe(1);
    expect(ev.lockedAt).toBeNull();
  });

  it('erro 5xx volta para "pending" com espera exponencial', async () => {
    fetchMock.mockResolvedValue(resposta(503));
    const antes = Date.now();
    await deliverPendingWebinarEvent(app.prisma, eventId, log);
    const ev = await evento();
    expect(ev.status).toBe('pending');
    expect(ev.attempts).toBe(1);
    expect(ev.lastError).toContain('n8n returned 503');
    // 1ª falha: base × 2^0 = 1 s
    expect(ev.nextAttemptAt.getTime()).toBeGreaterThanOrEqual(antes + 900);

    await app.prisma.webinarRegistrationEvent.update({
      where: { id: eventId },
      data: { nextAttemptAt: new Date() },
    });
    const antes2 = Date.now();
    await deliverPendingWebinarEvent(app.prisma, eventId, log);
    const ev2 = await evento();
    expect(ev2.attempts).toBe(2);
    // 2ª falha: base × 2^1 = 2 s
    expect(ev2.nextAttemptAt.getTime()).toBeGreaterThanOrEqual(antes2 + 1900);
  });

  it('erro 4xx não tenta de novo: vai para "failed"', async () => {
    fetchMock.mockResolvedValue(resposta(400));
    await deliverPendingWebinarEvent(app.prisma, eventId, log);
    const ev = await evento();
    expect(ev.status).toBe('failed');
    expect(ev.lastError).toContain('n8n returned 400');
  });

  it('falha de rede/timeout é tratada como tentativa que pode se repetir', async () => {
    const timeout = Object.assign(new Error('timeout'), {
      name: 'TimeoutError',
    });
    fetchMock.mockRejectedValue(timeout);
    await deliverPendingWebinarEvent(app.prisma, eventId, log);
    expect((await evento()).status).toBe('pending');
  });

  it('esgotadas as tentativas (N8N_MAX_RETRIES) vai para "failed"', async () => {
    fetchMock.mockResolvedValue(resposta(500));
    await app.prisma.webinarRegistrationEvent.update({
      where: { id: eventId },
      data: { attempts: 3 },
    });
    await deliverPendingWebinarEvent(app.prisma, eventId, log);
    const ev = await evento();
    expect(ev.attempts).toBe(4);
    expect(ev.status).toBe('failed');
  });

  it('evento já enviado não é reenviado', async () => {
    await app.prisma.webinarRegistrationEvent.update({
      where: { id: eventId },
      data: { status: 'sent' },
    });
    await deliverPendingWebinarEvent(app.prisma, eventId, log);
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it('sem configuração do n8n marca "failed" e não chama a rede', async () => {
    vi.stubEnv('N8N_WEBHOOK_URL', '');
    vi.stubEnv('N8N_WEBHOOK_TOKEN', '');
    await deliverPendingWebinarEvent(app.prisma, eventId, log);
    const ev = await evento();
    expect(ev.status).toBe('failed');
    expect(ev.lastError).toBe('n8n integration is not configured');
    expect(fetchMock).not.toHaveBeenCalled();
  });
});
