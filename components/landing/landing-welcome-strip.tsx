"use client";

import { CalendarDays } from "lucide-react";

import {
  getGreetingGradient,
  getTimeOfDayGreeting,
} from "@/lib/health/greeting";

export function LandingWelcomeStrip() {
  const greeting = getTimeOfDayGreeting();
  const gradient = getGreetingGradient();

  return (
    <section
      className={`health-card relative overflow-hidden rounded-3xl bg-gradient-to-br ${gradient} p-6 md:p-8`}
      aria-label="Personalized greeting"
    >
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
            Four items on your care timeline today — vitals look steady, and
            one evening dose is still ahead.
          </p>
        </div>
        <div className="flex shrink-0 items-center gap-2 rounded-2xl bg-card/60 px-4 py-3 backdrop-blur-sm dark:bg-card/40">
          <CalendarDays className="size-5 text-primary" aria-hidden />
          <span className="text-sm font-medium">Today&apos;s overview</span>
        </div>
      </div>
    </section>
  );
}
