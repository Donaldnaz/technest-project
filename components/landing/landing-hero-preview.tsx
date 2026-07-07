"use client";

import {
  CheckCircle2,
  FileText,
  FileUp,
  FolderOpen,
  Loader2,
  Share2,
} from "lucide-react";

import {
  getGreetingGradient,
  getTimeOfDayGreeting,
} from "@/lib/health/greeting";
import { landingCopy } from "@/lib/copy/landing";

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
              {greeting} · {preview.greetingLabel}
            </p>
            <p className="font-heading text-2xl font-semibold tracking-tight md:text-3xl">
              {preview.userName}
            </p>
          </div>

          <div className="grid grid-cols-3 gap-2">
            <div className="rounded-2xl bg-card/70 p-3 backdrop-blur-sm dark:bg-card/40">
              <div className="flex size-7 items-center justify-center rounded-lg bg-primary/12 text-primary">
                <FolderOpen className="size-3.5" aria-hidden />
              </div>
              <p className="mt-2 font-heading text-xl font-semibold leading-none">
                3
              </p>
              <p className="mt-1 text-[10px] leading-tight text-muted-foreground">
                {preview.documentsSaved}
              </p>
            </div>
            <div className="rounded-2xl bg-card/70 p-3 backdrop-blur-sm dark:bg-card/40">
              <div className="flex size-7 items-center justify-center rounded-lg bg-sage-100 text-sage-800 dark:bg-sage-950/50 dark:text-sage-200">
                <CheckCircle2 className="size-3.5" aria-hidden />
              </div>
              <p className="mt-2 font-heading text-xl font-semibold leading-none">
                2
              </p>
              <p className="mt-1 text-[10px] leading-tight text-muted-foreground">
                {preview.readyToRead}
              </p>
            </div>
            <div className="rounded-2xl bg-card/70 p-3 backdrop-blur-sm dark:bg-card/40">
              <div className="flex size-7 items-center justify-center rounded-lg bg-amber-100 text-amber-900 dark:bg-amber-950/40 dark:text-amber-200">
                <Loader2 className="size-3.5" aria-hidden />
              </div>
              <p className="mt-2 font-heading text-xl font-semibold leading-none">
                1
              </p>
              <p className="mt-1 text-[10px] leading-tight text-muted-foreground">
                {preview.processing}
              </p>
            </div>
          </div>

          <div className="rounded-2xl bg-card/60 p-3 backdrop-blur-sm dark:bg-card/35">
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

          <div className="flex items-center justify-between gap-3 rounded-2xl border border-sage-200/70 bg-sage-50/80 px-4 py-3 dark:border-sage-800 dark:bg-sage-950/30">
            <div className="flex items-center gap-2">
              <div className="flex size-8 items-center justify-center rounded-xl bg-primary/12 text-primary">
                <Share2 className="size-4" aria-hidden />
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
            <div className="flex size-8 items-center justify-center rounded-full bg-primary/10 text-primary">
              <FileUp className="size-4" aria-hidden />
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
