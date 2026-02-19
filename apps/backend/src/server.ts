import 'dotenv/config';
import Fastify from 'fastify';
import cors from '@fastify/cors';
import sensible from '@fastify/sensible';
import { jwtPlugin } from './plugins/jwt.js';
import { basicAuthPlugin } from './plugins/basicAuth.js';
import { prismaPlugin } from './plugins/prisma.js';
import { authRoutes } from './routes/auth.js';
import { sessionRoutes } from './routes/sessions.js';
import { resultRoutes } from './routes/results.js';
import { emailRoutes } from './routes/email.js';
import { adminRoutes } from './routes/admin.js';
import { publicRoutes } from './routes/public.js';

const app = Fastify({
  logger: {
    level: process.env.NODE_ENV === 'production' ? 'info' : 'debug',
  },
});

// --- Plugins ---
await app.register(cors, {
  origin: process.env.CORS_ORIGIN || true,
  credentials: true,
});
await app.register(sensible);
await app.register(jwtPlugin);
await app.register(prismaPlugin);
await app.register(basicAuthPlugin);

// --- Routes ---
await app.register(authRoutes, { prefix: '/api/auth' });
await app.register(sessionRoutes, { prefix: '/api/sessions' });
await app.register(resultRoutes, { prefix: '/api/results' });
await app.register(emailRoutes, { prefix: '/api' });
await app.register(publicRoutes, { prefix: '/api/public' });
// Let's stick to adding admin routes only and not changing email routes unless necessary.
await app.register(adminRoutes, { prefix: '/api/admin' });

// --- Health check ---
app.get('/api/health', async () => ({ status: 'ok' }));

// --- Start ---
const port = Number(process.env.PORT) || 4000;
const host = process.env.HOST || '0.0.0.0';

try {
  await app.listen({ port, host });
  app.log.info(`Server listening on ${host}:${port}`);
} catch (err) {
  app.log.error(err);
  process.exit(1);
}
