/** Fixed locale + timezone keep SSR and client hydration output identical. */
const DISPLAY_LOCALE = "en-US";
const DISPLAY_TIME_ZONE = "UTC";

export function toDate(value: string | Date | null | undefined): Date | null {
  if (!value) return null;
  const date = value instanceof Date ? value : new Date(value);
  return Number.isNaN(date.getTime()) ? null : date;
}

function formatWithDisplayDefaults(
  date: Date,
  options: Intl.DateTimeFormatOptions,
): string {
  return date.toLocaleString(DISPLAY_LOCALE, {
    timeZone: DISPLAY_TIME_ZONE,
    ...options,
  });
}

export function formatDisplayDate(value: string | Date | null | undefined): string {
  const date = toDate(value);
  if (!date) return "—";
  return date.toLocaleDateString(DISPLAY_LOCALE, {
    timeZone: DISPLAY_TIME_ZONE,
  });
}

export function formatDisplayDateTime(
  value: string | Date | null | undefined,
): string {
  const date = toDate(value);
  if (!date) return "—";
  return formatWithDisplayDefaults(date, {
    dateStyle: "medium",
    timeStyle: "short",
  });
}

export function toIsoDateTime(value: string | Date | null | undefined): string {
  const date = toDate(value);
  return date?.toISOString() ?? "";
}

export function formatCareTimelineDateTime(
  value: string | Date | null | undefined,
): string {
  const date = toDate(value);
  if (!date) return "—";

  return formatWithDisplayDefaults(date, {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
}
