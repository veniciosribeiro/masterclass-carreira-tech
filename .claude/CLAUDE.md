# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

npm-workspaces monorepo (`apps/*`) for the "Test-Drive da Carreira Tech" masterclass: a **React SPA frontend** (`apps/frontend`) and a **Fastify API backend** (`apps/backend`). The frontend is served by Nginx in production; the backend is a standalone Node.js server. Database is PostgreSQL, accessed only through the backend via **Prisma ORM**. Auth is JWT-based for the public test flow (email whitelist → token) and HTTP Basic for the admin area. UI language is Brazilian Portuguese.

Note: `AGENTS.md` at the repo root and `README.md` describe an older single-package layout (root-level frontend + `api/`) that predates the `apps/*` workspace migration — trust this file and the actual directory structure over those.

## High-Level Architecture

### System Components

- **Frontend (`apps/frontend`)**: React 19 SPA using Vite 6, Tailwind CSS v4, React Router DOM v7 — multiple landing page variants, the aptitude test flow, and an admin dashboard
- **Backend (`apps/backend`)**: Fastify API with TypeBox validation, Prisma ORM, JWT + Basic auth, transactional email (nodemailer), n8n webhook delivery worker
- **Database**: PostgreSQL, schema in `apps/backend/prisma/schema.prisma`
- **Infra**: Docker Compose for local/prod, Nginx for production frontend serving + reverse proxy to the backend

### Data Flow (aptitude test)

```
User Input (email) → Whitelist validation → JWT token → Test session creation
  → Answer collection (autosaved) → Score calculation → TestResult persisted
  → Email delivery (async) → PDF report generation (client jsPDF + server pdfGenerator)
```

### Authentication Flows

**Public test flow (JWT):**

1. User submits email on landing page / `WelcomeScreen`
2. Backend validates against `authorized_emails` table
3. JWT issued with email (`sub`) and name in payload, stored in `localStorage` (`auth_token`)
4. All subsequent test/session/result API calls send `Authorization: Bearer <token>`
5. Session/result routes verify JWT email matches resource owner

**Admin area (HTTP Basic):**

- `basicAuth` plugin (`apps/backend/src/plugins/basicAuth.ts`) decorates `app.basicAuth`; routes under `/api/admin` check credentials against `ADMIN_USER`/`ADMIN_PASS` env vars on every request (no session/token issued)

### Webinar lead flow

`WebinarRegistration` rows fan out to `WebinarRegistrationEvent` rows (status/attempts/`nextAttemptAt`), delivered to an external n8n webhook by a polling worker (`startN8nDeliveryWorker` in `services/n8nWebhook.ts`, started from `server.ts`) with exponential backoff retry. Configured via `N8N_WEBHOOK_URL` / `N8N_WEBHOOK_TOKEN` (worker is a no-op if unset — check with `isN8nConfigured()`).

## Common Commands

Run workspace-wide commands from the repo root; they fan out to both `apps/*` via `npm run <script> --workspaces`. Or `cd apps/frontend` / `cd apps/backend` to run a single package's script directly (or `npm run <script> -w @techcareer/frontend` / `-w @techcareer/backend` from the root).

### Root (monorepo-wide)

```bash
npm run build          # Build both apps
npm run lint           # Lint both apps
npm run format         # Prettier --write both apps
npm run format:check   # Prettier --check both apps
npm run test           # Run both apps' test script
npm run typecheck      # Type-check both apps
```

### Frontend (`apps/frontend`)

```bash
npm run dev            # Vite dev server on :3000 (proxies /api → :4000)
npm run build           # Production build → dist/
npm run preview         # Preview production build
npm run typecheck        # tsc --noEmit
npm run lint / lint:fix  # ESLint
```

### Backend (`apps/backend`)

```bash
npm run dev               # tsx watch src/server.ts, hot-reload, :4000
npm run build              # Compile TypeScript via tsc → dist/
npm run build:bundle       # esbuild bundle (esbuild.config.cjs)
npm run start               # Run compiled JS (node dist/server.js)
npm run typecheck            # tsc --noEmit --project tsconfig.eslint.json
npm run prisma:generate      # Generate Prisma client from schema
npm run prisma:migrate       # Run Prisma migrations (prisma migrate dev)
npm run prisma:deploy        # generate + migrate deploy + db seed (production)
npm run prisma:studio        # Open Prisma Studio GUI
```

### Docker (full stack)

```bash
docker compose --env-file .env.docker up --build   # postgres + backend + frontend
```

Individual compose files also exist for partial stacks: `docker-compose.backend.yml`, `docker-compose.frontend.yml`, `docker-compose-supabase.yml`.

### Setup

```bash
npm install                       # installs both workspaces
npm run prisma:generate -w @techcareer/backend
npm run prisma:migrate -w @techcareer/backend
```

## Code Structure

```
apps/frontend/src/
  components/               # React components (PascalCase .tsx)
    v2/                     #   Landing page V2 variant
    bussola/                #   "Bússola" landing page variant
    semente/                #   Webinar landing page + thank-you page
    admin/                  #   Admin dashboard (results list, detail view)
    analytics/              #   Analytics/tracking components
    seo/                    #   SEO/meta components
    test/                   #   Test flow (AptitudeTest, WelcomeScreen, QuestionStepper, …)
    icons/
  services/                 # apiClient.ts (fetch wrapper + ApiError), testService.ts
  test/                     # Business logic: questions, scoring, profileLabels, explanations, testTypes
  utils/                    # metaPixel.ts, scroll.ts

apps/backend/src/
  server.ts                 # Entry point — registers plugins, routes, starts n8n worker
  plugins/                  # prisma.ts, jwt.ts, basicAuth.ts — all fastify-plugin (fp) wrapped
  hooks/                    # auth.ts — JWT `authenticate` preHandler
  routes/                   # auth, sessions, results, email, admin, public, health, webinar
  schemas/                  # TypeBox schemas, one file per route group
  services/                 # email.ts, pdfGenerator.ts, resultService.ts, n8nWebhook.ts
  common/                   # questions.ts, testTypes.ts — mirrors frontend /test business logic
  prisma/schema.prisma      # DB schema (PascalCase models)
  prisma/seed.ts            # Seed script (tsx in dev, compiled .cjs in prod via prisma.config.ts)

supabase/init.sql           # DB init script (DDL + seed data), for Supabase-hosted Postgres
```

Note: test business logic (questions, scoring types) is duplicated between `apps/frontend/src/test/` and `apps/backend/src/common/` rather than shared via a package — keep both in sync when changing question content or scoring types.

## Critical Implementation Details

### Module System

Both packages use ESM (`"type": "module"`):

- **Frontend**: `moduleResolution: "bundler"` — **no file extensions** on relative imports
- **Backend**: `moduleResolution: "NodeNext"` — **always use `.js` extensions** on relative imports (`from './plugins/jwt.js'`)

### TypeBox + Fastify Pattern

TypeBox schemas define both runtime validation and static types:

```ts
export const FooBody = Type.Object({ bar: Type.String() });
export type FooBodyType = Static<typeof FooBody>;

app.post<{ Body: FooBodyType; Params: BarType }>('/foo', {
  schema: { body: FooBody }
}, async (request, reply) => { ... })
```

### Vite Configuration

- Path alias: `@/*` maps to `apps/frontend/src/*` (not the package root)
- Dev proxy: `/api` → `http://localhost:4000`
- Build: `cssCodeSplit` enabled, manual vendor chunk for `react`/`react-dom`

### Environment Variables

- **Frontend**: prefix with `VITE_`, access via `import.meta.env.VITE_*` (notably `VITE_API_URL`, baked in at build time for Docker)
- **Backend**: access via `process.env.*`, import `'dotenv/config'` at top of `server.ts`. Key vars: `DATABASE_URL`, `JWT_SECRET`, `PORT`/`HOST`, `CORS_ORIGIN`, `ADMIN_USER`/`ADMIN_PASS`, `SMTP_HOST`/`SMTP_PORT`/`SMTP_USER`/`SMTP_PASS`/`SMTP_FROM`, `N8N_WEBHOOK_URL`/`N8N_WEBHOOK_TOKEN`/`N8N_TIMEOUT_MS`/`N8N_MAX_RETRIES`/`N8N_RETRY_BASE_DELAY_MS`
- Required files: `.env.local` (frontend dev), `apps/backend/.env` (backend dev), `.env.docker` (docker-compose)

## Error Handling Patterns

**Backend routes** — return explicit HTTP codes with structured JSON:

```ts
return reply.code(404).send({ error: 'not_found' });
return reply
  .code(401)
  .send({ error: 'unauthorized', message: 'Token inválido ou ausente' });
```

**Frontend services** — try/catch with fallback, log via `console.error`:

```ts
try { ... } catch (err) { console.error('context:', err); return null; }
```

**Fire-and-forget** — `.catch(console.error)`:

```ts
saveProgress(sessionId, answers, idx).catch(console.error);
```

**apiClient.ts** — `apiFetch<T>()` throws custom `ApiError` (extends `Error`, has a `status` property) on non-OK responses; auto-injects `Authorization: Bearer <token>` from `localStorage` when present.

## Naming Conventions

| Type                | Convention          | Example                 |
| ------------------- | ------------------- | ----------------------- |
| React components    | PascalCase `.tsx`   | `WelcomeScreen.tsx`     |
| Services/utils      | camelCase `.ts`     | `apiClient.ts`          |
| Backend files       | lowercase `.ts`     | `server.ts`, `auth.ts`  |
| Variables/functions | camelCase           | `handleSubmit`          |
| Constants           | UPPER_SNAKE_CASE    | `HYBRID_THRESHOLD`      |
| TypeBox schemas     | PascalCase noun     | `ValidateEmailBody`     |
| TypeBox types       | Schema + `Type`     | `ValidateEmailBodyType` |
| Prisma models       | PascalCase singular | `AuthorizedEmail`       |
| DB tables           | snake_case plural   | `authorized_emails`     |
| DB columns          | snake_case          | `user_email`            |

## Formatting Standards (`.prettierrc`)

- **Semicolons**: always
- **Quotes**: single
- **Indentation**: 2 spaces
- **Trailing commas**: all (multiline)
- **Print width**: 80
- **Arrow params**: always parenthesized — `(x) =>` not `x =>`
- Enforced via `lint-staged` on pre-commit (Husky): ESLint `--fix` + Prettier `--write` on staged `.{js,jsx,ts,tsx}`, Prettier only on `.{json,md,yml,yaml,css,html}`

Import order:

1. Side-effect imports (`import 'dotenv/config'`)
2. React / React DOM
3. Third-party libraries
4. Local modules (components, services, utils)
5. Types (use `import type` for type-only imports)

## TypeScript Settings

- **Backend**: `"strict": true` enabled
- **Frontend**: non-strict (faster builds, less boilerplate)
- Use `interface` for React props; `type` for unions/complex types
- Fastify type augmentation via `declare module 'fastify'` in plugin files

## React Patterns

- Functional components only (`React.FC<Props>`)
- Props interface declared immediately above component
- `React.lazy()` for code splitting with named-export adapter:
  ```ts
  React.lazy(() => import('./Foo').then((m) => ({ default: m.Foo })));
  ```
- Routing via React Router DOM v7
- Styling via Tailwind CSS v4 utility classes (no CSS modules/styled-components)

## Fastify Architecture

- **Plugins**: wrapped with `fastify-plugin` (fp), use `declare module` for type augmentation (`plugins/prisma.ts`, `plugins/jwt.ts`, `plugins/basicAuth.ts`)
- **Routes**: export `async function fooRoutes(app: FastifyInstance)`
- **Registration**: `await app.register(routes, { prefix: '/api/...' })` in `server.ts`
- **JWT auth**: `request.user.sub` (email), `request.user.name`; enforced via the `authenticate` preHandler in `hooks/auth.ts`
- **Admin auth**: `app.basicAuth` preHandler on `/api/admin` routes, checked against `ADMIN_USER`/`ADMIN_PASS`
- **Validation**: all session/result routes verify JWT email matches resource owner

## Test Details

The aptitude test evaluates 3 pillars to determine 1 of 7 tech profiles:

1. **Áreas Técnicas (70%)**: Front, Back, Dados/IA
2. **Comportamental (30%)**: Resiliência, Lógica, Proatividade

Business logic (questions, scoring) lives in `apps/frontend/src/test/` (frontend) and is mirrored in `apps/backend/src/common/` (backend) — no shared package, keep both in sync manually.

Vitest and Supertest are present as backend devDependencies but no test files exist yet; both packages' `test` script is currently a placeholder (`echo 'No tests yet'`). If adding tests, use Vitest.

## Database

**Models** (`apps/backend/prisma/schema.prisma`): `AuthorizedEmail`, `TestSession`, `TestResult`, `WebinarRegistration`, `WebinarRegistrationEvent`

- Tables: `authorized_emails`, `test_sessions`, `test_results`, `webinar_registrations`, `webinar_registration_events`
- All database access via Prisma in the backend only
- Seed script: `apps/backend/prisma/seed.ts` (run via `prisma:migrate`/`prisma:deploy`); `supabase/init.sql` covers a Supabase-hosted alternative
- Prisma config lives in `apps/backend/prisma.config.ts` (not the legacy `package.json#prisma` field)

## Key Technologies

- **Frontend**: React 19, TypeScript 5.8, Vite 6, Tailwind CSS v4, React Router DOM v7, jsPDF
- **Backend**: Fastify 5.3, TypeBox 0.34, Prisma 7.x (`@prisma/adapter-pg`), `@fastify/jwt`, `@fastify/cors`, `@fastify/sensible`, nodemailer, jsPDF (server-side report generation)
- **Database**: PostgreSQL
- **DevOps**: Docker, Docker Compose, Nginx

## Authentication

Access to the aptitude test is controlled by an **email whitelist**:

1. User enters email
2. Backend validates against `authorized_emails` table
3. If authorized, JWT generated

**To authorize emails**: use `npm run prisma:studio -w @techcareer/backend` or insert directly into the database.

The `/admin` area (results dashboard) uses **HTTP Basic auth** against `ADMIN_USER`/`ADMIN_PASS` env vars instead — unrelated to the JWT whitelist flow.

## Site Structure & Styling

### Landing Pages / Routes

Several landing page variants exist under different routes, plus the test flow and an admin dashboard:

```
/                                                         → LandingPage (V1)
/v2                                                       → LandingPageV2
/bussola-aceleracao-de-carreira-para-desenvolvedores      → LandingPageBussola
/webinario-carreira-tech                                  → LandingPageSemente
/webinario-carreira-tech/obrigado                         → ObrigadoSemente (thank-you page)
/teste                                                    → AptitudeTest (WelcomeScreen)
/teste/:sessionId                                         → AptitudeTest (resume)
/teste/:sessionId/:step                                   → AptitudeTest (specific step)
/admin                                                    → AdminDashboard (Basic auth)
/admin/resultado/:id                                      → AdminResultDetail (Basic auth)
```

- **V1** (`/`): sections Hero, RealityCheck, ProtocolOverview, Syllabus, Pricing, Authority, Guarantee, FAQ, Footer
- **V2** (`/v2`): sections HeroV2, DiagnosisV2, MindsetShiftV2, MethodologyV2, AuthorityV2, OfferV2, FinalCTA_V2, Guarantee, FAQ, Footer
- Guarantee, FAQ, Footer are shared across variants

### Design System (Dark Theme)

**Tailwind CSS v4** with custom tokens:

- **Primary**: `#19e65e` (green accent)
- **Background Dark**: `#0D1117` (main background)
- **Surface Dark**: `#161B22` (cards/sections)
- **Border Dark**: `#30363D` (dividers/borders)
- **Text Main**: `#C9D1D9` (body text)
- **Text Header**: `#FFFFFF` (headers)
- **Glow Purple**: `#7c3aed` (glow effects)

**Typography**:

- **Font Display**: Inter (weights: 400, 500, 700, 900) — self-hosted via `@font-face`
- **Font Mono**: ui-monospace/SFMono-Regular
- **Base Size**: 14px

**Visual Effects**:

- `shadow-glow`: purple glow effect (`0 0 40px -10px rgba(124, 58, 237, 0.5)`)
- Animations: `slideInRight`, `slideInLeft` keyframes
- **Anti-aliasing**: `antialiased` class on body
- **Overflow**: `overflow-x-hidden` on main containers

### Component Architecture

**Landing page sections** are modular components:

- **Above-fold**: Header, Hero (loaded immediately)
- **Below-fold**: lazy-loaded with `React.lazy()` and `Suspense`

**Test flow components** (in `components/test/`):

- `WelcomeScreen` → email input + JWT auth
- `AptitudeTest` → main test container with stepper
- `QuestionStepper` → progress indicator
- `MultipleChoiceQuestion` / `OrderingQuestion` → question types
- `ResultsScreen` → results display + PDF generation

### Styling Conventions

- **Dark theme mandatory**: all pages use `bg-background-dark` and `text-text-main`
- **Font family**: always apply `font-display` class
- **Animations**: use Tailwind animation utilities or defined keyframes
- **Responsive**: mobile-first approach with Tailwind breakpoints
- **No CSS Modules**: pure Tailwind utility classes only

## Development Tips

- Backend uses hot-reload via `tsx watch` for instant changes
- Frontend proxies API calls to avoid CORS during dev
- Type-check frontend: `npm run typecheck -w @techcareer/frontend`
- Type-check backend: `npm run typecheck -w @techcareer/backend`
- View/edit database: `npm run prisma:studio -w @techcareer/backend`
