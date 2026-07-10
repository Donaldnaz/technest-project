import { NextResponse } from "next/server";

import { getOptionalSession } from "@/lib/auth/session";
import type { DocumentCategory } from "@/lib/constants/document-categories";
import {
  getPractitionerSummaryReportByDocumentId,
  logDocumentAccess,
} from "@/lib/db/queries/summary-reports";
import { formatSummaryReportPdf } from "@/lib/summary-reports/format-summary-report-pdf";
import {
  formatSummaryReportText,
  getSummaryReportFileName,
} from "@/lib/summary-reports/format-summary-report";

function buildPayload(report: NonNullable<
  Awaited<ReturnType<typeof getPractitionerSummaryReportByDocumentId>>
>) {
  return {
    fileName: report.fileName,
    category: report.category as DocumentCategory,
    documentType: report.extraction.documentType,
    reportDate: report.extraction.reportDate,
    collectionDate: report.extraction.collectionDate,
    summary: report.extraction.summary,
    plainLanguageReport: report.extraction.plainLanguageReport,
    keyFindings: report.extraction.keyFindings,
    attentionNote: report.extraction.attentionNote,
    extractedAt: report.extraction.extractedAt,
  };
}

export async function GET(
  request: Request,
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

  const payload = buildPayload(report);
  const format = new URL(request.url).searchParams.get("format");
  const isPdf = format === "pdf";

  await logDocumentAccess(
    report.id,
    session.user.id,
    isPdf ? "summary_download_pdf" : "summary_download",
  );

  if (isPdf) {
    const pdfBytes = await formatSummaryReportPdf(payload);
    const fileName = getSummaryReportFileName(report.fileName, "pdf");

    return new NextResponse(Buffer.from(pdfBytes), {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="${fileName}"`,
        "Cache-Control": "private, no-store",
      },
    });
  }

  const body = formatSummaryReportText(payload);
  const fileName = getSummaryReportFileName(report.fileName, "txt");

  return new NextResponse(body, {
    status: 200,
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Content-Disposition": `attachment; filename="${fileName}"`,
      "Cache-Control": "private, no-store",
    },
  });
}
