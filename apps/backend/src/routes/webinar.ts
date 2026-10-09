import type { FastifyInstance } from 'fastify';
import { isN8nConfigured } from '../services/n8nWebhook.js';
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
      const externalId = request.body.externalId?.trim() || undefined;

      const existing = await app.prisma.webinarRegistration.findUnique({
        where: { email: normalizedEmail },
      });

      await app.prisma.$transaction(async (transaction) => {
        const registration = await transaction.webinarRegistration.upsert({
          where: { email: normalizedEmail },
          // Só sobrescreve o external_id quando o navegador mandou um novo
          // (nunca apaga um valor já conhecido por falta dele numa chamada).
          update: { name, ...(externalId ? { externalId } : {}) },
          create: { name, email: normalizedEmail, externalId },
        });
        const eventName = existing
          ? 'webinar.registration.updated'
          : 'webinar.registration.created';

        await transaction.webinarRegistrationEvent.create({
          data: {
            registrationId: registration.id,
            eventName,
            // Sem a integração com o n8n configurada o evento fica guardado como
            // 'skipped': o worker só entrega 'pending', então nada é reenviado em
            // massa se a variável voltar, e o payload continua disponível para
            // reenvio manual (basta voltar o status para 'pending').
            status: isN8nConfigured() ? 'pending' : 'skipped',
            payload: {
              event: eventName,
              version: 1,
              registrationId: registration.id,
              name: registration.name,
              email: registration.email,
              registeredAt: registration.createdAt.toISOString(),
              source: 'webinar_semente',
              product: 'webinar_carreira_tech',
              externalId: registration.externalId,
            },
          },
        });

        return registration;
      });

      return reply.code(201).send({ registered: true });
    },
  );
}
