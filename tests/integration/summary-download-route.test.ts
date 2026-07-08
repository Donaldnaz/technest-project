import { beforeEach, describe, expect, it, vi } from "vitest";

const mockDb = vi.hoisted(() => ({
  select: vi.fn(),
  insert: vi.fn(),
}));

vi.mock("@/lib/db", () => ({
  db: mockDb,
}));

import { GET } from "@/app/api/documents/[id]/summary/route";

const getOptionalSession = vi.fn();
const getPractitionerSummaryReportByDocumentId = vi.fn();
const logDocumentAccess = vi.fn();

vi.mock("@/lib/auth/session", () => ({
  getOptionalSession: (...args: unknown[]) => getOptionalSession(...args),
}));

vi.mock("@/lib/db/queries/summary-reports", () => ({
  getPractitionerSummaryReportByDocumentId: (...args: unknown[]) =>
    getPractitionerSummaryReportByDocumentId(...args),
  logDocumentAccess: (...args: unknown[]) => logDocumentAccess(...args),
}));

describe("GET /api/documents/[id]/summary", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("returns 401 when unauthenticated", async () => {
    getOptionalSession.mockResolvedValue(null);

    const response = await GET(new Request("http://localhost"), {
      params: Promise.resolve({ id: "doc-1" }),
    });

    expect(response.status).toBe(401);
    expect(getPractitionerSummaryReportByDocumentId).not.toHaveBeenCalled();
  });

  it("returns 404 when report is not found for tenant", async () => {
    getOptionalSession.mockResolvedValue({ user: { id: "user-1" } });
    getPractitionerSummaryReportByDocumentId.mockResolvedValue(null);

    const response = await GET(new Request("http://localhost"), {
      params: Promise.resolve({ id: "doc-1" }),
    });

    expect(response.status).toBe(404);
    expect(getPractitionerSummaryReportByDocumentId).toHaveBeenCalledWith(
      "user-1",
      "doc-1",
    );
  });

  it("returns summary attachment for authorized user", async () => {
    getOptionalSession.mockResolvedValue({ user: { id: "user-1" } });
    getPractitionerSummaryReportByDocumentId.mockResolvedValue({
      id: "doc-1",
      fileName: "cbc.pdf",
      category: "lab_results",
      extraction: {
        documentType: "Lab results",
        reportDate: "2026-01-01",
        collectionDate: null,
        summary: "Everything looks normal.",
        attentionNote: null,
        extractedAt: new Date("2026-01-02T00:00:00.000Z"),
      },
    });

    const response = await GET(new Request("http://localhost"), {
      params: Promise.resolve({ id: "doc-1" }),
    });

    expect(response.status).toBe(200);
    expect(response.headers.get("Content-Type")).toContain("text/plain");
    expect(await response.text()).toContain("Everything looks normal.");
    expect(logDocumentAccess).toHaveBeenCalledWith(
      "doc-1",
      "user-1",
      "summary_download",
    );
  });
});
