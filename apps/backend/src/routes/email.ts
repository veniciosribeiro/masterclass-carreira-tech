import type { FastifyInstance } from "fastify";
import { sendResults } from "../services/email.js";
import { generatePDFBuffer } from "../services/pdfGenerator.js";
import { getTestResult } from "../services/resultService.js";

export async function emailRoutes(app: FastifyInstance) {
  app.post<{ Params: { sessionId: string } }>(
    "/send-results/:sessionId",
    async (request, reply) => {
      const { sessionId: _sessionId } = request.params;

      console.log(
        "[EMAIL_ROUTE] Processing email request for sessionId:",
        _sessionId,
      );

      // Fetch test results
      const testResult = await getTestResult(app, _sessionId);

      if (!testResult) {
        return reply.code(404).send({ error: "Test results not found" });
      }

      // Generate PDF
      console.log("[EMAIL_ROUTE] Generating PDF...");
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
              3,
          ),
          behavioral: Math.round(
            (testResult.scores.behavioralPercent.resilience +
              testResult.scores.behavioralPercent.logic +
              testResult.scores.behavioralPercent.proactivity) /
              3,
          ),
          areas: Object.entries(testResult.scores.areasPercent)
            .sort(([, a], [, b]) => b - a)
            .map(([k]) => k),
        },
        pdfBuffer,
      };

      console.log(
        "[EMAIL_ROUTE] Sending email via nodemailer to:",
        emailData.to,
      );

      // Call email service to send results
      await sendResults(emailData);

      return reply.code(200).send({
        message: "Email sent successfully",
        sessionId: _sessionId,
        status: "delivered",
      });
    },
  );
}
