# ---------- deps (instala node_modules) ----------
FROM node:20-bookworm-slim AS deps
WORKDIR /app
COPY package*.json ./
RUN npm ci --omit=dev=false

# ---------- build (compila TS y genera Prisma Client) ----------
FROM node:20-bookworm-slim AS build
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
# Si usas Prisma, genera client (no falla si no hay prisma)
RUN npx prisma generate || true
RUN npm run build

# ---------- runtime (producción) ----------
FROM node:20-bookworm-slim AS prod
WORKDIR /app
ENV NODE_ENV=production
# Copiamos lo mínimo
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/dist ./dist
COPY --from=build /app/prisma ./prisma
COPY docker-entrypoint.sh ./docker-entrypoint.sh
RUN chmod +x docker-entrypoint.sh
EXPOSE 3000

# HEALTHCHECK opcional (ajusta path)
HEALTHCHECK --interval=30s --timeout=3s --retries=5 \
  CMD node -e "fetch('http://localhost:3000/health').then(r=>process.exit(r.ok?0:1)).catch(()=>process.exit(1))"

CMD ["./docker-entrypoint.sh"]
