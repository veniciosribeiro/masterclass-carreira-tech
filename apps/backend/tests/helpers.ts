import type { FastifyInstance } from 'fastify';
import { buildApp } from '../src/app.js';

// Trava de segurança: os testes apagam as tabelas do webinário. Só rodam num
// banco cujo nome tenha "test", nunca em desenvolvimento ou produção.
function resolveTestDatabaseUrl(): string {
  const url = process.env.TEST_DATABASE_URL || process.env.DATABASE_URL || '';
  const dbName = url.split('?')[0].split('/').pop() ?? '';
  if (!url || !/test/i.test(dbName)) {
    throw new Error(
      'Testes de API só rodam num banco com "test" no nome. Defina ' +
        'TEST_DATABASE_URL (ex.: postgresql://postgres:test@127.0.0.1:5432/techcareer_test).',
    );
  }
  return url;
}

export async function makeApp(): Promise<FastifyInstance> {
  process.env.DATABASE_URL = resolveTestDatabaseUrl();
  // O n8n só entra em cena nos testes que o configuram de propósito.
  delete process.env.N8N_WEBHOOK_URL;
  delete process.env.N8N_WEBHOOK_TOKEN;
  const app = await buildApp({ logger: false });
  await app.ready();
  return app;
}

export async function resetWebinarTables(app: FastifyInstance): Promise<void> {
  await app.prisma.$executeRawUnsafe(
    'TRUNCATE TABLE webinar_registration_events, webinar_registrations CASCADE',
  );
}

export function register(
  app: FastifyInstance,
  payload: Record<string, unknown>,
) {
  return app.inject({
    method: 'POST',
    url: '/api/webinar/register',
    payload,
  });
}
