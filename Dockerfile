# PR Shield — API Server Dockerfile
# Self-hosted deployment for Enterprise plan

FROM node:22-alpine AS builder

WORKDIR /app
COPY api/package*.json ./
RUN npm ci

COPY api/tsconfig.json ./
COPY api/src ./src
RUN npm run build

FROM node:22-alpine AS runner

WORKDIR /app
RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 appuser

COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY api/package.json ./

ENV NODE_ENV=production
ENV PORT=3001

USER appuser
EXPOSE 3001

CMD ["node", "dist/server.js"]
