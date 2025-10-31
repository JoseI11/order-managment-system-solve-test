# FROM node:20-bookworm-slim AS deps
# WORKDIR /app
# COPY package*.json ./
# RUN npm ci --omit=dev=false


# FROM node:20-bookworm-slim AS build
# WORKDIR /app
# COPY --from=deps /app/node_modules ./node_modules
# COPY . .

# RUN npx prisma generate || true
# RUN npm run build


# FROM node:20-bookworm-slim AS prod
# WORKDIR /app
# ENV NODE_ENV=production

# COPY --from=build /app/node_modules ./node_modules
# COPY --from=build /app/dist ./dist
# COPY --from=build /app/prisma ./prisma
# COPY docker-entrypoint.sh ./docker-entrypoint.sh
# RUN chmod +x docker-entrypoint.sh
# EXPOSE 3000


# HEALTHCHECK --interval=30s --timeout=3s --retries=5 \
#   CMD node -e "fetch('http://localhost:3000/health').then(r=>process.exit(r.ok?0:1)).catch(()=>process.exit(1))"

# CMD ["./docker-entrypoint.sh"]

# ---------- deps (descarga node_modules para compilar) ----------
FROM node:20-bookworm-slim AS deps
WORKDIR /app
COPY package*.json ./
RUN npm ci

# ---------- build (transpila TS) ----------
FROM node:20-bookworm-slim AS build
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
# solo transpila (no generes client aquí)
RUN npm run build

# ---------- runtime (producción) ----------
FROM node:20-bookworm-slim AS prod
WORKDIR /app
ENV NODE_ENV=production

# Prisma requiere openssl en runtime
RUN apt-get update -y && apt-get install -y openssl && rm -rf /var/lib/apt/lists/*

# instala deps de producción
COPY package*.json ./
RUN npm ci --omit=dev

# copia prisma y genera client con binarios del runtime
COPY --from=build /app/prisma ./prisma
RUN npx prisma generate || true

# copia la app compilada
COPY --from=build /app/dist ./dist

# entrypoint
COPY docker-entrypoint.sh ./docker-entrypoint.sh
RUN chmod +x docker-entrypoint.sh

EXPOSE 3000

# (opcional) healthcheck simple; si no tienes /health, cámbialo por /orders
HEALTHCHECK --interval=30s --timeout=5s --retries=5 \
  CMD node -e "fetch('http://localhost:3000/orders').then(r=>process.exit(r.ok?0:1)).catch(()=>process.exit(1))"

CMD ["./docker-entrypoint.sh"]

