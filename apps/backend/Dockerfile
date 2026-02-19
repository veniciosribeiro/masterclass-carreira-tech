FROM node:20-alpine AS builder
WORKDIR /app
COPY package.json package-lock.json ./
COPY apps/backend/package.json ./apps/backend/
COPY apps/frontend/package.json ./apps/frontend/
RUN npm install
COPY apps/backend ./apps/backend
WORKDIR /app/apps/backend
RUN npx prisma generate
RUN npx esbuild prisma/seed.ts --bundle --platform=node --outfile=prisma/seed.cjs --external:@prisma/client --external:pg --external:@prisma/adapter-pg
RUN npm run build:bundle

# Stage 2: Prisma Dependencies (Clean install for CLI & Client)
FROM node:20-alpine AS prisma-libs
WORKDIR /app
# Install prisma CLI, Client, and runtime dependencies (pg, adapter, etc)
RUN npm install prisma@7.4.0 @prisma/client@7.4.0 pg @prisma/adapter-pg dotenv

# Copy schema and config for generation
COPY apps/backend/prisma ./prisma
COPY apps/backend/prisma.config.ts ./

# Generate client in this clean environment
RUN npx prisma generate

# Stage 3: Runner
FROM node:20-alpine
WORKDIR /app
ENV NODE_ENV=production

# Copy clean node_modules containing prisma CLI, Client, and generated files
COPY --from=prisma-libs /app/node_modules ./node_modules

# Copy built app and config
COPY --from=builder /app/apps/backend/dist/server.js ./dist/server.js
COPY --from=builder /app/apps/backend/package.json ./
COPY --from=builder /app/apps/backend/prisma.config.ts ./
COPY --from=builder /app/apps/backend/prisma ./prisma
COPY --from=builder /app/apps/backend/prisma/seed.cjs ./prisma/seed.cjs

EXPOSE 4000
# Invoke prisma directly from the clean node_modules
CMD ["sh", "-c", "node node_modules/prisma/build/index.js migrate deploy && node prisma/seed.cjs && node dist/server.js"]
