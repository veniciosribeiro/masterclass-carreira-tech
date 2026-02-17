import type { FastifyInstance } from 'fastify';
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
  console.log(
    '[EMAIL_ROUTE] getTestResults called with sessionId:',
    _sessionId
  );

  // For now, return dummy data for testing
  return {
    result: {
      profile: 'Dev Full Stack',
      technicalScore: 85,
      behavioralScore: 90,
      technicalAreas: ['Frontend', 'Backend', 'Dados/IA'],
      behavioralTraits: ['Resiliência', 'Lógica', 'Proatividade'],
    },
    session: {
      userEmail: 'test@example.com',
      userName: 'Test User',
    },
  };
}

export async function emailRoutes(app: FastifyInstance) {
  app.post<{ Params: { sessionId: string } }>(
    '/send-results/:sessionId',
    async (request, reply) => {
      const { sessionId: _sessionId } = request.params;

      console.log(
        '[EMAIL_ROUTE] Processing email request for sessionId:',
        _sessionId
      );

      // Fetch test results and session from database
      const data = await getTestResults(_sessionId);

      if (!data) {
        return reply.code(404).send({ error: 'Test results not found' });
      }

      // Prepare email data
      const emailData = {
        to: data.session.userEmail,
        name: data.session.userName,
        sessionId: _sessionId,
        profile: data.result.profile,
        scores: {
          technical: Math.round(data.result.technicalScore * 100),
          behavioral: Math.round(data.result.behavioralScore * 100),
          areas: data.result.technicalAreas,
        },
      };

      console.log(
        '[EMAIL_ROUTE] Sending email via nodemailer to:',
        emailData.to
      );

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
