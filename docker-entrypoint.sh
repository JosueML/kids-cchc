#!/bin/sh
set -e

echo "→ Aplicando migraciones..."
node_modules/.bin/prisma migrate deploy

echo "→ Iniciando Next.js..."
exec node server.js