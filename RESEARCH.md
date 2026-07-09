# Research: Debug Log Observations

Technical research notes from agent-assisted debugging of dashboard layout, patient workspace tabs, and related UI/auth work in the iCare healthcare platform. Findings are grounded in NDJSON instrumentation and browser runtime evidence from session **227e70** (9 July 2026).

---

## Session metadata

| Field | Value |
|---|---|
| Debug session ID | `227e70` |
| Primary log path | `.cursor/debug-227e70.log` |
| Log format | NDJSON (one JSON object per line) |
| Typical fields | `sessionId`, `runId`, `hypothesisId`, `location`, `message`, `data`, `timestamp` |
| Viewport used for layout tests | 1920×… desktop (`lg` breakpoint, ≥1024px) |

### Logging pipeline evolution

1. **Early:** Client and server probes posted to the Cursor debug ingest endpoint (`127.0.0.1:7863/ingest/…`). Logs were often lost when ingest was unreachable.
2. **Mid-session:** A temporary `POST /api/debug-log` route appended entries directly to `.cursor/debug-227e70.log`. Initially blocked by auth (307 redirect); later marked public in the proxy.
3. **Final:** `/api/debug-log` and client-side layout probes were removed after fixes landed. Server-side Slack upload diagnostics were consolidated into `lib/debug/agent-log.ts` (dual-write to file + ingest).

> **Note:** `.cursor/debug-227e70.log` is ephemeral (cleared during reproduction cycles) and may not be present in the repo. Values below are preserved from captured runs during the session.

---

## Related debug sessions

| Session | Log file | Focus |
|---|---|---|
| `227e70` | `.cursor/debug-227e70.log` | Dashboard sidebar toggle, patient tabs, Slack upload env |
| `30970b` | `.cursor/debug-30970b.log` | Auth forgot-password link layout (`icare-auth-view.tsx`) |
| `eb6f9b` | `.cursor/debug-eb6f9b.log` | User menu popup vs. profile pill overlap |
| `d1ae09` | `.cursor/debug-d1ae09.log` | Dev server wrapper, proxy routing, landing boot |
| `2f97f1` | `.cursor/debug-2f97f1.log` | Landing scroll performance |

---

## 1. Sidebar toggle overlap (`toggle-gutter` hypothesis)

**Symptom:** The circular collapse chevron appeared half-hidden under the cream main content panel.

**Root layout:** Toggle used `absolute -right-3`, protruding 12px past the sidebar's right edge. The main column started immediately at the sidebar boundary (`mainLeft: 288`), so the protruding half was painted underneath.

### Evidence

| Metric | Value | Interpretation |
|---|---|---|
| `overlapPx` | `11` | Toggle extended 11px under main column |
| `clipped` | `true` | Main content occluded the button |
| `toggleRight` | `299` | Right edge of toggle bounding box |
| `mainLeft` | `288` | Left edge of main content column |
| Delta | `11px` | Matches `overlapPx` |

### Gutter mitigation attempt

A `w-3` (12px) gutter column was inserted between sidebar and main so the protruding toggle sat in empty space.

| Metric | Before gutter | After gutter (steady state) |
|---|---|---|
| `overlapPx` | `11` | `0` |
| `mainLeft` | `288` | `300` |
| `clipped` | `true` | `false` |

**Verdict:** Partial fix. Steady-state overlap cleared, but **first paint** still showed `overlapPx: 11` before layout settled — a visible flash on load.

---

## 2. Tab alignment and visibility (`layout-alignment` hypothesis)

**Symptoms:** (a) Tab bar left edge misaligned with hero content; (b) Active tab panel appeared blank.

### Alignment evidence

| Metric | Value | Pass criterion |
|---|---|---|
| `tabBarHeroDelta` | `0` | `< 2px` — tab bar aligns with hero |

### Visibility evidence

| Metric | Value | Interpretation |
|---|---|---|
| `opacity` | `"1"` | Panel fully opaque (not stuck at 0 from enter animation) |
| `panelDisplay` | `"block"` | Panel rendered in layout |
| `panelFound` | `true` | DOM query located the active panel |

**Root cause (visibility):** Opacity enter animations on `TabsContent` could leave inactive panels at `opacity: 0` while still occupying space, or delay the active panel's visibility.

**Verdict:** Confirmed fixed after removing opacity enter animations and applying `data-hidden:hidden` so only the active tab panel participates in layout.

---

## 3. Expanded sidebar seam (`toggle-seam-ref` / `toggle-fixed`)

**Symptom:** Toggle not centered on the sidebar/main seam when expanded.

### Evidence (expanded, steady state)

| Metric | Value |
|---|---|
| `seamCenterDelta` | `0` |
| `visible` | `true` |
| `viewportWidth` | `1920` |
| `sidebarRight` | `288` |
| `toggleCenter` | `288` |
| `toggleZIndex` | `50` |

**Verdict:** Pass. Toggle center matches sidebar right edge; `z-50` keeps it above main content.

---

## 4. Collapsed sidebar seam — animation failure

**Symptom:** During collapse, the toggle drifted away from the seam and sometimes disappeared.

### Evidence during width transition

| Phase | `seamCenterDelta` | `sidebarRight` | `toggleCenter` | `visible` |
|---|---|---|---|---|
| Mid-animation | `3.5` → `214` | shrinking toward `64` | stuck near `288` | intermittent |
| Final collapsed (worst case) | `~24` | `64` | `88.45` | `false` |

### Root cause chain

1. **Hardcoded `18rem` left** — Did not match measured sidebar width; caused initial misalignment and brief `seamLeft: null` hiding the toggle on first paint.
2. **`transition-[left]` on toggle** — CSS animated `left` while sidebar width transitioned over 200ms. Toggle lagged behind the moving seam.
3. **React `style={{ left: seamLeft }}`** — `setSeamLeft` triggered re-renders that **overwrote** direct DOM position updates from `ResizeObserver` mid-animation.

### Final fix approach

| Technique | Purpose |
|---|---|
| `--dashboard-sidebar-seam` CSS variable | Decouple position from React render cycle |
| `ResizeObserver` on `<aside>` | Track real `getBoundingClientRect().right` |
| `requestAnimationFrame` loop for 200ms + 32ms | Sample every frame during width transition |
| `transitionend` on `width` | Final position correction |
| No React-controlled `left` | Prevent re-render overwrites |
| `position: fixed; z-50` | Toggle always above main column |

**Success criteria:** `seamCenterDelta < 2` and `visible: true` in both expanded and collapsed steady states, including after `transitionend`.

---

## 5. Hydration mismatch (runtime error, not NDJSON)

**Error type:** Recoverable React hydration failure in `AppSidebar`.

**Observed mismatch:**

| Render | Sidebar header classes | Logo text |
|---|---|---|
| Server (SSR) | `gap-3` (expanded layout) | Visible (`"iCare"`) |
| Client (first paint) | `justify-center` (collapsed layout) | Hidden |

**Root cause:** `readCollapsedPreference()` read `localStorage` (`icare-sidebar-collapsed`) during the initial client render, but the server always rendered the expanded default. Users with a stored collapsed preference got mismatched HTML.

**Fix progression:**

1. `useState(false)` + `useLayoutEffect` to defer `localStorage` read until after mount.
2. Final: `useSyncExternalStore` with `getSidebarCollapsedServerSnapshot() → false` so server and first client render agree; preference applied after hydration without mismatch.

`suppressHydrationWarning` retained on `<aside>` as a safety net for class transitions.

---

## Fixes applied (summary)

| Area | Change | Files |
|---|---|---|
| Patient tabs | `data-hidden:hidden` on `TabsContent`; removed sticky tab bar `-mx` bleed; removed opacity enter animations | `patient-workspace-tabs.tsx` |
| Sidebar toggle | `position: fixed`, `--dashboard-sidebar-seam`, `ResizeObserver` + rAF, no React `left` | `app-sidebar.tsx` |
| Hydration | `useSyncExternalStore` for collapsed state | `app-sidebar.tsx` |
| Layout | Removed experimental gutter column and z-index stacking workarounds | `layout.tsx`, `app-sidebar.tsx` |

### Shipped

| Item | Detail |
|---|---|
| Commit | `a33cbec` — *Keep the dashboard sidebar toggle aligned during collapse and fix patient tab panels so only the active tab stays visible.* |
| Branch | `dev` |
| PR | [#4](https://github.com/Donaldnaz/technest-project/pull/4) — merged to `main` on 2026-07-09 |

---

## Rejected hypotheses

| Hypothesis | What was tried | Why rejected |
|---|---|---|
| `z-30` on entire `<aside>` | Raise sidebar stacking context | Caused worse alignment; did not fix overlap |
| `w-3` gutter column | Empty space for protruding toggle | Partial — steady state only; first-paint flash remained |
| Hardcoded `left: calc(18rem - 0.875rem)` | Fixed seam without measurement | Misaligned with real sidebar width; failed on collapse animation |
| `transition-[left]` on toggle | Smooth button movement | Lagged behind sidebar width animation; amplified drift |
| React state `seamLeft` + `style={{ left }}` | Measured seam via state | Re-renders overwrote `ResizeObserver` DOM updates |
| Toggle inside sidebar (`right-2`) | Avoid overlap structurally | Button no longer centered on seam; poor UX at collapse |

---

## Instrumentation reference

### Hypothesis IDs used in session 227e70

| ID | Area |
|---|---|
| `toggle-gutter` | Sidebar toggle overlap with main column |
| `layout-alignment` | Tab bar alignment and panel visibility |
| `toggle-seam-ref` | Measured seam via sidebar ref |
| `toggle-fixed` | Fixed positioning on seam |
| `H1`–`H3` | Slack upload config / webhook fallback (server-side) |

### Example NDJSON shape (layout probe)

```json
{
  "sessionId": "227e70",
  "runId": "ui-layout",
  "hypothesisId": "toggle-seam-ref",
  "location": "app-sidebar.tsx:measureSeam",
  "message": "sidebar-seam-metrics",
  "data": {
    "seamCenterDelta": 0,
    "visible": true,
    "sidebarRight": 288,
    "toggleCenter": 288,
    "toggleZIndex": 50,
    "viewportWidth": 1920
  },
  "timestamp": 1783472000000
}
```

---

## Conclusions

1. **Toggle clipping** was a geometry problem (protrusion past sidebar edge), not primarily a z-index problem.
2. **Tab blank panels** were an animation/CSS visibility problem, confirmed by `opacity: "1"` and `panelDisplay: "block"` after fix.
3. **Collapse animation drift** was a React-vs-DOM conflict: state-driven `left` fought imperative `ResizeObserver` updates during CSS width transitions.
4. **Hydration** required an SSR-safe external store pattern, not merely deferring reads with `useEffect`.
5. **Reliable logging** required the temporary `/api/debug-log` fallback when the ingest endpoint was unavailable; layout probes were removed once evidence-backed fixes shipped.
