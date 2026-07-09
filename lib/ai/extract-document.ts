import "server-only";

import { get } from "@vercel/blob";
import {
  extractMedicalDocument,
  isGeminiConfigured,
} from "@icare/document-summary-ai";

import {
  updateDocumentStatus,
  upsertDocumentExtraction,
} from "@/lib/db/queries/documents";

/**
 * Host orchestration: fetch blob → package AI extraction → persist.
 * AI prompts and Gemini calls live in `@icare/document-summary-ai`.
 */
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

    const object = await extractMedicalDocument({
      buffer,
      mimeType,
      fileName,
    });

    await upsertDocumentExtraction(documentId, {
      documentType: object.documentType,
      reportDate: object.reportDate,
      collectionDate: object.collectionDate,
      summary: object.summary,
      plainLanguageReport: object.plainLanguageReport,
      keyFindings: object.keyFindings,
      attentionNote: object.attentionNote,
      reviewStatus: "approved",
    });

    await updateDocumentStatus(documentId, "ready");
  } catch {
    await updateDocumentStatus(documentId, "failed");
  }
}
