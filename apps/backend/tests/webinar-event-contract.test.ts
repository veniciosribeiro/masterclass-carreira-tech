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
import { makeApp, register, resetWebinarTables } from './helpers.js';

// CONTRATO com o fluxo do n8n ("Captura de Leads"): o payload que o backend
// grava em webinar_registration_events e entrega ao n8n. Se algum campo mudar,
// este teste falha de propósito: ajuste o fluxo do n8n junto com o teste.
const CAMPOS_DO_PAYLOAD_V1 = [
  'email',
  'event',
  'externalId',
  'marketingConsent',
  'marketingConsentAt',
  'name',
  'privacyPolicyVersion',
  'product',
  'registeredAt',
  'registrationId',
  'source',
  'version',
];

describe('contrato do evento do webinário (backend → n8n)', () => {
  let app: FastifyInstance;
  beforeAll(async () => {
    app = await makeApp();
  });
  beforeEach(async () => {
    await resetWebinarTables(app);
  });
  afterEach(() => {
    vi.unstubAllEnvs();
  });
  afterAll(async () => {
    await app.close();
  });

  const eventos = () =>
    app.prisma.webinarRegistrationEvent.findMany({
      orderBy: { createdAt: 'asc' },
    });

  it('o payload tem exatamente os campos combinados com o n8n (versão 1)', async () => {
    await register(app, {
      name: 'Maria Silva',
      email: 'Maria@Exemplo.com',
      externalId: 'ext-9',
      marketingConsent: true,
      privacyPolicyVersion: '2026-10-14',
    });
    const [ev] = await eventos();
    const p = ev.payload as Record<string, unknown>;

    expect(Object.keys(p).sort()).toEqual(CAMPOS_DO_PAYLOAD_V1);
    expect(p).toMatchObject({
      event: 'webinar.registration.created',
      version: 1,
      source: 'webinar_semente',
      product: 'webinar_carreira_tech',
      name: 'Maria Silva',
      email: 'maria@exemplo.com',
      externalId: 'ext-9',
      marketingConsent: true,
      privacyPolicyVersion: '2026-10-14',
    });
    expect(typeof p.registrationId).toBe('string');
    expect(new Date(p.registeredAt as string).toISOString()).toBe(
      p.registeredAt,
    );
    expect(new Date(p.marketingConsentAt as string).toISOString()).toBe(
      p.marketingConsentAt,
    );
  });

  it('sem aceite o payload mantém os campos, com marketingConsent=false e datas nulas', async () => {
    await register(app, { name: 'Antigo', email: 'antigo@exemplo.com' });
    const p = (await eventos())[0].payload as Record<string, unknown>;
    expect(Object.keys(p).sort()).toEqual(CAMPOS_DO_PAYLOAD_V1);
    expect(p.marketingConsent).toBe(false);
    expect(p.marketingConsentAt).toBeNull();
    expect(p.privacyPolicyVersion).toBeNull();
    expect(p.externalId).toBeNull();
  });

  it('reinscrição gera o evento webinar.registration.updated com o mesmo contrato', async () => {
    await register(app, { name: 'Ana', email: 'ana@exemplo.com' });
    await register(app, { name: 'Ana Souza', email: 'ana@exemplo.com' });
    const evs = await eventos();
    expect(evs.map((e) => e.eventName)).toEqual([
      'webinar.registration.created',
      'webinar.registration.updated',
    ]);
    const p = evs[1].payload as Record<string, unknown>;
    expect(Object.keys(p).sort()).toEqual(CAMPOS_DO_PAYLOAD_V1);
    expect(p.event).toBe('webinar.registration.updated');
    expect(p.name).toBe('Ana Souza');
  });

  it('sem n8n configurado o evento fica "skipped" (não será reenviado em massa depois)', async () => {
    await register(app, { name: 'Ana', email: 'ana@exemplo.com' });
    expect((await eventos())[0].status).toBe('skipped');
  });

  it('com n8n configurado o evento nasce "pending" para o worker entregar', async () => {
    vi.stubEnv('N8N_WEBHOOK_URL', 'https://n8n.teste/webhook/x');
    vi.stubEnv('N8N_WEBHOOK_TOKEN', 'token-de-teste');
    await register(app, { name: 'Ana', email: 'ana@exemplo.com' });
    expect((await eventos())[0].status).toBe('pending');
  });
});
