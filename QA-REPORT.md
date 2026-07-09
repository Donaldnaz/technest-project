# iCare — QA Testing Report

**Date:** July 9, 2026  
**Last updated:** July 9, 2026 (post QA health improvements on `dev`)  
**Scope:** End-to-end feature readiness, automated checks, static code-path review, manual QA checklist  
**Environment:** Local workspace audit (`/Users/apple/Desktop/Technest Project.`)  
**Branch context:** `dev` at `5d1e097` — QA improvements (care share, Playwright, integration tests); prior PR #4 sidebar/tab fixes on `main`

---

## Executive Summary

**Overall health: 🟡 YELLOW → deploy-ready with automated gates; manual staging validation still required.**

The application has a solid foundation: **34/34 Vitest tests pass**, **3 Playwright smoke tests pass**, ESLint is clean, **typecheck and production build pass**, and auth proxy/middleware is thoughtfully implemented (including synthetic session checks for Blob uploads and Server Actions). Tenant-scoped data access is partially covered by tests.

**Resolved since initial audit:**

- Build/typecheck blocker in `organization-assistant/src/errors.ts` — fixed (`11cb929`)
- `organization-assistant/` isolated from root compile graph via `tsconfig.json` exclude + `npm run typecheck:assistant`
- Care share UI wired on patient Overview tab (`ShareWithProvider` in `patient-overview-panel.tsx`)
- Playwright smoke suite added (`e2e/smoke.spec.ts`) with CI `e2e` job
- Integration tests for upload auth (401) and preview route (401/404/200)
- Manual QA process documented in [`QA-CHECKLIST.md`](QA-CHECKLIST.md)

**Still required before production confidence:**

- Manual critical-path session on staging (Neon Auth OTP, Blob upload, optional Gemini)
- PR #4 regression pass (sidebar toggle, patient tabs) on desktop + mobile
- Auth flows (Google OAuth, password reset) with real Neon Console configuration

| Area | Status |
|------|--------|
| Lint | ✅ Pass |
| Unit/integration tests | ✅ 34/34 pass (10 files) |
| TypeScript (root) | ✅ Pass |
| TypeScript (`organization-assistant`) | ✅ Pass (`npm run typecheck:assistant`) |
| Production build | ✅ Pass |
| E2E automation | ✅ 3 smoke tests (Playwright) |
| Manual E2E (full critical path) | ⏳ Required — see [`QA-CHECKLIST.md`](QA-CHECKLIST.md) |

---

## Automated Test Results

| Check | Command | Result | Notes |
|-------|---------|--------|-------|
| ESLint | `npm run lint` | **PASS** | No errors or warnings |
| TypeScript (root) | `npm run typecheck` | **PASS** | `organization-assistant/` excluded from root graph |
| TypeScript (assistant) | `npm run typecheck:assistant` | **PASS** | Standalone package typecheck |
| Vitest | `npm run test` | **PASS** | 10 files, 34 tests, ~2.4s |
| Production build | `SKIP_ENV_VALIDATION=true npm run build` | **PASS** | CI env placeholders |
| Playwright smoke | `npm run test:e2e` | **PASS** | 3 tests — landing, auth redirect, upload 401 |

### Vitest Coverage Summary

| Test file | What it verifies |
|-----------|------------------|
| `tests/unit/password-policy.test.ts` | Password validation rules |
| `tests/unit/account-providers.test.ts` | OAuth vs email provider detection |
| `tests/unit/onboarding-validation.test.ts` | Onboarding form schema (self/caregiver, specialty) |
| `tests/unit/document-validation.test.ts` | Upload payload MIME/UUID validation; care-share email schema |
| `tests/unit/format-summary-report.test.ts` | Summary report text formatting and filenames |
| `tests/unit/mask-phi.test.ts` | PHI masking for Slack notifications |
| `tests/integration/tenant-isolation.test.ts` | Patient/summary queries scoped by `userId` (mocked DB) |
| `tests/integration/summary-download-route.test.ts` | `GET /api/documents/[id]/summary` — 401/404/200 (mocked) |
| `tests/integration/preview-route.test.ts` | `GET /api/documents/[id]/preview` — 401/404/200 (mocked) |
| `tests/integration/upload-route.test.ts` | `POST /api/upload` — 401 when session missing (mocked Blob handler) |

### Playwright Smoke Coverage

| Test | What it verifies |
|------|------------------|
| Landing page loads | Title, hero heading, primary nav, assistant button |
| Dashboard redirect | Unauthenticated `/dashboard` → `/auth/sign-in` |
| Upload API 401 | `POST /api/upload` without session returns JSON 401 (via `proxy.ts`) |

**Not covered by automated tests:** Neon OTP sign-up/sign-in, Google OAuth, onboarding server action (E2E), live Blob upload, Gemini extraction quality, assistant chat replies, UI component regressions (sidebar/tabs), live Slack notifications, real SQL tenant isolation.

---

## Application Route Map

```
/                           Marketing landing
/legal                      Legal hub
/legal/privacy              Privacy policy
/legal/terms                Terms of service
/legal/accessibility        Accessibility statement

/auth/sign-in               Sign in (email + Google)
/auth/sign-up               Sign up
/auth/email-otp             OTP verification
/auth/forgot-password       Password reset request
/auth/reset-password        Password reset
/auth/sign-out              Sign out

/onboarding                 Practitioner/patient onboarding form

/dashboard                  Health overview (metrics, timeline, pillbox)
/dashboard/patients         Redirect → first patient or /dashboard
/dashboard/patients/[id]    Patient workspace (tabs: overview, upload, timeline, download)
/dashboard/patients/new     Redirect → /dashboard/patients

/account/settings           Read-only account profile
/account/security           Change password

/api/auth/[...path]         Neon Auth proxy
/api/upload                 Blob upload token + completion (GET health check)
/api/documents/[id]/preview Signed preview URL (JSON)
/api/documents/[id]/summary Summary report download (text/plain)
```

---

## Auth & Middleware (Static Review)

**File:** `proxy.ts` (Next.js middleware equivalent)

| Route class | Behavior |
|-------------|----------|
| Public | `/`, `/legal/*`, `/auth/*`, `/api/auth/*` |
| Protected | `/dashboard/*`, `/onboarding`, `/account/*`, `/api/upload`, `/api/documents/*` |
| OAuth callback | `/` with `neon_auth_session_verifier` query param is **not** public — correctly protected |

**Synthetic session check:** Server Actions (`next-action` header) and `POST /api/upload` use a GET-based session probe to avoid breaking multipart/Blob bodies. Upload auth failures return JSON 401 instead of HTML redirect. **Verified by Playwright smoke test.**

**Layout gates:**
- `(dashboard)/layout.tsx` — requires session → `/auth/sign-in`; requires onboarding → `/onboarding`
- `(onboarding)/onboarding/page.tsx` — requires session; redirects to `/dashboard` if onboarding complete
- `(auth)/auth/[path]/page.tsx` — redirects authenticated users away from sign-in/sign-up

**Env requirements (validated via `lib/env.ts` + `.env.example`):**

| Variable | Required | Blocks |
|----------|----------|--------|
| `DATABASE_URL` | Yes | All DB routes, auth session |
| `NEON_AUTH_BASE_URL` | Yes | Auth |
| `NEON_AUTH_COOKIE_SECRET` | Yes (≥32 chars) | Auth cookies |
| `BLOB_READ_WRITE_TOKEN` | Uploads | Document upload (503 if missing) |
| `GEMINI_API_KEY` | Optional | AI extraction; without it docs go straight to `ready` |
| `SLACK_WEBHOOK_URL` | Optional | Care-share/upload Slack alerts only |
| `SKIP_ENV_VALIDATION` | CI only | Allows build without secrets |

Local note: `.env` present for local development.

---

## Feature Matrix

### 1. Marketing / Landing

| Field | Value |
|-------|-------|
| **Routes** | `/` |
| **Status** | **PARTIAL AUTO** / **NEEDS MANUAL** (CTAs, mobile menu) |

**Test steps:**
1. Open `/` — verify hero, What We Do, dashboard showcase, About, Contact, CTA sections render.
2. Click nav hash links (`#about`, `#contact`, etc.) — page scrolls correctly (`LandingHashScroll`).
3. Click “Get started” / “Sign in” — navigates to `/auth/sign-up` and `/auth/sign-in`.
4. Resize to mobile — hamburger menu opens, links work.
5. Open floating assistant widget — welcome message appears.

**Expected:** Public page loads without auth; CTAs route to auth; assistant opens (reply needs `GEMINI_API_KEY`).

**Automated:** Playwright — title, hero heading, primary nav, assistant button visible.

**Dependencies:** None for static content; assistant needs `GEMINI_API_KEY`.

---

### 2. Legal Pages

| Field | Value |
|-------|-------|
| **Routes** | `/legal`, `/legal/privacy`, `/legal/terms`, `/legal/accessibility` |
| **Status** | **NEEDS MANUAL** |

**Test steps:**
1. Visit `/legal` — hub shows cards for Privacy, Terms, Accessibility.
2. Open each sub-page — content renders, breadcrumb/back links work.
3. Confirm pages load **without** signing in (public per `proxy.ts`).

**Expected:** All legal pages accessible anonymously.

**Dependencies:** None.

---

### 3. Authentication — Sign Up (Email)

| Field | Value |
|-------|-------|
| **Routes** | `/auth/sign-up` → `/auth/email-otp` |
| **Status** | **NEEDS MANUAL** |

**Test steps:**
1. Go to `/auth/sign-up`, enter name, email, password (meet password policy).
2. Submit — redirect to `/auth/email-otp?email=...`.
3. Enter 6-digit OTP from email (Neon Auth must have “Verify at sign-up” + OTP enabled).
4. After verification — session established, redirect toward onboarding or dashboard.

**Expected:** Account created, email verified, authenticated session.

**Dependencies:** `NEON_AUTH_BASE_URL`, `NEON_AUTH_COOKIE_SECRET`, `DATABASE_URL`, Neon email/OTP config, trusted domain in Neon Console.

---

### 4. Authentication — Sign In (Email)

| Field | Value |
|-------|-------|
| **Routes** | `/auth/sign-in` |
| **Status** | **NEEDS MANUAL** |

**Test steps:**
1. Sign in with verified credentials.
2. Confirm redirect to `/onboarding` (new user) or `/dashboard` (onboarding complete).
3. Visit `/auth/sign-in` while logged in — should redirect away.

**Expected:** Session cookie set; protected routes accessible.

**Dependencies:** Neon Auth email provider enabled.

**Automated:** Playwright — unauthenticated `/dashboard` redirects to `/auth/sign-in`.

---

### 5. Authentication — Google OAuth

| Field | Value |
|-------|-------|
| **Routes** | `/auth/sign-in`, `/auth/sign-up` (Google button via Neon Auth UI) |
| **Status** | **NEEDS MANUAL** |

**Test steps:**
1. Click “Continue with Google” on sign-in or sign-up.
2. Complete Google consent — callback via Neon Auth.
3. Land in app with session; complete onboarding if first visit.

**Expected:** OAuth flow completes; user record in Neon Auth.

**Dependencies:** Google provider enabled in Neon Console; redirect URI `{NEON_AUTH_BASE_URL}/callback/google`; trusted domains.

---

### 6. Authentication — Password Reset

| Field | Value |
|-------|-------|
| **Routes** | `/auth/forgot-password`, `/auth/reset-password` |
| **Status** | **NEEDS MANUAL** |

**Test steps:**
1. Request reset link from forgot-password page.
2. Open email link — lands on reset-password view.
3. Set new password — sign in with new password works.

**Expected:** Password updated via Neon Auth.

**Dependencies:** Neon email delivery (SMTP in production).

---

### 7. Authentication — Sign Out

| Field | Value |
|-------|-------|
| **Routes** | `/auth/sign-out` |
| **Status** | **NEEDS MANUAL** |

**Test steps:**
1. Sign out from user menu or `/auth/sign-out`.
2. Attempt `/dashboard` — redirect to `/auth/sign-in`.

**Expected:** Session cleared; no spinner hang (fixed in commit `40df842`).

**Dependencies:** Neon Auth.

---

### 8. Onboarding

| Field | Value |
|-------|-------|
| **Routes** | `/onboarding` |
| **Status** | **PASS** (validation) / **NEEDS MANUAL** (E2E) |

**Test steps:**
1. As new authenticated user, land on `/onboarding`.
2. Fill account name, patient details, healthcare location, specialty, consents.
3. Submit — redirect to `/dashboard/patients/{newPatientId}`.
4. Revisit `/onboarding` — redirect to `/dashboard`.
5. Test “Other” specialty requires custom text (validated in unit tests).

**Expected:** Profile + patient created in DB; onboarding flag set.

**Dependencies:** `DATABASE_URL`, migrations applied (`npm run db:migrate`).

**Automated:** `onboardingSchema` unit tests (3 cases).

---

### 9. Dashboard Home

| Field | Value |
|-------|-------|
| **Routes** | `/dashboard` |
| **Status** | **NEEDS MANUAL** |

**Test steps:**
1. Load dashboard after onboarding — welcome banner shows user name.
2. Metric cards show document counts (total, ready, processing).
3. Document pillbox and care timeline render.
4. Sidebar nav: Overview, Records, Settings links work.
5. Mobile bottom nav mirrors sidebar (lg:hidden).

**Expected:** Tenant-scoped stats from DB.

**Dependencies:** `DATABASE_URL`, at least one patient profile.

---

### 10. Dashboard Sidebar (Regression — PR #4)

| Field | Value |
|-------|-------|
| **Routes** | All `/dashboard/*` |
| **Status** | **NEEDS MANUAL** (regression) |

**Test steps:**
1. On desktop (≥1024px), collapse/expand sidebar toggle — button stays on seam, not clipped under main content.
2. During 200ms width transition, toggle does not drift (stays centered on sidebar edge).
3. Refresh page — no hydration mismatch flash (sidebar starts collapsed/expanded per `localStorage` via `useSyncExternalStore`).
4. Resize below/above `lg` breakpoint — toggle hides on mobile.

**Expected:** Fixes from RESEARCH.md / commit `a33cbec` hold.

**Regression notes:** Prior bugs — toggle clipped (`overlapPx: 11`), blank tab panels (opacity animations), toggle drift mid-animation, hydration mismatch from `localStorage` on first paint.

---

### 11. Patient Workspace — Tabs (Regression — PR #4)

| Field | Value |
|-------|-------|
| **Routes** | `/dashboard/patients/[id]`, `?tab=overview\|upload\|timeline\|download` |
| **Status** | **NEEDS MANUAL** (regression) |

**Test steps:**
1. Open patient with documents — default tab is **Overview**.
2. Open patient with zero documents — default tab is **Upload**.
3. Switch Overview → Upload → Timeline → Download — each panel shows content (not blank).
4. Use browser back/forward — tab state syncs with URL `?tab=`.
5. Quick actions on Overview (“Upload records”, “View all” timeline) switch tabs.

**Expected:** `data-hidden:hidden` on inactive panels; no enter-animation blank state.

**Automated:** Tab resolution logic in `lib/navigation/patient-nav.ts` (static only).

---

### 12. Patient Workspace — Overview Tab

| Field | Value |
|-------|-------|
| **Routes** | `/dashboard/patients/[id]?tab=overview` |
| **Status** | **NEEDS MANUAL** |

**Test steps:**
1. Profile card shows patient name, relationship, location, specialty.
2. Stat chips in hero show total/ready/processing counts.
3. Recent activity timeline preview (max 3) with “View all” link.
4. Empty state CTA links to upload tab when no documents.
5. **Care share form** — “Send records to your provider” section visible below overview grid.

**Expected:** Data matches DB for scoped patient; share form submits successfully.

---

### 13. Document Upload

| Field | Value |
|-------|-------|
| **Routes** | `/dashboard/patients/[id]?tab=upload`, `POST /api/upload` |
| **Status** | **NEEDS MANUAL** / **BLOCKED** without Blob token |

**Test steps:**
1. `GET /api/upload` — returns `{ configured: true, valid: true }` when token set.
2. Stage a PDF (< max size) — preview pane shows PDF.
3. Stage a JPEG — image preview renders.
4. Submit upload — progress completes, document appears in timeline.
5. Try unsupported type (e.g. `.zip`) — rejected client/server side.
6. Sign out mid-upload — 401 from upload API.

**Expected:** File in Vercel Blob (private), DB row with `status: processing`, revalidation updates dashboard.

**Dependencies:** `BLOB_READ_WRITE_TOKEN` (required), `DATABASE_URL`, auth session. Proxy synthetic GET check must pass (implemented).

**Automated:** `uploadClientPayloadSchema` unit tests (MIME, UUID); route handler 401 test (mocked); Playwright middleware 401 on unauthenticated POST.

---

### 14. AI Document Extraction & Summaries

| Field | Value |
|-------|-------|
| **Routes** | Background after upload; `/api/documents/[id]/summary` |
| **Status** | **NEEDS MANUAL** |

**Test steps:**
1. **Without `GEMINI_API_KEY`:** Upload doc — status should jump to `ready` immediately (no extraction).
2. **With `GEMINI_API_KEY`:** Upload PDF/JPEG — status `processing` then `ready` (or `failed` on error).
3. View document in timeline — plain-language summary visible when ready.
4. Download tab — summary reports listed; download triggers `GET /api/documents/[id]/summary`.
5. Unauthenticated summary request — 401.

**Expected:** Extraction via Gemini `generateObject`; summary downloadable as `.txt`.

**Dependencies:** `GEMINI_API_KEY`, `BLOB_READ_WRITE_TOKEN` (private blob read), Vercel AI SDK.

**Automated:** Summary route tests (mocked); format/mask PHI unit tests.

---

### 15. Document Preview

| Field | Value |
|-------|-------|
| **Routes** | Patient timeline/table → sheet; `GET /api/documents/[id]/preview` |
| **Status** | **NEEDS MANUAL** (UI) / **PASS** (route auth, mocked) |

**Test steps:**
1. Click document in timeline/table — preview sheet opens.
2. PDF renders in iframe; JPEG renders as image.
3. Preview for another user's document ID — 404/401.

**Expected:** Signed URL returned; tenant-scoped access.

**Dependencies:** `BLOB_READ_WRITE_TOKEN`, auth session.

**Automated:** Preview route integration tests — 401/404/200 (mocked).

---

### 16. Care Share with Practitioner

| Field | Value |
|-------|-------|
| **Routes** | `/dashboard/patients/[id]?tab=overview` — `ShareWithProvider` in `patient-overview-panel.tsx` |
| **Status** | **NEEDS MANUAL** (E2E submission) |

**Test steps:**
1. On patient Overview tab, scroll to “Send records to your provider” form.
2. Enter practitioner email + optional message — submit.
3. Verify success toast and confirmation UI.
4. Verify `care_shares` row in DB; optional Slack webhook notification.

**Expected per copy/knowledge base:** “Submit practitioner's email on your profile page.”

**Current state:** Server action `sharePatientWithProvider`, validation tests, and UI component are **wired on the Overview tab** (commit `5d1e097`). End-to-end submission not yet verified on staging.

**Dependencies:** `DATABASE_URL`; `SLACK_WEBHOOK_URL` optional.

**Automated:** `shareWithProviderSchema` unit tests only.

---

### 17. Organization Assistant (Chat Widget)

| Field | Value |
|-------|-------|
| **Routes** | Floating widget on marketing, auth, and dashboard layouts |
| **Status** | **NEEDS MANUAL** / **BLOCKED** without Gemini |

**Test steps:**
1. Open assistant on `/` and `/dashboard`.
2. Send suggested question or custom message.
3. Receive Gemini reply about iCare features.
4. Send with no API key — error toast (“Something went wrong” or key error).

**Expected:** `askOrganizationAssistant` server action returns reply.

**Dependencies:** `GEMINI_API_KEY`.

**Note:** `organization-assistant/` is a standalone extract with its own typecheck; main app uses `@/components/assistant/organization-assistant.tsx` and `@/lib/ai/*`. Root build no longer blocked by nested package.

---

### 18. Account Settings

| Field | Value |
|-------|-------|
| **Routes** | `/account/settings`, `/account/security` |
| **Status** | **NEEDS MANUAL** |

**Test steps:**
1. Settings — name and email displayed read-only.
2. Security — change password form submits via Neon Auth UI.
3. Nav between Account / Password tabs works.
4. “Back to dashboard” link works.

**Expected:** Password change succeeds; profile fields not editable in-app.

**Dependencies:** Neon Auth; email provider tests in `account-providers.test.ts`.

---

### 19. Theme Toggle

| Field | Value |
|-------|-------|
| **Routes** | Dashboard header (`ThemeToggle`) |
| **Status** | **NEEDS MANUAL** |

**Test steps:**
1. Toggle light/dark/system — UI updates, persists across navigation.

**Expected:** `next-themes` integration.

---

### 20. Error & Loading States

| Field | Value |
|-------|-------|
| **Routes** | `/dashboard/error`, loading.tsx files |
| **Status** | **NEEDS MANUAL** |

**Test steps:**
1. Trigger dashboard error boundary (e.g. simulate DB failure) — error UI shows retry.
2. Navigate to patient detail — loading skeleton appears during fetch.
3. Invalid patient UUID — `not-found.tsx` renders.

**Expected:** Graceful degradation.

---

## Critical Path Smoke Test

**Flow:** Sign-up → OTP → Onboarding → Upload → Dashboard → Care share

| Step | Action | Expected | Status |
|------|--------|----------|--------|
| 1 | `GET /` | Landing loads | ✅ AUTO (Playwright) |
| 2 | Sign up at `/auth/sign-up` | Redirect to email OTP | NEEDS MANUAL |
| 3 | Verify OTP | Authenticated | NEEDS MANUAL |
| 4 | Complete `/onboarding` | Redirect to `/dashboard/patients/{id}` | NEEDS MANUAL |
| 5 | Overview tab — care share form | Submit practitioner email; success UI | NEEDS MANUAL |
| 6 | Upload tab — upload PDF | Blob + DB record, processing/ready | NEEDS MANUAL / BLOCKED without Blob |
| 7 | `GET /dashboard` | Metrics reflect new document | NEEDS MANUAL |
| 8 | Timeline tab | Document listed with status | NEEDS MANUAL |
| 9 | Download tab (if Gemini configured) | Summary report available | NEEDS MANUAL |

**Automated partial coverage:** Steps 1, unauthenticated dashboard redirect, and upload 401 are covered by Playwright. Full path requires staging credentials — use [`QA-CHECKLIST.md`](QA-CHECKLIST.md).

---

## Regression Testing (Recent Fixes — PR #4 / RESEARCH.md)

| Area | Prior bug | Fix | Retest priority |
|------|-----------|-----|-----------------|
| Sidebar toggle | Clipped under main column (`overlapPx: 11`) | Fixed position on CSS seam variable + `ResizeObserver` | **High** |
| Sidebar collapse | Toggle drift during 200ms transition | rAF + CSS variable, no React `left` | **High** |
| Sidebar hydration | `localStorage` mismatch vs server | `useSyncExternalStore` | **High** |
| Patient tabs | Blank panels from opacity animations | `data-hidden:hidden`; removed enter animations | **High** |
| Tab bar | Negative margin bleed | Removed `-mx` on sticky bar | Medium |

---

## Known Gaps & Blockers

### Resolved

1. ~~`organization-assistant/src/errors.ts` broken import~~ — fixed in `11cb929`
2. ~~Root tsconfig pulling nested package into main compile graph~~ — excluded; `typecheck:assistant` added
3. ~~Care share UI not wired~~ — mounted on Overview tab in `5d1e097`
4. ~~No E2E test framework~~ — Playwright smoke suite + CI `e2e` job
5. ~~No upload/preview route tests~~ — integration tests added

### Remaining — Manual / Environment

1. **Full critical-path smoke** on staging with Neon Auth + Blob (see `QA-CHECKLIST.md`)
2. **PR #4 regression** — sidebar toggle and patient tabs (desktop + mobile)
3. **Upload blocked locally** without valid `BLOB_READ_WRITE_TOKEN`
4. **AI features blocked** without `GEMINI_API_KEY` (degrades gracefully for uploads)
5. **Auth flows** require Neon Console configuration (OTP, Google, trusted domains)
6. **Care share E2E** — UI wired but not yet verified against live DB/Slack on staging

### Test Coverage Gaps

7. No tests for: onboarding server action, assistant action, proxy middleware (direct), UI components
8. Integration tests use mocked DB — do not validate real SQL tenant isolation
9. Playwright does not cover OTP, OAuth, or authenticated upload flows yet

---

## Recommendations

### Completed ✅

1. Fix `organization-assistant` import (`./types`) — `11cb929`
2. Exclude `organization-assistant` from root tsconfig + `typecheck:assistant` — `5d1e097`
3. Wire `ShareWithProvider` on patient Overview tab — `5d1e097`
4. Playwright smoke tests (landing, auth redirect, upload 401) + CI `e2e` job — `5d1e097`
5. Integration tests for upload auth and preview route — `5d1e097`
6. `QA-CHECKLIST.md` for manual staging QA — `5d1e097`

### Still recommended (before production)

1. Execute critical path smoke test on Vercel preview with real Neon + Blob + optional Gemini
2. Regression pass on sidebar toggle and patient tabs (desktop + mobile)
3. Verify Google OAuth on staging with production trusted domains
4. Test upload of max-size PDF and invalid MIME type
5. Verify care share submission creates `care_shares` row and optional Slack notification
6. Add Playwright test for onboarding validation errors (requires session stub)
7. Consider component tests (RTL) for sidebar toggle + patient tabs

---

## Static vs Manual Verification Matrix

| Can verify statically / automated | Requires manual browser + services |
|-----------------------------------|-----------------------------------|
| Route files exist | Auth sign-up/sign-in/OAuth |
| Proxy public/protected rules | OTP email delivery |
| Env schema completeness | Blob upload end-to-end |
| Unit/integration test pass/fail | Gemini extraction quality |
| Care share UI mounted on Overview | Care share live DB/Slack submission |
| Lint, typecheck, build pass | Sidebar/tab regression UX |
| Playwright landing + auth redirect + upload 401 | Theme persistence |
| Preview/upload route auth (mocked) | Document preview rendering (live) |
| Security headers in `next.config.ts` | Mobile bottom nav touch targets |
| Tenant isolation query structure (mocked) | Google OAuth on staging |

---

## CI Pipeline (`.github/workflows/ci.yml`)

| Job | Steps |
|-----|-------|
| `quality` | lint → typecheck → typecheck:assistant → test → build |
| `e2e` | install Playwright → build → `npm run test:e2e` |

---

## Files Referenced

- `proxy.ts` — auth middleware
- `lib/env.ts` — environment validation
- `.env.example` — required variables
- `organization-assistant/src/errors.ts` — import fix (`11cb929`)
- `components/documents/share-with-provider.tsx` — care share form
- `components/dashboard/patient-workspace/patient-overview-panel.tsx` — mounts share UI
- `e2e/smoke.spec.ts` — Playwright smoke tests
- `playwright.config.ts` — E2E config
- `QA-CHECKLIST.md` — manual staging checklist
- `RESEARCH.md` — sidebar/tab regression context

---

*Initial report: static analysis and automated checks (July 9, 2026). Updated after QA health improvements on `dev` (`11cb929`, `5d1e097`).*
