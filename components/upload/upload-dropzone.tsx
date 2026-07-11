"use client";

import { useCallback, useRef, useState } from "react";
import { Camera, CloudUpload } from "lucide-react";

import { Button } from "@/components/ui/button";
import { patientUploadCopy } from "@/lib/copy/patient/upload";
import { cn } from "@/lib/utils";

type UploadDropzoneProps = {
  onFilesSelected: (files: FileList | File[]) => void;
  acceptedTypes: string;
  disabled?: boolean;
};

export function UploadDropzone({
  onFilesSelected,
  acceptedTypes,
  disabled = false,
}: UploadDropzoneProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const cameraInputRef = useRef<HTMLInputElement>(null);
  const [isDragOver, setIsDragOver] = useState(false);

  const handleFiles = useCallback(
    (files: FileList | null) => {
      if (!files || files.length === 0 || disabled) return;
      onFilesSelected(files);
    },
    [disabled, onFilesSelected],
  );

  return (
    <div className="w-full space-y-4">
      <div
        role="button"
        tabIndex={disabled ? -1 : 0}
        aria-label="Upload medical files by drag and drop or browse"
        onKeyDown={(event) => {
          if (disabled) return;
          if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            inputRef.current?.click();
          }
        }}
        onDragEnter={(event) => {
          event.preventDefault();
          if (!disabled) setIsDragOver(true);
        }}
        onDragOver={(event) => {
          event.preventDefault();
          if (!disabled) setIsDragOver(true);
        }}
        onDragLeave={(event) => {
          event.preventDefault();
          if (event.currentTarget.contains(event.relatedTarget as Node)) return;
          setIsDragOver(false);
        }}
        onDrop={(event) => {
          event.preventDefault();
          setIsDragOver(false);
          handleFiles(event.dataTransfer.files);
        }}
        onClick={() => {
          if (!disabled) inputRef.current?.click();
        }}
        className={cn(
          "upload-dropzone upload-interactive group relative flex w-full min-h-[200px] cursor-pointer flex-col items-center justify-center rounded-3xl border-2 border-dashed px-4 py-8 text-center transition-all duration-200",
          isDragOver
            ? "upload-dropzone-active scale-[1.01] border-sage-400 bg-sage-100/50"
            : "border-border/60 bg-oat-50/60 hover:border-sage-300 hover:bg-sage-50/50 dark:bg-charcoal-950/20",
          disabled && "cursor-not-allowed opacity-60",
        )}
      >
        <div className="flex size-14 items-center justify-center rounded-2xl bg-sage-100 text-sage-800 transition-transform duration-200 group-hover:scale-105 dark:bg-sage-950/40 dark:text-sage-200">
          <CloudUpload className="size-7" aria-hidden />
        </div>

        <p className="mt-4 font-heading text-base font-semibold text-foreground">
          Drag your medical files here
        </p>
        <p className="mt-2 text-sm text-muted-foreground">
          {patientUploadCopy.dropzone.formats}
        </p>
      </div>

      <input
        ref={inputRef}
        type="file"
        accept={acceptedTypes}
        multiple
        className="sr-only"
        disabled={disabled}
        onChange={(event) => {
          handleFiles(event.target.files);
          event.target.value = "";
        }}
      />

      <input
        ref={cameraInputRef}
        type="file"
        accept="image/jpeg,image/png"
        capture="environment"
        className="sr-only"
        disabled={disabled}
        onChange={(event) => {
          handleFiles(event.target.files);
          event.target.value = "";
        }}
      />

      <Button
        type="button"
        variant="outline"
        disabled={disabled}
        className="upload-interactive hidden w-full rounded-2xl py-3 px-4 md:inline-flex"
        onClick={() => inputRef.current?.click()}
      >
        Browse files
      </Button>

      <Button
        type="button"
        disabled={disabled}
        className="upload-interactive w-full rounded-2xl bg-sage-700 py-3 px-4 text-white hover:bg-sage-800 md:hidden"
        onClick={() => cameraInputRef.current?.click()}
      >
        <Camera className="size-5" aria-hidden />
        Take photo of document
      </Button>
    </div>
  );
}
