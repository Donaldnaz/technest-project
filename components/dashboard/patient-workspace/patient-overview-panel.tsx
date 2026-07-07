"use client";

import { ArrowRight, Clock3, FileUp, Share2 } from "lucide-react";

import { CareTimeline } from "@/components/health/care-timeline";
import { patientDashboardCopy } from "@/lib/copy/patient/dashboard";
import { usePatientWorkspaceTab } from "./patient-workspace-tabs";
import type { DocumentWithExtraction } from "@/lib/db/queries/documents";
import type { Patient } from "@/lib/db/schema";

import { PatientProfileOverview } from "./patient-profile-overview";

type PatientOverviewPanelProps = {
  patient: Patient;
  documents: DocumentWithExtraction[];
};

export function PatientOverviewPanel({
  patient,
  documents,
}: PatientOverviewPanelProps) {
  const { setTab } = usePatientWorkspaceTab();

  const quickLinks = [
    {
      tab: "upload" as const,
      label: patientDashboardCopy.overview.quickActions.upload.label,
      hint: patientDashboardCopy.overview.quickActions.upload.hint,
      icon: FileUp,
    },
    {
      tab: "share" as const,
      label: patientDashboardCopy.overview.quickActions.share.label,
      hint: patientDashboardCopy.overview.quickActions.share.hint,
      icon: Share2,
    },
    {
      tab: "documents" as const,
      label: patientDashboardCopy.patient.tabs.documents,
      hint: patientDashboardCopy.patient.documents.previewHint,
      icon: Clock3,
    },
  ];

  return (
    <div className="grid gap-4 xl:grid-cols-12">
      <div className="clinical-card p-4 md:p-5 xl:col-span-7">
        <PatientProfileOverview patient={patient} />
      </div>

      <aside className="space-y-4 xl:col-span-5">
        <div className="clinical-card p-4 md:p-5">
          <h2 className="font-heading text-base font-semibold">
            {patientDashboardCopy.overview.quickActions.title}
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            {patientDashboardCopy.overview.quickActions.description}
          </p>
          <ul className="mt-4 space-y-2">
            {quickLinks.map((link) => (
              <li key={link.tab}>
                <button
                  type="button"
                  onClick={() => setTab(link.tab)}
                  className="group flex w-full items-center gap-3 rounded-xl border border-border/60 bg-background/50 p-3 text-left transition-colors hover:border-primary/30 hover:bg-muted/40"
                >
                  <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <link.icon className="size-4" aria-hidden />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block text-sm font-medium">{link.label}</span>
                    <span className="block truncate text-xs text-muted-foreground">
                      {link.hint}
                    </span>
                  </span>
                  <ArrowRight
                    className="size-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5"
                    aria-hidden
                  />
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div className="clinical-card overflow-hidden p-4 md:p-5">
          <div className="mb-4">
            <h2 className="font-heading text-base font-semibold">
              {patientDashboardCopy.patient.timeline.title}
            </h2>
            <p className="mt-1 text-sm text-muted-foreground">
              {patientDashboardCopy.patient.timeline.description}
            </p>
          </div>
          <CareTimeline documents={documents} variant="clinical" />
        </div>
      </aside>
    </div>
  );
}
