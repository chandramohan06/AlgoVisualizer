# ── Build Stage ─────────────────────────────────────────────────────────────
FROM node:20-alpine AS builder

WORKDIR /usr/src/app

# Install build dependencies
RUN apk add --no-cache python3 make g++

# Copy workspace package manifests
COPY package*.json ./
COPY client/package*.json ./client/
COPY server/package*.json ./server/
COPY shared/package*.json ./shared/

# Install all workspace dependencies
RUN npm ci

# Copy all source assets
COPY . .

# Build all workspaces (shared -> client -> server)
RUN npm run build

# ── CHECKPOINT 1 ──
RUN echo "===== BUILDER SERVER =====" && ls -R /usr/src/app/server
RUN echo "===== BUILDER SERVER DIST =====" && ls -R /usr/src/app/server/dist || true
RUN echo "===== BUILDER SHARED =====" && ls -R /usr/src/app/shared
RUN echo "===== BUILDER SHARED DIST =====" && ls -R /usr/src/app/shared/dist || true
RUN echo "===== BUILDER CLIENT DIST =====" && ls -R /usr/src/app/client/dist || true
RUN echo "===== BUILDER ENTRY =====" && (test -f /usr/src/app/server/dist/server.js && echo "FOUND server.js" || echo "MISSING server.js")

# Prune development dependencies
RUN npm prune --production

# ── CHECKPOINT 2 ──
RUN echo "===== AFTER PRUNE SERVER =====" && ls -R /usr/src/app/server || true
RUN echo "===== AFTER PRUNE SERVER DIST =====" && ls -R /usr/src/app/server/dist || true
RUN echo "===== AFTER PRUNE SHARED =====" && ls -R /usr/src/app/shared || true
RUN echo "===== AFTER PRUNE SHARED DIST =====" && ls -R /usr/src/app/shared/dist || true
RUN echo "===== AFTER PRUNE ENTRY =====" && (test -f /usr/src/app/server/dist/server.js && echo "FOUND server.js" || echo "MISSING server.js")

# ── Production Stage ────────────────────────────────────────────────────────
FROM node:20-alpine AS runner

WORKDIR /usr/src/app

ENV NODE_ENV=production
ENV PORT=3000

# Copy root manifests and node_modules
COPY --from=builder /usr/src/app/package*.json ./
COPY --from=builder /usr/src/app/node_modules ./node_modules

# Copy compiled shared workspace
COPY --from=builder /usr/src/app/shared/package*.json ./shared/
COPY --from=builder /usr/src/app/shared/dist ./shared/dist

# Copy compiled server workspace
COPY --from=builder /usr/src/app/server/package*.json ./server/
COPY --from=builder /usr/src/app/server/dist ./server/dist

# Copy compiled client frontend static bundle
COPY --from=builder /usr/src/app/client/dist ./client/dist

# ── CHECKPOINT 3 ──
RUN echo "===== RUNNER ROOT =====" && ls -R /usr/src/app
RUN echo "===== RUNNER SERVER =====" && ls -R /usr/src/app/server || true
RUN echo "===== RUNNER SERVER DIST =====" && ls -R /usr/src/app/server/dist || true
RUN echo "===== RUNNER SHARED =====" && ls -R /usr/src/app/shared || true
RUN echo "===== RUNNER CLIENT =====" && ls -R /usr/src/app/client || true
RUN echo "===== RUNNER NODE_MODULES =====" && (ls /usr/src/app/node_modules | head -50)
RUN echo "===== RUNNER ENTRY =====" && (test -f /usr/src/app/server/dist/server.js && echo "FOUND server.js" || echo "MISSING server.js")

# Expose API port
EXPOSE 3000

# Start server entrypoint
CMD ["node", "server/dist/server.js"]
