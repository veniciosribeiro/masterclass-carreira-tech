# Technology Stack

## Core Runtime
- **Frontend**: React 19 (SPA)
- **Backend**: Node.js (v22+)
- **Database**: PostgreSQL
- **Language**: TypeScript v5.8 (Strict mode in backend)

## Frontend (`/`)
- **Build Tool**: Vite v6
- **Routing**: React Router DOM v7
- **Styling**: Tailwind CSS v4
- **State Management**: React Context / Props (no external library visible)
- **PDF Generation**: jsPDF
- **Fonts**: Inter (self-hosted)

## Backend (`api/`)
- **Server**: Fastify v5.3
- **ORM**: Prisma v6.9
- **Validation**: TypeBox v0.34
- **Auth**: `@fastify/jwt` (JWT based)
- **Utilities**:
  - `fastify-plugin`: Plugin encapsulation
  - `@fastify/sensible`: HTTP error handling
  - `@fastify/cors`: CORS support
  - `dotenv`: Env var management

## Development & DevOps
- **Containerization**: Docker, Docker Compose
- **Production Server**: Nginx (serving static frontend + reverse proxy to API)
- **Linting/Formatting**: None explicitly configured in package.json (relying on IDE/default?)
