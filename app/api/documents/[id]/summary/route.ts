import { NextResponse } from "next/server";

import { getOptionalSession } from "@/lib/auth/session";
import type { DocumentCategory } from "@/lib/constants/document-categories";
import {
  getPractitionerSummaryReportByDocumentId,
  logDocumentAccess,
} from "@/lib/db/queries/summary-reports";
import {
  formatSummaryReportText,
  getSummaryReportFileName,
} from "@/lib/summary-reports/format-summary-report";

export async function GET(
  _request: Request,
  context: { params: Promise<{ id: string }> },
) {
  const session = await getOptionalSession();
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await context.params;
  const report = await getPractitionerSummaryReportByDocumentId(
    session.user.id,
    id,
  );

  if (!report) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  const body = formatSummaryReportText({
    fileName: report.fileName,
    category: report.category as DocumentCategory,
    documentType: report.extraction.documentType,
    reportDate: report.extraction.reportDate,
    collectionDate: report.extraction.collectionDate,
    summary: report.extraction.summary,
    attentionNote: report.extraction.attentionNote,
    extractedAt: report.extraction.extractedAt,
  });

  await logDocumentAccess(report.id, session.user.id, "summary_download");

  const fileName = getSummaryReportFileName(report.fileName);

  return new NextResponse(body, {
    status: 200,
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Content-Disposition": `attachment; filename="${fileName}"`,
      "Cache-Control": "private, no-store",
    },
  });
}
