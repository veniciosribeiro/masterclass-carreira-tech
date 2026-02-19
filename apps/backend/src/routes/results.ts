import type { FastifyInstance } from 'fastify';
import { authenticate } from '../hooks/auth.js';
import { SaveResultBody, type SaveResultBodyType } from '../schemas/results.js';
import { sendResults } from '../services/email.js';
import { generatePDFBuffer } from '../services/pdfGenerator.js';
import { getTestResultById } from '../services/resultService.js';

export async function resultRoutes(app: FastifyInstance) {
  // ── Public endpoint: GET /api/results/by-session/:sessionId ─────────────
  // Accessible without JWT — the UUID acts as an opaque token.
  app.get<{ Params: { sessionId: string } }>(
    '/by-session/:sessionId',
    async (request, reply) => {
      const { sessionId } = request.params;

      // Use raw query to avoid Prisma-type regeneration dependency
      const results = await app.prisma.$queryRaw<
        Array<{ result_json: unknown }>
      >`
        SELECT result_json FROM test_results WHERE session_id = ${sessionId}::uuid LIMIT 1
      `;

      if (!results.length) {
        return reply.code(404).send({ error: 'not_found' });
      }

      return reply.send(results[0].result_json);
    },
  );

  // ── Authenticated routes ─────────────────────────────────────────────────
  app.addHook('preHandler', authenticate);

  // --- POST /api/results — Save test result ---
  app.post<{ Body: SaveResultBodyType }>(
    '/',
    { schema: { body: SaveResultBody } },
    async (request, reply) => {
      const email = request.user.sub;
      const {
        sessionId,
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

      // Avoid duplicate result for the same session
      if (sessionId) {
        const existing = await app.prisma.$queryRaw<Array<{ id: string }>>`
          SELECT id FROM test_results WHERE session_id = ${sessionId}::uuid LIMIT 1
        `;
        if (existing.length) {
          return reply.code(200).send({ ok: true, duplicate: true });
        }
      }

      // Insert using raw query so we can set session_id without waiting for prisma generate
      const inserted = await app.prisma.$queryRaw<Array<{ id: string }>>`
        INSERT INTO test_results
          (id, session_id, user_name, user_email, answers, area_scores, profile, behavioral_scores, result_json)
        VALUES (
          gen_random_uuid(),
          ${sessionId ? `${sessionId}::uuid` : null}::uuid,
          ${userName},
          ${userEmail},
          ${JSON.stringify(answers)}::jsonb,
          ${JSON.stringify(areaScores)}::jsonb,
          ${profile},
          ${JSON.stringify(behavioralScores)}::jsonb,
          ${JSON.stringify(resultJson)}::jsonb
        )
        RETURNING id
      `;

      const savedId = inserted[0]?.id;

      // Fire-and-forget auto-email with PDF attachment
      if (savedId) {
        (async () => {
          try {
            const result = await getTestResultById(app, savedId);
            if (!result) return;

            const pdfBuffer = generatePDFBuffer(result);

            const resultData = resultJson as {
              profile?: {
                label?: string;
                description?: string;
                recommendation?: string;
              };
              scores?: {
                areasPercent?: Record<string, number>;
                behavioralPercent?: Record<string, number>;
              };
            };

            const areasPct = resultData?.scores?.areasPercent ?? {};
            const topAreaScore = Math.max(
              0,
              ...Object.values(areasPct).map(Number),
            );

            const behavioralPct = resultData?.scores?.behavioralPercent ?? {};
            const bValues = Object.values(behavioralPct).map(Number);
            const avgBehavioral = bValues.length
              ? Math.round(bValues.reduce((a, b) => a + b, 0) / bValues.length)
              : 0;

            await sendResults({
              to: userEmail,
              name: userName,
              sessionId: sessionId ?? savedId,
              profile: resultData?.profile?.label ?? profile,
              description: resultData?.profile?.description ?? '',
              recommendation: resultData?.profile?.recommendation ?? '',
              scores: {
                technical: topAreaScore,
                behavioral: avgBehavioral,
                areas: Object.keys(areasPct),
              },
              pdfBuffer,
            });
          } catch (err) {
            app.log.error({ err }, 'Auto-email failed (non-blocking)');
          }
        })();
      }

      return reply.code(201).send({ ok: true });
    },
  );
}
