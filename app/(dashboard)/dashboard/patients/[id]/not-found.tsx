import { DashboardBackButton } from "@/components/dashboard/dashboard-back-button";

export default function PatientNotFound() {
  return (
    <div className="flex flex-col items-start gap-4 rounded-lg border p-6">
      <DashboardBackButton
        href="/dashboard"
        label="Back to overview"
      />
      <h2 className="text-lg font-semibold">Profile not found</h2>
      <p className="text-sm text-muted-foreground">
        This profile does not exist or is not available in your account.
      </p>
    </div>
  );
}
