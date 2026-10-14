import { defineConfig } from '@playwright/test';

// E2E das páginas do webinário e da Bússola. Sobe o backend e o preview do
// frontend (compilado com a API local) e fala com um Postgres de teste.
// Rodar: E2E_DATABASE_URL=postgresql://postgres:test@127.0.0.1:5432/techcareer_e2e npm run e2e
const DATABASE_URL = process.env.E2E_DATABASE_URL ?? '';
const API_PORT = 4100;
const WEB_PORT = 3100;

export default defineConfig({
  testDir: './e2e',
  fullyParallel: false,
  workers: 1,
  retries: process.env.CI ? 1 : 0,
  reporter: process.env.CI
    ? [['list'], ['html', { open: 'never' }]]
    : [['list']],
  use: {
    baseURL: `http://127.0.0.1:${WEB_PORT}`,
    trace: 'retain-on-failure',
    screenshot: 'only-on-failure',
  },
  projects: [{ name: 'chromium', use: { browserName: 'chromium' } }],
  webServer: [
    {
      command: 'node apps/backend/dist/server.js',
      url: `http://127.0.0.1:${API_PORT}/health`,
      reuseExistingServer: !process.env.CI,
      timeout: 60_000,
      env: {
        DATABASE_URL,
        JWT_SECRET: 'segredo-e2e',
        ADMIN_USER: 'admin',
        ADMIN_PASS: 'admin-e2e',
        PORT: String(API_PORT),
        HOST: '127.0.0.1',
        NODE_ENV: 'production',
      },
    },
    {
      command: `npm run preview -w @techcareer/frontend -- --host 127.0.0.1 --port ${WEB_PORT} --strictPort`,
      url: `http://127.0.0.1:${WEB_PORT}/webinario-carreira-tech`,
      reuseExistingServer: !process.env.CI,
      timeout: 60_000,
    },
  ],
});
