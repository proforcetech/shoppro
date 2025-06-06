# ---------- STAGE 1: Build ----------
FROM node:24-alpine AS builder
WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm ci

# Copy source
COPY . .

# Generate Prisma Client
ENV DATABASE_URL=postgresql://admin:password@db:5432/shoppro
RUN npx prisma generate

# Build TypeScript
RUN npm run build
#RUN NODE_OPTIONS="--max-old-space-size=4096" npm run build

# ---------- STAGE 2: Production ----------
FROM node:24-alpine
WORKDIR /app

# Install production-only dependencies
COPY package*.json ./
RUN npm ci --omit=dev

# Copy compiled app and Prisma
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/node_modules/.prisma ./node_modules/.prisma

# Required for Prisma Client to run
ENV DATABASE_URL=postgresql://admin:password@db:5432/shoppro

# Expose app port
EXPOSE 3000

# Run migrations + start
CMD npx prisma migrate deploy && node dist/main
