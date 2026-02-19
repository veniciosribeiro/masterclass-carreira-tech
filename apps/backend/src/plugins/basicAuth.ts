import fp from 'fastify-plugin';
import type { FastifyRequest, FastifyReply } from 'fastify';

export const basicAuthPlugin = fp(async (app) => {
  app.decorate(
    'basicAuth',
    async (request: FastifyRequest, reply: FastifyReply) => {
      const { authorization } = request.headers;

      if (!authorization) {
        reply.header('WWW-Authenticate', 'Basic realm="Admin Area"');
        return reply.code(401).send({ error: 'Unauthorized' });
      }

      const [scheme, credentials] = authorization.split(' ');

      if (scheme !== 'Basic' || !credentials) {
        return reply.code(400).send({ error: 'Bad Request' });
      }

      const [username, password] = Buffer.from(credentials, 'base64')
        .toString('utf-8')
        .split(':');

      const adminUser = process.env.ADMIN_USER;
      const adminPass = process.env.ADMIN_PASS;

      if (!adminUser || !adminPass) {
        app.log.error('ADMIN_USER or ADMIN_PASS not configured');
        return reply.code(500).send({ error: 'Server configuration error' });
      }

      if (username !== adminUser || password !== adminPass) {
        return reply.code(401).send({ error: 'Invalid credentials' });
      }
    },
  );
});

declare module 'fastify' {
  interface FastifyInstance {
    basicAuth: (request: FastifyRequest, reply: FastifyReply) => Promise<void>;
  }
}
