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

- 📋 **Public registration form** — churches and leaders register for the VBS package providing contact info, church, denomination, location and role
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

> For production with PostgreSQL, see the [Docker](#docker-setup) or [Dokploy](#dokploy-deployment) sections below.

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

### 4. Set up the database

```bash
# Create tables and apply all migrations
yarn prisma migrate dev --name init

# Seed with default users and sample data
yarn prisma db seed
```

### 5. Start the development server

```bash
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

Default users created by the seed:

| Email             | Password     | Role   |
| ----------------- | ------------ | ------ |
| `admin@kids.com`  | `admin1234`  | admin  |
| `editor@kids.com` | `editor1234` | editor |

---

## Prisma — Database Commands

### First time / fresh clone

```bash
# Install deps + auto-generate Prisma Client
yarn install

# Create and apply first migration
yarn prisma migrate dev --name init

# Seed the database
yarn prisma db seed
```

### Day-to-day development

```bash
# After modifying schema.prisma — create and apply a new migration
yarn prisma migrate dev --name nombre_descriptivo

# Examples:
yarn prisma migrate dev --name add_foto_to_registro
yarn prisma migrate dev --name create_table_eventos

# Quick schema test without creating a migration (no history)
yarn prisma db push

# Regenerate Prisma Client manually (runs automatically on install and migrate)
yarn prisma generate
```

### Reset the database

```bash
# Wipe DB, re-apply all migrations and run seed
yarn prisma migrate reset

# Same but skip seed
yarn prisma migrate reset --skip-seed
```

### Production / Docker / Dokploy

```bash
# Apply existing migrations only — never use migrate dev in production
yarn prisma migrate deploy

# Check which migrations are applied / pending
yarn prisma migrate status
```

### Inspect the database

```bash
# Open Prisma Studio (visual GUI in the browser)
yarn prisma studio

# Pull schema from an existing database
yarn prisma db pull

# Format schema.prisma
yarn prisma format
```

### Quick reference

| Situation                      | Command                                      |
| ------------------------------ | -------------------------------------------- |
| First time / fresh clone       | `yarn prisma migrate dev --name init`        |
| Modified schema.prisma         | `yarn prisma migrate dev --name description` |
| Quick schema test (no history) | `yarn prisma db push`                        |
| Deploy to production           | `yarn prisma migrate deploy`                 |
| Check migration status         | `yarn prisma migrate status`                 |
| Reset everything (dev only)    | `yarn prisma migrate reset`                  |
| Inspect data visually          | `yarn prisma studio`                         |
| Client not generated           | `yarn prisma generate`                       |
| Load initial data              | `yarn prisma db seed`                        |

> 💡 **Rule of thumb:** use `migrate dev` in development, always use `migrate deploy` in production/Docker. Never run `migrate dev` in production.

---

## Docker Setup

> ⚠️ Before building, update `schema.prisma` to use `postgresql`:
>
> ```prisma
> datasource db {
>   provider = "postgresql"
>   url      = env("DATABASE_URL")
> }
> ```

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

# Seed (first time only)
docker compose exec app yarn prisma db seed

# View logs
docker compose logs -f app
```

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

## Dokploy Deployment

### 1. Create the database

In the Dokploy panel go to **Database → Create Database**, select **PostgreSQL**:

```
Name:     kids_db
User:     kids_user
Password: kids_pass
```

Copy the **Internal Database URL** — format: `postgresql://kids_user:kids_pass@kids_db:5432/kids_db`

### 2. Create the application

**Projects → Create Project → Create Service → Application**, connect your GitHub repo and set:

```
Branch:     main
Build Type: Dockerfile
```

### 3. Set environment variables

In the **Environment** tab:

```env
DATABASE_URL=postgresql://kids_user:kids_pass@kids_db:5432/kids_db
APP_URL=http://tu-dominio.com
MINISTERIO_LOGO=http://tu-dominio.com/img/logo.png
SMTP_HOST=smtp.tudominio.com
SMTP_PORT=587
SMTP_USER=notificaciones@tudominio.com
SMTP_PASS=tu_contraseña
CONTACT_EMAIL=equipo@ministerio.org
ADMIN_EMAIL=admin@ministerio.org
```

### 4. Set the start command

In **General → Start Command**:

```bash
sh -c "yarn prisma migrate deploy && node server.js"
```

### 5. Deploy

Click **Deploy** and follow the logs in the **Logs** tab.

### 6. Seed (first time only)

Once the container is running, open the **Terminal** tab in Dokploy and run:

```bash
yarn prisma db seed
```

### Troubleshooting

| Problem                   | Solution                                                                   |
| ------------------------- | -------------------------------------------------------------------------- |
| `Can't reach database`    | Make sure `DATABASE_URL` uses the internal container name, not `localhost` |
| `Prisma Client not found` | Add `yarn prisma generate &&` before `migrate deploy` in the start command |
| `Module not found`        | Verify the `Dockerfile` is at the root of the repo                         |
| Migrations not running    | Check container startup logs for `prisma migrate deploy` output            |

---

## Production Deployment (Vercel)

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

2. `postinstall` already runs `prisma generate` on every deploy automatically.
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
