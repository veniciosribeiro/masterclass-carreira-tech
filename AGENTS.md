# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Monorepo with a **React SPA frontend** (Vite + Tailwind v4) and a **Fastify API backend** (`api/`). The frontend is served by Nginx in production; the API is a standalone Node.js server. Database is PostgreSQL, accessed only through the backend via **Prisma ORM**. Authentication is JWT-based (email whitelist → token). UI language is Brazilian Portuguese.

## High-Level Architecture

### System Components
- **Frontend (/)**: React 19 SPA using Vite 6, Tailwind CSS v4, React Router DOM v7
- **Backend (api/)**: Fastify API with TypeBox validation, Prisma ORM, JWT authentication
- **Database**: PostgreSQL with schema in `api/prisma/schema.prisma`
- **Infra**: Docker Compose for local development, Nginx for production serving

### Data Flow
```
User Input (email) → Whitelist validation → JWT token → Test session creation → Answer collection → Score calculation → PDF report generation
```

### Authentication Flow
1. User submits email on landing page
2. Backend validates against `authorized_emails` table
3. JWT issued with email (`sub`) and name in payload
4. All subsequent API calls require valid JWT
5. Session/result routes verify JWT email matches resource owner

## Common Commands

### Frontend (root `/`)
```bash
npm run dev          # Start Vite dev server on :3000 (proxies /api → :4000)
npm run build        # Production build → dist/
npm run preview      # Preview production build
npx tsc --noEmit     # Type-check only (no emit)
```

### Backend (`api/`)
```bash
npm run dev              # Start with tsx watch on :4000 (hot-reload)
npm run build            # Compile TypeScript via tsc → dist/
npm run start            # Run compiled JS (node dist/server.js)
npm run prisma:generate  # Generate Prisma client from schema
npm run prisma:migrate   # Run Prisma migrations (prisma migrate dev)
npm run prisma:studio    # Open Prisma Studio GUI
```

### Docker (full stack)
```bash
docker compose --env-file .env.docker up --build   # postgres + api + frontend
```

### Setup
```bash
# Initial setup
npm install && cd api && npm install && cd ..
npm run prisma:generate -w api
npm run prisma:migrate -w api
```

## Code Structure

```
/                          # Frontend
  components/              #   React components (PascalCase .tsx)
    test/                  #     Test flow (AptitudeTest, WelcomeScreen)
  services/                #   API client + test service (camelCase .ts)
  test/                    #   Business logic (questions, scoring)
  utils/                   #   Shared utilities

api/                       # Backend
  src/server.ts            #   Entry point (registers plugins, routes)
  src/plugins/             #   Fastify plugins (prisma, jwt) - fp wrappers
  src/hooks/               #   Fastify hooks (auth)
  src/routes/              #   Route handlers (auth, sessions, results)
  src/schemas/             #   TypeBox validation schemas
  prisma/schema.prisma     #   Database schema (PascalCase models)

supabase/init.sql          # DB init script (DDL + seed data)
```

## Critical Implementation Details

### Module System
Both packages use ESM (`"type": "module"`):
- **Frontend**: `moduleResolution: "bundler"` — **No file extensions** on imports
- **Backend**: `moduleResolution: "NodeNext"` — **Always use `.js` extensions** on relative imports (`from './plugins/jwt.js'`)

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
- Path alias: `@/*` maps to project root
- Dev proxy: `/api` → `http://localhost:4000`
- Build: cssCodeSplit enabled, vendor chunk for react/react-dom

### Environment Variables
- **Frontend**: Prefix with `VITE_`, access via `import.meta.env.VITE_*`
- **Backend**: Access via `process.env.*`, import `'dotenv/config'` at top of `server.ts`
- Required files: `.env.local` (frontend dev), `api/.env` (backend dev), `.env.docker` (docker-compose)

## Error Handling Patterns

**Backend routes** — Return explicit HTTP codes with structured JSON:
```ts
return reply.code(404).send({ error: 'not_found' });
return reply.code(401).send({ error: 'unauthorized', message: 'Token inválido ou ausente' });
```

**Frontend services** — Try/catch with fallback, log via console.error:
```ts
try { ... } catch (err) { console.error('context:', err); return null; }
```

**Fire-and-forget** — `.catch(console.error)`:
```ts
saveProgress(sessionId, answers, idx).catch(console.error);
```

**apiClient.ts** — Throws custom `ApiError` (extends `Error`, has `status` property) on non-OK responses.

## Naming Conventions

| Type | Convention | Example |
|------|-----------|---------|
| React components | PascalCase `.tsx` | `WelcomeScreen.tsx` |
| Services/utils | camelCase `.ts` | `apiClient.ts` |
| Backend files | lowercase `.ts` | `server.ts`, `auth.ts` |
| Variables/functions | camelCase | `handleSubmit` |
| Constants | UPPER_SNAKE_CASE | `HYBRID_THRESHOLD` |
| TypeBox schemas | PascalCase noun | `ValidateEmailBody` |
| TypeBox types | Schema + `Type` | `ValidateEmailBodyType` |
| Prisma models | PascalCase singular | `AuthorizedEmail` |
| DB tables | snake_case plural | `authorized_emails` |
| DB columns | snake_case | `user_email` |

## Formatting Standards

- **Semicolons**: Always
- **Quotes**: Single quotes
- **Indentation**: 2 spaces
- **Trailing commas**: Yes (multiline)
- **Arrow params**: Always parenthesized — `(x) =>` not `x =>`

Import order:
1. Side-effect imports (`import 'dotenv/config'`)
2. React / React DOM
3. Third-party libraries
4. Local modules (components, services, utils)
5. Types (use `import type` for type-only imports)

## TypeScript Settings

- **Backend**: `"strict": true` enabled
- **Frontend**: Non-strict (faster builds, less boilerplate)
- Use `interface` for React props; `type` for unions/complex types
- Fastify type augmentation via `declare module 'fastify'` in plugin files

## React Patterns

- Functional components only (`React.FC<Props>`)
- Props interface declared immediately above component
- `React.lazy()` for code splitting with named-export adapter:
  ```ts
  React.lazy(() => import('./Foo').then((m) => ({ default: m.Foo })))
  ```
- Routing via React Router DOM v7
- Styling via Tailwind CSS v4 utility classes (no CSS modules/styled-components)

## Fastify Architecture

- **Plugins**: Wrapped with `fastify-plugin` (fp), use `declare module` for type augmentation
- **Routes**: Export `async function fooRoutes(app: FastifyInstance)`
- **Registration**: `await app.register(routes, { prefix: '/api/...' })`
- **Auth**: JWT user access via `request.user.sub` (email), `request.user.name`
- **Validation**: All session/result routes verify JWT email matches resource owner

## Test Details

The aptitude test evaluates 3 pillars to determine 1 of 7 tech profiles:
1. **Áreas Técnicas (70%)**: Front, Back, Dados/IA
2. **Comportamental (30%)**: Resiliência, Lógica, Proatividade

Business logic (questions, scoring) lives in `/test` directory — NOT test suites. **No test framework configured**. If adding tests, use Vitest (already using Vite).

## Database

**Models**: `AuthorizedEmail`, `TestSession`, `UserAnswer`
- Tables: `authorized_emails`, `test_sessions`, `user_answers`
- All database access via Prisma in backend only
- Seed data in `supabase/init.sql`

## Key Technologies

- **Frontend**: React 19, TypeScript 5.8, Vite 6, Tailwind CSS v4
- **Backend**: Fastify 5.3, TypeBox 0.34, Prisma 6.9, JWT
- **Database**: PostgreSQL
- **PDF**: jsPDF (client-side generation)
- **DevOps**: Docker, Docker Compose, Nginx

## Authentication

Access controlled by **email whitelist**:
1. User enters email
2. Backend validates against `authorized_emails` table
3. If authorized, JWT generated

**To authorize emails**: Use `npm run prisma:studio` in `api` folder or insert directly into database.

## Site Structure & Styling

### Landing Pages
Two versions available via routing:
- **V1** (`/`): Original landing page with sections: Hero, RealityCheck, ProtocolOverview, Syllabus, Pricing, Authority, Guarantee, FAQ, Footer
- **V2** (`/v2`): Redesigned version with sections: HeroV2, DiagnosisV2, MindsetShiftV2, MethodologyV2, AuthorityV2, OfferV2, FinalCTA_V2, Guarantee, FAQ, Footer

### App Routes
```
/                    → LandingPage (V1)
/v2                  → LandingPageV2
/teste               → AptitudeTest (WelcomeScreen)
/teste/:sessionId    → AptitudeTest (Resume test)
/teste/:sessionId/:step → AptitudeTest (Specific step)
```

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
- **Font Display**: Inter (weights: 400, 500, 700, 900) - self-hosted via `@font-face`
- **Font Mono**: ui-monospace/SFMono-Regular
- **Base Size**: 14px

**Visual Effects**:
- `shadow-glow`: Purple glow effect (`0 0 40px -10px rgba(124, 58, 237, 0.5)`)
- Animations: `slideInRight`, `slideInLeft` keyframes
- **Anti-aliasing**: `antialiased` class on body
- **Overflow**: `overflow-x-hidden` on main containers

### Component Architecture
**Landing page sections** are modular components:
- **Above-fold**: Header, Hero (loaded immediately)
- **Below-fold**: Lazy loaded with `React.lazy()` and `Suspense`
  - Guarantee, FAQ, Footer are shared between V1 and V2

**Test flow components** (in `/components/test/`):
- `WelcomeScreen` → email input + JWT auth
- `AptitudeTest` → main test container with stepper
- `QuestionStepper` → progress indicator
- `MultipleChoiceQuestion` / `OrderingQuestion` → question types
- `ResultsScreen` → results display + PDF generation

### Styling Conventions
- **Dark theme mandatory**: All pages use `bg-background-dark` and `text-text-main`
- **Font family**: Always apply `font-display` class
- **Animations**: Use Tailwind animation utilities or defined keyframes
- **Responsive**: Mobile-first approach with Tailwind breakpoints
- **No CSS Modules**: Pure Tailwind utility classes only

## Development Tips

- Backend uses hot-reload via `tsx watch` for instant changes
- Frontend proxies API calls to avoid CORS during dev
- Type-check frontend: `npx tsc --noEmit`
- Type-check backend: `cd api && npm run build`
- View/edit database: `npm run prisma:studio` (api folder)