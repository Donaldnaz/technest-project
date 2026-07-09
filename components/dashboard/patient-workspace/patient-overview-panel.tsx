"use client";

import { ArrowRight, FileUp } from "lucide-react";

import {
  CareTimeline,
  RECENT_ACTIVITY_PREVIEW_LIMIT,
} from "@/components/health/care-timeline";
import { ShareWithProvider } from "@/components/documents/share-with-provider";
import { patientDashboardCopy } from "@/lib/copy/patient/dashboard";
import type { DocumentWithExtraction } from "@/lib/db/queries/documents";
import type { Patient } from "@/lib/db/schema";

import { PatientProfileOverview } from "./patient-profile-overview";
import { usePatientWorkspaceTab } from "./patient-workspace-tabs";

type PatientOverviewPanelProps = {
  patient: Patient;
  documents: DocumentWithExtraction[];
};

export function PatientOverviewPanel({
  patient,
  documents,
}: PatientOverviewPanelProps) {
  const { setTab } = usePatientWorkspaceTab();
  const hasMoreActivity = documents.length > RECENT_ACTIVITY_PREVIEW_LIMIT;
  const patientName = `${patient.firstName} ${patient.lastName}`;

  return (
    <div className="flex flex-col gap-4">
      <div className="grid gap-4 lg:grid-cols-12">
      <div className="clinical-card p-4 md:p-5 lg:col-span-7">
        <PatientProfileOverview patient={patient} />
      </div>

      <aside className="flex flex-col gap-4 lg:col-span-5">
        <div className="clinical-card p-4 md:p-5">
          <h2 className="font-heading text-base font-semibold">
            {patientDashboardCopy.overview.quickActions.title}
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            {patientDashboardCopy.overview.quickActions.description}
          </p>
          <ul className="mt-4 space-y-2">
            <li>
              <button
                type="button"
                onClick={() => setTab("upload")}
                className="group flex w-full items-center gap-3 rounded-xl border border-primary/20 bg-primary/5 p-3 text-left transition-colors hover:border-primary/40 hover:bg-primary/10"
              >
                <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary/15 text-primary">
                  <FileUp className="size-4" aria-hidden />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block text-sm font-medium">
                    {patientDashboardCopy.overview.quickActions.upload.label}
                  </span>
                  <span className="block truncate text-xs text-muted-foreground">
                    {patientDashboardCopy.overview.quickActions.upload.hint}
                  </span>
                </span>
                <ArrowRight
                  className="size-4 shrink-0 text-primary transition-transform group-hover:translate-x-0.5"
                  aria-hidden
                />
              </button>
            </li>
          </ul>
        </div>

        <div className="clinical-card p-4 md:p-5">
          <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
            <div>
              <h2 className="font-heading text-base font-semibold">
                {patientDashboardCopy.patient.timeline.title}
              </h2>
              <p className="mt-1 text-sm text-muted-foreground">
                {patientDashboardCopy.patient.timeline.description}
              </p>
            </div>
            {(hasMoreActivity || documents.length > 0) && (
              <button
                type="button"
                onClick={() => setTab("timeline")}
                className="inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline"
              >
                {patientDashboardCopy.patient.timeline.viewAll}
                <ArrowRight className="size-3.5" aria-hidden />
              </button>
            )}
          </div>
          <CareTimeline
            documents={documents}
            variant="clinical"
            limit={RECENT_ACTIVITY_PREVIEW_LIMIT}
            showHeader={false}
          />
        </div>
      </aside>
      </div>

      <ShareWithProvider
        patientId={patient.id}
        patientName={patientName}
        patientRelationship={patient.relationship}
      />
    </div>
  );
}
