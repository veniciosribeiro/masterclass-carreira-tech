import type { FastifyInstance } from 'fastify';
import { authenticate } from '../hooks/auth.js';
import { SaveResultBody, type SaveResultBodyType } from '../schemas/results.js';

export async function resultRoutes(app: FastifyInstance) {
  // All result routes require authentication
  app.addHook('preHandler', authenticate);

  // --- POST /api/results — Save test result ---
  app.post<{ Body: SaveResultBodyType }>(
    '/',
    { schema: { body: SaveResultBody } },
    async (request, reply) => {
      const email = request.user.sub;
      const {
        userName,
        userEmail,
        answers,
        areaScores,
        profile,
        behavioralScores,
        resultJson,
      } = request.body;

      // Verify that the email in the body matches the JWT
      if (userEmail.toLowerCase().trim() !== email) {
        return reply
          .code(403)
          .send({ error: 'forbidden', message: 'Email does not match token' });
      }

      await app.prisma.testResult.create({
        data: {
          userName,
          userEmail,
          answers,
          areaScores,
          profile,
          behavioralScores,
          resultJson,
        },
      });

      return reply.code(201).send({ ok: true });
    }
  );
}
