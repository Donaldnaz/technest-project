import type { LucideIcon } from "lucide-react";
import {
  Activity,
  FileCheck2,
  FileText,
} from "lucide-react";

import { VitalSignWaveform } from "@/components/health/vital-sign-waveform";
import { patientDashboardCopy } from "@/lib/copy/patient/dashboard";

type MetricCardsProps = {
  documentCount: number;
  readyCount: number;
  processingCount: number;
};

type WaveformVariant = "teal" | "sage" | "amber";
type WaveformPace = "steady" | "brisk";

type Metric = {
  label: string;
  value: number;
  hint: string;
  icon: LucideIcon;
  waveformVariant: WaveformVariant;
  waveformPace: WaveformPace;
  iconBg: string;
};

export function MetricCards({
  documentCount,
  readyCount,
  processingCount,
}: MetricCardsProps) {
  const { metrics } = patientDashboardCopy.overview;

  const metricValues: Metric[] = [
    {
      label: metrics.total.label,
      value: documentCount,
      hint: metrics.total.hint,
      icon: FileText,
      waveformVariant: "teal",
      waveformPace: "steady",
      iconBg: "bg-teal-100 text-teal-800 dark:bg-teal-950/50 dark:text-teal-200",
    },
    {
      label: metrics.ready.label,
      value: readyCount,
      hint: metrics.ready.hint,
      icon: FileCheck2,
      waveformVariant: "sage",
      waveformPace: "steady",
      iconBg: "bg-sage-100 text-sage-800 dark:bg-sage-950/50 dark:text-sage-200",
    },
    {
      label: metrics.processing.label,
      value: processingCount,
      hint: metrics.processing.hint,
      icon: Activity,
      waveformVariant: "amber",
      waveformPace: "steady",
      iconBg: "bg-amber-100 text-amber-900 dark:bg-amber-950/40 dark:text-amber-200",
    },
  ];

  return (
    <div className="stat-grid">
      {metricValues.map((metric) => (
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
          <VitalSignWaveform
            active={metric.value > 0}
            variant={metric.waveformVariant}
            pace={metric.waveformPace}
          />
          <p className="text-xs text-muted-foreground">{metric.hint}</p>
        </article>
      ))}
    </div>
  );
}
