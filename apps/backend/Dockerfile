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
RUN npm run build

# Stage 2: Production Dependencies
FROM node:20-alpine AS production-deps
WORKDIR /app
COPY package.json package-lock.json ./
COPY apps/backend/package.json ./apps/backend/
COPY apps/frontend/package.json ./apps/frontend/
RUN npm ci --omit=dev --ignore-scripts
# Generate prisma client for production
COPY apps/backend/prisma ./apps/backend/prisma
COPY apps/backend/prisma.config.ts ./apps/backend/
WORKDIR /app/apps/backend
RUN npx prisma generate

# Stage 3: Runner
FROM node:20-alpine
WORKDIR /app
ENV NODE_ENV=production

# Copy node_modules from production-deps
COPY --from=production-deps /app/node_modules ./node_modules
COPY --from=production-deps /app/apps/backend/node_modules ./apps/backend/node_modules

# Copy built app and config
COPY --from=builder /app/apps/backend/dist ./dist
COPY --from=builder /app/apps/backend/package.json ./
COPY --from=builder /app/apps/backend/prisma.config.ts ./
COPY --from=builder /app/apps/backend/prisma ./prisma
COPY --from=builder /app/apps/backend/prisma/seed.cjs ./prisma/seed.cjs

EXPOSE 4000
CMD ["sh", "-c", "npm run prisma:deploy && node dist/server.js"]
