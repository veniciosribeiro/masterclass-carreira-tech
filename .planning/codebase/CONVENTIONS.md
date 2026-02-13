# Coding Conventions

## General

- **Project Type**: Monorepo-ish structure (Frontend + Backend within the same repo).
- **Language**: TypeScript throughout.
- **Strict Mode**: Enabled in backend TypeScript config.
- **Linting**: None explicitly configured (relying on IDE/default).

## Frontend (React)

- **Component Naming**: PascalCase for files and components (`WelcomeScreen.tsx`).
- **State**: Prefer `useState` over heavy libs unless necessary.
- **Styling**: **Tailwind CSS v4** strictly. No external CSS files except `index.css`.
- **Imports**: Non-default exports encouraged where possible, but `App.tsx` exports default.
- **Routing**: Client-side handled by `react-router-dom`.
- **Naming**: `index.tsx` entry point, `App.tsx` root component.

## Backend (Fastify)

- **Framework**: Fastify with asynchronous plugin registration (`await app.register(fastifyPlugin)`).
- **Exports**: Named exports for plugins and routes.
- **Validation**: Strict use of **TypeBox** (`@sinclair/typebox`) schemas.
- **Error Handling**: Uses `@fastify/sensible` and standard HTTP status codes.
- **Database Access**: **Prisma** only. No raw SQL (except migrations/seed).

## Database

- **Schema**: Defined in `api/prisma/schema.prisma`.
- **Migrations**: Uses `prisma migrate` workflow.
- **Seeding**: `supbabase/init.sql` (implying Supabase or pure Postgres usage).

## Environment Variables

- `DATABASE_URL`: Connection string for PostgreSQL.
- `JWT_SECRET`: Secret key for JWT signing.
- `CORS_ORIGIN`: Allowed origin for CORS.
- `PORT`/`HOST`: Server configuration.
- `VITE_*`: Frontend environment variables.
