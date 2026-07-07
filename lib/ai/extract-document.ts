import "server-only";

import { generateObject } from "ai";
import { get } from "@vercel/blob";
import { z } from "zod";

import { getGoogleModel, isGeminiConfigured } from "@/lib/ai/google-model";

import {
  updateDocumentStatus,
  upsertDocumentExtraction,
} from "@/lib/db/queries/documents";

const extractionSchema = z.object({
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
  attentionNote: z
    .string()
    .nullable()
    .describe(
      "Soft note if something may need discussion with care team, else null",
    ),
});

export async function processDocumentExtraction(
  documentId: string,
  blobUrl: string,
  mimeType: string,
  fileName: string,
): Promise<void> {
  if (!isGeminiConfigured()) {
    await updateDocumentStatus(documentId, "ready");
    return;
  }

  try {
    await updateDocumentStatus(documentId, "processing");

    const blobResult = await get(blobUrl, { access: "private" });
    if (!blobResult || blobResult.statusCode !== 200 || !blobResult.stream) {
      await updateDocumentStatus(documentId, "failed");
      return;
    }

    const buffer = Buffer.from(
      await new Response(blobResult.stream).arrayBuffer(),
    );

    const mediaType =
      mimeType === "application/pdf" ? "application/pdf" : "image/jpeg";

    const { object } = await generateObject({
      model: getGoogleModel(),
      schema: extractionSchema,
      messages: [
        {
          role: "user",
          content: [
            {
              type: "text",
              text: `You are helping a patient understand a medical document named "${fileName}". Extract key information in plain, compassionate language. Do not diagnose or prescribe. If unsure, say so briefly in the summary.`,
            },
            {
              type: "file",
              data: buffer,
              mediaType,
            },
          ],
        },
      ],
    });

    await upsertDocumentExtraction(documentId, {
      documentType: object.documentType,
      reportDate: object.reportDate,
      collectionDate: object.collectionDate,
      summary: object.summary,
      attentionNote: object.attentionNote,
    });

    await updateDocumentStatus(documentId, "ready");
  } catch {
    await updateDocumentStatus(documentId, "failed");
  }
}
