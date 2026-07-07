import { z } from "zod";

import { DOCUMENT_CATEGORIES } from "@/lib/constants/document-categories";
import { ALLOWED_MIME_TYPES } from "@/lib/constants/upload";
import { patientValidationCopy } from "@/lib/copy/patient/validation";

export const uploadClientPayloadSchema = z.object({
  patientId: z.string().uuid(),
  fileName: z.string().min(1).max(255),
  mimeType: z.enum(ALLOWED_MIME_TYPES),
  category: z.enum(DOCUMENT_CATEGORIES).default("other"),
});

export type UploadClientPayload = z.infer<typeof uploadClientPayloadSchema>;

export const uploadTokenPayloadSchema = z.object({
  userId: z.string().min(1),
  patientId: z.string().uuid(),
  fileName: z.string().min(1).max(255),
  mimeType: z.enum(ALLOWED_MIME_TYPES),
  category: z.enum(DOCUMENT_CATEGORIES).default("other"),
});

export type UploadTokenPayload = z.infer<typeof uploadTokenPayloadSchema>;

export const shareWithProviderSchema = z.object({
  patientId: z.string().uuid(),
  providerEmail: z.string().email(patientValidationCopy.share.email),
  message: z
    .string()
    .trim()
    .max(500)
    .optional()
    .transform((value) => (value === "" ? undefined : value)),
});

export type ShareWithProviderInput = z.infer<typeof shareWithProviderSchema>;
