import { beforeEach, describe, expect, it, vi } from "vitest";

const getOptionalSession = vi.fn();
const getDocumentById = vi.fn();
const getSignedDocumentUrl = vi.fn();

vi.mock("@/lib/auth/session", () => ({
  getOptionalSession: (...args: unknown[]) => getOptionalSession(...args),
}));

vi.mock("@/lib/db/queries/documents", () => ({
  getDocumentById: (...args: unknown[]) => getDocumentById(...args),
}));

vi.mock("@/lib/blob/access", () => ({
  getSignedDocumentUrl: (...args: unknown[]) => getSignedDocumentUrl(...args),
}));

import { GET } from "@/app/api/documents/[id]/preview/route";

describe("GET /api/documents/[id]/preview", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("returns 401 when unauthenticated", async () => {
    getOptionalSession.mockResolvedValue(null);

    const response = await GET(new Request("http://localhost"), {
      params: Promise.resolve({ id: "doc-1" }),
    });

    expect(response.status).toBe(401);
    expect(getDocumentById).not.toHaveBeenCalled();
  });

  it("returns 404 when document is not found for tenant", async () => {
    getOptionalSession.mockResolvedValue({ user: { id: "user-1" } });
    getDocumentById.mockResolvedValue(null);

    const response = await GET(new Request("http://localhost"), {
      params: Promise.resolve({ id: "doc-1" }),
    });

    expect(response.status).toBe(404);
    expect(getDocumentById).toHaveBeenCalledWith("user-1", "doc-1");
  });

  it("returns signed preview URL for authorized user", async () => {
    getOptionalSession.mockResolvedValue({ user: { id: "user-1" } });
    getDocumentById.mockResolvedValue({
      id: "doc-1",
      blobUrl: "https://blob.example/cbc.pdf",
      fileName: "cbc.pdf",
      mimeType: "application/pdf",
    });
    getSignedDocumentUrl.mockReturnValue("https://blob.example/cbc.pdf?sig=1");

    const response = await GET(new Request("http://localhost"), {
      params: Promise.resolve({ id: "doc-1" }),
    });

    expect(response.status).toBe(200);
    expect(await response.json()).toEqual({
      url: "https://blob.example/cbc.pdf?sig=1",
      fileName: "cbc.pdf",
      mimeType: "application/pdf",
    });
    expect(getSignedDocumentUrl).toHaveBeenCalledWith(
      "https://blob.example/cbc.pdf",
    );
  });
});
