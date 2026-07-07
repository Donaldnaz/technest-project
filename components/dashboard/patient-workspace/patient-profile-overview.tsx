import {
  Building2,
  Calendar,
  FileDigit,
  Globe2,
  MapPin,
  NotebookPen,
  Stethoscope,
  UserRound,
} from "lucide-react";

import { patientDashboardCopy } from "@/lib/copy/patient/dashboard";
import { patientOnboardingCopy } from "@/lib/copy/patient/onboarding";
import type { Patient } from "@/lib/db/schema";
import { cn } from "@/lib/utils";

type ProfileFieldProps = {
  icon: typeof UserRound;
  label: string;
  value: string;
  className?: string;
};

function ProfileField({ icon: Icon, label, value, className }: ProfileFieldProps) {
  return (
    <div
      className={cn(
        "rounded-xl border border-border/50 bg-muted/20 p-4 transition-colors hover:bg-muted/30",
        className,
      )}
    >
      <dt className="flex items-center gap-2 text-xs font-medium uppercase tracking-wide text-muted-foreground">
        <Icon className="size-3.5 shrink-0" aria-hidden />
        {label}
      </dt>
      <dd className="mt-2 whitespace-pre-wrap text-sm font-medium leading-snug text-foreground">
        {value}
      </dd>
    </div>
  );
}

type PatientProfileOverviewProps = {
  patient: Patient;
};

export function PatientProfileOverview({ patient }: PatientProfileOverviewProps) {
  const relationshipLabel =
    patient.relationship === "self"
      ? patientDashboardCopy.patient.profile.relationshipSelf
      : patientDashboardCopy.patient.profile.relationshipOther;

  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-heading text-lg font-semibold">
          {patientDashboardCopy.patient.profile.title}
        </h2>
        <p className="mt-1 text-sm text-muted-foreground">
          {patientDashboardCopy.patient.profile.description}
        </p>
      </div>

      <div className="space-y-4">
        <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          {patientOnboardingCopy.sections.account.title}
        </h3>
        <dl className="grid gap-3 sm:grid-cols-2">
          <ProfileField
            icon={UserRound}
            label={patientOnboardingCopy.sections.relationship.title}
            value={relationshipLabel}
          />
          <ProfileField
            icon={Stethoscope}
            label={patientOnboardingCopy.fields.specialty.label}
            value={patient.healthcareSpecialty}
          />
          <ProfileField
            icon={Calendar}
            label={patientOnboardingCopy.fields.dateOfBirth}
            value={patient.dateOfBirth ?? "—"}
          />
          <ProfileField
            icon={FileDigit}
            label={patientOnboardingCopy.fields.mrn}
            value={patient.medicalRecordNumber ?? "—"}
          />
        </dl>
      </div>

      <div className="space-y-4">
        <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          {patientOnboardingCopy.fields.location.sectionTitle}
        </h3>
        <dl className="grid gap-3 sm:grid-cols-2">
          <ProfileField
            icon={Building2}
            label={patientOnboardingCopy.fields.location.site}
            value={patient.healthcareLocation}
            className="sm:col-span-2"
          />
          <ProfileField
            icon={MapPin}
            label={patientOnboardingCopy.fields.location.city}
            value={patient.city}
          />
          <ProfileField
            icon={MapPin}
            label={patientOnboardingCopy.fields.location.region}
            value={patient.healthQuarter}
          />
          <ProfileField
            icon={Globe2}
            label={`${patientOnboardingCopy.fields.location.state} / ${patientOnboardingCopy.fields.location.country}`}
            value={`${patient.state}, ${patient.country}`}
            className="sm:col-span-2"
          />
        </dl>
      </div>

      {patient.additionalNotes ? (
        <div className="space-y-4">
          <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Notes
          </h3>
          <ProfileField
            icon={NotebookPen}
            label={patientOnboardingCopy.fields.notes}
            value={patient.additionalNotes}
            className="sm:col-span-2"
          />
        </div>
      ) : null}
    </div>
  );
}
