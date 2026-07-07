"use client";

import {
  FileCheck2,
  FileText,
  Share2,
  Upload,
} from "lucide-react";

import {
  getGreetingGradient,
  getTimeOfDayGreeting,
} from "@/lib/health/greeting";
import { landingCopy } from "@/lib/copy/landing";

const previewMetrics = [
  {
    label: landingCopy.hero.preview.documentsSaved,
    value: "3",
    icon: FileText,
    iconBg: "bg-teal-100 text-teal-800 dark:bg-teal-950/50 dark:text-teal-200",
  },
  {
    label: landingCopy.hero.preview.readyToRead,
    value: "2",
    icon: FileCheck2,
    iconBg: "bg-sage-100 text-sage-800 dark:bg-sage-950/50 dark:text-sage-200",
  },
  {
    label: landingCopy.hero.preview.processing,
    value: "1",
    icon: Upload,
    iconBg: "bg-amber-100 text-amber-900 dark:bg-amber-950/40 dark:text-amber-200",
  },
];

export function LandingHeroPreview() {
  const greeting = getTimeOfDayGreeting();
  const gradient = getGreetingGradient();
  const { preview } = landingCopy.hero;

  return (
    <div className="relative" aria-hidden>
      <div
        className={`health-card relative overflow-hidden rounded-[1.75rem] bg-gradient-to-br ${gradient} p-5 md:p-6`}
      >
        <div
          className="pointer-events-none absolute -right-6 -top-6 size-32 rounded-full bg-primary/10 blur-2xl"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute -bottom-8 left-1/4 size-24 rounded-full bg-accent/25 blur-2xl"
          aria-hidden
        />

        <div className="relative space-y-4">
          <div>
            <p className="text-xs font-medium text-muted-foreground">
              {greeting}
            </p>
            <p className="font-heading text-2xl font-semibold tracking-tight md:text-3xl">
              Sarah
            </p>
          </div>

          <div className="grid grid-cols-3 gap-2.5">
            {previewMetrics.map((metric) => (
              <div
                key={metric.label}
                className="rounded-2xl bg-card/70 p-3 backdrop-blur-sm dark:bg-card/40"
              >
                <div className="flex flex-col gap-2">
                  <div
                    className={`flex size-7 shrink-0 items-center justify-center rounded-xl ${metric.iconBg}`}
                  >
                    <metric.icon className="size-3.5" />
                  </div>
                  <div>
                    <p className="text-[10px] font-medium text-muted-foreground">
                      {metric.label}
                    </p>
                    <p className="font-heading text-xl font-semibold leading-tight">
                      {metric.value}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="flex items-center gap-3 rounded-2xl bg-card/60 px-4 py-3 backdrop-blur-sm dark:bg-card/35">
            <div className="flex size-8 items-center justify-center rounded-xl bg-primary/15 text-primary">
              <Share2 className="size-4" />
            </div>
            <div>
              <p className="text-xs font-medium leading-tight">
                {preview.shareChip}
              </p>
              <p className="text-[10px] text-muted-foreground">
                {preview.shareHint}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div
        className="absolute -bottom-4 -left-4 -z-10 size-full rounded-[1.75rem] bg-primary/5 blur-xl"
        aria-hidden
      />
    </div>
  );
}
