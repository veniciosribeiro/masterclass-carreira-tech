import type { FastifyInstance } from 'fastify';
import { TestResult } from '../common/testTypes.js';

export async function getTestResult(
  app: FastifyInstance,
  sessionId: string,
): Promise<TestResult | null> {
  // 1. Fetch Session to identify the user
  const session = await app.prisma.testSession.findUnique({
    where: { id: sessionId },
  });

  if (!session) {
    console.warn(`[RESULT_SERVICE] Session not found for ID: ${sessionId}`);
    return null;
  }

  // 2. Fetch the latest TestResult for this user
  const result = await app.prisma.testResult.findFirst({
    where: { userEmail: session.userEmail },
    orderBy: { createdAt: 'desc' },
  });

  if (!result) {
    console.warn(
      `[RESULT_SERVICE] No TestResult found for user: ${session.userEmail}`,
    );
    return null;
  }

  // 3. Construct the full TestResult object
  // Prisma stores Json, we need to cast it
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const storedJson = result.resultJson as any;

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
      },
    );
  }

  if (storedJson.scores && storedJson.scores.behavioral) {
    Object.entries(storedJson.scores.behavioral).forEach(
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ([key, val]: [string, any]) => {
        behavioral[key] = val.raw || 0;
        behavioralPercent[key] = val.percent || 0;
      },
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
  };

  return testResult;
}

export async function getTestResultById(
  app: FastifyInstance,
  resultId: string,
): Promise<TestResult | null> {
  const result = await app.prisma.testResult.findUnique({
    where: { id: resultId },
  });

  if (!result) return null;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const storedJson = result.resultJson as any;

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
      },
    );
  }

  if (storedJson.scores && storedJson.scores.behavioral) {
    Object.entries(storedJson.scores.behavioral).forEach(
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ([key, val]: [string, any]) => {
        behavioral[key] = val.raw || 0;
        behavioralPercent[key] = val.percent || 0;
      },
    );
  }

  const testResult: TestResult = {
    ...storedJson,
    id: result.id,
    userName: result.userName,
    userEmail: result.userEmail,
    timestamp: result.createdAt.toISOString(),
    scores: {
      areas,
      areasPercent,
      behavioral,
      behavioralPercent,
    },
  };

  return testResult;
}
