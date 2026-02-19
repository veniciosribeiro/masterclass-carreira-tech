import fp from 'fastify-plugin';
import { PrismaClient } from '@prisma/client';
import type { FastifyInstance } from 'fastify';

declare module 'fastify' {
  interface FastifyInstance {
    prisma: PrismaClient;
  }
}

import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';

export const prismaPlugin = fp(async (app: FastifyInstance) => {
  const connectionString = `${process.env.DATABASE_URL}`;
  const pool = new Pool({ connectionString });
  const adapter = new PrismaPg(pool);
  const prisma = new PrismaClient({ adapter });

  await prisma.$connect();
  app.log.info('Prisma connected to database');

  app.decorate('prisma', prisma);

  app.addHook('onClose', async () => {
    await prisma.$disconnect();
    app.log.info('Prisma disconnected');
  });
});
