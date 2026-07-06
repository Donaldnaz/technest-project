import type { LucideIcon } from "lucide-react";
import {
  Activity,
  FileCheck2,
  FileText,
} from "lucide-react";

import { Sparkline } from "@/components/health/sparkline";

type MetricCardsProps = {
  documentCount: number;
  readyCount: number;
  processingCount: number;
};

type Metric = {
  label: string;
  value: number;
  hint: string;
  icon: LucideIcon;
  trend: number[];
  iconBg: string;
};

function buildTrend(seed: number): number[] {
  return Array.from({ length: 7 }, (_, index) => {
    const wave = Math.sin((index + seed) * 0.9) * 3;
    return Math.max(1, seed + index * 0.6 + wave);
  });
}

export function MetricCards({
  documentCount,
  readyCount,
  processingCount,
}: MetricCardsProps) {
  const metrics: Metric[] = [
    {
      label: "Medical records uploaded",
      value: documentCount,
      hint: "Lab reports, referrals & imaging you've added",
      icon: FileText,
      trend: buildTrend(documentCount || 3),
      iconBg: "bg-teal-100 text-teal-800 dark:bg-teal-950/50 dark:text-teal-200",
    },
    {
      label: "Summaries ready",
      value: readyCount,
      hint: "Plain-language summaries you can read",
      icon: FileCheck2,
      trend: buildTrend(readyCount || 1),
      iconBg: "bg-sage-100 text-sage-800 dark:bg-sage-950/50 dark:text-sage-200",
    },
    {
      label: "Being reviewed",
      value: processingCount,
      hint: "We're preparing your summary",
      icon: Activity,
      trend: buildTrend(processingCount || 1),
      iconBg: "bg-amber-100 text-amber-900 dark:bg-amber-950/40 dark:text-amber-200",
    },
  ];

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {metrics.map((metric) => (
        <article
          key={metric.label}
          className="health-card flex flex-col gap-4 rounded-3xl p-5 shadow-sm transition-shadow hover:shadow-md md:p-6"
        >
          <div className="flex items-start justify-between gap-3">
            <div className="space-y-1">
              <p className="text-sm font-medium text-muted-foreground">
                {metric.label}
              </p>
              <p className="font-heading text-3xl font-semibold tracking-tight">
                {metric.value}
              </p>
            </div>
            <div
              className={`flex size-11 items-center justify-center rounded-2xl ${metric.iconBg}`}
            >
              <metric.icon className="size-5" aria-hidden />
            </div>
          </div>
          <Sparkline values={metric.trend} />
          <p className="text-xs text-muted-foreground">{metric.hint}</p>
        </article>
      ))}
    </div>
  );
}
