"use client";

import { CheckCircle2, Sparkles, X } from "lucide-react";

import { Button } from "@/components/ui/button";

type UploadSuccessPanelProps = {
  count: number;
  patientFirstName: string;
  isFirstUpload?: boolean;
  onDismiss: () => void;
  onUploadMore: () => void;
};

export function UploadSuccessPanel({
  count,
  patientFirstName,
  isFirstUpload = false,
  onDismiss,
  onUploadMore,
}: UploadSuccessPanelProps) {
  const recordLabel = count === 1 ? "record" : "records";

  return (
    <div
      role="status"
      aria-live="polite"
      className="animate-in fade-in slide-in-from-top-2 rounded-2xl border border-sage-200/80 bg-gradient-to-br from-sage-50 to-oat-50 p-5 shadow-sm dark:border-sage-800 dark:from-sage-950/40 dark:to-charcoal-950/40"
    >
      <div className="flex gap-3">
        <div className="flex size-11 shrink-0 items-center justify-center rounded-2xl bg-sage-200/80 text-sage-800 dark:bg-sage-800/50 dark:text-sage-100">
          <CheckCircle2 className="size-6" aria-hidden />
        </div>

        <div className="min-w-0 flex-1 space-y-2">
          <div className="flex items-start justify-between gap-2">
            <div>
              <p className="font-heading text-lg font-semibold text-foreground">
                {isFirstUpload
                  ? "Wonderful — your first record is in!"
                  : `${count} ${recordLabel} uploaded successfully`}
              </p>
              <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                {isFirstUpload
                  ? `You've taken the first step for ${patientFirstName}. We are reviewing your upload and will add a summary shortly.`
                  : `Your files for ${patientFirstName} are private and ready for your care team when you choose to share.`}
              </p>
            </div>
            <button
              type="button"
              onClick={onDismiss}
              className="upload-interactive shrink-0 rounded-lg p-1 text-muted-foreground hover:bg-sage-100/80 dark:hover:bg-sage-900/40"
              aria-label="Dismiss success message"
            >
              <X className="size-4" />
            </button>
          </div>

          {isFirstUpload && (
            <p className="inline-flex items-center gap-1.5 text-xs font-medium text-sage-800 dark:text-sage-200">
              <Sparkles className="size-3.5" aria-hidden />
              Welcome to iCare — you're off to a great start
            </p>
          )}

          <div className="flex flex-wrap gap-2 pt-1">
            <Button
              type="button"
              size="sm"
              className="rounded-xl bg-sage-700 text-white hover:bg-sage-800"
              onClick={onUploadMore}
            >
              Upload more files
            </Button>
            <Button
              type="button"
              size="sm"
              variant="outline"
              className="rounded-xl"
              onClick={onDismiss}
            >
              Done for now
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
