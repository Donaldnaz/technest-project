"use client";

import { Suspense, useMemo } from "react";
import {
  Activity,
  FileUp,
  LayoutGrid,
} from "lucide-react";

import { AppBreadcrumbs } from "@/components/clinical/app-breadcrumbs";
import { CareTimeline } from "@/components/health/care-timeline";
import { UploadSplitPane } from "@/components/upload/upload-split-pane";
import { patientDashboardCopy } from "@/lib/copy/patient/dashboard";
import { patientRecordsHref } from "@/lib/navigation/patient-nav";
import type { DocumentWithExtraction } from "@/lib/db/queries/documents";
import type { Patient } from "@/lib/db/schema";

import { PatientHero } from "./patient-hero";
import { PatientOverviewPanel } from "./patient-overview-panel";
import { PatientWorkspaceTabs } from "./patient-workspace-tabs";

type PatientWorkspaceProps = {
  patient: Patient;
  documents: DocumentWithExtraction[];
  documentCount: number;
  userName?: string | null;
};

function countByStatus(
  documents: DocumentWithExtraction[],
  status: DocumentWithExtraction["status"],
): number {
  return documents.filter((document) => document.status === status).length;
}

function PatientWorkspaceContent({
  patient,
  documents,
  documentCount,
  userName,
}: PatientWorkspaceProps) {
  const patientName = `${patient.firstName} ${patient.lastName}`;
  const patientPath = `/dashboard/patients/${patient.id}`;

  const readyCount = useMemo(
    () => countByStatus(documents, "ready"),
    [documents],
  );
  const processingCount = useMemo(
    () => countByStatus(documents, "processing"),
    [documents],
  );

  const breadcrumbItems = [
    { label: patientDashboardCopy.nav.home, href: "/dashboard" },
    { label: patientDashboardCopy.nav.records, href: patientRecordsHref(patient.id) },
    { label: patientName },
  ];

  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col gap-5 pb-6">
      <AppBreadcrumbs items={breadcrumbItems} showBackIcon />

      <PatientWorkspaceTabs
        patientPath={patientPath}
        documentCount={documentCount}
        tabs={[
          {
            value: "overview",
            ariaLabel: patientDashboardCopy.patient.tabs.overview,
            label: (
              <>
                <LayoutGrid className="size-4" aria-hidden />
                {patientDashboardCopy.patient.tabs.overview}
              </>
            ),
            content: (
              <PatientOverviewPanel
                patient={patient}
                documents={documents}
              />
            ),
          },
          {
            value: "upload",
            ariaLabel: patientDashboardCopy.patient.tabs.upload,
            label: (
              <>
                <FileUp className="size-4" aria-hidden />
                {patientDashboardCopy.patient.tabs.upload}
              </>
            ),
            content: (
              <div className="w-full min-w-0">
                <UploadSplitPane
                  patientId={patient.id}
                  userName={userName}
                  patientFirstName={patient.firstName}
                  patientRelationship={patient.relationship}
                  isFirstUpload={documentCount === 0}
                />
              </div>
            ),
          },
          {
            value: "timeline",
            ariaLabel: patientDashboardCopy.patient.tabs.timeline,
            badge: documentCount > 0 ? documentCount : undefined,
            label: (
              <>
                <Activity className="size-4" aria-hidden />
                {patientDashboardCopy.patient.tabs.timeline}
              </>
            ),
            content: (
              <div className="clinical-card p-4 md:p-5">
                <div className="mb-4">
                  <h2 className="font-heading text-lg font-semibold">
                    {patientDashboardCopy.patient.timeline.fullTitle}
                  </h2>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {patientDashboardCopy.patient.timeline.fullDescription}
                  </p>
                </div>
                <CareTimeline
                  documents={documents}
                  variant="clinical"
                  showHeader={false}
                />
              </div>
            ),
          },
        ]}
      >
        <PatientHero
          patient={patient}
          documentCount={documentCount}
          readyCount={readyCount}
          processingCount={processingCount}
        />
      </PatientWorkspaceTabs>
    </div>
  );
}

export function PatientWorkspace(props: PatientWorkspaceProps) {
  return (
    <Suspense
      fallback={
        <div className="mx-auto max-w-6xl px-4 py-8 text-sm text-muted-foreground">
          {patientDashboardCopy.patient.loading}
        </div>
      }
    >
      <PatientWorkspaceContent {...props} />
    </Suspense>
  );
}
