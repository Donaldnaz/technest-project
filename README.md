# iCare — Secure Medical Document Portal

iCare is a patient-facing health records portal built with Next.js. Users create an account, upload clinical documents (PDFs and images), organize them in a private library, and optionally share records with their care team. Document summaries can be generated with Gemini; all patient data is scoped to the authenticated user.

**Stack:** Next.js App Router · Neon Postgres + Auth · Drizzle ORM · Vercel Blob · Vercel AI SDK (Gemini)

## Features

- Email/password sign-up with OTP verification, plus Google OAuth
- Tenant-isolated patient profiles and document storage (per authenticated user)
- Secure PDF/JPEG uploads via Vercel Blob
- AI-assisted document extraction and plain-language summaries (optional, requires `GEMINI_API_KEY`)
- Practitioner onboarding flow and care-share requests with optional Slack notifications
- Typed environment validation via `@t3-oss/env-nextjs`

## Prerequisites

- **Node.js 20+** and npm
- **Neon** project with Postgres and Auth enabled
- **Vercel** project with a linked Blob store (required for uploads in production)
- **Google Cloud** API key for Gemini (optional, for AI extraction)

## Local setup

1. Clone the repository and install dependencies:

```bash
git clone https://github.com/Donaldnaz/technest-project.git
cd technest-project
npm ci
```

2. Create a local env file from the template:

```bash
cp .env.example .env.local
```

3. Fill in the required values in `.env.local`. See [Environment variables](#environment-variables) below and `.env.example` for the full list.

4. Apply database migrations:

```bash
npm run db:migrate
```

5. Start the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) for the landing page.

Alternatively, after linking the project to Vercel:

```bash
vercel env pull .env.local
```

## Environment variables

Copy `.env.example` to `.env.local` and set values there. **Never commit `.env`, `.env.local`, or real secrets.**

| Variable | Required | Description |
|----------|----------|-------------|
| `DATABASE_URL` | Yes | Neon pooled Postgres connection string |
| `NEON_AUTH_BASE_URL` | Yes | From Neon Console → Branch → Auth → Configuration |
| `NEON_AUTH_COOKIE_SECRET` | Yes | At least 32 characters (`openssl rand -base64 32`) |
| `BLOB_READ_WRITE_TOKEN` | For uploads | From Vercel Blob store (auto-injected when linked) |
| `GEMINI_API_KEY` | No | Google AI key for document extraction |
| `GOOGLE_GENERATIVE_AI_API_KEY` | No | Alternative name accepted by Vercel AI SDK |
| `GEMINI_MODEL` | No | Override default model (`gemini-2.5-flash-lite`) |
| `SLACK_WEBHOOK_URL` | No | Incoming webhook for care-share alerts |
| `SLACK_BOT_TOKEN` / `SLACK_CHANNEL_ID` | No | Slack bot file uploads (requires `files:write` scope) |
| `SKIP_ENV_VALIDATION` | CI only | Set to `true` for builds without real secrets |

## Authentication

### Providers

In **Neon Console → Branch → Auth → Providers**, enable:

- **Google** — OAuth sign-in
- **Email** — email/password sign-up and sign-in

Add `http://localhost:3000` to **Trusted domains** for local development. For production and preview deployments, add each deployment URL.

Provider redirect URIs follow the pattern `{NEON_AUTH_BASE_URL}/callback/{provider}`.

### Email sign-up and OTP verification

1. In Neon Auth, enable **Verify at sign-up** and choose **Verification code (OTP)**.
2. User signs up with email, password, and full name.
3. After sign-up, the app redirects to `/auth/email-otp` to enter the 6-digit code sent by email.
4. Once verified, the user signs in and completes onboarding before reaching the dashboard.

Optional: configure a custom SMTP provider in Neon for production email delivery.

## Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Production build |
| `npm run start` | Serve production build |
| `npm test` | Run Vitest unit and integration tests |
| `npm run test:watch` | Run tests in watch mode |
| `npm run typecheck` | TypeScript check |
| `npm run lint` | ESLint |
| `npm run db:migrate` | Apply Drizzle migrations |
| `npm run db:generate` | Generate migrations from schema changes |
| `npm run db:studio` | Open Drizzle Studio |

## Deployment (Vercel)

1. Connect the repository to Vercel and link a Blob store.
2. Set required environment variables for Production (and Preview if needed): `DATABASE_URL`, `NEON_AUTH_BASE_URL`, `NEON_AUTH_COOKIE_SECRET`, `BLOB_READ_WRITE_TOKEN`.
3. Add your production URL to **Neon Console → Auth → Trusted domains**.
4. Under **Project → Settings → Deployment Protection**, disable Vercel Authentication for public access if the app should be reachable without a Vercel login.

Run `npm run build` locally to verify the build before deploying.

## Security

- Patient and document queries are scoped by authenticated `userId`
- Upload routes validate MIME type and file size server-side
- Security headers are configured in `next.config.ts`
- Slack notifications mask PHI where applicable
