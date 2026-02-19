import { defineConfig } from '@prisma/config';
import 'dotenv/config'; // Load env vars


export default defineConfig({
    datasource: {
        url: process.env.DATABASE_URL,
    },
    migrations: {
        seed: 'tsx prisma/seed.ts',
    },
});
