import { afterAll, beforeAll, beforeEach, describe, expect, it } from 'vitest';
import type { FastifyInstance } from 'fastify';
import { makeApp, register, resetWebinarTables } from './helpers.js';

describe('POST /api/webinar/register', () => {
  let app: FastifyInstance;
  beforeAll(async () => {
    app = await makeApp();
  });
  beforeEach(async () => {
    await resetWebinarTables(app);
  });
  afterAll(async () => {
    await app.close();
  });

  const rows = () => app.prisma.webinarRegistration.findMany();
  const eventNames = async () =>
    (
      await app.prisma.webinarRegistrationEvent.findMany({
        orderBy: { createdAt: 'asc' },
      })
    ).map((e) => e.eventName);

  describe('inscrição', () => {
    it('cria a inscrição e responde 201', async () => {
      const res = await register(app, {
        name: 'Maria Silva',
        email: 'maria@exemplo.com',
      });
      expect(res.statusCode).toBe(201);
      expect(res.json()).toEqual({ registered: true });
      expect(await rows()).toHaveLength(1);
      expect(await eventNames()).toEqual(['webinar.registration.created']);
    });

    it('guarda o e-mail em minúsculas e apara o nome', async () => {
      await register(app, {
        name: '  Maria Silva  ',
        email: 'Maria@Exemplo.COM',
      });
      const [row] = await rows();
      expect(row.email).toBe('maria@exemplo.com');
      expect(row.name).toBe('Maria Silva');
    });

    it('e-mail com espaços nas pontas é recusado (o formulário já apara antes de enviar)', async () => {
      const res = await register(app, {
        name: 'Maria',
        email: '  maria@exemplo.com ',
      });
      expect(res.statusCode).toBe(400);
      expect(await rows()).toHaveLength(0);
    });

    it('mesmo e-mail de novo atualiza a inscrição, não duplica', async () => {
      await register(app, { name: 'Maria', email: 'maria@exemplo.com' });
      await register(app, { name: 'Maria Silva', email: 'MARIA@exemplo.com' });
      const all = await rows();
      expect(all).toHaveLength(1);
      expect(all[0].name).toBe('Maria Silva');
      expect(await eventNames()).toEqual([
        'webinar.registration.created',
        'webinar.registration.updated',
      ]);
    });
  });

  describe('external_id', () => {
    it('guarda o external_id enviado pelo navegador', async () => {
      await register(app, {
        name: 'Ana',
        email: 'ana@exemplo.com',
        externalId: 'ext-1',
      });
      expect((await rows())[0].externalId).toBe('ext-1');
    });

    it('não apaga o external_id quando a chamada seguinte não o traz', async () => {
      await register(app, {
        name: 'Ana',
        email: 'ana@exemplo.com',
        externalId: 'ext-1',
      });
      await register(app, { name: 'Ana', email: 'ana@exemplo.com' });
      expect((await rows())[0].externalId).toBe('ext-1');
    });

    it('troca o external_id quando chega um novo', async () => {
      await register(app, {
        name: 'Ana',
        email: 'ana@exemplo.com',
        externalId: 'ext-1',
      });
      await register(app, {
        name: 'Ana',
        email: 'ana@exemplo.com',
        externalId: 'ext-2',
      });
      expect((await rows())[0].externalId).toBe('ext-2');
    });
  });

  describe('aceite da Política de Privacidade', () => {
    it('sem os campos de aceite (página antiga em cache) inscreve com aceite = false', async () => {
      const res = await register(app, {
        name: 'Antigo',
        email: 'antigo@exemplo.com',
      });
      expect(res.statusCode).toBe(201);
      const [row] = await rows();
      expect(row.marketingConsent).toBe(false);
      expect(row.marketingConsentAt).toBeNull();
      expect(row.privacyPolicyVersion).toBeNull();
    });

    it('com aceite grava true, a data e a versão da política', async () => {
      const antes = Date.now();
      await register(app, {
        name: 'Novo',
        email: 'novo@exemplo.com',
        marketingConsent: true,
        privacyPolicyVersion: '2026-10-14',
      });
      const [row] = await rows();
      expect(row.marketingConsent).toBe(true);
      expect(row.privacyPolicyVersion).toBe('2026-10-14');
      expect(row.marketingConsentAt!.getTime()).toBeGreaterThanOrEqual(
        antes - 1000,
      );
    });

    it('nova inscrição sem a caixa não revoga o aceite anterior', async () => {
      await register(app, {
        name: 'Novo',
        email: 'novo@exemplo.com',
        marketingConsent: true,
        privacyPolicyVersion: '2026-10-14',
      });
      await register(app, { name: 'Novo', email: 'novo@exemplo.com' });
      await register(app, {
        name: 'Novo',
        email: 'novo@exemplo.com',
        marketingConsent: false,
      });
      const [row] = await rows();
      expect(row.marketingConsent).toBe(true);
      expect(row.privacyPolicyVersion).toBe('2026-10-14');
    });
  });

  describe('validação do corpo', () => {
    const invalidos: [string, Record<string, unknown>][] = [
      ['sem nome', { email: 'a@exemplo.com' }],
      ['nome vazio', { name: '', email: 'a@exemplo.com' }],
      ['sem e-mail', { name: 'Ana' }],
      ['e-mail inválido', { name: 'Ana', email: 'nao-e-email' }],
      [
        'versão da política com mais de 32 caracteres',
        {
          name: 'Ana',
          email: 'a@exemplo.com',
          marketingConsent: true,
          privacyPolicyVersion: 'v'.repeat(33),
        },
      ],
      [
        'versão da política vazia',
        {
          name: 'Ana',
          email: 'a@exemplo.com',
          marketingConsent: true,
          privacyPolicyVersion: '',
        },
      ],
      [
        'external_id vazio',
        { name: 'Ana', email: 'a@exemplo.com', externalId: '' },
      ],
    ];

    it.each(invalidos)('recusa com 400: %s', async (_nome, corpo) => {
      const res = await register(app, corpo);
      expect(res.statusCode).toBe(400);
      expect(await rows()).toHaveLength(0);
    });
  });
});
