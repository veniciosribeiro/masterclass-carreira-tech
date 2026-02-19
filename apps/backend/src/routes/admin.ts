import type { FastifyInstance } from 'fastify';
import {
  AddEmailBody,
  type AddEmailBodyType,
  GetResultsQuery,
  type GetResultsQueryType,
} from '../schemas/admin.js';

export async function adminRoutes(app: FastifyInstance) {
  // Protect all routes in this scope with Basic Auth
  app.addHook('preHandler', app.basicAuth);

  app.get<{ Querystring: GetResultsQueryType }>(
    '/results',
    {
      schema: {
        querystring: GetResultsQuery,
      },
    },
    async (request, _reply) => {
      const { page = 1, limit = 10, q } = request.query;
      const skip = (page - 1) * limit;

      const where = q
        ? {
            OR: [
              { userEmail: { contains: q, mode: 'insensitive' as const } },
              { userName: { contains: q, mode: 'insensitive' as const } },
            ],
          }
        : {};

      const [total, results] = await app.prisma.$transaction([
        app.prisma.testResult.count({ where }),
        app.prisma.testResult.findMany({
          where,
          skip,
          take: limit,
          orderBy: { createdAt: 'desc' },
        }),
      ]);

      return {
        data: results,
        total,
        page,
        totalPages: Math.ceil(total / limit),
      };
    },
  );

  // GET /api/admin/results/:id — Full result detail (for admin student profile page)
  app.get<{ Params: { id: string } }>(
    '/results/:id',
    async (request, reply) => {
      const { id } = request.params;
      const { getTestResultById } =
        await import('../services/resultService.js');
      const result = await getTestResultById(app, id);
      if (!result) {
        return reply.code(404).send({ error: 'Result not found' });
      }
      return reply.send(result);
    },
  );

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
    },
  );

  // New Endpoint: Get PDF by Result ID
  // GET /api/admin/results/:id/pdf
  app.get<{ Params: { id: string } }>(
    '/results/:id/pdf',
    async (request, reply) => {
      const { id } = request.params;

      // Dynamic import to avoid circular dependency if any, though likely fine as is if structured well.
      // Importing strictly what is needed.
      const { getTestResultById } =
        await import('../services/resultService.js');
      const { generatePDFBuffer } = await import('../services/pdfGenerator.js');

      const result = await getTestResultById(app, id);

      if (!result) {
        return reply.code(404).send({ error: 'Result not found' });
      }

      try {
        const pdfBuffer = generatePDFBuffer(result);
        const filename = `relatorio-${result.userName.replace(/\s+/g, '-').toLowerCase()}.pdf`;

        reply.header('Content-Type', 'application/pdf');
        reply.header(
          'Content-Disposition',
          `attachment; filename="${filename}"`,
        );
        return reply.send(pdfBuffer);
      } catch (err) {
        app.log.error(err);
        return reply.code(500).send({ error: 'Failed to generate PDF' });
      }
    },
  );
}
