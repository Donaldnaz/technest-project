# @icare/organization-assistant

Standalone extract of the **iCare organization assistant** — the floating chat widget and Gemini-backed server logic used on the marketing site and patient dashboard.

This folder is a **separate git repository** nested inside the main Technest project. The parent app (`components/assistant/`, `app/actions/assistant.ts`, `lib/ai/organization-*.ts`) is **unchanged** and continues to run as before.

## What's included

| Area | Path |
|------|------|
| Chat UI | `src/client/OrganizationAssistant.tsx` |
| Next.js server action | `src/server/action.ts` |
| Reply generation | `src/server/generate-reply.ts` |
| Knowledge base | `src/knowledge.ts` |
| Gemini integration | `src/gemini/` |
| Copy & contact constants | `src/copy.ts` |

## Requirements

- Node 20+
- `GEMINI_API_KEY` (see `.env.example`)
- Peer deps: `react`, `react-dom`, `next`, `lucide-react`, `zod`

## Install (standalone)

```bash
cd organization-assistant
npm install
```

## Use in a Next.js app

1. Wire the server action (re-export or copy):

```ts
// app/actions/assistant.ts
export { askOrganizationAssistant } from "../../organization-assistant/src/server/action";
```

2. Mount the widget with an injected handler:

```tsx
import { OrganizationAssistant } from "../../organization-assistant/src/client/OrganizationAssistant";
import { askOrganizationAssistant } from "@/app/actions/assistant";

export function AssistantShell() {
  return (
    <OrganizationAssistant
      askAssistant={askOrganizationAssistant}
      onError={(message) => toast.error(message)}
    />
  );
}
```

The main iCare app does **not** use this wiring yet — it keeps the original `@/` imports.

## Publish as its own remote

```bash
cd organization-assistant
git init
git add .
git commit -m "Initial standalone organization assistant package"
git remote add origin <your-repo-url>
git push -u origin main
```

## Sync with parent app

When assistant behavior changes in the main repo, update the mirrored files here:

- `components/assistant/organization-assistant.tsx`
- `app/actions/assistant.ts`
- `lib/ai/organization-assistant.ts`
- `lib/ai/organization-knowledge.ts`
- Related Gemini helpers under `lib/ai/`

## License

Same as the parent Technest / iCare project.
