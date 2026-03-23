FROM node:22-alpine AS builder
WORKDIR /app
RUN corepack enable
COPY package.json yarn.lock .yarnrc.yml ./
COPY prisma ./prisma/
RUN yarn install --immutable
COPY . .
ENV DATABASE_URL="postgresql://dummy:dummy@localhost:5432/dummy"
ENV NEXTAUTH_SECRET="dummy-secret-for-build"
ENV NEXTAUTH_URL="http://localhost:3000"
RUN yarn build

FROM node:22-alpine AS runner
WORKDIR /app
RUN corepack enable

ENV NODE_ENV=production

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Copiar archivos necesarios
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/yarn.lock ./yarn.lock
COPY --from=builder /app/.yarnrc.yml ./.yarnrc.yml
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/prisma.config.ts ./prisma.config.ts
COPY --from=builder /app/generated ./generated

# Copiar node_modules de producción solamente (optimización)
COPY --from=builder /app/node_modules ./node_modules

# Si existe .yarn, también copiarlo
COPY --from=builder /app/.yarn ./.yarn

COPY entrypoint.sh ./
RUN chmod +x entrypoint.sh

# Asegurar que Yarn está disponible
RUN corepack enable

USER nextjs
EXPOSE 3000

ENTRYPOINT ["./entrypoint.sh"]