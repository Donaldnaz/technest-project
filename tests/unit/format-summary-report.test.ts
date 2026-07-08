import { describe, expect, it } from "vitest";

import {
  formatSummaryReportText,
  getSummaryReportFileName,
} from "@/lib/summary-reports/format-summary-report";

describe("formatSummaryReportText", () => {
  it("includes core summary sections", () => {
    const text = formatSummaryReportText({
      fileName: "cbc-results.pdf",
      category: "lab_results",
      documentType: "Lab results",
      reportDate: "2026-01-15",
      collectionDate: null,
      summary: "Your results are within normal range.",
      attentionNote: null,
      extractedAt: new Date("2026-01-16T10:00:00.000Z"),
    });

    expect(text).toContain("iCare — Practitioner Summary Report");
    expect(text).toContain("cbc-results.pdf");
    expect(text).toContain("Your results are within normal range.");
    expect(text).toContain("does not replace medical advice");
  });

  it("includes attention note when present", () => {
    const text = formatSummaryReportText({
      fileName: "xray.pdf",
      category: "imaging",
      documentType: null,
      reportDate: null,
      collectionDate: null,
      summary: "Summary text.",
      attentionNote: "Follow up with your doctor.",
      extractedAt: new Date("2026-01-16T10:00:00.000Z"),
    });

    expect(text).toContain("Note from your care team");
    expect(text).toContain("Follow up with your doctor.");
  });
});

describe("getSummaryReportFileName", () => {
  it("builds a safe download filename", () => {
    expect(getSummaryReportFileName("CBC Lab Results.pdf")).toBe(
      "CBC-Lab-Results-summary.txt",
    );
  });
});
