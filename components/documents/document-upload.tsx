"use client";

import { useCallback, useState } from "react";
import { upload } from "@vercel/blob/client";
import { Camera, CheckCircle2, FileUp } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { ConfettiBurst } from "@/components/landing/confetti-burst";
import {
  DOCUMENT_CATEGORIES,
  DOCUMENT_CATEGORY_LABELS,
  type DocumentCategory,
} from "@/lib/constants/document-categories";
import {
  ALLOWED_MIME_TYPES,
  MAX_UPLOAD_BYTES,
  normalizeMimeType,
} from "@/lib/constants/upload";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { selectClassName } from "@/components/ui/native-select";
import { cn } from "@/lib/utils";

type DocumentUploadProps = {
  patientId: string;
  isFirstUpload?: boolean;
  patientFirstName?: string;
};

export function DocumentUpload({
  patientId,
  isFirstUpload = false,
  patientFirstName = "your",
}: DocumentUploadProps) {
  const router = useRouter();
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [category, setCategory] = useState<DocumentCategory>("lab_results");
  const [showCelebration, setShowCelebration] = useState(false);

  const handleCelebrationComplete = useCallback(() => {
    setShowCelebration(false);
    router.refresh();
  }, [router]);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const fileInput = form.elements.namedItem("file") as HTMLInputElement;
    const file = fileInput.files?.[0];

    if (!file) {
      toast.error("Please choose a medical record to add.");
      return;
    }

    const mimeType = normalizeMimeType(file.type);
    if (!mimeType) {
      toast.error("Please use a lab report (PDF) or medical image (JPEG).");
      return;
    }

    if (file.size > MAX_UPLOAD_BYTES) {
      toast.error("File is too large — maximum size is 10 MB.");
      return;
    }

    setUploading(true);
    setProgress(0);

    try {
      const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, "_");
      const pathname = `patients/${patientId}/${crypto.randomUUID()}-${safeName}`;

      await upload(pathname, file, {
        access: "private",
        handleUploadUrl: "/api/upload",
        clientPayload: JSON.stringify({
          patientId,
          fileName: file.name,
          mimeType,
          category,
        }),
        onUploadProgress: ({ percentage }) => {
          setProgress(Math.round(percentage));
        },
      });

      toast.success(
        isFirstUpload
          ? "Your first record is saved. We are preparing a summary for you."
          : "Medical record added successfully.",
      );
      form.reset();
      setProgress(0);

      if (isFirstUpload) {
        setShowCelebration(true);
      } else {
        router.refresh();
      }
    } catch {
      toast.error("Could not add the record. Please try again.");
    } finally {
      setUploading(false);
    }
  }

  return (
    <div>
      <ConfettiBurst
        active={showCelebration}
        onComplete={handleCelebrationComplete}
      />

      {isFirstUpload && (
        <div className="mb-6 rounded-2xl border border-primary/20 bg-primary/5 p-5">
          <div className="flex items-start gap-3">
            <div className="flex size-10 shrink-0 items-center justify-center rounded-2xl bg-primary/15 text-primary">
              <FileUp className="size-5" aria-hidden />
            </div>
            <div>
              <h3 className="font-heading font-semibold">
                Add {patientFirstName === "your" ? "your" : `${patientFirstName}'s`} first
                record
              </h3>
              <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                Start with a recent lab report or scan. Choose a category so your
                care team can find it quickly.
              </p>
            </div>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="grid max-w-xl gap-5">
        <div className="grid gap-2">
          <Label htmlFor="category">Record type</Label>
          <select
            id="category"
            name="category"
            className={cn(selectClassName, "rounded-xl")}
            value={category}
            onChange={(event) =>
              setCategory(event.target.value as DocumentCategory)
            }
            disabled={uploading}
          >
            {DOCUMENT_CATEGORIES.map((value) => (
              <option key={value} value={value}>
                {DOCUMENT_CATEGORY_LABELS[value]}
              </option>
            ))}
          </select>
        </div>

        <div className="grid gap-2">
          <Label htmlFor="file">Choose a file (PDF or JPEG, max 10 MB)</Label>
          <Input
            id="file"
            name="file"
            type="file"
            accept={ALLOWED_MIME_TYPES.join(",")}
            capture="environment"
            disabled={uploading}
            className="min-h-12 rounded-xl file:mr-4 file:rounded-lg file:border-0 file:bg-primary/10 file:px-4 file:py-2 file:text-sm file:font-medium file:text-primary"
            aria-live="polite"
          />
          <p className="flex items-center gap-2 text-xs text-muted-foreground">
            <Camera className="size-3.5 shrink-0" aria-hidden />
            On mobile, you can take a photo of a paper record.
          </p>
          {uploading && (
            <p className="text-sm text-muted-foreground">
              Saving record securely… {progress}%
            </p>
          )}
          {!uploading && progress === 0 && isFirstUpload && (
            <p className="flex items-center gap-2 text-sm text-muted-foreground">
              <CheckCircle2 className="size-4 text-primary" aria-hidden />
              Your records stay private until you share them with a provider.
            </p>
          )}
        </div>

        <Button
          type="submit"
          disabled={uploading}
          size="lg"
          className="min-h-12 rounded-2xl"
        >
          {uploading ? "Saving..." : "Add medical record"}
        </Button>
      </form>
    </div>
  );
}
