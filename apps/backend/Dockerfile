FROM node:20-alpine AS builder
WORKDIR /app
# Copy root package files
COPY package.json package-lock.json ./
# Copy backend package file
COPY apps/backend/package.json ./apps/backend/
# Install dependencies (from root to get workspace links)
RUN npm install
# Copy source code
COPY apps/backend ./apps/backend
# Build backend
WORKDIR /app/apps/backend
RUN npx prisma generate
RUN npm run build

FROM node:20-alpine
WORKDIR /app
COPY --from=builder /app/apps/backend/dist ./dist
# Copy root node_modules first
COPY --from=builder /app/node_modules ./node_modules
# Attempt to copy backend local node_modules if they exist (where prisma might be)
# We use a wildcard to avoid failure if directory doesn't exist, but specific copy is safer.
# Instead, let's just assume standard behavior and copy prisma folder to runtime
COPY --from=builder /app/apps/backend/prisma ./prisma
# Copy backend package.json LAST to ensure type:module is active
COPY --from=builder /app/apps/backend/package.json ./
COPY --from=builder /app/apps/backend/prisma.config.ts ./

EXPOSE 4000
CMD ["sh", "-c", "npm run prisma:deploy && node dist/server.js"]
