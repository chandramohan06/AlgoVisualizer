# ── Build Stage ─────────────────────────────────────────────────────────────
FROM node:20-alpine AS builder

WORKDIR /usr/src/app

# Install build dependencies if needed
RUN apk add --no-cache python3 make g++

# Copy package configurations
COPY package*.json ./
COPY client/package*.json ./client/
COPY server/package*.json ./server/
COPY shared/package*.json ./shared/

# Install dependencies for all workspaces
RUN npm ci

# Copy all source assets
COPY . .

# Run typescript compilation and bundles creation
RUN npm run build

RUN echo "========== BUILDER =========="
RUN ls -R /usr/src/app/server
RUN ls -R /usr/src/app/server/dist
RUN ls -R /usr/src/app/shared
RUN ls -R /usr/src/app/shared/dist
RUN ls -R /usr/src/app/client
RUN ls -R /usr/src/app/client/dist

# Prune development dependencies
RUN npm prune --production

# ── Production Stage ────────────────────────────────────────────────────────
FROM node:20-alpine AS runner

WORKDIR /usr/src/app

ENV NODE_ENV=production
ENV PORT=3000

# Copy production assets and dependencies from builder stage
COPY --from=builder /usr/src/app/package*.json ./
COPY --from=builder /usr/src/app/node_modules ./node_modules
COPY --from=builder /usr/src/app/shared ./shared
COPY --from=builder /usr/src/app/server ./server
COPY --from=builder /usr/src/app/client/dist ./client/dist

RUN echo "========== RUNNER =========="
RUN ls -R /usr/src/app/server
RUN ls -R /usr/src/app/server/dist
RUN ls -R /usr/src/app/shared
RUN ls -R /usr/src/app/shared/dist
RUN ls -R /usr/src/app/client
RUN ls -R /usr/src/app/client/dist

# Expose port
EXPOSE 3000

# Run API server
CMD ["node", "server/dist/server.js"]
