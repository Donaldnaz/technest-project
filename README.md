# iCare

iCare is a healthcare management system that helps patients convert medical documents to plain English using system-enabled AI. Records are safely stored and private.

**Flow:** upload a document → AI produces a plain-English summary → read or download it in the portal.

**Stack:** Next.js App Router · Neon Postgres + Auth · Drizzle ORM · Vercel Blob · Vercel AI SDK (Gemini)

## Features

- Upload medical documents (PDF, JPEG, DOCX)
- AI plain-English summaries
- Read and download summaries
- Email/password (OTP) or Google sign-in
- Private storage per authenticated user

## Local setup

**Prerequisites:** Node.js 20+, a Neon project (Postgres + Auth), a Vercel Blob store for uploads, and a Gemini API key for AI features.

```bash
git clone https://github.com/Donaldnaz/technest-project.git
cd technest-project
npm ci
cp .env.example .env.local
```

Fill in `.env.local` (see below), then:

```bash
npm run db:migrate
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

In Neon Auth, enable Google and Email providers, add `http://localhost:3000` to trusted domains, and turn on sign-up OTP verification. Or pull env from Vercel after linking: `vercel env pull .env.local`.

## Environment variables

Copy from `.env.example`. Never commit real secrets.

| Variable | Required | Description |
|----------|----------|-------------|
| `DATABASE_URL` | Yes | Neon pooled Postgres connection string |
| `NEON_AUTH_BASE_URL` | Yes | Neon Console → Branch → Auth → Configuration |
| `NEON_AUTH_COOKIE_SECRET` | Yes | At least 32 characters (`openssl rand -base64 32`) |
| `BLOB_READ_WRITE_TOKEN` | For uploads | Vercel Blob store token |
| `GEMINI_API_KEY` | For AI | Google AI key for summaries and the organization assistant |
| `GOOGLE_GENERATIVE_AI_API_KEY` | No | Alternative name accepted by Vercel AI SDK |
| `GEMINI_MODEL` | No | Override default model (`gemini-2.5-flash-lite`) |
| `SLACK_WEBHOOK_URL` | No | Care-share alerts |
| `SLACK_BOT_TOKEN` / `SLACK_CHANNEL_ID` | No | Slack file uploads (`files:write`) |
| `SKIP_ENV_VALIDATION` | CI only | Set `true` for builds without secrets |

## Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Development server |
| `npm run build` | Production build |
| `npm run start` | Serve production build |
| `npm test` | Vitest |
| `npm run lint` | ESLint |
| `npm run typecheck` | TypeScript check |
| `npm run db:migrate` | Apply Drizzle migrations |
| `npm run db:generate` | Generate migrations from schema |
| `npm run db:studio` | Drizzle Studio |

## Packages

Local packages consumed by the app (`file:` dependencies):

- `document-summary-ai/` — `@icare/document-summary-ai`: Gemini-backed plain-language document summaries
- `organization-assistant/` — `@icare/organization-assistant`: floating chat widget and server reply logic
