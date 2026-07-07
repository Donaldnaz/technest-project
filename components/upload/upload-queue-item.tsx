"use client";

import { CheckCircle2, FileText, ImageIcon, X } from "lucide-react";

import { CategoryPills } from "@/components/upload/category-pills";
import type { QueueItem } from "@/hooks/use-upload-queue";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type UploadQueueItemProps = {
  item: QueueItem;
  onRemove: (id: string) => void;
  onCategoryChange: (id: string, category: QueueItem["category"]) => void;
  disabled?: boolean;
};

export function UploadQueueItem({
  item,
  onRemove,
  onCategoryChange,
  disabled = false,
}: UploadQueueItemProps) {
  const isPdf = item.mimeType.startsWith("application/pdf");
  const showProgress =
    item.status === "uploading" ||
    item.status === "complete" ||
    item.status === "error";

  return (
    <article
      className={cn(
        "w-full rounded-2xl border p-4 shadow-sm transition-colors duration-300",
        item.status === "complete"
          ? "border-sage-200/80 bg-sage-50/60 dark:border-sage-800 dark:bg-sage-950/30"
          : "border-border/60 bg-oat-50/40 dark:bg-charcoal-950/20",
      )}
    >
      <div className="space-y-4">
        <div className="flex gap-3">
          <div
            className={cn(
              "flex size-12 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-muted/60",
              item.status === "complete" &&
                "ring-2 ring-sage-300 dark:ring-sage-700",
            )}
          >
            {item.previewUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={item.previewUrl}
                alt=""
                className="size-full object-cover"
              />
            ) : isPdf ? (
              <FileText className="size-5 text-sage-700 dark:text-sage-300" aria-hidden />
            ) : (
              <ImageIcon className="size-5 text-sage-700 dark:text-sage-300" aria-hidden />
            )}
          </div>

          <div className="min-w-0 flex-1">
            <div className="flex items-start justify-between gap-2">
              <div className="min-w-0">
                <p className="truncate text-sm font-medium">{item.file.name}</p>
                <p className="text-xs text-muted-foreground">
                  {(item.file.size / (1024 * 1024)).toFixed(1)} MB
                </p>
              </div>

              {(item.status === "staged" || item.status === "error") && (
                <Button
                  type="button"
                  variant="ghost"
                  size="icon-sm"
                  className="upload-interactive shrink-0 rounded-xl text-muted-foreground hover:text-destructive"
                  disabled={disabled}
                  aria-label={`Remove ${item.file.name}`}
                  onClick={() => onRemove(item.id)}
                >
                  <X className="size-4" />
                </Button>
              )}

              {item.status === "complete" && (
                <CheckCircle2
                  className="size-5 shrink-0 text-sage-700 dark:text-sage-300"
                  aria-label="Upload complete"
                />
              )}
            </div>
          </div>
        </div>

        {showProgress && (
          <div className="space-y-1.5">
            <div className="h-2 overflow-hidden rounded-full bg-muted">
              <div
                className={cn(
                  "h-full rounded-full transition-all duration-300",
                  item.status === "complete" && "bg-sage-300 dark:bg-sage-700",
                  item.status === "uploading" && "bg-amber-200 dark:bg-amber-900",
                  item.status === "error" && "bg-destructive/30",
                )}
                style={{ width: `${item.progress}%` }}
              />
            </div>
            <p className="text-xs text-muted-foreground">
              {item.status === "uploading" && `Uploading… ${item.progress}%`}
              {item.status === "complete" && "Uploaded — thank you!"}
              {item.status === "error" && (item.errorMessage ?? "Upload failed")}
            </p>
          </div>
        )}

        {item.status === "staged" && (
          <CategoryPills
            value={item.category}
            onChange={(category) => onCategoryChange(item.id, category)}
            disabled={disabled}
            compact
          />
        )}

        {item.status === "error" && item.errorMessage && (
          <p className="text-sm text-destructive" role="alert">
            {item.errorMessage}
          </p>
        )}
      </div>
    </article>
  );
}
