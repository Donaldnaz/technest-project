"use client";

import { useEffect, useState } from "react";
import { FileText, Loader2 } from "lucide-react";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { patientLibraryCopy } from "@/lib/copy/patient/library";

type DocumentPreviewLoaderProps = {
  documentId: string;
  fileName?: string;
  mimeType?: string;
};

function DocumentPreviewLoader({
  documentId,
  fileName,
  mimeType,
}: DocumentPreviewLoaderProps) {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function loadPreview() {
      try {
        const response = await fetch(`/api/documents/${documentId}/preview`);
        if (!response.ok) {
          throw new Error(patientLibraryCopy.preview.unavailable);
        }
        const data = (await response.json()) as { url: string };
        if (!cancelled) setPreviewUrl(data.url);
      } catch {
        if (!cancelled) setError(patientLibraryCopy.preview.unavailable);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    void loadPreview();
    return () => {
      cancelled = true;
    };
  }, [documentId]);

  const isPdf = mimeType === "application/pdf";
  const isImage = mimeType?.startsWith("image/");

  if (loading) {
    return (
      <div className="flex flex-1 flex-col items-center justify-center gap-2 text-sm text-muted-foreground">
        <Loader2 className="size-6 animate-spin" aria-hidden />
        {patientLibraryCopy.preview.loading}
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-1 flex-col items-center justify-center gap-2 px-6 text-center text-sm text-muted-foreground">
        <FileText className="size-8" aria-hidden />
        {error}
      </div>
    );
  }

  if (previewUrl && isPdf) {
    return (
      <iframe
        src={previewUrl}
        title={fileName ?? patientLibraryCopy.preview.defaultTitle}
        className="h-full min-h-[24rem] w-full flex-1 border-0"
      />
    );
  }

  if (previewUrl && isImage) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={previewUrl}
        alt={fileName ?? patientLibraryCopy.preview.defaultTitle}
        className="max-h-[70vh] w-full object-contain p-4"
      />
    );
  }

  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-2 px-6 text-center text-sm text-muted-foreground">
      <FileText className="size-8" aria-hidden />
      {patientLibraryCopy.preview.unsupported}
    </div>
  );
}

type DocumentPreviewSheetProps = {
  documentId: string | null;
  fileName?: string;
  mimeType?: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export function DocumentPreviewSheet({
  documentId,
  fileName,
  mimeType,
  open,
  onOpenChange,
}: DocumentPreviewSheetProps) {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="right"
        className="w-full sm:max-w-2xl"
        aria-describedby="document-preview-description"
      >
        <SheetHeader>
          <SheetTitle className="truncate pr-8">
            {fileName ?? patientLibraryCopy.preview.defaultTitle}
          </SheetTitle>
          <SheetDescription id="document-preview-description">
            {patientLibraryCopy.preview.description}
          </SheetDescription>
        </SheetHeader>

        <div className="flex min-h-[24rem] flex-1 flex-col overflow-hidden rounded-lg border border-border bg-muted/20">
          {open && documentId ? (
            <DocumentPreviewLoader
              key={documentId}
              documentId={documentId}
              fileName={fileName}
              mimeType={mimeType}
            />
          ) : null}
        </div>
      </SheetContent>
    </Sheet>
  );
}
