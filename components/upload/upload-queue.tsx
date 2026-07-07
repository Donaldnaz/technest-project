"use client";

import { UploadQueueItem } from "@/components/upload/upload-queue-item";
import { patientUploadCopy } from "@/lib/copy/patient/upload";
import type { QueueItem } from "@/hooks/use-upload-queue";

type UploadQueueProps = {
  items: QueueItem[];
  onRemove: (id: string) => void;
  onCategoryChange: (id: string, category: QueueItem["category"]) => void;
  disabled?: boolean;
};

export function UploadQueue({
  items,
  onRemove,
  onCategoryChange,
  disabled = false,
}: UploadQueueProps) {
  if (items.length === 0) {
    return (
      <p className="rounded-2xl bg-muted/40 px-4 py-6 text-center text-sm text-muted-foreground">
        {patientUploadCopy.queue.empty}
      </p>
    );
  }

  return (
    <div className="space-y-3" aria-live="polite" aria-relevant="additions text">
      <div className="flex items-center justify-between">
        <h3 className="font-heading text-base font-semibold">{patientUploadCopy.queue.title}</h3>
        <p className="text-xs text-muted-foreground">
          {items.length} file{items.length === 1 ? "" : "s"}
        </p>
      </div>

      <ul className="space-y-3">
        {items.map((item) => (
          <li key={item.id}>
            <UploadQueueItem
              item={item}
              onRemove={onRemove}
              onCategoryChange={onCategoryChange}
              disabled={disabled}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}
