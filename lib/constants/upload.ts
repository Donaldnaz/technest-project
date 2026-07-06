export const ALLOWED_MIME_TYPES = ["application/pdf", "image/jpeg"] as const;

export const MAX_UPLOAD_BYTES = 10 * 1024 * 1024;

export function normalizeMimeType(mimeType: string): string | null {
  const normalized = mimeType.toLowerCase().trim();
  if (normalized === "image/jpg") {
    return "image/jpeg";
  }
  if ((ALLOWED_MIME_TYPES as readonly string[]).includes(normalized)) {
    return normalized;
  }
  return null;
}
