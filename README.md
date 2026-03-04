# VBS Registration System — Cristo en Cada Hogar Cuba

> **Sistema de registro para el paquete de Escuela Bíblica de Verano del ministerio Cristo en Cada Hogar — Cuba.**

A full-stack web application built to manage registrations for a Vacation Bible School (VBS) program promoted by the _Cristo en Cada Hogar_ ministry across Cuba. The system handles participant registration, training event management, and automated email notifications — all through a clean admin dashboard.

🌐 **Live Demo:** [kids.srv23177-206152.vps.etecsa.cu](http://kids.srv23177-206152.vps.etecsa.cu)

---

## Descripción del Proyecto

Esta aplicación fue desarrollada para el ministerio **Cristo en Cada Hogar — Cuba** con el objetivo de centralizar y simplificar el proceso de inscripción a su paquete de **Escuela Bíblica de Verano (EBV)**. Permite a iglesias y líderes de toda Cuba registrarse para recibir el material, gestionar entrenamientos regionales y mantener comunicación directa con el equipo ministerial mediante notificaciones por correo electrónico.

El panel administrativo ofrece control total sobre los registros, permitiendo aprobar, rechazar o hacer seguimiento a cada solicitud, así como gestionar los eventos de entrenamiento por municipio y provincia.

---

## Tech Stack

| Layer      | Technology                                                              |
| ---------- | ----------------------------------------------------------------------- |
| Framework  | [Next.js 16](https://nextjs.org) — App Router                           |
| Language   | TypeScript                                                              |
| Auth       | [NextAuth.js v4](https://next-auth.js.org) — Credentials provider       |
| ORM        | [Prisma 7](https://prisma.io) with migrations                           |
| Database   | SQLite (dev) / PostgreSQL (production)                                  |
| Styling    | [Tailwind CSS v4](https://tailwindcss.com)                              |
| Validation | [Zod](https://zod.dev) + [React Hook Form](https://react-hook-form.com) |
| Email      | [Nodemailer](https://nodemailer.com) via SMTP                           |
| IDs        | [@paralleldrive/cuid2](https://github.com/paralleldrive/cuid2)          |
| Deployment | VPS (Docker + PostgreSQL)                                               |

---

## Features

- 📋 **Public registration form** — churches and leaders can register for the VBS package providing their contact info, church, denomination, location and cargo
- ✅ **Status workflow** — each registration goes through `pendiente → aprobado / rechazado`
- 📧 **Automated email notifications** — confirmation and status update emails sent via SMTP
- 🔐 **Protected admin dashboard** — manage registrations and training events behind NextAuth authentication
- 🗓️ **Training event management** — create and track regional training sessions by municipality and province
- 🔒 **Role-based access** — `admin` and `editor` roles
- 📊 **Registration overview** — searchable and filterable list of all submissions

---

## Architecture

```
┌─────────────────────────────────────────────┐
│               Next.js 16 (App Router)        │
│                                             │
│  ┌──────────────┐     ┌───────────────────┐ │
│  │  Public Pages │     │  Admin Dashboard  │ │
│  │  /registro   │     │  /admin/*         │ │
│  └──────┬───────┘     └────────┬──────────┘ │
│         │                      │ NextAuth    │
│  ┌──────▼──────────────────────▼──────────┐ │
│  │           Route Handlers / API          │ │
│  └──────────────────┬─────────────────────┘ │
│                     │                       │
│  ┌──────────────────▼─────────────────────┐ │
│  │         Prisma ORM (type-safe)          │ │
│  └──────────────────┬─────────────────────┘ │
│                     │                       │
│  ┌──────────────────▼─────────────────────┐ │
│  │     SQLite (dev) / PostgreSQL (prod)    │ │
│  └─────────────────────────────────────────┘ │
└─────────────────────────────────────────────┘
```

---

## Prerequisites

- Node.js 20+
- Yarn 4.9+

> For production with PostgreSQL, see the [Docker section](#docker-setup) below.

---

## Local Development Setup

### 1. Clone the repository

```bash
git clone https://github.com/your-username/kids.git
cd kids
```

### 2. Install dependencies

```bash
yarn install
```

> `postinstall` runs `prisma generate` automatically after install.

### 3. Configure environment variables

```bash
cp .env.example .env
```

```env
# Database (SQLite for local dev)
DATABASE_URL="file:./dev.db"

# App
APP_URL=http://localhost:3000
MINISTERIO_LOGO=http://localhost:3000/img/logo.png

# Email (Nodemailer / SMTP)
SMTP_HOST=smtp.tudominio.com
SMTP_PORT=587
SMTP_USER=notificaciones@tudominio.com
SMTP_PASS=tu_contraseña

# Contact
CONTACT_EMAIL=equipo@ministerio.org
ADMIN_EMAIL=admin@ministerio.org
```

### 4. Run database migrations

```bash
yarn prisma migrate dev
```

### 5. Seed the database

```bash
yarn prisma db seed
```

Default users created by the seed:

| Email             | Password     | Role   |
| ----------------- | ------------ | ------ |
| `admin@kids.com`  | `admin1234`  | admin  |
| `editor@kids.com` | `editor1234` | editor |

### 6. Start the development server

```bash
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Database Commands

| Command                      | Description                                  |
| ---------------------------- | -------------------------------------------- |
| `yarn prisma migrate dev`    | Apply migrations and regenerate client (dev) |
| `yarn prisma migrate deploy` | Apply migrations in production               |
| `yarn prisma migrate reset`  | Reset DB and re-apply all migrations         |
| `yarn prisma generate`       | Regenerate Prisma Client without migrating   |
| `yarn prisma studio`         | Open Prisma Studio GUI                       |
| `yarn prisma db seed`        | Seed the database                            |

---

## Docker Setup

The Docker setup uses **PostgreSQL**. Update the `schema.prisma` datasource provider to `postgresql` before building.

### Option A — App + Database (recommended)

**`docker-compose.yml`**

```yaml
version: "3.9"

services:
    db:
        image: postgres:16-alpine
        container_name: kids_db
        restart: unless-stopped
        environment:
            POSTGRES_USER: kids_user
            POSTGRES_PASSWORD: kids_pass
            POSTGRES_DB: kids_db
        ports:
            - "5432:5432"
        volumes:
            - postgres_data:/var/lib/postgresql/data

    app:
        build: .
        container_name: kids_app
        restart: unless-stopped
        depends_on:
            - db
        ports:
            - "3000:3000"
        environment:
            DATABASE_URL: postgresql://kids_user:kids_pass@db:5432/kids_db
            APP_URL: http://localhost:3000
            MINISTERIO_LOGO: http://localhost:3000/img/logo.png
            SMTP_HOST: smtp.tudominio.com
            SMTP_PORT: 587
            SMTP_USER: notificaciones@tudominio.com
            SMTP_PASS: tu_contraseña
            CONTACT_EMAIL: equipo@ministerio.org
            ADMIN_EMAIL: admin@ministerio.org
        command: >
            sh -c "yarn prisma migrate deploy && yarn start"

volumes:
    postgres_data:
```

**`Dockerfile`**

```dockerfile
FROM node:20-alpine AS base
RUN corepack enable

FROM base AS deps
WORKDIR /app
COPY package.json yarn.lock .yarnrc.yml ./
RUN yarn install --immutable

FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN yarn prisma generate
RUN yarn build

FROM base AS runner
WORKDIR /app
ENV NODE_ENV=production
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/public ./public
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/node_modules/.prisma ./node_modules/.prisma

EXPOSE 3000
CMD ["node", "server.js"]
```

```bash
# Start everything
docker compose up -d

# Run migrations
docker compose exec app yarn prisma migrate deploy

# Seed
docker compose exec app yarn prisma db seed

# Logs
docker compose logs -f app
```

---

### Option B — Database only (dev mode)

```bash
docker run -d \
  --name kids_db \
  -e POSTGRES_USER=kids_user \
  -e POSTGRES_PASSWORD=kids_pass \
  -e POSTGRES_DB=kids_db \
  -p 5432:5432 \
  postgres:16-alpine
```

Update `.env`:

```env
DATABASE_URL="postgresql://kids_user:kids_pass@localhost:5432/kids_db"
```

```bash
yarn prisma migrate dev
yarn prisma db seed
yarn dev
```

---

## Production Deployment

### Vercel

1. Add all environment variables in the Vercel dashboard:

| Variable          | Description                           |
| ----------------- | ------------------------------------- |
| `DATABASE_URL`    | Production database connection string |
| `APP_URL`         | Public URL of your app                |
| `MINISTERIO_LOGO` | URL of the ministry logo              |
| `SMTP_HOST`       | SMTP server host                      |
| `SMTP_PORT`       | SMTP server port                      |
| `SMTP_USER`       | SMTP username                         |
| `SMTP_PASS`       | SMTP password                         |
| `CONTACT_EMAIL`   | Contact email shown in notifications  |
| `ADMIN_EMAIL`     | Admin email for internal alerts       |

2. `postinstall` already runs `prisma generate` on every deploy.
3. Run migrations before first deploy:

```bash
yarn prisma migrate deploy
```

---

## Project Structure

```
├── app/
│   ├── api/              # Route handlers (auth, registros, entrenamientos)
│   ├── admin/            # Protected admin dashboard
│   └── ...               # Public pages (registro, landing)
├── prisma/
│   ├── schema.prisma     # Models: Usuario, Registro, Entrenamiento
│   ├── migrations/       # Migration history
│   └── seed.ts           # Default users and sample data
├── components/           # Reusable UI components
├── lib/                  # Shared utilities (auth, email, db)
└── ...
```

---

## License

MIT
