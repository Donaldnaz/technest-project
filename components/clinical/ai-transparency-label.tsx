import { Sparkles } from "lucide-react";

import { aiCopy } from "@/lib/copy/ai";
import { cn } from "@/lib/utils";

type AiTransparencyVariant = "summary" | "extraction" | "attention";

const variantLabels: Record<AiTransparencyVariant, string> = {
  summary: aiCopy.labels.genericSummary,
  extraction: aiCopy.labels.flashExtraction,
  attention: aiCopy.labels.attention,
};

type AiTransparencyLabelProps = {
  variant?: AiTransparencyVariant;
  className?: string;
};

export function AiTransparencyLabel({
  variant = "summary",
  className,
}: AiTransparencyLabelProps) {
  return (
    <p
      className={cn(
        "inline-flex items-center gap-1.5 text-xs font-medium text-amber-900 dark:text-amber-200",
        className,
      )}
    >
      <Sparkles className="size-3 shrink-0" aria-hidden />
      <span>{variantLabels[variant]}</span>
    </p>
  );
}

type AiSummaryBlockProps = {
  summary: string;
  attentionNote?: string | null;
  className?: string;
};

export function AiSummaryBlock({
  summary,
  attentionNote,
  className,
}: AiSummaryBlockProps) {
  return (
    <div className={cn("space-y-2 rounded-lg border border-border bg-muted/30 p-3", className)}>
      <AiTransparencyLabel variant="summary" />
      <p className="text-sm leading-relaxed text-foreground">{summary}</p>
      {attentionNote ? (
        <div className="space-y-1 border-t border-border/60 pt-2">
          <AiTransparencyLabel variant="attention" />
          <p className="text-xs leading-relaxed text-amber-800 dark:text-amber-200">
            {attentionNote}
          </p>
        </div>
      ) : null}
    </div>
  );
}
