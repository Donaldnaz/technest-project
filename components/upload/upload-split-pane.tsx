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
  const stagedItem = useMemo(
    () =>
      items.find((item) => item.status === "staged" || item.status === "uploading") ??
      items[0],
    [items],
  );

  const pdfUrl = useMemo(() => {
    if (!stagedItem || stagedItem.mimeType !== "application/pdf") return null;
    return URL.createObjectURL(stagedItem.file);
  }, [stagedItem]);

  useEffect(() => {
    return () => {
      if (pdfUrl) URL.revokeObjectURL(pdfUrl);
    };
  }, [pdfUrl]);

  if (!stagedItem) {
    return (
      <EmptyState
        icon={FileText}
        title={patientUploadCopy.preview.emptyTitle}
        description={patientUploadCopy.preview.emptyDescription}
        className="m-4 h-full min-h-[16rem] border-0 bg-transparent"
      />
    );
  }

  if (stagedItem.mimeType === "application/pdf" && pdfUrl) {
    return (
      <iframe
        src={pdfUrl}
        title={stagedItem.file.name}
        className="h-full min-h-[16rem] w-full flex-1 border-0"
      />
    );
  }

  if (stagedItem.previewUrl) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={stagedItem.previewUrl}
        alt={stagedItem.file.name}
        className="h-full max-h-[32rem] w-full object-contain p-4"
      />
    );
  }

  return (
    <div className="flex h-full min-h-[16rem] flex-col items-center justify-center gap-2 p-6 text-center text-sm text-muted-foreground">
      <FileImage className="size-8" aria-hidden />
      <p className="font-medium text-foreground">{stagedItem.file.name}</p>
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
