import { z } from "zod";

export const medicalDocumentExtractionSchema = z.object({
  documentType: z
    .string()
    .describe("Plain-language type, e.g. Lab results, Imaging, Prescription"),
  reportDate: z
    .string()
    .nullable()
    .describe("ISO date YYYY-MM-DD if found, else null"),
  collectionDate: z
    .string()
    .nullable()
    .describe("ISO date YYYY-MM-DD if found, else null"),
  summary: z
    .string()
    .describe("2-3 sentence plain-language summary for the patient"),
  plainLanguageReport: z
    .string()
    .describe(
      "Full plain-language report with sections: What this document is; What was measured or done; Results in everyday language; What you may want to discuss with your care team. Use compassionate tone, define medical jargon inline, do not diagnose or prescribe.",
    ),
  keyFindings: z
    .array(z.string())
    .describe("Optional bullet list of key findings in everyday language"),
  attentionNote: z
    .string()
    .nullable()
    .describe(
      "Soft note if something may need discussion with care team, else null",
    ),
});
