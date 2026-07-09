"use client";

import { useEffect, useMemo, useState } from "react";
import { FileImage, FileText } from "lucide-react";

import { SplitPaneLayout } from "@/components/clinical/split-pane-layout";
import { EmptyState } from "@/components/clinical/empty-state";
import { patientUploadCopy } from "@/lib/copy/patient/upload";
import { UploadFormCard } from "@/components/upload/upload-form-card";
import type { QueueItem } from "@/hooks/use-upload-queue";

type UploadSplitPaneProps = {
  patientId: string;
  userName?: string | null;
  patientFirstName: string;
  patientRelationship: "self" | "other";
  isFirstUpload?: boolean;
};

function UploadPreviewPane({ items }: { items: QueueItem[] }) {
  const previewItem = useMemo(
    () =>
      items.find((item) => item.status === "staged" || item.status === "uploading") ??
      items[0],
    [items],
  );

  const previewItemId = previewItem?.id;
  const previewFile = previewItem?.file;
  const previewMimeType = previewItem?.mimeType;

  const pdfUrl = useMemo(() => {
    if (!previewFile || previewMimeType !== "application/pdf") return null;
    return URL.createObjectURL(previewFile);
  }, [previewItemId, previewFile, previewMimeType]);

  useEffect(() => {
    return () => {
      if (pdfUrl) URL.revokeObjectURL(pdfUrl);
    };
  }, [pdfUrl]);

  if (!previewItem) {
    return (
      <EmptyState
        icon={FileText}
        title={patientUploadCopy.preview.emptyTitle}
        description={patientUploadCopy.preview.emptyDescription}
        className="m-4 h-full min-h-[16rem] border-0 bg-transparent"
      />
    );
  }

  if (previewItem.mimeType === "application/pdf" && pdfUrl) {
    return (
      <iframe
        src={pdfUrl}
        title={previewItem.file.name}
        className="min-h-[12rem] w-full flex-1 border-0 md:min-h-0 md:h-full"
      />
    );
  }

  if (previewItem.previewUrl) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={previewItem.previewUrl}
        alt={previewItem.file.name}
        className="max-h-[50dvh] w-full object-contain p-4 md:max-h-full md:h-full"
      />
    );
  }

  return (
    <div className="flex h-full min-h-[16rem] flex-col items-center justify-center gap-2 p-6 text-center text-sm text-muted-foreground">
      <FileImage className="size-8" aria-hidden />
      <p className="font-medium text-foreground">{previewItem.file.name}</p>
      <p>{patientUploadCopy.preview.pending}</p>
    </div>
  );
}

function UploadFormWithPreview(props: UploadSplitPaneProps) {
  const [stagedItems, setStagedItems] = useState<QueueItem[]>([]);

  return (
    <SplitPaneLayout
      viewer={<UploadPreviewPane items={stagedItems} />}
      form={
        <UploadFormCard
          {...props}
          clinical
          onItemsChange={setStagedItems}
        />
      }
    />
  );
}

export function UploadSplitPane(props: UploadSplitPaneProps) {
  return <UploadFormWithPreview {...props} />;
}
