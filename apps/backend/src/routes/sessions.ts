import type { FastifyInstance } from "fastify";
import { authenticate } from "../hooks/auth.js";
import {
  CreateSessionBody,
  SaveProgressBody,
  SessionParams,
  type CreateSessionBodyType,
  type SaveProgressBodyType,
  type SessionParamsType,
} from "../schemas/sessions.js";

export async function sessionRoutes(app: FastifyInstance) {
  // All session routes require authentication
  app.addHook("preHandler", authenticate);

  // --- POST /api/sessions — Create or resume session ---
  app.post<{ Body: CreateSessionBodyType }>(
    "/",
    { schema: { body: CreateSessionBody } },
    async (request, reply) => {
      const email = request.user.sub;
      const { name } = request.body;

      // Look for existing in_progress session
      const existing = await app.prisma.testSession.findFirst({
        where: { userEmail: email, status: "in_progress" },
        orderBy: { updatedAt: "desc" },
      });

      if (existing) {
        return reply.code(200).send({
          session_id: existing.id,
          current_question: existing.currentQuestion,
          answers: existing.answers,
          shuffled_orderings: existing.shuffledOrderings,
          resumed: true,
        });
      }

      // Create new session
      const session = await app.prisma.testSession.create({
        data: {
          userEmail: email,
          userName: name,
        },
      });

      return reply.code(201).send({
        session_id: session.id,
        current_question: 0,
        answers: [],
        shuffled_orderings: {},
        resumed: false,
      });
    },
  );

  // --- GET /api/sessions/:id — Get session state ---
  app.get<{ Params: SessionParamsType }>(
    "/:id",
    { schema: { params: SessionParams } },
    async (request, reply) => {
      const { id } = request.params;
      const email = request.user.sub;

      const session = await app.prisma.testSession.findUnique({
        where: { id },
      });

      if (!session) {
        return reply.code(404).send({ error: "not_found" });
      }

      // Verify ownership
      if (session.userEmail !== email) {
        return reply.code(403).send({ error: "forbidden" });
      }

      return reply.code(200).send({
        session_id: session.id,
        user_email: session.userEmail,
        user_name: session.userName,
        answers: session.answers,
        current_question: session.currentQuestion,
        status: session.status,
        shuffled_orderings: session.shuffledOrderings,
      });
    },
  );

  // --- PATCH /api/sessions/:id/progress — Save progress ---
  app.patch<{ Params: SessionParamsType; Body: SaveProgressBodyType }>(
    "/:id/progress",
    { schema: { params: SessionParams, body: SaveProgressBody } },
    async (request, reply) => {
      const { id } = request.params;
      const email = request.user.sub;
      const { answers, currentQuestion, shuffledOrderings } = request.body;

      // Find session and verify ownership + status
      const session = await app.prisma.testSession.findUnique({
        where: { id },
      });

      if (!session || session.status !== "in_progress") {
        return reply.code(404).send({ error: "session_not_found" });
      }

      if (session.userEmail !== email) {
        return reply.code(403).send({ error: "forbidden" });
      }

      await app.prisma.testSession.update({
        where: { id },
        data: {
          answers,
          currentQuestion,
          ...(shuffledOrderings !== undefined && { shuffledOrderings }),
        },
      });

      return reply.code(200).send({ ok: true });
    },
  );

  // --- PATCH /api/sessions/:id/complete — Complete session ---
  app.patch<{ Params: SessionParamsType }>(
    "/:id/complete",
    { schema: { params: SessionParams } },
    async (request, reply) => {
      const { id } = request.params;
      const email = request.user.sub;

      const session = await app.prisma.testSession.findUnique({
        where: { id },
      });

      if (!session || session.status !== "in_progress") {
        return reply.code(404).send({ error: "session_not_found" });
      }

      if (session.userEmail !== email) {
        return reply.code(403).send({ error: "forbidden" });
      }

      await app.prisma.testSession.update({
        where: { id },
        data: { status: "completed" },
      });

      return reply.code(200).send({ ok: true });
    },
  );
}
