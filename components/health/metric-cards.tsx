import type { LucideIcon } from "lucide-react";
import {
  Activity,
  FileCheck2,
  FileText,
} from "lucide-react";

import { Sparkline } from "@/components/health/sparkline";
import { patientDashboardCopy } from "@/lib/copy/patient/dashboard";

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
      label: patientDashboardCopy.overview.metrics.total.label,
      value: documentCount,
      hint: patientDashboardCopy.overview.metrics.total.hint,
      icon: FileText,
      trend: buildTrend(documentCount || 3),
      iconBg: "bg-teal-100 text-teal-800 dark:bg-teal-950/50 dark:text-teal-200",
    },
    {
      label: patientDashboardCopy.overview.metrics.ready.label,
      value: readyCount,
      hint: patientDashboardCopy.overview.metrics.ready.hint,
      icon: FileCheck2,
      trend: buildTrend(readyCount || 1),
      iconBg: "bg-sage-100 text-sage-800 dark:bg-sage-950/50 dark:text-sage-200",
    },
    {
      label: patientDashboardCopy.overview.metrics.processing.label,
      value: processingCount,
      hint: patientDashboardCopy.overview.metrics.processing.hint,
      icon: Activity,
      trend: buildTrend(processingCount || 1),
      iconBg: "bg-amber-100 text-amber-900 dark:bg-amber-950/40 dark:text-amber-200",
    },
  ];

  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
      {metrics.map((metric) => (
        <article
          key={metric.label}
          className="health-card flex flex-col gap-5 rounded-3xl p-6 shadow-sm transition-shadow hover:shadow-md md:p-7"
        >
          <div className="flex items-start justify-between gap-4">
            <div className="space-y-2">
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
