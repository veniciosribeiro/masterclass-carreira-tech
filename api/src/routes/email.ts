import type { FastifyInstance } from 'fastify';
import { sendResults } from '../services/email.js';
import { generatePDFBuffer } from '../services/pdfGenerator.js';
import { TestResult } from '../common/testTypes.js';

async function getTestResult(
  app: FastifyInstance,
  sessionId: string
): Promise<TestResult | null> {
  // 1. Fetch Session to identify the user
  const session = await app.prisma.testSession.findUnique({
    where: { id: sessionId },
  });

  if (!session) {
    console.warn(`[EMAIL_ROUTE] Session not found for ID: ${sessionId}`);
    return null;
  }

  // 2. Fetch the latest TestResult for this user
  const result = await app.prisma.testResult.findFirst({
    where: { userEmail: session.userEmail },
    orderBy: { createdAt: 'desc' },
  });

  if (!result) {
    console.warn(
      `[EMAIL_ROUTE] No TestResult found for user: ${session.userEmail}`
    );
    return null;
  }

  // 3. Construct the full TestResult object
  // Prisma stores Json, we need to cast it
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const storedJson = result.resultJson as any;

  // Map stored scores to TestResult structure
  // Stored: { areas: { frontend: { raw: x, percent: y } } }
  // Target: { areas: { frontend: x }, areasPercent: { frontend: y } }

  const areas: Record<string, number> = {};
  const areasPercent: Record<string, number> = {};
  const behavioral: Record<string, number> = {};
  const behavioralPercent: Record<string, number> = {};

  if (storedJson.scores && storedJson.scores.areas) {
    Object.entries(storedJson.scores.areas).forEach(
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ([key, val]: [string, any]) => {
        areas[key] = val.raw || 0;
        areasPercent[key] = val.percent || 0;
      }
    );
  }

  if (storedJson.scores && storedJson.scores.behavioral) {
    Object.entries(storedJson.scores.behavioral).forEach(
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ([key, val]: [string, any]) => {
        behavioral[key] = val.raw || 0;
        behavioralPercent[key] = val.percent || 0;
      }
    );
  }

  const testResult: TestResult = {
    ...storedJson,
    id: result.id, // Override with DB ID
    userName: result.userName, // Override with DB name
    userEmail: result.userEmail, // Override with DB email
    timestamp: result.createdAt.toISOString(), // Override with DB timestamp
    scores: {
      areas,
      areasPercent,
      behavioral,
      behavioralPercent,
    },
    // We might need to map answers too if they differ, but array of objects usually stays same.
    // Let's assume answers are compatible for now or check inspect output.
    // Inspect output showed answers array with { questionId, type, ... } which matches Answer interface.
    // So answers are fine.
  };

  return testResult;
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

      // Fetch test results
      const testResult = await getTestResult(app, _sessionId);

      if (!testResult) {
        return reply.code(404).send({ error: 'Test results not found' });
      }

      // Generate PDF
      console.log('[EMAIL_ROUTE] Generating PDF...');
      const pdfBuffer = generatePDFBuffer(testResult);

      // Prepare email data
      const emailData = {
        to: testResult.userEmail,
        name: testResult.userName,
        sessionId: _sessionId,
        profile: testResult.profile.label,
        description: testResult.profile.description,
        recommendation: testResult.profile.recommendation,
        scores: {
          technical: Math.round(
            (testResult.scores.areasPercent.frontend +
              testResult.scores.areasPercent.backend +
              testResult.scores.areasPercent.dataAI) /
              3
          ),
          behavioral: Math.round(
            (testResult.scores.behavioralPercent.resilience +
              testResult.scores.behavioralPercent.logic +
              testResult.scores.behavioralPercent.proactivity) /
              3
          ),
          areas: Object.entries(testResult.scores.areasPercent)
            .sort(([, a], [, b]) => b - a)
            .map(([k]) => k),
        },
        pdfBuffer,
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
