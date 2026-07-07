import { DashboardBackButton } from "@/components/dashboard/dashboard-back-button";
import { patientDashboardCopy } from "@/lib/copy/patient/dashboard";

export default function PatientNotFound() {
  return (
    <div className="flex flex-col items-start gap-4 rounded-lg border p-6">
      <DashboardBackButton
        href="/dashboard"
        label={patientDashboardCopy.errors.backToOverview}
      />
      <h2 className="text-lg font-semibold">
        {patientDashboardCopy.errors.notFoundTitle}
      </h2>
      <p className="text-sm text-muted-foreground">
        {patientDashboardCopy.errors.notFoundDescription}
      </p>
    </div>
  );
}
