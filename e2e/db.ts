import pg from 'pg';

// Trava de segurança: o E2E apaga as tabelas do webinário. Só roda num banco
// cujo nome tenha "test" ou "e2e".
function databaseUrl(): string {
  const url = process.env.E2E_DATABASE_URL ?? '';
  const dbName = url.split('?')[0].split('/').pop() ?? '';
  if (!url || !/test|e2e/i.test(dbName)) {
    throw new Error(
      'Defina E2E_DATABASE_URL apontando para um banco com "test" ou "e2e" no nome.',
    );
  }
  return url;
}

export async function query<T = Record<string, unknown>>(
  sql: string,
  params: unknown[] = [],
): Promise<T[]> {
  const client = new pg.Client({ connectionString: databaseUrl() });
  await client.connect();
  try {
    const result = await client.query(sql, params);
    return result.rows as T[];
  } finally {
    await client.end();
  }
}

export async function resetWebinar(): Promise<void> {
  await query(
    'TRUNCATE TABLE webinar_registration_events, webinar_registrations CASCADE',
  );
}
