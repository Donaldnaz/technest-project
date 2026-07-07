"use client";

import {
  CheckCircle2,
  FileText,
  FileUp,
  FolderOpen,
  Loader2,
  Share2,
} from "lucide-react";

import { VitalSignWaveform } from "@/components/health/vital-sign-waveform";
import {
  getGreetingGradient,
  getTimeOfDayGreeting,
} from "@/lib/health/greeting";
import { landingCopy } from "@/lib/copy/landing";
import { cn } from "@/lib/utils";

export function LandingHeroPreview() {
  const greeting = getTimeOfDayGreeting();
  const gradient = getGreetingGradient();
  const { preview } = landingCopy.hero;

  const statTiles = [
    {
      icon: FolderOpen,
      value: "3",
      label: preview.documentsSaved,
      iconClassName: "bg-primary/12 text-primary",
    },
    {
      icon: CheckCircle2,
      value: "2",
      label: preview.readyToRead,
      iconClassName:
        "bg-sage-100 text-sage-800 dark:bg-sage-950/50 dark:text-sage-200",
    },
    {
      icon: Loader2,
      value: "1",
      label: preview.processing,
      iconClassName:
        "bg-amber-100 text-amber-900 dark:bg-amber-950/40 dark:text-amber-200",
    },
  ] as const;

  return (
    <div className="landing-hero-stage relative" aria-hidden>
      <div
        className="pointer-events-none absolute -right-3 top-6 -z-10 h-[75%] w-14 skew-x-[-10deg] rounded-2xl bg-gradient-to-b from-primary/14 via-primary/6 to-transparent max-lg:skew-x-0"
        aria-hidden
      />

      <div className="transition-transform duration-300 ease-out lg:-rotate-1 lg:hover:-translate-y-1 motion-reduce:transform-none">
        <div
          className={cn(
            "health-card relative overflow-hidden rounded-2xl bg-gradient-to-br p-5 shadow-xl shadow-primary/10 dark:shadow-primary/5 md:p-6",
            gradient,
          )}
        >
          <div
            className="pointer-events-none absolute inset-0 bg-gradient-to-br from-transparent via-primary/6 to-transparent dark:via-primary/10"
            aria-hidden
          />
          <div
            className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent"
            aria-hidden
          />
          <div
            className="pointer-events-none absolute -right-8 -top-8 size-28 rounded-full bg-primary/10 blur-2xl"
            aria-hidden
          />
          <div
            className="pointer-events-none absolute -bottom-6 left-1/4 size-20 rounded-full bg-accent/20 blur-2xl"
            aria-hidden
          />

          <div className="relative space-y-4">
            <div className="space-y-1">
              <p className="font-heading text-2xl font-bold tracking-tight text-foreground md:text-[1.75rem] md:leading-tight">
                {greeting}, {preview.userName}
              </p>
              <p className="text-sm leading-snug text-muted-foreground">
                {preview.greetingLabel}
              </p>
            </div>

            <div
              className="grid grid-cols-3 gap-2 sm:gap-3"
              aria-hidden
            >
              <VitalSignWaveform
                active
                variant="teal"
                pace="steady"
                className="h-9 md:h-10"
              />
              <VitalSignWaveform
                active
                variant="sage"
                pace="steady"
                className="h-9 md:h-10"
              />
              <VitalSignWaveform
                active
                variant="amber"
                pace="brisk"
                className="h-9 md:h-10"
              />
            </div>

            <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
              {statTiles.map((tile) => (
                <div
                  key={tile.label}
                  className="rounded-2xl bg-card/90 p-3 dark:bg-card/70"
                >
                  <div
                    className={cn(
                      "flex size-7 items-center justify-center rounded-lg",
                      tile.iconClassName,
                    )}
                  >
                    <tile.icon className="size-3.5" aria-hidden />
                  </div>
                  <p className="mt-2 font-heading text-xl font-semibold leading-none">
                    {tile.value}
                  </p>
                  <p className="mt-1 truncate text-[10px] leading-tight text-muted-foreground">
                    {tile.label}
                  </p>
                </div>
              ))}
            </div>

            <div className="rounded-2xl bg-card/85 p-3 dark:bg-card/65">
              <p className="mb-2 text-[10px] font-semibold uppercase tracking-wide text-muted-foreground">
                {preview.recentLabel}
              </p>
              <ul className="space-y-2">
                {preview.recentItems.map((item) => (
                  <li
                    key={item.name}
                    className="flex items-center gap-2 text-xs"
                  >
                    <FileText className="size-3.5 shrink-0 text-muted-foreground" />
                    <span className="min-w-0 flex-1 truncate font-medium">
                      {item.name}
                    </span>
                    <span className="shrink-0 text-[10px] text-muted-foreground">
                      {item.status}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex min-w-0 items-center justify-between gap-3 rounded-2xl border border-sage-200/70 bg-sage-50/80 px-4 py-3 dark:border-sage-800 dark:bg-sage-950/30">
              <div className="flex min-w-0 items-center gap-2">
                <div className="flex size-8 shrink-0 items-center justify-center rounded-xl bg-primary/12 text-primary">
                  <Share2 className="size-4" aria-hidden />
                </div>
                <div className="min-w-0">
                  <p className="truncate text-xs font-medium leading-tight">
                    {preview.shareChip}
                  </p>
                  <p className="truncate text-[10px] text-muted-foreground">
                    {preview.shareHint}
                  </p>
                </div>
              </div>
              <div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                <FileUp className="size-4" aria-hidden />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        className="pointer-events-none absolute -bottom-3 -left-3 -z-10 size-full rounded-2xl bg-primary/8 blur-xl"
        aria-hidden
      />
    </div>
  );
}
