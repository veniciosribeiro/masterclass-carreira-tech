# Stage 1: Build the React application
FROM node:20-alpine AS builder
WORKDIR /app
# Copy root package files
COPY package.json package-lock.json ./
# Copy frontend package file
COPY apps/frontend/package.json ./apps/frontend/
# Install dependencies
RUN npm install
# Copy source code
COPY apps/frontend ./apps/frontend
# Build frontend
WORKDIR /app/apps/frontend
ARG VITE_API_URL
ARG VITE_META_EVENTS_API_URL
ENV VITE_API_URL=$VITE_API_URL
ENV VITE_META_EVENTS_API_URL=$VITE_META_EVENTS_API_URL
RUN npm run build

# Stage 2: Serve the application with Nginx
FROM nginx:alpine
COPY --from=builder /app/apps/frontend/dist /usr/share/nginx/html
COPY apps/frontend/nginx.conf /etc/nginx/templates/default.conf.template
# Purge do cache do Cloudflare, chamado como "Post-deployment command" no Coolify
# (ver o cabeçalho do script). Sem CF_API_TOKEN/CF_ZONE_ID não faz nada.
COPY apps/frontend/purge-cf-cache.sh /usr/local/bin/purge-cf-cache
RUN chmod +x /usr/local/bin/purge-cf-cache
EXPOSE 3000
CMD ["nginx", "-g", "daemon off;"]

