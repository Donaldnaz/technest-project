import { z } from "zod";

import {
  CA_CARE_REGIONS,
  CA_PROVINCES,
  SUPPORTED_COUNTRIES,
  US_CARE_REGIONS,
  US_STATES,
  isValidCareRegion,
  isValidSubdivision,
  type SupportedCountry,
} from "@/lib/constants/north-america-locations";
import {
  HEALTHCARE_SPECIALTIES,
  OTHER_SPECIALTY,
} from "@/lib/constants/specialties";

const relationshipSchema = z.enum(["self", "other"]);

const countrySchema = z.enum(SUPPORTED_COUNTRIES, {
  message: "Select a country",
});

const locationSchema = z
  .object({
    healthcareLocation: z
      .string()
      .trim()
      .min(1, "Healthcare location is required")
      .max(200),
    city: z.string().trim().min(1, "City is required").max(100),
    state: z.string().trim().min(1, "State or province is required").max(100),
    country: countrySchema,
    healthQuarter: z.string().trim().min(1, "Select a care region").max(100),
  })
  .superRefine((data, ctx) => {
    const country = data.country as SupportedCountry;

    if (!isValidSubdivision(country, data.state)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message:
          country === "Canada"
            ? "Select a valid province or territory"
            : "Select a valid state",
        path: ["state"],
      });
    }

    if (!isValidCareRegion(country, data.healthQuarter)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Select a valid care region",
        path: ["healthQuarter"],
      });
    }
  });

const specialtySchema = z
  .object({
    healthcareSpecialty: z.enum(HEALTHCARE_SPECIALTIES, {
      message: "Select a healthcare specialty",
    }),
    customSpecialty: z
      .string()
      .trim()
      .max(100)
      .optional()
      .transform((value) => (value === "" ? undefined : value)),
  })
  .superRefine((data, ctx) => {
    if (
      data.healthcareSpecialty === OTHER_SPECIALTY &&
      !data.customSpecialty?.trim()
    ) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Please describe your specialty",
        path: ["customSpecialty"],
      });
    }
  });

const consentSchema = z.object({
  consentAccuracy: z.literal("on", {
    message: "Please confirm the information is accurate",
  }),
  consentAuthorization: z.literal("on", {
    message: "Please confirm you are authorized to submit this information",
  }),
});

const patientBaseSchema = z.object({
  relationship: relationshipSchema,
  patientFirstName: z
    .string()
    .trim()
    .min(1, "First name is required")
    .max(100),
  patientLastName: z
    .string()
    .trim()
    .min(1, "Last name is required")
    .max(100),
  dateOfBirth: z
    .string()
    .trim()
    .min(1, "Date of birth is required")
    .pipe(z.string().date("Enter a valid date (YYYY-MM-DD)")),
  medicalRecordNumber: z
    .string()
    .trim()
    .min(1, "Medical record number is required")
    .max(50),
  additionalNotes: z
    .string()
    .trim()
    .max(2000)
    .optional()
    .transform((value) => (value === "" ? undefined : value)),
});

// Zod 4: .merge() fails on schemas that already have refinements; use .and() instead.
export const patientFieldsSchema = patientBaseSchema
  .and(locationSchema)
  .and(specialtySchema);

const accountSchema = z.object({
  accountFirstName: z
    .string()
    .trim()
    .min(1, "First name is required")
    .max(100),
  accountLastName: z
    .string()
    .trim()
    .min(1, "Last name is required")
    .max(100),
});

export const onboardingSchema = accountSchema
  .and(patientFieldsSchema)
  .and(consentSchema);

export type OnboardingInput = z.infer<typeof onboardingSchema>;

export function resolveSpecialtyValue(input: OnboardingInput): string {
  if (input.healthcareSpecialty === OTHER_SPECIALTY) {
    return input.customSpecialty?.trim() ?? OTHER_SPECIALTY;
  }
  return input.healthcareSpecialty;
}

export function parseOnboardingFormData(formData: FormData): OnboardingInput {
  return onboardingSchema.parse({
    accountFirstName: formData.get("accountFirstName"),
    accountLastName: formData.get("accountLastName"),
    relationship: formData.get("relationship"),
    patientFirstName: formData.get("patientFirstName"),
    patientLastName: formData.get("patientLastName"),
    dateOfBirth: formData.get("dateOfBirth") ?? undefined,
    medicalRecordNumber: formData.get("medicalRecordNumber") ?? undefined,
    healthcareSpecialty: formData.get("healthcareSpecialty"),
    customSpecialty: formData.get("customSpecialty") ?? undefined,
    healthcareLocation: formData.get("healthcareLocation"),
    city: formData.get("city"),
    state: formData.get("state"),
    country: formData.get("country"),
    healthQuarter: formData.get("healthQuarter"),
    additionalNotes: formData.get("additionalNotes") ?? undefined,
    consentAccuracy: formData.get("consentAccuracy"),
    consentAuthorization: formData.get("consentAuthorization"),
  });
}

export {
  CA_CARE_REGIONS,
  CA_PROVINCES,
  SUPPORTED_COUNTRIES,
  US_CARE_REGIONS,
  US_STATES,
};
