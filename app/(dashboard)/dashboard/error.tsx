"use client";

import { Button } from "@/components/ui/button";

export default function DashboardError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="flex flex-col items-start gap-4 rounded-lg border border-destructive/30 bg-destructive/5 p-6">
      <h2 className="text-lg font-semibold">Something went wrong</h2>
      <p className="text-sm text-muted-foreground">
        We could not load this page. Please try again.
      </p>
      <Button onClick={reset} variant="outline">
        Retry
      </Button>
    </div>
  );
}
