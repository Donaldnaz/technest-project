import type { DocumentWithExtraction } from "@/lib/db/queries/documents";

export function canRequestSummaryGeneration(
  document: Pick<DocumentWithExtraction, "status"> & {
    extraction: DocumentWithExtraction["extraction"];
  },
): boolean {
  const reviewStatus = document.extraction?.reviewStatus;
  return (
    document.status === "failed" ||
    reviewStatus === "rejected" ||
    (!document.extraction && document.status !== "processing")
  );
}
