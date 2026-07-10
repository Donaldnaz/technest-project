# @icare/organization-assistant

Standalone **iCare organization assistant** — floating chat widget and Gemini-backed server logic. The main Technest app consumes this package as a local dependency (`file:organization-assistant`); it is not duplicated under `lib/ai/`.

## Package layout

| Area | Path | Import |
|------|------|--------|
| Chat UI | `src/client/OrganizationAssistant.tsx` | `@icare/organization-assistant/client` |
| Server action + reply gen | `src/server/` | `@icare/organization-assistant/server` |
| Knowledge / copy / types | `src/knowledge.ts`, `src/copy.ts`, `src/types.ts` | `@icare/organization-assistant` |
| Gemini helpers | `src/gemini/`, `src/env.ts` | (internal) |

## Requirements

- Node 20+
- Host app env: `GEMINI_API_KEY` (optional `GEMINI_MODEL`) — see `.env.example`
- Peer deps: `react`, `react-dom`, `next`, `lucide-react`, `zod`, `ai`, `@ai-sdk/google`

Gemini keys stay in the **host app** environment. The package reads `process.env.GEMINI_API_KEY` / `GEMINI_MODEL` at runtime.

## Use from the Technest app

Already wired:

```json
// package.json
"@icare/organization-assistant": "file:organization-assistant"
```

```ts
// next.config.ts
transpilePackages: ["@icare/organization-assistant"]
```

```ts
// app/actions/assistant.ts
export { askOrganizationAssistant } from "@icare/organization-assistant/server";
```

```tsx
// components/assistant/organization-assistant.tsx
"use client";
import { OrganizationAssistant as PackageAssistant } from "@icare/organization-assistant/client";
import { toast } from "sonner";
import { askOrganizationAssistant } from "@/app/actions/assistant";

export function OrganizationAssistant() {
  return (
    <PackageAssistant
      askAssistant={askOrganizationAssistant}
      onError={(message) => toast.error(message)}
    />
  );
}
```

Layouts mount `@/components/assistant/organization-assistant` (thin host wrapper).

### Import rules

- **Client components:** `@icare/organization-assistant/client` (or root `.` for UI + shared constants)
- **Server actions / Node:** `@icare/organization-assistant/server` — do not import `/server` from client modules

## Install (package alone)

```bash
cd organization-assistant
npm install
npm run typecheck
```

From the monorepo root:

```bash
npm install
npm run typecheck
npm run typecheck:assistant
```

## Publish as its own GitHub repo (later)

This directory is already a self-contained package (and may already have its own `.git`). To publish:

1. Ensure `private` is removed or set appropriately in `package.json`
2. Push this folder’s git history to a new remote (or copy the tree into a new repo)
3. In the main app, replace `file:organization-assistant` with the published version, e.g. `"@icare/organization-assistant": "^0.1.0"` or a git URL
4. Keep peer deps and `GEMINI_*` env docs in sync

## License

Same as the parent Technest / iCare project.
