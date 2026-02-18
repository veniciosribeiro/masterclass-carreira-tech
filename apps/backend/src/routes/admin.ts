import type { FastifyInstance } from 'fastify';
import { AddEmailBody, type AddEmailBodyType } from '../schemas/admin.js';

export async function adminRoutes(app: FastifyInstance) {
  // Protect all routes in this scope with Basic Auth
  app.addHook('preHandler', app.basicAuth);

  app.post<{ Body: AddEmailBodyType }>(
    '/emails',
    {
      schema: {
        body: AddEmailBody,
      },
    },
    async (request, reply) => {
      const { email, name } = request.body;
      const normalizedEmail = email.toLowerCase().trim();

      // Check if email already exists
      const existing = await app.prisma.authorizedEmail.findFirst({
        where: { email: normalizedEmail },
      });

      if (existing) {
        return reply.code(200).send({
          message: 'Email already registered',
          email: existing.email,
          status: existing.active ? 'active' : 'inactive',
          created_at: existing.createdAt,
        });
      }

      // Create new authorized email
      const newEmail = await app.prisma.authorizedEmail.create({
        data: {
          email: normalizedEmail,
          name: name || null,
          active: true, // Default to active as this is an explicit add
        },
      });

      return reply.code(201).send({
        message: 'Email authorized successfully',
        email: newEmail.email,
        status: 'active',
        created_at: newEmail.createdAt,
      });
    }
  );
}
