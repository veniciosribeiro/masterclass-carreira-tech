import type { FastifyInstance } from 'fastify';
import { ValidateEmailBody, type ValidateEmailBodyType } from '../schemas/auth.js';

export async function authRoutes(app: FastifyInstance) {
  app.post<{ Body: ValidateEmailBodyType }>(
    '/validate-email',
    {
      schema: { body: ValidateEmailBody },
    },
    async (request, reply) => {
      const { email } = request.body;
      const normalizedEmail = email.toLowerCase().trim();

      const authorizedEmail = await app.prisma.authorizedEmail.findFirst({
        where: {
          email: normalizedEmail,
          active: true,
        },
      });

      if (!authorizedEmail) {
        return reply.code(200).send({ authorized: false });
      }

      const token = app.jwt.sign({
        sub: normalizedEmail,
        name: authorizedEmail.name ?? normalizedEmail,
      });

      return reply.code(200).send({
        authorized: true,
        name: authorizedEmail.name ?? undefined,
        token,
      });
    },
  );
}
