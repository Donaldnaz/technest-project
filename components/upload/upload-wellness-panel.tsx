import { HeartPulse, ShieldCheck } from "lucide-react";

export function UploadWellnessPanel() {
  return (
    <div className="relative hidden overflow-hidden lg:flex lg:flex-col lg:justify-between">
      <div
        className="absolute inset-0 bg-gradient-to-br from-teal-100/70 via-oat-50 to-sage-100/80 dark:from-charcoal-950 dark:via-charcoal-900 dark:to-teal-950/40"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-charcoal-900/20 to-transparent dark:from-charcoal-950/60"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -left-16 top-0 size-72 rounded-full bg-primary/10 blur-3xl"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute bottom-0 right-0 size-80 rounded-full bg-accent/20 blur-3xl"
        aria-hidden
      />

      <div className="relative z-10 flex flex-1 flex-col items-center justify-center px-10 py-12">
        <svg
          viewBox="0 0 320 280"
          className="w-full max-w-sm text-primary/80"
          aria-hidden
        >
          <rect
            x="40"
            y="48"
            width="200"
            height="160"
            rx="24"
            fill="currentColor"
            fillOpacity="0.08"
            stroke="currentColor"
            strokeOpacity="0.25"
            strokeWidth="2"
          />
          <rect
            x="72"
            y="80"
            width="120"
            height="8"
            rx="4"
            fill="currentColor"
            fillOpacity="0.35"
          />
          <rect
            x="72"
            y="104"
            width="96"
            height="8"
            rx="4"
            fill="currentColor"
            fillOpacity="0.25"
          />
          <rect
            x="72"
            y="128"
            width="108"
            height="8"
            rx="4"
            fill="currentColor"
            fillOpacity="0.2"
          />
          <circle
            cx="220"
            cy="180"
            r="48"
            fill="currentColor"
            fillOpacity="0.12"
            stroke="currentColor"
            strokeOpacity="0.3"
            strokeWidth="2"
          />
          <path
            d="M220 158c-8 0-14 6-14 14v4c-6 2-10 8-10 14 0 9 8 16 16 16h16c8 0 16-7 16-16 0-6-4-12-10-14v-4c0-8-6-14-14-14z"
            fill="currentColor"
            fillOpacity="0.45"
          />
        </svg>
      </div>

      <div className="relative z-10 space-y-4 px-10 pb-12">
        <div className="inline-flex items-center gap-2 rounded-full border border-sage-200/80 bg-sage-100/60 px-3 py-1.5 text-xs font-medium text-sage-800 dark:border-sage-800 dark:bg-sage-950/40 dark:text-sage-200">
          <ShieldCheck className="size-4 shrink-0" aria-hidden />
          Private & secure upload
        </div>
        <h2 className="font-heading text-3xl font-semibold tracking-tight text-foreground">
          Your records, kept private
        </h2>
        <p className="max-w-md text-base leading-relaxed text-muted-foreground">
          Upload lab reports, imaging, and prescriptions in one calm place.
          Share with your care team only when you are ready.
        </p>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <HeartPulse className="size-4 text-primary" aria-hidden />
          Designed for peace of mind
        </div>
      </div>
    </div>
  );
}
