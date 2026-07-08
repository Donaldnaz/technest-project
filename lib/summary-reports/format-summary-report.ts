import type { DocumentCategory } from "@/lib/constants/document-categories";
import { getPatientCategoryLabel } from "@/lib/copy/patient/library";
import { formatDisplayDate } from "@/lib/dates";

export type SummaryReportPayload = {
  fileName: string;
  category: DocumentCategory;
  documentType: string | null;
  reportDate: string | null;
  collectionDate: string | null;
  summary: string;
  attentionNote: string | null;
  extractedAt: Date;
};

function safeDownloadBaseName(fileName: string): string {
  const withoutExtension = fileName.replace(/\.[^.]+$/, "");
  const sanitized = withoutExtension
    .replace(/[^\w\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .slice(0, 80);

  return sanitized.length > 0 ? sanitized : "summary-report";
}

export function getSummaryReportFileName(fileName: string): string {
  return `${safeDownloadBaseName(fileName)}-summary.txt`;
}

export function formatSummaryReportText(payload: SummaryReportPayload): string {
  const lines = [
    "iCare — Practitioner Summary Report",
    "===================================",
    "",
    `Document: ${payload.fileName}`,
    `Category: ${getPatientCategoryLabel(payload.category)}`,
  ];

  if (payload.documentType) {
    lines.push(`Document type: ${payload.documentType}`);
  }

  if (payload.reportDate) {
    lines.push(`Report date: ${formatDisplayDate(payload.reportDate)}`);
  }

  if (payload.collectionDate) {
    lines.push(`Collection date: ${formatDisplayDate(payload.collectionDate)}`);
  }

  lines.push(
    `Summary prepared: ${formatDisplayDate(payload.extractedAt)}`,
    "",
    "Plain-English summary",
    "---------------------",
    payload.summary,
  );

  if (payload.attentionNote) {
    lines.push(
      "",
      "Note from your care team",
      "-----------------------",
      payload.attentionNote,
    );
  }

  lines.push(
    "",
    "---",
    "This summary is for your personal records. It does not replace medical advice from your clinician.",
  );

  return lines.join("\n");
}
