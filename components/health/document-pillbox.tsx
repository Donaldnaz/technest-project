import Link from "next/link";
import {
  Activity,
  FileCheck2,
  FileImage,
  FileText,
} from "lucide-react";

import { profilePath } from "@/lib/routes/profile";
import { patientDashboardCopy } from "@/lib/copy/patient/dashboard";

type DocumentPillboxProps = {
  profileId?: string;
  pdfCount: number;
  jpegCount: number;
  readyCount: number;
  processingCount: number;
};

type RecordPill = {
  id: string;
  label: string;
  count: number;
  hint: string;
  shape: "round" | "capsule";
  colorClass: string;
  icon: typeof FileText;
};

export function DocumentPillbox({
  profileId,
  pdfCount,
  jpegCount,
  readyCount,
  processingCount,
}: DocumentPillboxProps) {
  const pills: RecordPill[] = [
    {
      id: "pdf",
      label: patientDashboardCopy.pillbox.pdf.label,
      count: pdfCount,
      hint: patientDashboardCopy.pillbox.pdf.hint,
      shape: "round",
      colorClass:
        "bg-terracotta-200 text-terracotta-900 dark:bg-terracotta-900/50 dark:text-terracotta-100",
      icon: FileText,
    },
    {
      id: "jpeg",
      label: patientDashboardCopy.pillbox.jpeg.label,
      count: jpegCount,
      hint: patientDashboardCopy.pillbox.jpeg.hint,
      shape: "capsule",
      colorClass:
        "bg-lavender-200 text-lavender-900 dark:bg-lavender-900/50 dark:text-lavender-100",
      icon: FileImage,
    },
    {
      id: "ready",
      label: patientDashboardCopy.pillbox.ready.label,
      count: readyCount,
      hint: patientDashboardCopy.pillbox.ready.hint,
      shape: "round",
      colorClass:
        "bg-sage-100 text-sage-800 dark:bg-sage-950/50 dark:text-sage-200",
      icon: FileCheck2,
    },
    {
      id: "processing",
      label: patientDashboardCopy.pillbox.processing.label,
      count: processingCount,
      hint: patientDashboardCopy.pillbox.processing.hint,
      shape: "capsule",
      colorClass:
        "bg-amber-100 text-amber-900 dark:bg-amber-950/40 dark:text-amber-200",
      icon: Activity,
    },
  ];

  return (
    <section className="health-card rounded-3xl p-6 shadow-sm md:p-8">
      <div className="mb-6 space-y-2">
        <h2 className="font-heading text-lg font-semibold md:text-xl">
          {patientDashboardCopy.pillbox.title}
        </h2>
        <p className="text-sm leading-relaxed text-muted-foreground md:text-base">
          {patientDashboardCopy.pillbox.description}
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 sm:gap-5">
        {pills.map((pill) => (
          <div
            key={pill.id}
            className="flex flex-col items-center gap-3 rounded-2xl border border-border/40 bg-oat-50/30 p-5 text-center dark:bg-charcoal-950/20"
          >
            <span
              className={`flex size-16 items-center justify-center shadow-sm ${
                pill.shape === "round"
                  ? "rounded-full"
                  : "h-14 w-24 rounded-full"
              } ${pill.colorClass}`}
            >
              <pill.icon className="size-6 opacity-90" aria-hidden />
            </span>
            <span className="text-sm font-medium">{pill.label}</span>
            <span className="font-heading text-2xl font-semibold tabular-nums">
              {pill.count}
            </span>
            <span className="text-xs text-muted-foreground">{pill.hint}</span>
          </div>
        ))}
      </div>

      {profileId && (
        <div className="mt-6 text-center">
          <Link
            href={profilePath(profileId)}
            className="text-sm font-medium text-primary hover:underline"
          >
            {patientDashboardCopy.empty.pillboxLink} →
          </Link>
        </div>
      )}
    </section>
  );
}
