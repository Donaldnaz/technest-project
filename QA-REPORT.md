# iCare — QA Testing Report

**Date:** July 9, 2026  
**Scope:** End-to-end feature readiness, automated checks, static code-path review, manual QA checklist  
**Environment:** Local workspace audit (`/Users/apple/Desktop/Technest Project.`)  
**Branch context:** Recent fixes on `dev` (PR #4) — sidebar toggle, patient workspace tabs, hydration safety

---

## Executive Summary

**Overall health: ⚠️ YELLOW — not production-ready without fixes and manual E2E validation.**

The application has a solid foundation: 30/30 Vitest tests pass, ESLint is clean, auth proxy/middleware is thoughtfully implemented (including synthetic session checks for Blob uploads and Server Actions), and tenant-scoped data access is partially covered by tests. However, **production build and TypeScript check both fail** due to a broken import in the nested `organization-assistant/` package (`../types` should be `./types`). Until that is fixed or the package is excluded from the root `tsconfig.json`, **deployments will fail**.

No browser/E2E test suite exists (no Playwright/Cypress). All user-facing flows — Neon Auth (email OTP, Google OAuth), Vercel Blob uploads, Gemini extraction, and care-share — require **manual browser testing** with real credentials and services.

**Critical product gap:** The care-share server action and `ShareWithProvider` UI component exist, but the component is **not mounted on any route**. Users cannot submit practitioner share requests through the UI despite copy and backend support.

| Area | Status |
|------|--------|
| Lint | ✅ Pass |
| Unit/integration tests | ✅ 30/30 pass |
| TypeScript | ❌ Fail (`organization-assistant`) |
| Production build | ❌ Fail (same TS error) |
| E2E automation | ❌ None |
| Manual E2E | ⏳ Required for all critical paths |

---

## Automated Test Results

| Check | Command | Result | Notes |
|-------|---------|--------|-------|
| ESLint | `npm run lint` | **PASS** | No errors or warnings |
| TypeScript | `npm run typecheck` | **FAIL** | `organization-assistant/src/errors.ts(1,35): Cannot find module '../types'` — file exists at `src/types.ts`; import path is wrong |
| Vitest | `npm run test` | **PASS** | 8 files, 30 tests, ~1.9s |
| Production build | `SKIP_ENV_VALIDATION=true npm run build` | **FAIL** | Compiles with Turbopack, fails at TS step with same `organization-assistant` error |

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

**Not covered by automated tests:** Auth flows, onboarding server action, upload API, document preview API, assistant chat, UI components, sidebar/tabs, marketing pages, Slack notifications (live).

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

**Synthetic session check:** Server Actions (`next-action` header) and `POST /api/upload` use a GET-based session probe to avoid breaking multipart/Blob bodies. Upload auth failures return JSON 401 instead of HTML redirect.

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

Local note: `.env` present; `.env.local` not present.

---

## Feature Matrix

### 1. Marketing / Landing

| Field | Value |
|-------|-------|
| **Routes** | `/` |
| **Status** | **NEEDS MANUAL** |

**Test steps:**
1. Open `/` — verify hero, What We Do, dashboard showcase, About, Contact, CTA sections render.
2. Click nav hash links (`#about`, `#contact`, etc.) — page scrolls correctly (`LandingHashScroll`).
3. Click “Get started” / “Sign in” — navigates to `/auth/sign-up` and `/auth/sign-in`.
4. Resize to mobile — hamburger menu opens, links work.
5. Open floating assistant widget — welcome message appears.

**Expected:** Public page loads without auth; CTAs route to auth; assistant opens (reply needs `GEMINI_API_KEY`).

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

**Dependencies:** `NEON_AUTH_BASE_URL`, `NEON_AUTH_COOKIE_SECRET`, `DATABASE_URL`, Neon email/OTP config, trusted domain `http://localhost:3000`.

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

**Expected:** Session cleared.

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
| **Routes** | `/dashboard/patients/[id]` |
| **Status** | **NEEDS MANUAL** |

**Test steps:**
1. Profile card shows patient name, relationship, location, specialty.
2. Stat chips in hero show total/ready/processing counts.
3. Recent activity timeline preview (max 3) with “View all” link.
4. Empty state CTA links to upload tab when no documents.

**Expected:** Data matches DB for scoped patient.

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

**Automated:** `uploadClientPayloadSchema` unit tests (MIME, UUID).

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
| **Status** | **NEEDS MANUAL** |

**Test steps:**
1. Click document in timeline/table — preview sheet opens.
2. PDF renders in iframe; JPEG renders as image.
3. Preview for another user's document ID — 404/401.

**Expected:** Signed URL returned; tenant-scoped access.

**Dependencies:** `BLOB_READ_WRITE_TOKEN`, auth session.

---

### 16. Care Share with Practitioner

| Field | Value |
|-------|-------|
| **Routes** | *No route mounts UI* — `components/documents/share-with-provider.tsx` is orphaned |
| **Status** | **BLOCKED** (UI not wired) |

**Test steps (intended, once wired):**
1. On patient profile, open share form.
2. Enter practitioner email + optional message — submit.
3. Verify `care_shares` row in DB; optional Slack webhook notification.

**Expected per copy/knowledge base:** “Submit practitioner's email on your profile page.”

**Current state:** Server action `sharePatientWithProvider` and validation tests exist; **`ShareWithProvider` is not imported by any page**. Feature is **not end-to-end accessible**.

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

**Note:** `organization-assistant/` is a standalone extract; main app uses `@/components/assistant/organization-assistant.tsx` and `@/lib/ai/*`. The nested package has a **broken import** blocking root build/typecheck but does not affect runtime of main app paths.

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

**Flow:** Sign-up → OTP → Onboarding → Upload → Dashboard

| Step | Action | Expected | Status |
|------|--------|----------|--------|
| 1 | `GET /` | Landing loads | NEEDS MANUAL |
| 2 | Sign up at `/auth/sign-up` | Redirect to email OTP | NEEDS MANUAL |
| 3 | Verify OTP | Authenticated | NEEDS MANUAL |
| 4 | Complete `/onboarding` | Redirect to `/dashboard/patients/{id}` | NEEDS MANUAL |
| 5 | Upload tab — upload PDF | Blob + DB record, processing/ready | NEEDS MANUAL / BLOCKED without Blob |
| 6 | `GET /dashboard` | Metrics reflect new document | NEEDS MANUAL |
| 7 | Timeline tab | Document listed with status | NEEDS MANUAL |
| 8 | Download tab (if Gemini configured) | Summary report available | NEEDS MANUAL |

**Cannot be executed in this audit:** No live Neon/Neon Auth/Blob/Gemini credentials were used for browser testing.

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

### Build / CI Blockers

1. **`organization-assistant/src/errors.ts`** imports `../types` but types live at `./types` (same `src/` directory). Breaks `npm run typecheck` and `npm run build`.
2. Root `tsconfig.json` includes `**/*.ts`, pulling the nested package into the main project compile graph.

### Product / E2E Blockers

3. **Care share UI not wired** — `ShareWithProvider` component exists but is never rendered; users cannot share records with practitioners despite README/marketing claims.
4. **No E2E test framework** — all browser flows are manual-only.
5. **Upload blocked locally** without valid `BLOB_READ_WRITE_TOKEN`.
6. **AI features blocked** without `GEMINI_API_KEY` (degrades gracefully for uploads).
7. **Auth flows** require Neon Console configuration (OTP, Google, trusted domains).

### Test Coverage Gaps

8. No tests for: upload route, preview route (live), onboarding server action, assistant action, proxy middleware, UI components.
9. Integration tests use mocked DB — do not validate real SQL tenant isolation.

---

## Recommendations

### Immediate (before deploy)

1. **Fix `organization-assistant` import** (`./types`) or add `"exclude": ["organization-assistant"]` to root `tsconfig.json` if the package is intentionally standalone.
2. **Wire `ShareWithProvider`** into patient workspace (e.g. Overview tab or dedicated share tab) to match product copy and backend.
3. Re-run `npm run typecheck` and `npm run build` — both must pass in CI.

### Short term

4. Add **Playwright** (or similar) smoke tests for: landing → sign-in page, protected route redirect, onboarding validation errors.
5. Add integration test for `POST /api/upload` auth (401 without session) with mocked Blob handler.
6. Document required Neon Auth settings in a `QA-CHECKLIST.md` or expand README test plan.

### Manual QA session checklist

7. Execute critical path smoke test with real Neon + Blob + optional Gemini.
8. Regression pass on sidebar toggle and patient tabs (desktop + mobile).
9. Verify Google OAuth on staging with production trusted domains.
10. Test upload of max-size PDF and invalid MIME type.

---

## Static vs Manual Verification Matrix

| Can verify statically (this audit) | Requires manual browser + services |
|-----------------------------------|-----------------------------------|
| Route files exist | Auth sign-up/sign-in/OAuth |
| Proxy public/protected rules | OTP email delivery |
| Env schema completeness | Blob upload end-to-end |
| Unit test pass/fail | Gemini extraction quality |
| Orphaned `ShareWithProvider` | Care share submission |
| Lint clean | Sidebar/tab regression UX |
| TS/build failure root cause | Theme persistence |
| Security headers in `next.config.ts` | Mobile bottom nav touch targets |
| Tenant isolation query structure | Document preview rendering |

---

## Files Referenced

- `proxy.ts` — auth middleware
- `lib/env.ts` — environment validation
- `.env.example` — required variables
- `organization-assistant/src/errors.ts` — build blocker
- `components/documents/share-with-provider.tsx` — unwired UI
- `RESEARCH.md` — sidebar/tab regression context

---

*Report generated by static analysis and automated checks. No application code was modified during this audit.*
