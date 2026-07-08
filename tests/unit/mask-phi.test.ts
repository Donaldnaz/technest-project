import { describe, expect, it } from "vitest";

import {
  maskFreeTextNote,
  maskMedicalRecordNumber,
  maskPatientName,
} from "@/lib/slack/mask-phi";

describe("maskPatientName", () => {
  it("masks each name part", () => {
    expect(maskPatientName("Jane", "Doe")).toBe("J*** D***");
  });

  it("handles empty parts", () => {
    expect(maskPatientName("", "Doe")).toBe("*** D***");
  });
});

describe("maskFreeTextNote", () => {
  it("returns null for empty notes", () => {
    expect(maskFreeTextNote("   ")).toBeNull();
  });

  it("truncates long notes", () => {
    const note = "a".repeat(200);
    const masked = maskFreeTextNote(note, 20);
    expect(masked).toHaveLength(20);
    expect(masked?.endsWith("…")).toBe(true);
  });
});

describe("maskMedicalRecordNumber", () => {
  it("masks all but last four characters", () => {
    expect(maskMedicalRecordNumber("MRN1234567890")).toBe("*********7890");
  });

  it("returns not on file for missing values", () => {
    expect(maskMedicalRecordNumber(null)).toBe("Not on file");
  });
});
