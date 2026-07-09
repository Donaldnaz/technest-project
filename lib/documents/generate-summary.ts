import "server-only";

import { processDocumentExtraction } from "@/lib/ai/extract-document";
import { canRequestSummaryGeneration } from "@/lib/documents/can-request-summary";
import {
  getDocumentWithExtraction,
  markSummaryGenerationRequested,
  updateDocumentStatus,
} from "@/lib/db/queries/documents";

const RATE_LIMIT_MS = 5 * 60 * 1000;

export type GenerateSummaryResult =
  | { ok: true }
  | { ok: false; status: 400 | 404 | 429; error: string };

export async function requestDocumentSummaryGeneration(
  userId: string,
  documentId: string,
): Promise<GenerateSummaryResult> {
  const document = await getDocumentWithExtraction(userId, documentId);

  // #region agent log
  fetch("http://127.0.0.1:7863/ingest/5dd3f215-8ab7-42f7-a6cd-7326877028c0", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Debug-Session-Id": "3f90c7",
    },
    body: JSON.stringify({
      sessionId: "3f90c7",
      runId: "pre-fix",
      hypothesisId: "C",
      location: "generate-summary.ts:request",
      message: "document eligibility check",
      data: {
        documentId,
        found: Boolean(document),
        status: document?.status ?? null,
        reviewStatus: document?.extraction?.reviewStatus ?? null,
        hasExtraction: Boolean(document?.extraction),
        hasRequestedAt: Boolean(document?.summaryGenerationRequestedAt),
        canGenerate: document
          ? canRequestSummaryGeneration(document)
          : false,
      },
      timestamp: Date.now(),
    }),
  }).catch(() => {});
  // #endregion

  if (!document) {
    return { ok: false, status: 404, error: "Document not found." };
  }

  const canGenerate = canRequestSummaryGeneration(document);

  if (!canGenerate) {
    return {
      ok: false,
      status: 400,
      error: "Summary generation is not available for this document.",
    };
  }

  const lastRequested = document.summaryGenerationRequestedAt;
  if (
    lastRequested &&
    Date.now() - lastRequested.getTime() < RATE_LIMIT_MS
  ) {
    // #region agent log
    fetch("http://127.0.0.1:7863/ingest/5dd3f215-8ab7-42f7-a6cd-7326877028c0", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Debug-Session-Id": "3f90c7",
      },
      body: JSON.stringify({
        sessionId: "3f90c7",
        runId: "pre-fix",
        hypothesisId: "D",
        location: "generate-summary.ts:rate-limit",
        message: "rate limited",
        data: {
          documentId,
          msSinceLast: Date.now() - lastRequested.getTime(),
        },
        timestamp: Date.now(),
      }),
    }).catch(() => {});
    // #endregion
    return {
      ok: false,
      status: 429,
      error: "Please wait a few minutes before requesting another summary.",
    };
  }

  await markSummaryGenerationRequested(documentId);
  await updateDocumentStatus(documentId, "processing");

  void processDocumentExtraction(
    documentId,
    document.blobUrl,
    document.mimeType,
    document.fileName,
  );

  return { ok: true };
}
