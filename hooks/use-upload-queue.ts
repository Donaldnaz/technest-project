"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { upload } from "@vercel/blob/client";

import { registerDocumentMetadata } from "@/app/actions/documents";

import type { DocumentCategory } from "@/lib/constants/document-categories";
import {
  ALLOWED_MIME_TYPES,
  MAX_UPLOAD_BYTES,
  normalizeMimeType,
} from "@/lib/constants/upload";
import { getUploadErrorMessage } from "@/lib/upload/errors";
import { patientValidationCopy } from "@/lib/copy/patient/validation";

export type QueueItemStatus = "staged" | "uploading" | "complete" | "error";

export type QueueItem = {
  id: string;
  file: File;
  mimeType: string;
  category: DocumentCategory;
  status: QueueItemStatus;
  progress: number;
  previewUrl: string | null;
  errorMessage?: string;
};

type UseUploadQueueOptions = {
  patientId: string;
};

function createPreviewUrl(file: File, mimeType: string): string | null {
  if (mimeType.startsWith("image/")) {
    return URL.createObjectURL(file);
  }
  return null;
}

function validateFile(file: File): { mimeType: string } | { error: string } {
  const mimeType = normalizeMimeType(file.type);
  if (!mimeType) {
    return {
      error: patientValidationCopy.upload.unsupportedType,
    };
  }
  if (file.size > MAX_UPLOAD_BYTES) {
    return {
      error: patientValidationCopy.upload.fileTooLarge,
    };
  }
  return { mimeType };
}

export function useUploadQueue({ patientId }: UseUploadQueueOptions) {
  const [items, setItems] = useState<QueueItem[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const itemsRef = useRef(items);

  useEffect(() => {
    itemsRef.current = items;
  }, [items]);

  useEffect(() => {
    return () => {
      for (const item of itemsRef.current) {
        if (item.previewUrl) {
          URL.revokeObjectURL(item.previewUrl);
        }
      }
    };
  }, []);

  const addFiles = useCallback((files: FileList | File[]) => {
    const incoming = Array.from(files);
    const newItems: QueueItem[] = [];

    for (const file of incoming) {
      const validation = validateFile(file);
      const id = crypto.randomUUID();

      if ("error" in validation) {
        newItems.push({
          id,
          file,
          mimeType: file.type || "application/octet-stream",
          category: "lab_results",
          status: "error",
          progress: 0,
          previewUrl: null,
          errorMessage: validation.error,
        });
        continue;
      }

      newItems.push({
        id,
        file,
        mimeType: validation.mimeType,
        category: "lab_results",
        status: "staged",
        progress: 0,
        previewUrl: createPreviewUrl(file, validation.mimeType),
      });
    }

    setItems((current) => [...current, ...newItems]);
  }, []);

  const removeFile = useCallback((id: string) => {
    setItems((current) => {
      const target = current.find((item) => item.id === id);
      if (target?.previewUrl) {
        URL.revokeObjectURL(target.previewUrl);
      }
      return current.filter((item) => item.id !== id);
    });
  }, []);

  const setCategory = useCallback((id: string, category: DocumentCategory) => {
    setItems((current) =>
      current.map((item) => (item.id === id ? { ...item, category } : item)),
    );
  }, []);

  const updateItem = useCallback((id: string, patch: Partial<QueueItem>) => {
    setItems((current) =>
      current.map((item) => (item.id === id ? { ...item, ...patch } : item)),
    );
  }, []);

  const clearCompleted = useCallback(() => {
    setItems((current) => {
      for (const item of current) {
        if (item.status === "complete" && item.previewUrl) {
          URL.revokeObjectURL(item.previewUrl);
        }
      }
      return current.filter((item) => item.status !== "complete");
    });
  }, []);

  const uploadAll = useCallback(async () => {
    const staged = itemsRef.current.filter((item) => item.status === "staged");
    if (staged.length === 0) {
      return { successCount: 0, errorCount: 0 };
    }

    setIsUploading(true);
    let successCount = 0;
    let errorCount = 0;

    for (const item of staged) {
      updateItem(item.id, {
        status: "uploading",
        progress: 0,
        errorMessage: undefined,
      });

      try {
        const safeName = item.file.name.replace(/[^a-zA-Z0-9._-]/g, "_");
        const pathname = `patients/${patientId}/${crypto.randomUUID()}-${safeName}`;

        const blob = await upload(pathname, item.file, {
          access: "private",
          handleUploadUrl: "/api/upload",
          clientPayload: JSON.stringify({
            patientId,
            fileName: item.file.name,
            mimeType: item.mimeType,
            category: item.category,
          }),
          onUploadProgress: ({ percentage }) => {
            updateItem(item.id, { progress: Math.round(percentage) });
          },
        });

        const registered = await registerDocumentMetadata({
          patientId,
          blobUrl: blob.url,
          blobPathname: blob.pathname,
          fileName: item.file.name,
          mimeType: item.mimeType,
          fileSizeBytes: item.file.size,
          category: item.category,
        });

        if (!registered.success) {
          throw new Error(registered.error ?? patientValidationCopy.upload.metadataFailed);
        }

        updateItem(item.id, { status: "complete", progress: 100 });
        successCount += 1;
      } catch (error) {
        updateItem(item.id, {
          status: "error",
          progress: 0,
          errorMessage: getUploadErrorMessage(error),
        });
        errorCount += 1;
      }
    }

    setIsUploading(false);
    return { successCount, errorCount };
  }, [patientId, updateItem]);

  const stagedCount = items.filter((item) => item.status === "staged").length;
  const hasStaged = stagedCount > 0;
  const canSubmit = hasStaged && !isUploading;

  return {
    items,
    isUploading,
    stagedCount,
    hasStaged,
    canSubmit,
    addFiles,
    removeFile,
    setCategory,
    uploadAll,
    clearCompleted,
    acceptedTypes: ALLOWED_MIME_TYPES.join(","),
  };
}
