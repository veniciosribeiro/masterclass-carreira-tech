import type { FastifyInstance } from 'fastify';
import {
  RegisterWebinarBody,
  type RegisterWebinarBodyType,
} from '../schemas/webinar.js';

export async function webinarRoutes(app: FastifyInstance) {
  app.post<{ Body: RegisterWebinarBodyType }>(
    '/register',
    {
      schema: { body: RegisterWebinarBody },
    },
    async (request, reply) => {
      const { name, email } = request.body;
      const normalizedEmail = email.toLowerCase().trim();

      await app.prisma.webinarRegistration.upsert({
        where: { email: normalizedEmail },
        update: { name },
        create: { name, email: normalizedEmail },
      });

      return reply.code(201).send({ registered: true });
    },
  );
}
