/**
 * Mask a person's name for Slack/ops alerts (PHI-safe).
 * e.g. "Jane Doe" → "J*** D***"
 */
export function maskPatientName(firstName: string, lastName: string): string {
  const maskPart = (part: string) => {
    const trimmed = part.trim();
    if (!trimmed) return "***";
    if (trimmed.length === 1) return `${trimmed}***`;
    return `${trimmed[0]}***`;
  };

  return `${maskPart(firstName)} ${maskPart(lastName)}`.trim();
}

/**
 * Truncate free-text notes for external channels.
 */
export function maskFreeTextNote(
  note: string | null | undefined,
  maxLength = 120,
): string | null {
  if (!note?.trim()) return null;

  const trimmed = note.trim().replace(/\s+/g, " ");
  if (trimmed.length <= maxLength) return trimmed;

  return `${trimmed.slice(0, maxLength - 1)}…`;
}
