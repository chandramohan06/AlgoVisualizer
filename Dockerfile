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

# Prune development dependencies
RUN npm prune --production

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

# Expose API port
EXPOSE 3000

# Start server entrypoint
CMD ["node", "server/dist/server.js"]
