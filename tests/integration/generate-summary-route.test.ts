import { beforeEach, describe, expect, it, vi } from "vitest";

const processDocumentExtraction = vi.fn();
const getDocumentWithExtraction = vi.fn();
const markSummaryGenerationRequested = vi.fn();
const updateDocumentStatus = vi.fn();

vi.mock("@/lib/ai/extract-document", () => ({
  processDocumentExtraction: (...args: unknown[]) =>
    processDocumentExtraction(...args),
}));

vi.mock("@/lib/db/queries/documents", () => ({
  getDocumentWithExtraction: (...args: unknown[]) =>
    getDocumentWithExtraction(...args),
  markSummaryGenerationRequested: (...args: unknown[]) =>
    markSummaryGenerationRequested(...args),
  updateDocumentStatus: (...args: unknown[]) => updateDocumentStatus(...args),
}));

import { POST } from "@/app/api/documents/[id]/generate-summary/route";

const getOptionalSession = vi.fn();

vi.mock("@/lib/auth/session", () => ({
  getOptionalSession: (...args: unknown[]) => getOptionalSession(...args),
}));

describe("POST /api/documents/[id]/generate-summary", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("returns 401 when unauthenticated", async () => {
    getOptionalSession.mockResolvedValue(null);

    const response = await POST(new Request("http://localhost"), {
      params: Promise.resolve({ id: "doc-1" }),
    });

    expect(response.status).toBe(401);
  });

  it("returns 404 when document is missing", async () => {
    getOptionalSession.mockResolvedValue({ user: { id: "user-1" } });
    getDocumentWithExtraction.mockResolvedValue(null);

    const response = await POST(new Request("http://localhost"), {
      params: Promise.resolve({ id: "doc-1" }),
    });

    expect(response.status).toBe(404);
  });

  it("starts generation for failed documents", async () => {
    getOptionalSession.mockResolvedValue({ user: { id: "user-1" } });
    getDocumentWithExtraction.mockResolvedValue({
      id: "doc-1",
      status: "failed",
      blobUrl: "https://blob.example/doc",
      mimeType: "application/pdf",
      fileName: "lab.pdf",
      extraction: { reviewStatus: "rejected" },
      summaryGenerationRequestedAt: null,
    });

    const response = await POST(new Request("http://localhost"), {
      params: Promise.resolve({ id: "doc-1" }),
    });

    expect(response.status).toBe(200);
    expect(markSummaryGenerationRequested).toHaveBeenCalledWith("doc-1");
    expect(updateDocumentStatus).toHaveBeenCalledWith("doc-1", "processing");
    expect(processDocumentExtraction).toHaveBeenCalled();
  });
});
