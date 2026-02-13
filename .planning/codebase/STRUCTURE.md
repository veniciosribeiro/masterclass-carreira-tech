# Directory Structure

## Root (Frontend)
- `App.tsx`: Main application component, likely routing entry.
- `index.tsx`: Main entry point (CreateRoot, ReactDOM).
- `index.html`: Main HTML template.
- `index.css`: Global styles (if any) or imports.
- `vite.config.ts`: Vite configuration (proxy setting).
- `tailwind.config.js`: Tailwind configuration.
- `package.json`: Frontend dependencies.

## `/api` (Backend)
- `src/`:
  - `server.ts`: Bootstrap file.
  - `routes/`: Express-like routes (`auth.ts`, `sessions.ts`, `results.ts`).
  - `plugins/`: Core logic (`jwt.ts`, `prisma.ts`).
  - `schemas/`: TypeBox definitions.
- `prisma/`:
  - `schema.prisma`: Database schema.
- `package.json`: Backend dependencies.

## Components (`/components`)
- Functional React components
- PascalCase files (e.g. `QuestionStepper.tsx`)
- Contains test-specific components in `test/` subdirectory (e.g. `WelcomeScreen.tsx`, `ResultsScreen.tsx`)

## Services (`/services`)
- `apiClient.ts`: Axios or fetch wrapper for API calls.
- `testService.ts`: Test business logic facade.

## Test Logic (`/test`)
- Contains business logic related to the aptitude test (questions, scoring, types).
- NOT used for unit/integration tests (those would typically be in `__tests__` or `.test.ts`).

## Utils (`/utils`)
- Shared utility functions.
- `scroll.ts`: Common helper.

## Deployment
- `Dockerfile`: Multi-stage build for frontend/backend.
- `nginx.conf`: Nginx configuration.
- `docker-compose.yml`: Defines services (db, api, frontend).
- `.env.docker`, `.env.local`: Environment variables.
