import { describe, expect, it } from "vitest";

import { onboardingSchema } from "@/lib/validations/onboarding";

const validSelfOnboarding = {
  accountFirstName: "Jane",
  accountLastName: "Doe",
  relationship: "self" as const,
  patientFirstName: "Jane",
  patientLastName: "Doe",
  dateOfBirth: "1990-05-01",
  medicalRecordNumber: "12345",
  healthcareLocation: "City Medical Center",
  city: "San Francisco",
  state: "California",
  country: "United States" as const,
  healthQuarter: "West",
  healthcareSpecialty: "Primary care" as const,
  consentAccuracy: "on" as const,
  consentAuthorization: "on" as const,
};

describe("onboardingSchema", () => {
  it("accepts a valid self onboarding payload", () => {
    expect(onboardingSchema.safeParse(validSelfOnboarding).success).toBe(true);
  });

  it("requires healthcare location", () => {
    const result = onboardingSchema.safeParse({
      ...validSelfOnboarding,
      healthcareLocation: "",
    });
    expect(result.success).toBe(false);
  });

  it("requires custom specialty when other is selected", () => {
    const result = onboardingSchema.safeParse({
      ...validSelfOnboarding,
      healthcareSpecialty: "Other" as const,
      customSpecialty: "",
    });
    expect(result.success).toBe(false);
  });
});
