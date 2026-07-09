"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { RefreshCw } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";

type GenerateSummaryButtonProps = {
  documentId: string;
  label?: string;
  className?: string;
};

export function GenerateSummaryButton({
  documentId,
  label = "Generate plain-language summary",
  className,
}: GenerateSummaryButtonProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  async function handleClick() {
    setIsLoading(true);

    try {
      const response = await fetch(
        `/api/documents/${documentId}/generate-summary`,
        { method: "POST" },
      );
      const rawText = await response.text();
      let data: { error?: string; ok?: boolean } = {};
      try {
        data = JSON.parse(rawText) as { error?: string; ok?: boolean };
      } catch {
        data = {};
      }

      // #region agent log
      const clientLog = {
        sessionId: "3f90c7",
        runId: "post-fix",
        hypothesisId: "A",
        location: "generate-summary-button.tsx:handleClick",
        message: "generate-summary client response",
        data: {
          documentId,
          status: response.status,
          ok: response.ok,
          contentType: response.headers.get("content-type"),
          bodyPreview: rawText.slice(0, 200),
          parsedError: data.error ?? null,
          parsedOk: data.ok ?? null,
        },
        timestamp: Date.now(),
      };
      console.log("[agent-debug]", clientLog);
      fetch("http://127.0.0.1:7863/ingest/5dd3f215-8ab7-42f7-a6cd-7326877028c0", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Debug-Session-Id": "3f90c7",
        },
        body: JSON.stringify(clientLog),
      }).catch(() => {});
      // #endregion

      if (!response.ok) {
        toast.error(data.error ?? "Could not start summary generation.");
        return;
      }

      toast.success("Summary generation started. Check back in a moment.");
      router.refresh();
    } catch (error) {
      // #region agent log
      fetch("http://127.0.0.1:7863/ingest/5dd3f215-8ab7-42f7-a6cd-7326877028c0", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Debug-Session-Id": "3f90c7",
        },
        body: JSON.stringify({
          sessionId: "3f90c7",
          runId: "pre-fix",
          hypothesisId: "A",
          location: "generate-summary-button.tsx:catch",
          message: "generate-summary client catch",
          data: {
            documentId,
            error: error instanceof Error ? error.message : String(error),
          },
          timestamp: Date.now(),
        }),
      }).catch(() => {});
      // #endregion
      toast.error("Could not start summary generation.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Button
      type="button"
      variant="outline"
      size="sm"
      onClick={handleClick}
      disabled={isLoading}
      className={className}
    >
      <RefreshCw
        className={`mr-1.5 size-3.5 ${isLoading ? "animate-spin" : ""}`}
        aria-hidden
      />
      {isLoading ? "Starting…" : label}
    </Button>
  );
}
