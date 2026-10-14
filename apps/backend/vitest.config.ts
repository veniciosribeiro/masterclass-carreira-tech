import { defineConfig } from 'vitest/config';

// Os testes usam um Postgres de verdade (TEST_DATABASE_URL ou DATABASE_URL) e
// compartilham o mesmo banco, então os arquivos rodam um de cada vez.
export default defineConfig({
  test: {
    include: ['tests/**/*.test.ts'],
    environment: 'node',
    fileParallelism: false,
    testTimeout: 20_000,
    hookTimeout: 30_000,
    env: {
      NODE_ENV: 'test',
      JWT_SECRET: 'segredo-de-teste',
      ADMIN_USER: 'admin',
      ADMIN_PASS: 'admin-teste',
    },
  },
});
