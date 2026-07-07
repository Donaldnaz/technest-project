import { FileUp } from "lucide-react";

import { landingCopy } from "@/lib/copy/landing";

export function LandingUploadDemo() {
  const { upload } = landingCopy.experience;

  return (
    <section
      className="health-card relative overflow-hidden rounded-2xl p-5 shadow-md shadow-primary/5 md:p-6 dark:shadow-primary/5"
      aria-labelledby="landing-upload-heading"
    >
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent"
        aria-hidden
      />

      <div className="relative mb-4 space-y-1">
        <h3 id="landing-upload-heading" className="font-heading text-lg font-semibold">
          {upload.title}
        </h3>
        <p className="text-sm text-muted-foreground">{upload.description}</p>
      </div>

      <div className="upload-dropzone relative flex min-h-40 flex-col items-center justify-center gap-3 overflow-hidden rounded-2xl border-2 border-dashed border-sage-300/80 bg-sage-50/50 px-6 py-10 text-center shadow-[inset_0_2px_12px_oklch(0.52_0.08_165/0.06)] dark:border-sage-700 dark:bg-sage-950/25 dark:shadow-[inset_0_2px_12px_oklch(0.72_0.09_165/0.08)]">
        <div
          className="pointer-events-none absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-primary/5"
          aria-hidden
        />
        <span className="relative flex size-12 items-center justify-center rounded-2xl bg-primary/10 text-primary shadow-sm">
          <FileUp className="size-6" aria-hidden />
        </span>
        <p className="relative max-w-xs text-sm font-medium leading-relaxed">
          {upload.description}
        </p>
        <p className="relative text-xs text-muted-foreground">{upload.hint}</p>
      </div>
    </section>
  );
}
