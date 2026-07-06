"use client";

import { useMemo, useState } from "react";
import type { LucideIcon } from "lucide-react";
import {
  Activity,
  Droplets,
  Heart,
  Moon,
} from "lucide-react";

import { Sparkline } from "@/components/health/sparkline";
import { cn } from "@/lib/utils";

type Period = "day" | "week" | "month";

type VitalMetric = {
  label: string;
  value: string;
  unit: string;
  icon: LucideIcon;
  iconBg: string;
  trends: Record<Period, number[]>;
};

const metrics: VitalMetric[] = [
  {
    label: "Heart rate",
    value: "72",
    unit: "bpm",
    icon: Heart,
    iconBg: "bg-rose-100 text-rose-800 dark:bg-rose-950/40 dark:text-rose-200",
    trends: {
      day: [68, 70, 72, 71, 73, 72, 74],
      week: [70, 71, 69, 72, 73, 71, 72],
      month: [68, 69, 71, 70, 72, 73, 72],
    },
  },
  {
    label: "Sleep",
    value: "7.2",
    unit: "hrs",
    icon: Moon,
    iconBg: "bg-lavender-100 text-lavender-900 dark:bg-lavender-950/50 dark:text-lavender-100",
    trends: {
      day: [6.5, 7, 7.2, 6.8, 7.5, 7.2, 7.4],
      week: [6.8, 7.1, 6.9, 7.3, 7.0, 7.2, 7.4],
      month: [6.5, 6.8, 7.0, 7.1, 7.2, 7.0, 7.2],
    },
  },
  {
    label: "Activity",
    value: "8,420",
    unit: "steps",
    icon: Activity,
    iconBg: "bg-teal-100 text-teal-800 dark:bg-teal-950/50 dark:text-teal-200",
    trends: {
      day: [6200, 7100, 7800, 8420, 7900, 8100, 8420],
      week: [5500, 6800, 7200, 8000, 7600, 8200, 8420],
      month: [5000, 6000, 6500, 7000, 7500, 8000, 8420],
    },
  },
  {
    label: "Blood sugar",
    value: "98",
    unit: "mg/dL",
    icon: Droplets,
    iconBg: "bg-amber-100 text-amber-900 dark:bg-amber-950/40 dark:text-amber-200",
    trends: {
      day: [95, 97, 96, 98, 99, 97, 98],
      week: [94, 96, 95, 97, 98, 96, 98],
      month: [92, 94, 95, 96, 97, 98, 98],
    },
  },
];

const periods: { id: Period; label: string }[] = [
  { id: "day", label: "Day" },
  { id: "week", label: "Week" },
  { id: "month", label: "Month" },
];

export function LandingVitalsDemo() {
  const [period, setPeriod] = useState<Period>("week");

  const normalizedTrends = useMemo(() => {
    return metrics.map((m) => {
      const values = m.trends[period];
      const max = Math.max(...values);
      const min = Math.min(...values);
      const range = max - min || 1;
      return values.map((v) => 2 + ((v - min) / range) * 28);
    });
  }, [period]);

  return (
    <section
      className="health-card rounded-2xl p-5 md:p-6"
      aria-labelledby="daily-vitals-heading"
    >
      <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <h3 id="daily-vitals-heading" className="font-heading text-lg font-semibold">
          Daily vitals
        </h3>
        <div
          className="inline-flex rounded-2xl border border-border/60 bg-muted/40 p-1"
          role="group"
          aria-label="Chart period"
        >
          {periods.map((p) => (
            <button
              key={p.id}
              type="button"
              onClick={() => setPeriod(p.id)}
              className={cn(
                "min-h-10 min-w-[4.5rem] cursor-pointer rounded-xl px-4 py-2 text-sm font-medium transition-all",
                period === p.id
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground",
              )}
              aria-pressed={period === p.id}
            >
              {p.label}
            </button>
          ))}
        </div>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        {metrics.map((metric, index) => (
          <article
            key={metric.label}
            className="rounded-2xl bg-muted/30 p-4 dark:bg-muted/15"
          >
            <div className="flex items-start justify-between gap-2">
              <div>
                <p className="text-xs font-medium text-muted-foreground">
                  {metric.label}
                </p>
                <p className="font-heading text-2xl font-semibold tracking-tight">
                  {metric.value}
                  <span className="ml-1 text-sm font-normal text-muted-foreground">
                    {metric.unit}
                  </span>
                </p>
              </div>
              <div
                className={`flex size-10 items-center justify-center rounded-2xl ${metric.iconBg}`}
              >
                <metric.icon className="size-4" aria-hidden />
              </div>
            </div>
            <Sparkline
              values={normalizedTrends[index] ?? []}
              className="mt-3 h-9 w-full"
            />
          </article>
        ))}
      </div>
    </section>
  );
}
