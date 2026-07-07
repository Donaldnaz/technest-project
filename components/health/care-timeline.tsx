import Link from "next/link";
import {
  CalendarPlus,
  FileUp,
} from "lucide-react";

import { patientTabHref } from "@/lib/navigation/patient-nav";
import type { DocumentCategory } from "@/lib/constants/document-categories";
import { patientDashboardCopy } from "@/lib/copy/patient/dashboard";
import {
  getPatientCategoryLabel,
} from "@/lib/copy/patient/library";
import { patientStatusCopy } from "@/lib/copy/patient/status";
import type { DocumentWithExtraction } from "@/lib/db/queries/documents";
import { toDate, toIsoDateTime } from "@/lib/dates";

type TimelineItem = {
  id: string;
  title: string;
  subtitle: string;
  time: Date;
  href: string;
};

type CareTimelineProps = {
  documents: DocumentWithExtraction[];
  variant?: "health" | "clinical";
};

const recordStatusLabels = patientStatusCopy.dbMapping;

function buildTimelineItems(
  documents: DocumentWithExtraction[],
): TimelineItem[] {
  return documents
    .map((document) => ({
      id: `document-${document.id}`,
      title: document.fileName,
      subtitle: document.extraction?.summary
        ? `${getPatientCategoryLabel(document.category as DocumentCategory)} · ${document.extraction.summary.slice(0, 80)}${document.extraction.summary.length > 80 ? "…" : ""}`
        : `${getPatientCategoryLabel(document.category as DocumentCategory)} · ${recordStatusLabels[document.status]}`,
      time: toDate(document.createdAt) ?? new Date(0),
      href: patientTabHref(document.patientId, "documents"),
    }))
    .sort((a, b) => b.time.getTime() - a.time.getTime())
    .slice(0, 8);
}

export function CareTimeline({
  documents,
  variant = "health",
}: CareTimelineProps) {
  const items = buildTimelineItems(documents);
  const isClinical = variant === "clinical";

  return (
    <section
      className={
        isClinical
          ? "space-y-4"
          : "health-card rounded-3xl p-6 shadow-sm md:p-8"
      }
    >
      {!isClinical && (
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
                <Link
                  href={item.href}
                  className="font-medium leading-snug hover:text-primary"
                >
                  {item.title}
                </Link>
                <p className="text-sm text-muted-foreground">{item.subtitle}</p>
                <time
                  dateTime={toIsoDateTime(item.time)}
                  className="mt-1 block text-xs text-muted-foreground"
                >
                  {item.time.toLocaleString(undefined, {
                    month: "short",
                    day: "numeric",
                    hour: "numeric",
                    minute: "2-digit",
                  })}
                </time>
              </div>
            </li>
          ))}
        </ol>
      )}
    </section>
  );
}
