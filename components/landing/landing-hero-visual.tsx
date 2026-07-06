import Image from "next/image";
import { FileCheck2, ShieldCheck, Upload } from "lucide-react";

const floatingCards = [
  {
    icon: Upload,
    title: "3 records uploaded",
    subtitle: "Lab report · Imaging · Summary",
    className: "left-4 top-6 sm:left-6 sm:top-8",
    iconClassName: "bg-sage-100 text-sage-800 dark:bg-sage-950/50 dark:text-sage-200",
  },
  {
    icon: FileCheck2,
    title: "Summary ready",
    subtitle: "Plain-language review complete",
    className: "bottom-8 right-4 sm:bottom-10 sm:right-6",
    iconClassName: "bg-teal-100 text-teal-800 dark:bg-teal-950/50 dark:text-teal-200",
  },
];

export function LandingHeroVisual() {
  return (
    <div className="relative mx-auto w-full max-w-xl lg:max-w-none">
      <div className="relative overflow-hidden rounded-[1.75rem] border border-border/60 bg-card shadow-xl shadow-primary/5 ring-1 ring-border/40">
        <div className="relative aspect-[4/3] sm:aspect-[16/11]">
          <Image
            src="/landing/healthcare-hero.png"
            alt="Patient and care team reviewing health records together in a calm, modern clinic"
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover object-center"
          />
          <div
            className="pointer-events-none absolute inset-0 bg-gradient-to-t from-charcoal-900/35 via-transparent to-transparent"
            aria-hidden
          />
          <div
            className="pointer-events-none absolute inset-0 bg-gradient-to-br from-sage-100/20 via-transparent to-teal-100/15 dark:from-sage-950/25 dark:to-teal-950/20"
            aria-hidden
          />
        </div>

        <div className="flex items-center gap-2 border-t border-border/60 bg-background/90 px-4 py-3 backdrop-blur-sm dark:bg-card/90">
          <div className="flex size-8 items-center justify-center rounded-xl bg-primary/15 text-primary">
            <ShieldCheck className="size-4" aria-hidden />
          </div>
          <p className="text-sm text-muted-foreground">
            Private uploads · You choose what to share
          </p>
        </div>
      </div>

      {floatingCards.map((card) => (
        <div
          key={card.title}
          className={`absolute z-10 hidden max-w-[11rem] rounded-2xl border border-border/60 bg-card/95 p-3 shadow-lg backdrop-blur-md sm:block ${card.className}`}
        >
          <div className="flex items-start gap-2.5">
            <div
              className={`flex size-9 shrink-0 items-center justify-center rounded-xl ${card.iconClassName}`}
            >
              <card.icon className="size-4" aria-hidden />
            </div>
            <div className="min-w-0">
              <p className="text-xs font-semibold leading-snug text-foreground">
                {card.title}
              </p>
              <p className="mt-0.5 text-[10px] leading-snug text-muted-foreground">
                {card.subtitle}
              </p>
            </div>
          </div>
        </div>
      ))}

      <div
        className="pointer-events-none absolute -bottom-5 -right-5 -z-10 size-full rounded-[1.75rem] bg-primary/10 blur-2xl"
        aria-hidden
      />
    </div>
  );
}
