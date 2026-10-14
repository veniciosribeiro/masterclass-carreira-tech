import path from 'node:path';
import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

// Config própria dos testes: sem os plugins de build do vite.config.ts
// (HTML por rota, Tailwind), só React e o alias "@".
export default defineConfig({
  plugins: [react()],
  resolve: { alias: { '@': path.resolve(__dirname, './src') } },
  test: {
    environment: 'jsdom',
    include: ['tests/**/*.test.{ts,tsx}'],
    setupFiles: ['tests/setup.ts'],
    css: false,
    restoreMocks: true,
    mockReset: true,
  },
});
