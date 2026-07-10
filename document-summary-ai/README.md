# @icare/document-summary-ai

Standalone **document → plain-English AI** for medical uploads. Given a file buffer (PDF, JPEG, or DOCX), Gemini extracts structured fields and a patient-friendly report. The main Technest app consumes this package as a local dependency (`file:document-summary-ai`); extraction prompts and model calls live here, not under `lib/ai/`.

## Public API

| Export | Description |
|--------|-------------|
| `extractMedicalDocument(input)` | Buffer + MIME + file name → structured plain-language extraction |
| `isGeminiConfigured()` | `true` when `GEMINI_API_KEY` is set |
| `MedicalDocumentExtraction` | Result type (summary, plainLanguageReport, keyFindings, …) |
| `EXTRACTION_MODEL` | Default model id (`gemini-2.5-flash`) |

```ts
import {
  extractMedicalDocument,
  isGeminiConfigured,
} from "@icare/document-summary-ai";

if (isGeminiConfigured()) {
  const result = await extractMedicalDocument({
    buffer,
    mimeType,
    fileName,
  });
  // result.summary, result.plainLanguageReport, …
}
```

Blob fetch, DB writes, and download formatting stay in the **host app**.

## Requirements

- Node 20+
- Host app env: `GEMINI_API_KEY` (optional `GEMINI_MODEL`) — see `.env.example`
- Peer deps: `ai`, `@ai-sdk/google`, `zod`

Gemini keys stay in the **host app** environment. The package reads `process.env.GEMINI_API_KEY` / `GEMINI_MODEL` at runtime.

## Use from the Technest app

```json
// package.json
"@icare/document-summary-ai": "file:document-summary-ai"
```

```ts
// next.config.ts
transpilePackages: ["@icare/document-summary-ai"]
```

```ts
// lib/ai/extract-document.ts — thin host wrapper
import { extractMedicalDocument, isGeminiConfigured } from "@icare/document-summary-ai";
// fetch blob → extractMedicalDocument → upsertDocumentExtraction
```

Host call sites (`finalize-upload`, generate-summary) keep importing `@/lib/ai/extract-document`.

## Install (package alone)

```bash
cd document-summary-ai
npm install
npm run typecheck
```

From the monorepo root:

```bash
npm install
npm run typecheck
npm run typecheck:document-summary
```

## License

Same as the parent Technest / iCare project.
