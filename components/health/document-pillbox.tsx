import Link from "next/link";
import {
  Activity,
  FileCheck2,
  FileImage,
  FileText,
} from "lucide-react";

import { profilePath } from "@/lib/routes/profile";

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
      label: "Lab reports",
      count: pdfCount,
      hint: "PDF uploads",
      shape: "round",
      colorClass:
        "bg-terracotta-200 text-terracotta-900 dark:bg-terracotta-900/50 dark:text-terracotta-100",
      icon: FileText,
    },
    {
      id: "jpeg",
      label: "Medical imaging",
      count: jpegCount,
      hint: "Scan & photo uploads",
      shape: "capsule",
      colorClass:
        "bg-lavender-200 text-lavender-900 dark:bg-lavender-900/50 dark:text-lavender-100",
      icon: FileImage,
    },
    {
      id: "ready",
      label: "Summaries ready",
      count: readyCount,
      hint: "Ready to read",
      shape: "round",
      colorClass:
        "bg-sage-100 text-sage-800 dark:bg-sage-950/50 dark:text-sage-200",
      icon: FileCheck2,
    },
    {
      id: "processing",
      label: "Being reviewed",
      count: processingCount,
      hint: "Summary in progress",
      shape: "capsule",
      colorClass:
        "bg-amber-100 text-amber-900 dark:bg-amber-950/40 dark:text-amber-200",
      icon: Activity,
    },
  ];

  return (
    <section className="health-card rounded-3xl p-5 shadow-sm md:p-6">
      <div className="mb-5">
        <h2 className="font-heading text-lg font-semibold">
          Your uploaded records
        </h2>
        <p className="text-sm text-muted-foreground">
          Uploads, summaries, and review progress at a glance
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        {pills.map((pill) => (
          <div
            key={pill.id}
            className="flex flex-col items-center gap-2 rounded-2xl border border-border/40 bg-oat-50/30 p-4 text-center dark:bg-charcoal-950/20"
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
        <div className="mt-5 text-center">
          <Link
            href={profilePath(profileId)}
            className="text-sm font-medium text-primary hover:underline"
          >
            Open your health profile →
          </Link>
        </div>
      )}
    </section>
  );
}
