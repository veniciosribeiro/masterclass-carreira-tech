# Architecture

## Overview
Monorepo-style structure housing a React SPA frontend and a Fastify-based backend.
Production deployment uses Nginx to serve static frontend assets and reverse-proxy `/api` requests to the backend container.

## Frontend
- **SPA**: Client-side routing via React Router DOM.
- **Component-Based**: Functional components with hooks.
- **State Management**: Local state (useState) and potentially context/props drilling. No global store (Redux/Zustand) identified.
- **Data Fetching**: `fetch` API directly (see `services/apiClient.ts`).

## Backend (`api/`)
- **Fastify Service**:
  - `server.ts`: Entry point, registers plugins and routes.
  - **Plugins**: Encapsulated logic (`jwtPlugin`, `prismaPlugin`) using `fastify-plugin`.
  - **Routes**: Grouped by resource (`auth`, `sessions`, `results`).
  - **Validation**: Strict schema validation using TypeBox (`src/schemas/`) for request/response payloads.
  - **Error Handling**: Uses `@fastify/sensible` and returns standardized error objects.

## Data Layer
- **ORM**: Prisma manages database interactions.
- **Schema**: Defined in `api/prisma/schema.prisma`.
- **Database**: PostgreSQL handles persistence.
- **Access**: Backend only. Frontend never talks to DB directly.

## Deployment Architecture
- **Docker Compose**: Orchestrates `frontend`, `backend`, `db` services.
- **Nginx**: Handles routing in production.
- **CORS**: Configured in backend to allow requests from frontend domain (or localhost in dev).
