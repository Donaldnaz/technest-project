# Research: Debug Log Observations

Notes from session **227e70** (July 2026) — dashboard sidebar toggle, patient tabs, and hydration. Logs: `.cursor/debug-227e70.log` (NDJSON, ephemeral).

---

## What we found

### Sidebar toggle clipped
- **Evidence:** `overlapPx: 11`, `toggleRight: 299`, `mainLeft: 288`
- **Cause:** Toggle at `-right-3` extended under the main column
- **Fix:** Fixed position on seam via `--dashboard-sidebar-seam`, `ResizeObserver`, and `z-50` — not z-index on the whole sidebar

### Tab bar & blank panels
- **Evidence:** `tabBarHeroDelta: 0`, `opacity: "1"`, `panelDisplay: "block"`
- **Cause:** Opacity enter animations and `-mx` bleed on the sticky tab bar
- **Fix:** `data-hidden:hidden` on panels; removed negative margins and enter animations

### Toggle drift on collapse
- **Evidence:** `seamCenterDelta` up to `214` mid-animation; toggle stuck near `288` while sidebar shrank to `64`
- **Cause:** `transition-[left]` + React `style={{ left: seamLeft }}` overwrote `ResizeObserver` updates
- **Fix:** CSS variable for seam position, rAF during 200ms transition, no React-controlled `left`

### Hydration mismatch
- **Cause:** `localStorage` read on first client render; server always rendered expanded sidebar
- **Fix:** `useSyncExternalStore` with server snapshot `false`

---

## Rejected approaches
- `z-30` on entire `<aside>`
- `w-3` gutter column (helped steady state, flashed on first paint)
- Hardcoded `18rem` left position
- Toggle fully inside sidebar (`right-2`)

---

## Shipped
- **Commit:** `a33cbec` on `dev`
- **PR:** [#4](https://github.com/Donaldnaz/technest-project/pull/4) → `main`

## Takeaways
1. Toggle clipping was geometry, not z-index.
2. Blank tabs were a CSS visibility/animation issue.
3. Collapse drift was React state fighting imperative DOM updates during width transitions.
4. Sidebar preference must be hydration-safe (`useSyncExternalStore`).
