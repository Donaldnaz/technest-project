import Link from "next/link";
import {
  Activity,
  FileCheck2,
  FileImage,
  FileText,
} from "lucide-react";

import { patientDashboardCopy } from "@/lib/copy/patient/dashboard";
import { profilePath } from "@/lib/routes/profile";

type DocumentPillboxProps = {
  profileId?: string;
  pdfCount: number;
  jpegCount: number;
  readyCount: number;
  processingCount: number;
};

type PillKey = "pdf" | "jpeg" | "ready" | "processing";

type RecordPill = {
  id: PillKey;
  count: number;
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
  const { pillbox } = patientDashboardCopy;

  const pills: RecordPill[] = [
    {
      id: "pdf",
      count: pdfCount,
      shape: "round",
      colorClass:
        "bg-terracotta-200 text-terracotta-900 dark:bg-terracotta-900/50 dark:text-terracotta-100",
      icon: FileText,
    },
    {
      id: "jpeg",
      count: jpegCount,
      shape: "capsule",
      colorClass:
        "bg-lavender-200 text-lavender-900 dark:bg-lavender-900/50 dark:text-lavender-100",
      icon: FileImage,
    },
    {
      id: "ready",
      count: readyCount,
      shape: "round",
      colorClass:
        "bg-sage-100 text-sage-800 dark:bg-sage-950/50 dark:text-sage-200",
      icon: FileCheck2,
    },
    {
      id: "processing",
      count: processingCount,
      shape: "capsule",
      colorClass:
        "bg-amber-100 text-amber-900 dark:bg-amber-950/40 dark:text-amber-200",
      icon: Activity,
    },
  ];

  return (
    <section className="health-card rounded-3xl p-5 shadow-sm md:p-6">
      <div className="mb-5">
        <h2 className="font-heading text-lg font-semibold">{pillbox.title}</h2>
        <p className="text-sm text-muted-foreground">{pillbox.description}</p>
      </div>

      <div className="grid grid-cols-2 gap-3 max-xs:gap-2 sm:grid-cols-4 sm:gap-4">
        {pills.map((pill) => {
          const copy = pillbox[pill.id];

          return (
            <div
              key={pill.id}
              className="flex flex-col items-center gap-2 rounded-2xl border border-border/40 bg-oat-50/30 p-3 text-center max-xs:p-2.5 dark:bg-charcoal-950/20 sm:p-4"
            >
              <span
                className={`flex items-center justify-center shadow-sm ${
                  pill.shape === "round"
                    ? "size-12 rounded-full sm:size-16"
                    : "h-11 w-full max-w-20 rounded-full sm:h-14 sm:max-w-24"
                } ${pill.colorClass}`}
              >
                <pill.icon className="size-6 opacity-90" aria-hidden />
              </span>
              <span className="text-sm font-medium">{copy.label}</span>
              <span className="font-heading text-2xl font-semibold tabular-nums">
                {pill.count}
              </span>
              <span className="text-xs text-muted-foreground">{copy.hint}</span>
            </div>
          );
        })}
      </div>

      {profileId && (
        <div className="mt-5 text-center">
          <Link
            href={profilePath(profileId)}
            className="text-sm font-medium text-primary hover:underline"
          >
            {pillbox.profileLink}
          </Link>
        </div>
      )}
    </section>
  );
}
