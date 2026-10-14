import 'dotenv/config';
import { buildApp } from './app.js';
import { startN8nDeliveryWorker } from './services/n8nWebhook.js';

const start = async () => {
  const port = Number(process.env.PORT) || 4000;
  const host = process.env.HOST || '0.0.0.0';

  const app = await buildApp({
    logger: {
      level: process.env.NODE_ENV === 'production' ? 'info' : 'debug',
    },
  });

  try {
    startN8nDeliveryWorker(app);

    await app.listen({ port, host });
    app.log.info(`Server listening on ${host}:${port}`);
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
};

start().catch((err) => {
  console.error(err);
  process.exit(1);
});
