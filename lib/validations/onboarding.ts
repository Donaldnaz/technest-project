import { z } from "zod";

import {
  CALIFORNIA_HEALTH_QUARTERS,
  DEFAULT_COUNTRY,
  DEFAULT_STATE,
} from "@/lib/constants/california-locations";
import {
  HEALTHCARE_SPECIALTIES,
  OTHER_SPECIALTY,
} from "@/lib/constants/specialties";

const relationshipSchema = z.enum(["self", "other"]);

const locationSchema = z.object({
  healthcareLocation: z
    .string()
    .trim()
    .min(1, "Healthcare location is required")
    .max(200),
  city: z.string().trim().min(1, "City is required").max(100),
  state: z.literal(DEFAULT_STATE),
  country: z.literal(DEFAULT_COUNTRY),
  healthQuarter: z.enum(CALIFORNIA_HEALTH_QUARTERS, {
    message: "Select a California health region",
  }),
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

export const patientFieldsSchema = z
  .object({
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
      .optional()
      .transform((value) => (value === "" ? undefined : value))
      .pipe(z.string().date("Enter a valid date (YYYY-MM-DD)").optional()),
    medicalRecordNumber: z
      .string()
      .trim()
      .max(50)
      .optional()
      .transform((value) => (value === "" ? undefined : value)),
    additionalNotes: z
      .string()
      .trim()
      .max(2000)
      .optional()
      .transform((value) => (value === "" ? undefined : value)),
  })
  .merge(locationSchema)
  .merge(specialtySchema);

export const onboardingSchema = z
  .object({
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
  })
  .merge(patientFieldsSchema);

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
    state: formData.get("state") ?? DEFAULT_STATE,
    country: formData.get("country") ?? DEFAULT_COUNTRY,
    healthQuarter: formData.get("healthQuarter"),
    additionalNotes: formData.get("additionalNotes") ?? undefined,
  });
}
