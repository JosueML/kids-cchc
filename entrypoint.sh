#!/bin/sh
set -e

echo "⏳ Corriendo migraciones..."
yarn prisma migrate deploy

echo "🚀 Iniciando aplicación..."
exec node dist/main.js