# iCare — QA Checklist

Run this checklist before merging to `main` or promoting a Vercel preview to production.

## Automated gates (CI)

These run on every push to `dev` / `main` and on pull requests:

```bash
npm run lint
npm run typecheck
npm run typecheck:assistant
npm run test
npm run build
npm run test:e2e   # after build; see CI e2e job
```

All commands must pass locally before you rely on CI.

---

## Environment setup

### Required (Neon + Vercel)

| Variable | Source | Blocks if missing |
|----------|--------|-------------------|
| `DATABASE_URL` | Neon Console → Connection string (pooled) | Auth, DB, dashboard |
| `NEON_AUTH_BASE_URL` | Neon Console → Auth → Configuration | Sign-in, sign-up |
| `NEON_AUTH_COOKIE_SECRET` | `openssl rand -base64 32` | Session cookies |
| `BLOB_READ_WRITE_TOKEN` | Vercel → Storage → Blob store | Document upload (503) |

### Optional

| Variable | Purpose |
|----------|---------|
| `GEMINI_API_KEY` | AI extraction + assistant chat |
| `SLACK_WEBHOOK_URL` | Care-share and upload Slack alerts |
| `SLACK_BOT_TOKEN` + `SLACK_CHANNEL_ID` | Slack file attachments |

Copy [`.env.example`](.env.example) to `.env.local` and fill values for local/staging QA.

### Neon Auth console settings

- **Trusted origins:** Include `http://localhost:3000`, your Vercel preview URL(s), and production domain. Empty `trusted_origins` causes “invalid origin” on deployed sign-up.
- **Email verification:** Enable verify-at-sign-up with OTP (verification code).
- **Google OAuth:** Configure client ID/secret and redirect URLs for staging and production.
- **SMTP (production):** Custom SMTP for reliable OTP delivery.

### Vercel project

- Link Blob store to the project so `BLOB_READ_WRITE_TOKEN` is injected.
- Set all required env vars for Preview and Production.
- Use preview deployments for manual QA before merging to `main`.

---

## Critical path smoke test (manual)

Requires real Neon Auth + Blob credentials. Gemini optional for step 8.

| Step | Action | Expected | Pass |
|------|--------|----------|------|
| 1 | Open `/` | Landing loads; Sign in / Get started visible | ☐ |
| 2 | Sign up at `/auth/sign-up` | Redirect to email OTP | ☐ |
| 3 | Verify OTP | Authenticated session | ☐ |
| 4 | Complete `/onboarding` | Redirect to `/dashboard/patients/{id}` | ☐ |
| 5 | Overview tab — **Share with provider** form | Submit practitioner email; success toast | ☐ |
| 6 | Upload tab — upload PDF | Blob + DB record; status `processing` or `ready` | ☐ |
| 7 | `/dashboard` | Metrics reflect new document | ☐ |
| 8 | Timeline tab | Document listed with correct status | ☐ |
| 9 | Download tab (if `GEMINI_API_KEY` set) | Summary report available | ☐ |

---

## Regression (PR #4 — sidebar & patient tabs)

Test on **desktop and mobile** after dashboard UI changes.

| Area | What to verify | Pass |
|------|----------------|------|
| Sidebar toggle | Chevron fully visible at sidebar seam; not clipped under main column | ☐ |
| Sidebar collapse | Toggle stays aligned during 200ms width transition | ☐ |
| Sidebar hydration | No layout flash on reload; collapsed state matches preference | ☐ |
| Patient tabs | Only active tab panel visible; no blank panels | ☐ |
| Tab bar | No horizontal bleed from negative margins | ☐ |

---

## Upload edge cases

| Case | Expected | Pass |
|------|----------|------|
| Missing `BLOB_READ_WRITE_TOKEN` | `GET /api/upload` → 503; upload UI shows storage error | ☐ |
| Invalid MIME type | Client or server rejection with clear message | ☐ |
| Max-size PDF | Upload succeeds or shows size limit error | ☐ |
| Unauthenticated `POST /api/upload` | JSON 401 (covered by Playwright smoke test) | ☐ |

---

## Auth flows

| Flow | Pass |
|------|------|
| Email sign-in | ☐ |
| Google OAuth (staging domain in trusted origins) | ☐ |
| Forgot password → reset | ☐ |
| Sign out → lands on `/auth/sign-in` without spinner hang | ☐ |

---

## Care share

| Step | Pass |
|------|------|
| Open patient Overview tab | ☐ |
| Submit valid practitioner email | ☐ |
| Confirm `care_shares` row in DB (or Slack notification if configured) | ☐ |
| Invalid email shows validation error | ☐ |

---

## Assistant widget

| Context | Pass |
|---------|------|
| Landing `/` — open widget, send message | ☐ |
| Dashboard — open widget, suggested question | ☐ |
| Without `GEMINI_API_KEY` — graceful error (no crash) | ☐ |

---

## Sign-off

| Field | Value |
|-------|-------|
| Tester | |
| Date | |
| Environment (local / preview / production) | |
| Branch / commit | |
| Critical path (steps 1–9) | ☐ Pass / ☐ Fail |
| Regression (sidebar + tabs) | ☐ Pass / ☐ Fail |
| Notes | |

---

See also [`QA-REPORT.md`](QA-REPORT.md) for the full feature matrix and static audit findings.
