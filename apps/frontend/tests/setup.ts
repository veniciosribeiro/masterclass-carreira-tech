import '@testing-library/jest-dom/vitest';
import { cleanup } from '@testing-library/react';
import { afterEach } from 'vitest';

afterEach(() => {
  cleanup();
  // O teste de pré-render roda em ambiente node, sem sessionStorage.
  if (typeof sessionStorage !== 'undefined') sessionStorage.clear();
});
