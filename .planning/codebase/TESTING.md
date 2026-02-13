# Testing Strategy

## Current State

- **Unit Tests**:
  - No dedicated testing framework configured (e.g., Jest, Vitest) in `package.json` or `api/package.json`.
  - `test/` directory contains business logic for the aptitude test, not tests themselves.
- **Integration Tests**: None visible.
- **E2E Tests**: None visible.
- **Validation**: Relies on TypeBox for API schema validation.

## Manual Testing

- **Local Dev**: Run `npm run dev` (frontend) and `npm run dev` (backend/`api`).
- **Database**: `prisma studio` for data inspection.
- **API**: Manual curls or Postman likely used during dev.

## Recommendations

- **Add Tests**: Introduce Vitest (since Vite is used) for unit testing business logic in `test/`.
- **API Testing**: Introduce `supertest` or similar for integration testing Fastify routes.
- **E2E**: Consider Cypress or Playwright for critical user flows (test completion, PDF download).
