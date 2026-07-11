import { describe, expect, it } from "vitest";

import {
  shareWithProviderSchema,
  uploadClientPayloadSchema,
} from "@/lib/validations/document";

const validUpload = {
  patientId: "9dbc8449-1f92-42dc-aa0e-b60959540a43",
  fileName: "lab-report.pdf",
  mimeType: "application/pdf" as const,
  category: "lab_results" as const,
};

describe("uploadClientPayloadSchema", () => {
  it("accepts valid upload payloads", () => {
    expect(uploadClientPayloadSchema.safeParse(validUpload).success).toBe(true);
  });

  it("accepts PNG uploads", () => {
    expect(
      uploadClientPayloadSchema.safeParse({
        ...validUpload,
        fileName: "scan.png",
        mimeType: "image/png",
      }).success,
    ).toBe(true);
  });

  it("rejects invalid mime types", () => {
    const result = uploadClientPayloadSchema.safeParse({
      ...validUpload,
      mimeType: "application/zip",
    });
    expect(result.success).toBe(false);
  });

  it("rejects invalid patient ids", () => {
    const result = uploadClientPayloadSchema.safeParse({
      ...validUpload,
      patientId: "not-a-uuid",
    });
    expect(result.success).toBe(false);
  });
});

describe("shareWithProviderSchema", () => {
  it("accepts valid share requests", () => {
    const result = shareWithProviderSchema.safeParse({
      patientId: validUpload.patientId,
      providerEmail: "doctor@example.com",
      message: "Please review",
    });
    expect(result.success).toBe(true);
  });

  it("rejects invalid provider emails", () => {
    const result = shareWithProviderSchema.safeParse({
      patientId: validUpload.patientId,
      providerEmail: "not-an-email",
    });
    expect(result.success).toBe(false);
  });
});
