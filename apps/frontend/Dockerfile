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
RUN npm run build

# Stage 2: Serve the application with Nginx
FROM nginx:alpine
COPY --from=builder /app/apps/frontend/dist /usr/share/nginx/html
COPY apps/frontend/nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 3000
CMD ["nginx", "-g", "daemon off;"]

