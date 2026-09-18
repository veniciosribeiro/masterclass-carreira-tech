import type { FastifyInstance } from 'fastify';
import {
  RegisterWebinarBody,
  type RegisterWebinarBodyType,
} from '../schemas/webinar.js';
import { sendLeadEvent } from '../services/metaEvents.js';

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

      const registration = await app.prisma.$transaction(
        async (transaction) => {
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
        },
      );

      // Ancorado no registro confiável (não no redirect do browser) —
      // o Lead é reportado mesmo se o client falhar depois disso.
      const eventId = await sendLeadEvent(
        {
          email: registration.email,
          name: registration.name,
          eventSourceUrl: request.body.eventSourceUrl,
          fbc: request.body.fbc,
          fbp: request.body.fbp,
          externalId: request.body.externalId,
        },
        app.log,
      );

      return reply.code(201).send({ registered: true, eventId });
    },
  );
}
