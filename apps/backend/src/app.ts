import Fastify, {
  type FastifyInstance,
  type FastifyServerOptions,
} from 'fastify';
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
import { healthRoutes } from './routes/health.js';
import { webinarRoutes } from './routes/webinar.js';

// Monta o app (plugins e rotas) sem subir o servidor nem o worker do n8n, para
// o server.ts e os testes (app.inject) usarem exatamente a mesma configuração.
export async function buildApp(
  options: FastifyServerOptions = {},
): Promise<FastifyInstance> {
  const app = Fastify(options);

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
  await app.register(healthRoutes);
  await app.register(authRoutes, { prefix: '/api/auth' });
  await app.register(sessionRoutes, { prefix: '/api/sessions' });
  await app.register(resultRoutes, { prefix: '/api/results' });
  await app.register(emailRoutes, { prefix: '/api' });
  await app.register(publicRoutes, { prefix: '/api/public' });
  await app.register(webinarRoutes, { prefix: '/api/webinar' });
  await app.register(adminRoutes, { prefix: '/api/admin' });

  return app;
}
