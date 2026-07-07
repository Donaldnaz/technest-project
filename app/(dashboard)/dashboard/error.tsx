"use client";

import { Button } from "@/components/ui/button";
import { patientDashboardCopy } from "@/lib/copy/patient/dashboard";

export default function DashboardError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="flex flex-col items-start gap-4 rounded-lg border border-destructive/30 bg-destructive/5 p-6">
      <h2 className="text-lg font-semibold">
        {patientDashboardCopy.errors.pageTitle}
      </h2>
      <p className="text-sm text-muted-foreground">
        {patientDashboardCopy.errors.pageDescription}
      </p>
      <Button onClick={reset} variant="outline">
        {patientDashboardCopy.errors.retry}
      </Button>
    </div>
  );
}
