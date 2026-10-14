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
      // Só o aceite é gravado: uma nova inscrição com a caixa desmarcada não
      // revoga um consentimento anterior (revogação é pedido explícito).
      const consent = request.body.marketingConsent
        ? {
            marketingConsent: true,
            marketingConsentAt: new Date(),
            privacyPolicyVersion: request.body.privacyPolicyVersion ?? null,
          }
        : {};

      const existing = await app.prisma.webinarRegistration.findUnique({
        where: { email: normalizedEmail },
      });

      await app.prisma.$transaction(async (transaction) => {
        const registration = await transaction.webinarRegistration.upsert({
          where: { email: normalizedEmail },
          // Só sobrescreve o external_id quando o navegador mandou um novo
          // (nunca apaga um valor já conhecido por falta dele numa chamada).
          update: { name, ...(externalId ? { externalId } : {}), ...consent },
          create: { name, email: normalizedEmail, externalId, ...consent },
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
              // Campos novos e aditivos (a versão do payload segue 1): o
              // fluxo do n8n precisa usar marketingConsent para decidir se a
              // pessoa entra nas comunicações de conteúdo e oferta no Mautic.
              marketingConsent: registration.marketingConsent,
              marketingConsentAt:
                registration.marketingConsentAt?.toISOString() ?? null,
              privacyPolicyVersion: registration.privacyPolicyVersion,
            },
          },
        });

        return registration;
      });

      return reply.code(201).send({ registered: true });
    },
  );
}
