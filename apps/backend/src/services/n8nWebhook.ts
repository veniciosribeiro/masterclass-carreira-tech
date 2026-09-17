import type { FastifyInstance } from 'fastify';
import type { PrismaClient } from '@prisma/client';

const DEFAULT_TIMEOUT_MS = 10_000;
const DEFAULT_MAX_RETRIES = 5;
const DEFAULT_BASE_DELAY_MS = 30_000;

interface DeliveryConfig {
  url: string;
  token: string;
  timeoutMs: number;
  maxRetries: number;
  baseDelayMs: number;
}

function getConfig(): DeliveryConfig | null {
  const { N8N_WEBHOOK_URL: url, N8N_WEBHOOK_TOKEN: token } = process.env;
  if (!url || !token) return null;

  return {
    url,
    token,
    timeoutMs: Number(process.env.N8N_TIMEOUT_MS) || DEFAULT_TIMEOUT_MS,
    maxRetries: Number(process.env.N8N_MAX_RETRIES) || DEFAULT_MAX_RETRIES,
    baseDelayMs:
      Number(process.env.N8N_RETRY_BASE_DELAY_MS) || DEFAULT_BASE_DELAY_MS,
  };
}

export function isN8nConfigured(): boolean {
  return Boolean(process.env.N8N_WEBHOOK_URL && process.env.N8N_WEBHOOK_TOKEN);
}

function isRetryable(error: unknown): boolean {
  if (
    error instanceof Error &&
    (error.name === 'AbortError' || error.name === 'TimeoutError')
  ) {
    return true;
  }
  return error instanceof Error && error.message.startsWith('n8n returned 5');
}

function getNextAttemptAt(attempts: number, baseDelayMs: number): Date {
  const delay = baseDelayMs * 2 ** Math.max(0, attempts - 1);
  return new Date(Date.now() + delay);
}

export async function deliverPendingWebinarEvent(
  prisma: PrismaClient,
  eventId: string,
  log: {
    info: (obj: unknown, message?: string) => void;
    error: (obj: unknown, message?: string) => void;
  },
): Promise<void> {
  const config = getConfig();
  if (!config) {
    log.error({ eventId }, 'n8n integration is not configured');
    await prisma.webinarRegistrationEvent.update({
      where: { id: eventId },
      data: {
        status: 'failed',
        lastError: 'n8n integration is not configured',
      },
    });
    return;
  }

  const event = await prisma.webinarRegistrationEvent.findUnique({
    where: { id: eventId },
  });
  if (!event || event.status === 'sent') return;

  const attempts = event.attempts + 1;
  await prisma.webinarRegistrationEvent.update({
    where: { id: eventId },
    data: { status: 'processing', attempts, lockedAt: new Date() },
  });

  try {
    const response = await fetch(config.url, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${config.token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(event.payload),
      signal: AbortSignal.timeout(config.timeoutMs),
    });

    if (!response.ok) {
      throw new Error(`n8n returned ${response.status}`);
    }

    await prisma.webinarRegistrationEvent.update({
      where: { id: eventId },
      data: {
        status: 'sent',
        sentAt: new Date(),
        lockedAt: null,
        lastError: null,
      },
    });
    log.info({ eventId }, 'Webinar event delivered to n8n');
  } catch (error) {
    const message =
      error instanceof Error ? error.message : 'Unknown n8n error';
    const retryable = isRetryable(error) && attempts <= config.maxRetries;
    await prisma.webinarRegistrationEvent.update({
      where: { id: eventId },
      data: {
        status: retryable ? 'pending' : 'failed',
        nextAttemptAt: retryable
          ? getNextAttemptAt(attempts, config.baseDelayMs)
          : new Date(),
        lastError: message.slice(0, 500),
        lockedAt: null,
      },
    });
    log.error(
      { err: error, eventId, retryable },
      'Failed to deliver webinar event to n8n',
    );
  }
}

export async function processPendingWebinarEvents(
  prisma: PrismaClient,
  log: FastifyInstance['log'],
): Promise<void> {
  const now = new Date();
  const staleLockTime = new Date(now.getTime() - 5 * 60_000);
  const pendingEvents = await prisma.webinarRegistrationEvent.findMany({
    where: {
      OR: [
        { status: 'pending', nextAttemptAt: { lte: now } },
        { status: 'processing', lockedAt: { lt: staleLockTime } },
      ],
    },
    orderBy: { createdAt: 'asc' },
    take: 20,
    select: { id: true },
  });

  await Promise.all(
    pendingEvents.map(({ id }) => deliverPendingWebinarEvent(prisma, id, log)),
  );
}

export function startN8nDeliveryWorker(app: FastifyInstance): void {
  if (!isN8nConfigured()) {
    app.log.warn(
      'n8n delivery worker disabled: webhook configuration is missing',
    );
    return;
  }

  const intervalMs = 5_000;
  let running = false;
  const run = async () => {
    if (running) return;
    running = true;
    try {
      await processPendingWebinarEvents(app.prisma, app.log);
    } catch (error) {
      app.log.error({ err: error }, 'n8n delivery worker failed');
    } finally {
      running = false;
    }
  };

  void run();
  const interval = setInterval(() => void run(), intervalMs);
  app.addHook('onClose', async () => clearInterval(interval));
  app.log.info({ intervalMs }, 'n8n delivery worker started');
}
