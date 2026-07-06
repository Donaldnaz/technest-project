export function toDate(value: string | Date | null | undefined): Date | null {
  if (!value) return null;
  const date = value instanceof Date ? value : new Date(value);
  return Number.isNaN(date.getTime()) ? null : date;
}

export function formatDisplayDate(value: string | Date | null | undefined): string {
  const date = toDate(value);
  if (!date) return "—";
  return date.toLocaleDateString();
}

export function formatDisplayDateTime(
  value: string | Date | null | undefined,
): string {
  const date = toDate(value);
  if (!date) return "—";
  return date.toLocaleString(undefined, {
    dateStyle: "medium",
    timeStyle: "short",
  });
}

export function toIsoDateTime(value: string | Date | null | undefined): string {
  const date = toDate(value);
  return date?.toISOString() ?? "";
}
