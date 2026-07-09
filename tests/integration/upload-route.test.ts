import { beforeEach, describe, expect, it, vi } from "vitest";

const handleUpload = vi.fn();
const requireUserId = vi.fn();

vi.mock("@vercel/blob/client", () => ({
  handleUpload: (...args: unknown[]) => handleUpload(...args),
}));

vi.mock("@/lib/auth/session", () => ({
  requireUserId: (...args: unknown[]) => requireUserId(...args),
}));

vi.mock("@/lib/documents/finalize-upload", () => ({
  finalizeDocumentUpload: vi.fn(),
}));

vi.mock("@/lib/db/queries/patients", () => ({
  getPatientById: vi.fn(),
}));

vi.mock("@/lib/slack/post-upload-notifications", () => ({
  notifyDocumentUploadSlack: vi.fn(),
}));

import { POST } from "@/app/api/upload/route";
import { UnauthorizedError } from "@/lib/errors";

const BLOB_TOKEN = "vercel_blob_rw_storeid_secretpart";

describe("POST /api/upload", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    requireUserId.mockResolvedValue("user-1");
    process.env.BLOB_READ_WRITE_TOKEN = BLOB_TOKEN;
    handleUpload.mockImplementation(async ({ onBeforeGenerateToken }) => {
      await onBeforeGenerateToken("patients/patient-1/file.pdf", "{}");
      return { type: "blob.generate-client-token" as const, clientToken: "token" };
    });
  });

  it("returns 401 when session is missing during token generation", async () => {
    requireUserId.mockRejectedValue(new UnauthorizedError());

    const response = await POST(
      new Request("http://localhost/api/upload", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type: "blob.generate-client-token" }),
      }),
    );

    expect(response.status).toBe(401);
    expect(await response.json()).toEqual({
      error: "You must be signed in to perform this action.",
    });
  });
});
