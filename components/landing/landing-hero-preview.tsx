"use client";

import {
  Activity,
  Calendar,
  Droplets,
  Heart,
  Moon,
  Pill,
} from "lucide-react";

import { Sparkline } from "@/components/health/sparkline";
import {
  getGreetingGradient,
  getTimeOfDayGreeting,
} from "@/lib/health/greeting";

const miniMetrics = [
  {
    label: "Heart rate",
    value: "72",
    unit: "bpm",
    icon: Heart,
    iconBg: "bg-rose-100 text-rose-800 dark:bg-rose-950/40 dark:text-rose-200",
    trend: [68, 70, 72, 71, 73, 72, 74],
  },
  {
    label: "Sleep",
    value: "7.2",
    unit: "hrs",
    icon: Moon,
    iconBg:
      "bg-lavender-100 text-lavender-900 dark:bg-lavender-950/50 dark:text-lavender-100",
    trend: [6.5, 7, 7.2, 6.8, 7.5, 7.2, 7.4],
  },
  {
    label: "Activity",
    value: "8.4k",
    unit: "steps",
    icon: Activity,
    iconBg: "bg-teal-100 text-teal-800 dark:bg-teal-950/50 dark:text-teal-200",
    trend: [6200, 7100, 7800, 8420, 7900, 8100, 8420],
  },
  {
    label: "Blood sugar",
    value: "98",
    unit: "mg/dL",
    icon: Droplets,
    iconBg:
      "bg-amber-100 text-amber-900 dark:bg-amber-950/40 dark:text-amber-200",
    trend: [95, 97, 96, 98, 99, 97, 98],
  },
];

const miniPills = [
  { color: "bg-rose-200 dark:bg-rose-900/40", round: true },
  { color: "bg-sky-200 dark:bg-sky-950/50", round: false },
  { color: "bg-sage-200 dark:bg-sage-950/50", round: true },
];

function normalizeTrend(values: number[]) {
  const max = Math.max(...values);
  const min = Math.min(...values);
  const range = max - min || 1;
  return values.map((v) => 2 + ((v - min) / range) * 28);
}

export function LandingHeroPreview() {
  const greeting = getTimeOfDayGreeting();
  const gradient = getGreetingGradient();

  return (
    <div
      className="relative"
      aria-hidden
    >
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

          <div className="grid grid-cols-2 gap-2.5">
            {miniMetrics.map((metric) => (
              <div
                key={metric.label}
                className="rounded-2xl bg-card/70 p-3 backdrop-blur-sm dark:bg-card/40"
              >
                <div className="flex items-start justify-between gap-1">
                  <div>
                    <p className="text-[10px] font-medium text-muted-foreground">
                      {metric.label}
                    </p>
                    <p className="font-heading text-lg font-semibold leading-tight">
                      {metric.value}
                      <span className="ml-0.5 text-[10px] font-normal text-muted-foreground">
                        {metric.unit}
                      </span>
                    </p>
                  </div>
                  <div
                    className={`flex size-7 shrink-0 items-center justify-center rounded-xl ${metric.iconBg}`}
                  >
                    <metric.icon className="size-3.5" />
                  </div>
                </div>
                <Sparkline
                  values={normalizeTrend(metric.trend)}
                  className="mt-2 h-6 w-full"
                />
              </div>
            ))}
          </div>

          <div className="flex items-center justify-between gap-3 rounded-2xl bg-card/60 px-4 py-3 backdrop-blur-sm dark:bg-card/35">
            <div className="flex items-center gap-2">
              <div className="flex size-8 items-center justify-center rounded-xl bg-teal-100 text-teal-800 dark:bg-teal-950/50 dark:text-teal-200">
                <Calendar className="size-4" />
              </div>
              <div>
                <p className="text-xs font-medium leading-tight">
                  Checkup · 2:30 PM
                </p>
                <p className="text-[10px] text-muted-foreground">
                  What&apos;s next today
                </p>
              </div>
            </div>
            <div className="flex items-center gap-1.5">
              {miniPills.map((pill, index) => (
                <span
                  key={index}
                  className={`flex items-center justify-center shadow-sm ${pill.color} ${
                    pill.round
                      ? "size-7 rounded-full"
                      : "h-6 w-8 rounded-full"
                  }`}
                >
                  <Pill className="size-3 opacity-60" />
                </span>
              ))}
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
