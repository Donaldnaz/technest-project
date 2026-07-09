import { describe, expect, it } from "vitest";

import { formatSummaryReportPdf } from "@/lib/summary-reports/format-summary-report-pdf";

describe("formatSummaryReportPdf", () => {
  it("returns a non-empty PDF byte array", async () => {
    const bytes = await formatSummaryReportPdf({
      fileName: "cbc-results.pdf",
      category: "lab_results",
      documentType: "Lab results",
      reportDate: "2026-01-15",
      collectionDate: null,
      summary: "Your results are within normal range.",
      plainLanguageReport: "Full report body.",
      keyFindings: ["Finding one"],
      attentionNote: null,
      extractedAt: new Date("2026-01-16T10:00:00.000Z"),
    });

    expect(bytes.byteLength).toBeGreaterThan(100);
    expect(Buffer.from(bytes).subarray(0, 4).toString()).toBe("%PDF");
  });
});
