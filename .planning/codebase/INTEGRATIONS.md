# Integrations

## External Services

- **Database**: PostgreSQL (via Prisma ORM in `api/`)
  - Connection string via `DATABASE_URL`
- **Frontend API**: Internal API Backend (`/api`)
  - Proxied in dev via Vite (`vite.config.ts`)
  - Served via Nginx in production

## API Integrations

- No third-party API integrations (e.g. Stripe, SendGrid) found in current scan.
- Authentication is purely internal (whitelist-based, JWT issuance).

## Data Flow

1. **User input** -> Frontend (`/`)
2. **API Request** -> Backend (`/api/sessions`, `/api/results`)
3. **Validation** -> TypeBox schema check
4. **Database** -> Prisma query against PostgreSQL
5. **Response** -> JSON to Frontend
6. **PDF Generation** -> Client-side (`jspdf`) using data from API response.
