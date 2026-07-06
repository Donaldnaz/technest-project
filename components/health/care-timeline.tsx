import Link from "next/link";
import {
  CalendarPlus,
  FileUp,
} from "lucide-react";

import {
  DOCUMENT_CATEGORY_LABELS,
  type DocumentCategory,
} from "@/lib/constants/document-categories";
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
};

const recordStatusLabels = {
  uploaded: "Received",
  processing: "Being reviewed",
  ready: "Ready",
  failed: "Needs attention",
} as const;

function buildTimelineItems(
  documents: DocumentWithExtraction[],
): TimelineItem[] {
  return documents
    .map((document) => ({
      id: `document-${document.id}`,
      title: document.fileName,
      subtitle: document.extraction?.summary
        ? `${DOCUMENT_CATEGORY_LABELS[document.category as DocumentCategory]} · ${document.extraction.summary.slice(0, 80)}${document.extraction.summary.length > 80 ? "…" : ""}`
        : `${DOCUMENT_CATEGORY_LABELS[document.category as DocumentCategory]} · ${recordStatusLabels[document.status]}`,
      time: toDate(document.createdAt) ?? new Date(0),
      href: `/dashboard/patients/${document.patientId}`,
    }))
    .sort((a, b) => b.time.getTime() - a.time.getTime())
    .slice(0, 8);
}

export function CareTimeline({ documents }: CareTimelineProps) {
  const items = buildTimelineItems(documents);

  return (
    <section className="health-card rounded-3xl p-5 shadow-sm md:p-6">
      <div className="mb-5 flex items-center justify-between">
        <div>
          <h2 className="font-heading text-lg font-semibold">Recent uploads</h2>
          <p className="text-sm text-muted-foreground">
            Your latest medical records
          </p>
        </div>
        <CalendarPlus className="size-5 text-muted-foreground" aria-hidden />
      </div>

      {items.length === 0 ? (
        <p className="rounded-2xl bg-muted/50 p-4 text-sm text-muted-foreground">
          No uploads yet. Add a lab report or scan to get started.
        </p>
      ) : (
        <ol className="relative space-y-0">
          {items.map((item, index) => (
            <li key={item.id} className="relative flex gap-4 pb-6 last:pb-0">
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
