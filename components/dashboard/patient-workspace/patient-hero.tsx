"use client";

import {
  Activity,
  FileCheck2,
  FileText,
  MapPin,
  UserRound,
} from "lucide-react";

import { patientDashboardCopy } from "@/lib/copy/patient/dashboard";
import type { Patient } from "@/lib/db/schema";
import { cn } from "@/lib/utils";

import { usePatientWorkspaceTab } from "./patient-workspace-tabs";

type PatientHeroProps = {
  patient: Patient;
  documentCount: number;
  readyCount: number;
  processingCount: number;
};

function getInitials(firstName: string, lastName: string): string {
  return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
}

type StatChipProps = {
  label: string;
  value: number;
  icon: typeof FileText;
  tone: "neutral" | "ready" | "processing";
};

function StatChip({ label, value, icon: Icon, tone }: StatChipProps) {
  return (
    <div
      className={cn(
        "flex min-w-[7.5rem] flex-1 items-center gap-3 rounded-xl border px-3 py-2.5",
        tone === "ready" &&
          "border-sage-200/80 bg-sage-50/80 dark:border-sage-800 dark:bg-sage-950/30",
        tone === "processing" &&
          "border-amber-200/80 bg-amber-50/80 dark:border-amber-900 dark:bg-amber-950/30",
        tone === "neutral" && "border-border/60 bg-background/80",
      )}
    >
      <span
        className={cn(
          "flex size-9 shrink-0 items-center justify-center rounded-lg",
          tone === "ready" &&
            "bg-sage-100 text-sage-800 dark:bg-sage-900/50 dark:text-sage-200",
          tone === "processing" &&
            "bg-amber-100 text-amber-900 dark:bg-amber-900/40 dark:text-amber-200",
          tone === "neutral" && "bg-muted text-muted-foreground",
        )}
      >
        <Icon className="size-4" aria-hidden />
      </span>
      <span className="min-w-0">
        <span className="block font-heading text-xl font-semibold tabular-nums leading-none">
          {value}
        </span>
        <span className="mt-0.5 block truncate text-xs text-muted-foreground">
          {label}
        </span>
      </span>
    </div>
  );
}

export function PatientHero({
  patient,
  documentCount,
  readyCount,
  processingCount,
}: PatientHeroProps) {
  const { setTab } = usePatientWorkspaceTab();
  const patientName = `${patient.firstName} ${patient.lastName}`;
  const relationshipLabel =
    patient.relationship === "self"
      ? patientDashboardCopy.patient.profile.relationshipSelf
      : patientDashboardCopy.patient.profile.relationshipOther;

  return (
    <section className="relative overflow-hidden rounded-2xl border border-border/60 bg-gradient-to-br from-teal-50/90 via-background to-sage-50/70 p-5 shadow-sm md:p-6 dark:from-teal-950/30 dark:via-card dark:to-sage-950/20">
      <div
        className="pointer-events-none absolute -right-10 -top-10 size-40 rounded-full bg-primary/10 blur-3xl"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -bottom-8 left-1/4 size-32 rounded-full bg-accent/20 blur-3xl"
        aria-hidden
      />

      <div className="relative flex min-w-0 flex-1 gap-4">
          <div
            className="flex size-14 shrink-0 items-center justify-center rounded-2xl bg-primary/15 font-heading text-lg font-semibold text-primary md:size-16 md:text-xl"
            aria-hidden
          >
            {getInitials(patient.firstName, patient.lastName)}
          </div>

          <div className="min-w-0 space-y-2">
            <div className="flex flex-wrap items-center gap-2">
              <h1 className="font-heading text-2xl font-semibold tracking-tight md:text-3xl">
                {patientName}
              </h1>
              <span className="inline-flex items-center gap-1 rounded-full border border-border/70 bg-background/80 px-2.5 py-0.5 text-xs font-medium text-muted-foreground">
                <UserRound className="size-3" aria-hidden />
                {relationshipLabel}
              </span>
            </div>

            <p className="max-w-xl text-sm leading-relaxed text-muted-foreground">
              {patientDashboardCopy.patient.workspaceDescription}
            </p>

            <p className="inline-flex max-w-xl items-start gap-1.5 text-sm text-foreground/80">
              <MapPin className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden />
              <span>
                {patient.healthcareLocation}
                {patient.city ? ` · ${patient.city}` : ""}
              </span>
            </p>
          </div>
        </div>

      <div className="relative mt-6 grid gap-2 sm:grid-cols-3">
        <StatChip
          label={patientDashboardCopy.overview.metrics.total.label}
          value={documentCount}
          icon={FileText}
          tone="neutral"
        />
        <StatChip
          label={patientDashboardCopy.overview.metrics.ready.label}
          value={readyCount}
          icon={FileCheck2}
          tone="ready"
        />
        <StatChip
          label={patientDashboardCopy.overview.metrics.processing.label}
          value={processingCount}
          icon={Activity}
          tone="processing"
        />
      </div>

      {documentCount === 0 && (
        <p className="relative mt-4 rounded-xl border border-dashed border-sage-300/80 bg-background/60 px-4 py-3 text-sm leading-relaxed text-muted-foreground dark:border-sage-700">
          {patientDashboardCopy.patient.documents.withoutCount}{" "}
          <button
            type="button"
            className="font-medium text-primary hover:underline"
            onClick={() => setTab("upload")}
          >
            {patientDashboardCopy.overview.quickActions.upload.label}
          </button>
        </p>
      )}
    </section>
  );
}
