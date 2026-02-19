import type { FastifyInstance } from 'fastify';
import { getTestResult } from '../services/resultService.js';
import { generatePDFBuffer } from '../services/pdfGenerator.js';

export async function publicRoutes(app: FastifyInstance) {
    // GET /api/public/results/:sessionId/pdf
    app.get<{ Params: { sessionId: string } }>(
        '/results/:sessionId/pdf',
        async (request, reply) => {
            const { sessionId } = request.params;

            console.log(`[PUBLIC_ROUTE] Generating PDF for session: ${sessionId}`);

            const testResult = await getTestResult(app, sessionId);

            if (!testResult) {
                return reply.code(404).send({ error: 'Test results not found' });
            }

            try {
                const pdfBuffer = generatePDFBuffer(testResult);

                const filename = `relatorio-aptidao-${testResult.userName
                    .replace(/\s+/g, '-')
                    .toLowerCase()}.pdf`;

                // Set headers for file download
                reply.header('Content-Type', 'application/pdf');
                reply.header(
                    'Content-Disposition',
                    `attachment; filename="${filename}"`
                );

                return reply.send(pdfBuffer);
            } catch (error) {
                console.error('[PUBLIC_ROUTE] Error generating PDF:', error);
                return reply.code(500).send({ error: 'Failed to generate PDF' });
            }
        }
    );
}
