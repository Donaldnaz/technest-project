import { cn } from "@/lib/utils";

type WaveformVariant = "teal" | "sage" | "amber";
type WaveformPace = "steady" | "brisk";

type VitalSignWaveformProps = {
  active: boolean;
  variant: WaveformVariant;
  pace?: WaveformPace;
  className?: string;
};

const variantStroke: Record<WaveformVariant, string> = {
  teal: "text-teal-800/24 dark:text-teal-200/18",
  sage: "text-sage-800/24 dark:text-sage-200/18",
  amber: "text-amber-900/24 dark:text-amber-200/18",
};

const ECG_BEAT_PATH =
  "M 0 16 H 14 L 16.5 13.5 L 19 16 H 30 L 32 16 L 33.5 3 L 37 29 L 40.5 11 L 44 16 H 62 L 64.5 13 L 68 16 H 100";

function EcgBeat({ strokeClassName }: { strokeClassName: string }) {
  return (
    <svg
      viewBox="0 0 100 32"
      className="h-full w-1/2 shrink-0"
      preserveAspectRatio="none"
      aria-hidden
    >
      <path
        d={ECG_BEAT_PATH}
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={strokeClassName}
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  );
}

export function VitalSignWaveform({
  active,
  variant,
  pace = "steady",
  className,
}: VitalSignWaveformProps) {
  const strokeClassName = variantStroke[variant];

  return (
    <div
      className={cn(
        "relative h-10 w-full overflow-hidden rounded-xl bg-muted/15 ring-1 ring-border/15",
        className,
      )}
      aria-hidden
    >
      <div className="pointer-events-none absolute inset-x-0 top-1/2 z-0 h-px -translate-y-1/2 bg-border/20" />

      {active ? (
        <div
          className={cn(
            "absolute inset-y-0 left-0 flex h-full w-[200%] motion-reduce:animate-none",
            pace === "brisk"
              ? "animate-vital-sign-scroll-fast"
              : "animate-vital-sign-scroll",
          )}
        >
          <EcgBeat strokeClassName={strokeClassName} />
          <EcgBeat strokeClassName={strokeClassName} />
        </div>
      ) : (
        <div className="absolute inset-x-3 top-1/2 z-10 h-px -translate-y-1/2 bg-muted-foreground/40" />
      )}

      <div className="pointer-events-none absolute inset-0 z-20 bg-gradient-to-r from-card/85 via-transparent to-card/85" />
    </div>
  );
}
