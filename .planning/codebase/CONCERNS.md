# Concerns & Technical Debt

## Architecture
- **Monorepo Structure**: Non-standard (frontend in root, backend in `api/`).
  - Potential confusion for new developers.
  - CI/CD pipelines need careful configuration.
- **Frontend Source**: Files scattered in root (`App.tsx`, `index.tsx`, `components/`, etc.) instead of standard `src/`.
- **Database Access**: Direct import of Prisma client inside routes (standard practice, but consider repository pattern if complexity grows).

## Security
- **Authentication**: Whitelist-based (email lookup).
  - No signup flow or user management beyond initial seed.
  - JWT secret handling in `.env` is critical.
  - No explicit rate limiting middleware found.
- **Data Protection**:
  - `AuthorizedEmail` table stores PII (email). Ensure encryption/hashing if necessary (though likely plain text for simple whitelist).
- **CORS**: Configured (`@fastify/cors`), but check `origin` settings in production config.

## Testing
- **Coverage**: **Zero automated tests**.
  - `test/` directory contains business logic, confusingly named.
  - No unit tests for scoring logic or API endpoints.
  - High risk of regression during refactors (e.g. adding new questions/profiles).
- **Reliance on Manual QA**: Manual testing required for every change.

## Maintainability
- **Type Safety**:
  - TypeBox schemas defined separately from Prisma models. Risk of drift if not synchronized manually or via generation tools.
- **API Client**: `apiClient.ts` likely manually typed. Consider generating client from TypeBox schemas or OpenAPI spec.
- **Documentation**: Limited to `README.md` and `api/README.md` (if exists). `CLAUDE.md` helps but is agent-focused.

## Performance
- **LCP**: Largest Contentful Paint issues mentioned in history.
- **Assets**: Large or unoptimized assets affecting load time.
- **PDF Generation**: Client-side (`jsPDF`). Can be heavy for large reports.
- **Database**: Single PostgreSQL instance. Scalability concern if traffic spikes.

## Dependencies
- **React 19**: Using latest major version. Ecosystem stability?
- **Vite 6**: Using latest major version.
- **Fastify 5**: Using latest major version.
- **Prisma 6**: Using latest major version.
- **Breaking Changes**: Keep an eye on rapid updates in these ecosystems.
