import type { DocumentWithExtraction } from "@/lib/db/queries/documents";
import { patientAiCopy } from "@/lib/copy/patient/ai";

export function getDocumentAiStatusLabel(
  document: DocumentWithExtraction,
): string {
  if (
    document.status === "failed" ||
    document.extraction?.reviewStatus === "rejected"
  ) {
    return patientAiCopy.needsReview;
  }

  if (document.status === "processing") {
    return patientAiCopy.processing;
  }

  if (
    document.status === "ready" &&
    document.extraction?.reviewStatus === "approved"
  ) {
    return patientAiCopy.summaryReady;
  }

  if (document.status === "ready") {
    return patientAiCopy.summaryReady;
  }

  return patientAiCopy.processing;
}

export function getDocumentAiNoticeVariant(
  document: DocumentWithExtraction,
): "processing" | "summaryReady" | "needsReview" {
  if (
    document.status === "failed" ||
    document.extraction?.reviewStatus === "rejected"
  ) {
    return "needsReview";
  }

  if (
    document.status === "ready" &&
    (document.extraction?.reviewStatus === "approved" || !document.extraction)
  ) {
    return "summaryReady";
  }

  return "processing";
}
