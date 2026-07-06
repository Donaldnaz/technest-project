import {
  CheckCircle2,
  FileText,
  ImageIcon,
  ShieldCheck,
} from "lucide-react";

import type { DocumentWithExtraction } from "@/lib/db/queries/documents";
import { formatDisplayDateTime } from "@/lib/dates";
import {
  DOCUMENT_CATEGORY_LABELS,
  type DocumentCategory,
} from "@/lib/constants/document-categories";
import { cn } from "@/lib/utils";

const statusLabels = {
  uploaded: "Received",
  processing: "Being reviewed",
  ready: "Ready",
  failed: "Needs attention",
} as const;

const statusStyles = {
  uploaded: "bg-muted text-muted-foreground",
  processing:
    "bg-amber-100 text-amber-900 dark:bg-amber-950/40 dark:text-amber-200",
  ready: "bg-sage-100 text-sage-800 dark:bg-sage-950/50 dark:text-sage-200",
  failed: "bg-destructive/10 text-destructive",
} as const;

type DocumentsListProps = {
  documents: DocumentWithExtraction[];
};

function formatFileSize(bytes: number | null | undefined): string {
  if (!bytes || bytes <= 0) return "—";
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

function getFileTypeLabel(mimeType: string): string {
  if (mimeType === "application/pdf") return "PDF";
  if (mimeType.startsWith("image/")) return "Image";
  return mimeType.split("/")[1]?.toUpperCase() ?? "File";
}

export function DocumentsList({ documents }: DocumentsListProps) {
  if (documents.length === 0) {
    return (
      <p className="rounded-2xl bg-muted/50 px-4 py-6 text-center text-sm text-muted-foreground">
        No medical records yet. Add a lab report, referral, or scan above.
      </p>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-sage-200/60 bg-sage-50/50 px-4 py-3 dark:border-sage-800 dark:bg-sage-950/20">
        <div className="flex items-center gap-2 text-sm font-medium text-sage-900 dark:text-sage-100">
          <ShieldCheck className="size-4 shrink-0" aria-hidden />
          {documents.length} record{documents.length === 1 ? "" : "s"} uploaded
        </div>
        <p className="text-xs text-muted-foreground">
          Your uploaded health documents and records
        </p>
      </div>

      <ul className="space-y-3">
        {documents.map((document) => {
          const isPdf = document.mimeType === "application/pdf";

          return (
            <li
              key={document.id}
              className="rounded-2xl border border-border/60 bg-card p-4 shadow-sm md:p-5"
            >
              <div className="flex gap-4">
                <div
                  className={cn(
                    "flex size-12 shrink-0 items-center justify-center rounded-xl",
                    isPdf
                      ? "bg-sage-100 text-sage-800 dark:bg-sage-950/50 dark:text-sage-200"
                      : "bg-teal-100 text-teal-800 dark:bg-teal-950/50 dark:text-teal-200",
                  )}
                >
                  {isPdf ? (
                    <FileText className="size-5" aria-hidden />
                  ) : (
                    <ImageIcon className="size-5" aria-hidden />
                  )}
                </div>

                <div className="min-w-0 flex-1 space-y-3">
                  <div className="flex flex-wrap items-start justify-between gap-2">
                    <div className="min-w-0 space-y-1">
                      <p
                        className="truncate font-medium text-foreground"
                        title={document.fileName}
                      >
                        {document.fileName}
                      </p>
                      <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-muted-foreground">
                        <span>{getFileTypeLabel(document.mimeType)}</span>
                        <span aria-hidden>·</span>
                        <span>{formatFileSize(document.fileSizeBytes)}</span>
                        <span aria-hidden>·</span>
                        <span>
                          {DOCUMENT_CATEGORY_LABELS[
                            document.category as DocumentCategory
                          ]}
                        </span>
                      </div>
                    </div>

                    <span
                      className={cn(
                        "inline-flex shrink-0 items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-medium",
                        statusStyles[document.status],
                      )}
                    >
                      {document.status === "ready" && (
                        <CheckCircle2 className="size-3" aria-hidden />
                      )}
                      {statusLabels[document.status]}
                    </span>
                  </div>

                  <p className="text-xs text-muted-foreground">
                    Uploaded {formatDisplayDateTime(document.createdAt)}
                  </p>

                  {document.extraction?.summary && (
                    <p className="rounded-xl bg-muted/40 px-3 py-2 text-xs leading-relaxed text-muted-foreground">
                      {document.extraction.summary}
                    </p>
                  )}

                  {document.extraction?.attentionNote && (
                    <p className="text-xs text-amber-800 dark:text-amber-200">
                      {document.extraction.attentionNote}
                    </p>
                  )}
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
