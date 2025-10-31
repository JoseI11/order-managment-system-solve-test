#!/usr/bin/env bash
set -e

# Ejecuta migraciones si usas Prisma y tienes DATABASE_URL
if [ -f "./prisma/schema.prisma" ] && [ -n "${DATABASE_URL}" ]; then
  echo "▶ Running prisma migrate deploy..."
  npx prisma migrate deploy || true
fi

echo "▶ Starting API..."
exec node dist/index.js
