import {
  CalendarPlus,
  FileUp,
} from "lucide-react";

import type { DocumentCategory } from "@/lib/constants/document-categories";
import { patientDashboardCopy } from "@/lib/copy/patient/dashboard";
import { getPatientCategoryLabel } from "@/lib/copy/patient/library";
import type { DocumentWithExtraction } from "@/lib/db/queries/documents";
import { formatCareTimelineDateTime, toDate, toIsoDateTime } from "@/lib/dates";

type TimelineItem = {
  id: string;
  title: string;
  subtitle: string;
  time: Date;
};

type CareTimelineProps = {
  documents: DocumentWithExtraction[];
  variant?: "health" | "clinical";
  /** When set, only the most recent N items are shown. Omit for the full history. */
  limit?: number;
  showHeader?: boolean;
};

/** Max items shown in My Records → Overview recent activity preview. */
export const RECENT_ACTIVITY_PREVIEW_LIMIT = 3;

/** Max items fetched for the dashboard home recent activity panel. */
export const RECENT_ACTIVITY_LIMIT = 5;

function buildTimelineItems(
  documents: DocumentWithExtraction[],
  limit?: number,
): TimelineItem[] {
  const uploadedLabel = patientDashboardCopy.patient.timeline.uploadedLabel;

  const sorted = documents
    .map((document) => ({
      id: `document-${document.id}`,
      title: document.fileName,
      subtitle: `${getPatientCategoryLabel(document.category as DocumentCategory)} · ${uploadedLabel}`,
      time: toDate(document.createdAt) ?? new Date(0),
    }))
    .sort((a, b) => b.time.getTime() - a.time.getTime());

  return limit !== undefined ? sorted.slice(0, limit) : sorted;
}

export function CareTimeline({
  documents,
  variant = "health",
  limit,
  showHeader,
}: CareTimelineProps) {
  const items = buildTimelineItems(documents, limit);
  const isClinical = variant === "clinical";
  const shouldShowHeader = showHeader ?? !isClinical;

  return (
    <section
      className={
        isClinical
          ? "space-y-4"
          : "health-card rounded-3xl p-6 shadow-sm md:p-8"
      }
      aria-label={patientDashboardCopy.patient.timeline.title}
    >
      {shouldShowHeader && (
        <div className="mb-6 flex items-start justify-between gap-4">
          <div className="space-y-2">
            <h2 className="font-heading text-lg font-semibold md:text-xl">
              {patientDashboardCopy.patient.timeline.title}
            </h2>
            <p className="text-sm leading-relaxed text-muted-foreground md:text-base">
              {patientDashboardCopy.patient.timeline.description}
            </p>
          </div>
          <CalendarPlus className="mt-1 size-5 shrink-0 text-muted-foreground" aria-hidden />
        </div>
      )}

      {items.length === 0 ? (
        <p className="rounded-2xl bg-muted/50 p-5 text-sm leading-relaxed text-muted-foreground">
          {patientDashboardCopy.empty.timeline}
        </p>
      ) : (
        <ol className="relative space-y-0">
          {items.map((item, index) => (
            <li key={item.id} className="relative flex gap-4 pb-7 last:pb-0">
              {index < items.length - 1 && (
                <span
                  className="absolute left-5 top-10 h-[calc(100%-1rem)] w-px bg-border"
                  aria-hidden
                />
              )}
              <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                <FileUp className="size-4" aria-hidden />
              </div>
              <div className="min-w-0 flex-1 pt-1">
                <p
                  className="truncate font-medium leading-snug text-foreground"
                  title={item.title}
                >
                  {item.title}
                </p>
                <p className="truncate text-sm text-muted-foreground">
                  {item.subtitle}
                </p>
                <time
                  dateTime={toIsoDateTime(item.time)}
                  className="mt-1 block text-xs text-muted-foreground"
                >
                  {formatCareTimelineDateTime(item.time)}
                </time>
              </div>
            </li>
          ))}
        </ol>
      )}
    </section>
  );
}
