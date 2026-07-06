import { notFound } from "next/navigation";
import type { Metadata } from "next";

import { requireSession } from "@/lib/auth/session";
import {
  countDocumentsForPatient,
  listDocumentsForPatient,
} from "@/lib/db/queries/documents";
import { getPatientById } from "@/lib/db/queries/patients";
import { DashboardBackButton } from "@/components/dashboard/dashboard-back-button";
import { DashboardPageHeader } from "@/components/dashboard/dashboard-page-header";
import { HealthSection } from "@/components/dashboard/health-section";
import { UploadHub } from "@/components/upload/upload-hub";
import { DocumentsList } from "@/components/documents/documents-list";
import { ShareWithProvider } from "@/components/documents/share-with-provider";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const session = await requireSession();
  const userId = session.user.id;
  const patient = await getPatientById(userId, id);

  if (!patient) {
    return { title: "Profile not found" };
  }

  return {
    title: `${patient.firstName} ${patient.lastName}`,
  };
}

export default async function PatientDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const session = await requireSession();
  const userId = session.user.id;
  const patient = await getPatientById(userId, id);

  if (!patient) {
    notFound();
  }

  const [documents, documentCount] = await Promise.all([
    listDocumentsForPatient(userId, id),
    countDocumentsForPatient(userId, id),
  ]);

  const isFirstUpload = documentCount === 0;

  return (
    <div className="health-page">
      <DashboardPageHeader
        title={`${patient.firstName} ${patient.lastName}`}
        description="Upload health documents and records for your care team."
        actions={
          <DashboardBackButton
            href="/dashboard"
            label="Back to overview"
          />
        }
      />

      <HealthSection
        title="Your profile"
        description="Health information on file with iCare"
      >
        <dl className="grid gap-x-8 gap-y-5 sm:grid-cols-2">
          <div>
            <dt className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
              Relationship
            </dt>
            <dd className="mt-1 text-base font-medium capitalize">
              {patient.relationship === "self"
                ? "Myself"
                : "Someone I care for"}
            </dd>
          </div>
          <div>
            <dt className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
              Healthcare specialty
            </dt>
            <dd className="mt-1 text-base font-medium">
              {patient.healthcareSpecialty}
            </dd>
          </div>
          <div>
            <dt className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
              Date of birth
            </dt>
            <dd className="mt-1 text-base font-medium">
              {patient.dateOfBirth ?? "—"}
            </dd>
          </div>
          <div>
            <dt className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
              Medical record number
            </dt>
            <dd className="mt-1 text-base font-medium">
              {patient.medicalRecordNumber ?? "—"}
            </dd>
          </div>
          <div className="sm:col-span-2">
            <dt className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
              Healthcare location
            </dt>
            <dd className="mt-1 text-base font-medium">
              {patient.healthcareLocation}
            </dd>
          </div>
          <div>
            <dt className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
              City
            </dt>
            <dd className="mt-1 text-base font-medium">{patient.city}</dd>
          </div>
          <div>
            <dt className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
              Health quarter
            </dt>
            <dd className="mt-1 text-base font-medium">
              {patient.healthQuarter}
            </dd>
          </div>
          <div>
            <dt className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
              State / country
            </dt>
            <dd className="mt-1 text-base font-medium">
              {patient.state}, {patient.country}
            </dd>
          </div>
          {patient.additionalNotes && (
            <div className="sm:col-span-2">
              <dt className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                Additional notes
              </dt>
              <dd className="mt-1 text-base font-medium whitespace-pre-wrap">
                {patient.additionalNotes}
              </dd>
            </div>
          )}
        </dl>
      </HealthSection>

      <UploadHub
        patientId={patient.id}
        userName={session.user.name}
        patientFirstName={patient.firstName}
        patientRelationship={patient.relationship}
        isFirstUpload={isFirstUpload}
      />

      <HealthSection
        title="Medical records"
        description={
          documents.length > 0
            ? `${documents.length} file${documents.length === 1 ? "" : "s"} uploaded to your account — summaries appear after review`
            : "Summaries appear after we review each upload"
        }
      >
        <DocumentsList documents={documents} />
      </HealthSection>

      <HealthSection
        id="share"
        title="Share with provider"
        description={
          patient.relationship === "self"
            ? "Tell us which provider should receive your records — our care team will take care of the rest."
            : `Tell us which provider should receive ${patient.firstName}'s records — our care team will take care of the rest.`
        }
      >
        <ShareWithProvider
          patientId={patient.id}
          patientName={`${patient.firstName} ${patient.lastName}`}
          patientRelationship={patient.relationship}
        />
      </HealthSection>
    </div>
  );
}
