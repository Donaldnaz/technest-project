import { FileUp } from "lucide-react";

import { landingCopy } from "@/lib/copy/landing";

export function LandingUploadDemo() {
  const { upload } = landingCopy.experience;

  return (
    <section
      className="health-card rounded-2xl p-5 md:p-6"
      aria-labelledby="landing-upload-heading"
    >
      <div className="mb-4 space-y-1">
        <h3 id="landing-upload-heading" className="font-heading text-lg font-semibold">
          {upload.title}
        </h3>
        <p className="text-sm text-muted-foreground">{upload.description}</p>
      </div>

      <div className="upload-dropzone flex min-h-40 flex-col items-center justify-center gap-3 rounded-2xl border-2 border-dashed border-sage-300/80 bg-sage-50/40 px-6 py-10 text-center dark:border-sage-700 dark:bg-sage-950/20">
        <span className="flex size-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
          <FileUp className="size-6" aria-hidden />
        </span>
        <p className="max-w-xs text-sm font-medium leading-relaxed">
          {upload.description}
        </p>
        <p className="text-xs text-muted-foreground">{upload.hint}</p>
      </div>
    </section>
  );
}
