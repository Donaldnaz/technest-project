# iCare — Patient Ingestion Engine

Serverless patient ingestion and clinical document management built with Next.js App Router, Neon Auth, Drizzle ORM, and Vercel Blob.

## Features

- Google OAuth via Neon Auth
- Tenant-isolated patient CRUD (per authenticated user)
- Secure PDF/JPEG uploads via Vercel Blob client upload pipeline
- Dashboard with patient and document overview
- Typed environment validation with `@t3-oss/env-nextjs`

## Prerequisites

- Node.js 18+
- Neon project with Auth enabled
- Vercel project with Blob store linked (for production uploads)

## Local setup

1. Copy environment variables:

```bash
cp .env.example .env.local
```

2. Fill in `.env.local`:

- `DATABASE_URL` — Neon pooled connection string
- `NEON_AUTH_BASE_URL` — from Neon Console → Branch → Auth
- `NEON_AUTH_COOKIE_SECRET` — at least 32 characters (`openssl rand -base64 32`)
- `BLOB_READ_WRITE_TOKEN` — from Vercel Blob store

Alternatively, pull from Vercel after linking the project:

```bash
vercel env pull .env.local
```

3. Apply database migrations:

```bash
npm run db:migrate
```

4. Start the dev server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) for the landing page, then sign in or sign up with Google.

## OAuth configuration

In the Neon Console (Branch → Auth):

- Enable the **Google** and **Email** providers
- Add `http://localhost:3000` to trusted domains for local development
- Register provider redirect URIs as `{NEON_AUTH_BASE_URL}/callback/{provider}`

For production/preview deployments, add each deployment URL to trusted domains.

## Auth troubleshooting

**Google sign-in returns to `/auth/sign-in` after choosing an account**

- Middleware must run on the OAuth return URL (`/` with `neon_auth_session_verifier`). This app uses Neon’s broad middleware matcher so the session exchange completes server-side.
- Restart the dev server after changing `NEON_AUTH_COOKIE_SECRET`.
- Confirm `http://localhost:3000` is in Neon trusted domains.

**Email sign-up returns 422**

- Enable the **Email** provider in Neon Console → Branch → Auth → Providers.
- Use a password of at least 8 characters and include your full name on sign-up.
- If the email is already registered, sign in instead or use a different address.
- Check the toast error message on the sign-up form for the exact reason.

## Vercel deployment

Production builds succeed (commit `558c5a3` on `main`). If the site shows **404 NOT_FOUND** or redirects to Vercel login, fix these in the [Vercel dashboard](https://vercel.com/ikennaanasieze-7574s-projects/technest-project):

### 1. Turn off deployment protection (required for public access)

1. Open **Project → Settings → Deployment Protection**
2. Under **Production**, set protection to **None** (or disable *Vercel Authentication*)
3. Save

Without this, visitors are redirected to `vercel.com/sso-api` instead of your app.

### 2. Use a working production URL

| URL | Status |
|-----|--------|
| `https://technest-project-pi.vercel.app` | Broken (404) — do not use |
| `https://technest-project-git-main-ikennaanasieze-7574s-projects.vercel.app` | Correct production alias (after step 1) |
| `https://technest-project-ikennaanasieze-7574s-projects.vercel.app` | Team production domain (after step 1) |

To fix the broken `-pi` domain: **Settings → Domains** → remove `technest-project-pi.vercel.app` → add it again → redeploy from `main`.

### 3. Required Vercel environment variables

Set these under **Project → Settings → Environment Variables** (Production):

- `DATABASE_URL`
- `NEON_AUTH_BASE_URL`
- `NEON_AUTH_COOKIE_SECRET` (32+ chars)
- `BLOB_READ_WRITE_TOKEN`
- `GEMINI_API_KEY` (optional)

Also add your production URL to **Neon Console → Auth → Trusted domains**.

## Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Production build |
| `npm run typecheck` | TypeScript check |
| `npm run lint` | ESLint |
| `npm run db:migrate` | Apply Drizzle migrations |
| `npm run db:studio` | Open Drizzle Studio |

## Security notes

- All patient and document queries are scoped by authenticated `userId`
- Upload route validates MIME type and size server-side
- Security headers are configured in `next.config.ts`
- Do not commit `.env.local` or real secrets

## Phase 2 (planned)

- Gemini 2.5 Flash document ingestion with structured Zod output
- Slack alerts with PHI masking
