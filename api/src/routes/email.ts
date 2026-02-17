import type { FastifyInstance } from 'fastify';
import { SendResultsBody, type SendResultsBodyType } from '../schemas/email.js';
import { sendResults } from '../services/email.js';

interface TestResultData {
  profile: string;
  technicalScore: number;
  behavioralScore: number;
  technicalAreas: string[];
  behavioralTraits: string[];
}

interface TestSessionData {
  userEmail: string;
  userName: string;
}

async function getTestResults(
  _sessionId: string
): Promise<{ result: TestResultData; session: TestSessionData } | null> {
  // TODO: Fetch test results, profile, scores from database using Prisma
  // This will be implemented in the next integration phase
  return null;
}

export async function emailRoutes(app: FastifyInstance) {
  app.post<{ Body: SendResultsBodyType; Params: { sessionId: string } }>(
    '/send-results/:sessionId',
    {
      schema: { body: SendResultsBody },
    },
    async (request, reply) => {
      const { sessionId: _sessionId } = request.params;
      const { email } = request.body;

      // Fetch test results and session from database
      const data = await getTestResults(_sessionId);

      if (!data) {
        return reply.code(404).send({ error: 'Test results not found' });
      }

      // Prepare email data
      const emailData = {
        to: email || data.session.userEmail,
        name: data.session.userName,
        sessionId: _sessionId,
        profile: data.result.profile,
        scores: {
          technical: Math.round(data.result.technicalScore * 100),
          behavioral: Math.round(data.result.behavioralScore * 100),
          areas: data.result.technicalAreas,
        },
      };

      // Call email service to send results
      await sendResults(emailData);

      return reply.code(200).send({
        message: 'Email sent successfully',
        sessionId: _sessionId,
        status: 'delivered',
      });
    }
  );
}
