"use client";

import { FolderOpen } from "lucide-react";

import {
  getGreetingGradient,
  getTimeOfDayGreeting,
} from "@/lib/health/greeting";
import { landingCopy } from "@/lib/copy/landing";

export function LandingWelcomeStrip() {
  const greeting = getTimeOfDayGreeting();
  const gradient = getGreetingGradient();
  const { welcomeStrip } = landingCopy.experience;

  return (
    <section
      className={`health-card relative overflow-hidden rounded-3xl bg-gradient-to-br p-6 shadow-lg shadow-primary/10 md:p-8 dark:shadow-primary/5 ${gradient}`}
      aria-label="Personalized greeting"
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
        className="pointer-events-none absolute -right-8 -top-8 size-36 rounded-full bg-primary/10 blur-2xl"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -bottom-10 left-1/3 size-28 rounded-full bg-accent/25 blur-2xl"
        aria-hidden
      />

      <div className="relative flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h3 className="font-heading text-2xl font-semibold tracking-tight md:text-3xl">
            {greeting}, Sarah
          </h3>
          <p className="mt-1 max-w-md text-sm leading-relaxed text-muted-foreground md:text-base">
            {welcomeStrip.body(3, 2)}
          </p>
        </div>
        <div className="flex shrink-0 items-center gap-2 rounded-2xl bg-card/80 px-4 py-3 shadow-sm backdrop-blur-sm dark:bg-card/60">
          <FolderOpen className="size-5 text-primary" aria-hidden />
          <span className="text-sm font-medium">{welcomeStrip.badge}</span>
        </div>
      </div>
    </section>
  );
}
