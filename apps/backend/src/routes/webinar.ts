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
      const name = request.body.name.trim();
      const email = request.body.email.trim();
      const normalizedEmail = email.toLowerCase().trim();

      const existing = await app.prisma.webinarRegistration.findUnique({
        where: { email: normalizedEmail },
      });

      await app.prisma.$transaction(async (transaction) => {
        const registration = await transaction.webinarRegistration.upsert({
          where: { email: normalizedEmail },
          update: { name },
          create: { name, email: normalizedEmail },
        });
        const eventName = existing
          ? 'webinar.registration.updated'
          : 'webinar.registration.created';

        await transaction.webinarRegistrationEvent.create({
          data: {
            registrationId: registration.id,
            eventName,
            payload: {
              event: eventName,
              version: 1,
              registrationId: registration.id,
              name: registration.name,
              email: registration.email,
              registeredAt: registration.createdAt.toISOString(),
              source: 'webinar_semente',
              product: 'webinar_carreira_tech',
            },
          },
        });

        return registration;
      });

      return reply.code(201).send({ registered: true });
    },
  );
}
