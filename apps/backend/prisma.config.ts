import { defineConfig } from "@prisma/config";
import "dotenv/config"; // Load env vars

export default defineConfig({
  datasource: {
    url: process.env.DATABASE_URL,
  },
  migrations: {
    seed:
      process.env.NODE_ENV === "production"
        ? "node prisma/seed.cjs"
        : "tsx prisma/seed.ts",
  },
});
