"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { AlertTriangle, X } from "lucide-react";
import { toast } from "sonner";

import { ConfettiBurst } from "@/components/landing/confetti-burst";
import { UploadDropzone } from "@/components/upload/upload-dropzone";
import { UploadHubHeader } from "@/components/upload/upload-hub-header";
import { UploadQueue } from "@/components/upload/upload-queue";
import { UploadSuccessPanel } from "@/components/upload/upload-success-panel";
import { useUploadQueue, type QueueItem } from "@/hooks/use-upload-queue";
import { Button } from "@/components/ui/button";
import { patientUploadCopy } from "@/lib/copy/patient/upload";
import { cn } from "@/lib/utils";

type UploadFormCardProps = {
  patientId: string;
  userName?: string | null;
  patientFirstName: string;
  patientRelationship: "self" | "other";
  isFirstUpload?: boolean;
  clinical?: boolean;
  onItemsChange?: (items: QueueItem[]) => void;
};

export function UploadFormCard({
  patientId,
  userName,
  patientFirstName,
  patientRelationship,
  isFirstUpload = false,
  clinical = false,
  onItemsChange,
}: UploadFormCardProps) {
  const router = useRouter();
  const [showCelebration, setShowCelebration] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState<{
    count: number;
    wasFirstUpload: boolean;
  } | null>(null);
  const [storageConfigured, setStorageConfigured] = useState<boolean | null>(
    null,
  );
  const [bannerDismissed, setBannerDismissed] = useState(false);

  const {
    items,
    isUploading,
    canSubmit,
    stagedCount,
    addFiles,
    removeFile,
    setCategory,
    uploadAll,
    clearCompleted,
    acceptedTypes,
  } = useUploadQueue({ patientId });

  const previewItemsSignature = items
    .map(
      (item) =>
        `${item.id}:${item.status}:${item.mimeType}:${item.previewUrl ?? ""}:${item.file.name}:${item.file.size}`,
    )
    .join("|");

  const itemsRef = useRef(items);
  itemsRef.current = items;

  useEffect(() => {
    onItemsChange?.(itemsRef.current);
  }, [previewItemsSignature, onItemsChange]);

  const displayName =
    patientRelationship === "self" ? "you" : patientFirstName;

  useEffect(() => {
    let cancelled = false;

    async function checkStorage() {
      try {
        const response = await fetch("/api/upload");
        if (cancelled) return;

        if (!response.ok) {
          setStorageConfigured(false);
          return;
        }

        const data = (await response.json()) as {
          configured?: boolean;
          valid?: boolean;
        };

        setStorageConfigured(Boolean(data.configured && data.valid));
      } catch {
        if (!cancelled) setStorageConfigured(false);
      }
    }

    void checkStorage();
    return () => {
      cancelled = true;
    };
  }, []);

  const finishSuccessFlow = useCallback(() => {
    setUploadSuccess(null);
    clearCompleted();
    router.refresh();
  }, [clearCompleted, router]);

  const handleCelebrationComplete = useCallback(() => {
    setShowCelebration(false);
    finishSuccessFlow();
  }, [finishSuccessFlow]);

  function handleSuccessDismiss() {
    if (uploadSuccess?.wasFirstUpload && showCelebration) {
      return;
    }
    finishSuccessFlow();
  }

  function handleUploadMore() {
    setUploadSuccess(null);
    clearCompleted();
    router.refresh();
  }

  async function handleSubmit() {
    const { successCount, errorCount } = await uploadAll();

    if (successCount === 0 && errorCount === 0) {
      toast.error(patientUploadCopy.toasts.noFiles);
      return;
    }

    if (successCount > 0 && errorCount === 0) {
      const wasFirst = isFirstUpload && uploadSuccess === null;

      setUploadSuccess({ count: successCount, wasFirstUpload: wasFirst });

      toast.success(
        wasFirst
          ? patientUploadCopy.toasts.successFirst
          : successCount === 1
            ? patientUploadCopy.toasts.successSingle
            : patientUploadCopy.toasts.successPlural(successCount),
        { duration: 6000 },
      );

      if (wasFirst) {
        setShowCelebration(true);
      }

      return;
    }

    if (successCount > 0) {
      setUploadSuccess({ count: successCount, wasFirstUpload: false });
      toast.warning(
        patientUploadCopy.toasts.partialWarning(successCount, errorCount),
        { duration: 6000 },
      );
      router.refresh();
      return;
    }

    toast.error(patientUploadCopy.toasts.failure);
  }

  const showConfigBanner =
    storageConfigured === false && !bannerDismissed;

  return (
    <div className={cn("w-full", clinical ? "max-w-none" : "max-w-md")}>
      <ConfettiBurst
        active={showCelebration}
        onComplete={handleCelebrationComplete}
      />

      <div
        className={cn(
          clinical
            ? "space-y-4"
            : "rounded-3xl bg-card/95 p-6 shadow-sm backdrop-blur-sm sm:p-8",
        )}
      >
        <div className="space-y-6">
          {uploadSuccess && (
            <UploadSuccessPanel
              count={uploadSuccess.count}
              patientFirstName={displayName}
              isFirstUpload={uploadSuccess.wasFirstUpload}
              onDismiss={handleSuccessDismiss}
              onUploadMore={handleUploadMore}
            />
          )}

          {showConfigBanner && (
            <div
              role="alert"
              className="flex gap-3 rounded-2xl border border-amber-200/80 bg-amber-50/90 p-4 text-sm text-amber-950 dark:border-amber-900 dark:bg-amber-950/30 dark:text-amber-100"
            >
              <AlertTriangle className="mt-0.5 size-4 shrink-0" aria-hidden />
              <div className="min-w-0 flex-1 space-y-1">
                <p className="font-medium">{patientUploadCopy.form.storageAlert.title}</p>
                <p className="text-xs leading-relaxed opacity-90">
                  {patientUploadCopy.form.storageAlert.body}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setBannerDismissed(true)}
                className="upload-interactive shrink-0 rounded-lg p-1 text-amber-800 hover:bg-amber-100/80 dark:text-amber-200 dark:hover:bg-amber-900/40"
                aria-label={patientUploadCopy.form.storageAlert.dismissAria}
              >
                <X className="size-4" />
              </button>
            </div>
          )}

          {!clinical && (
            <UploadHubHeader
              userName={userName}
              patientFirstName={patientFirstName}
              patientRelationship={patientRelationship}
            />
          )}

          {clinical && (
            <div>
              <h3 className="font-heading text-base font-semibold">
                {patientUploadCopy.form.title}
              </h3>
              <p className="mt-1 text-sm text-muted-foreground">
                {patientUploadCopy.form.description}
              </p>
            </div>
          )}

          <UploadDropzone
            onFilesSelected={addFiles}
            acceptedTypes={acceptedTypes}
            disabled={isUploading}
          />

          <UploadQueue
            items={items}
            onRemove={removeFile}
            onCategoryChange={setCategory}
            disabled={isUploading}
          />

          <div className="space-y-3">
            <p className="text-center text-sm text-muted-foreground">
              {isUploading
                ? patientUploadCopy.form.status.uploading
                : stagedCount > 0
                  ? patientUploadCopy.form.status.ready(stagedCount)
                  : uploadSuccess
                    ? patientUploadCopy.form.status.postSuccess
                    : patientUploadCopy.form.status.idle}
            </p>

            <Button
              type="button"
              size="lg"
              disabled={!canSubmit}
              className={cn(
                "upload-interactive w-full font-medium",
                clinical
                  ? "rounded-lg"
                  : "rounded-2xl bg-sage-700 text-white hover:bg-sage-800 focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2 transition-transform duration-200 active:scale-[0.98]",
              )}
              onClick={handleSubmit}
            >
              {isUploading ? patientUploadCopy.form.submitting : patientUploadCopy.form.submit}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
