import { Lock } from "lucide-react";

import {
  patientAiCopy,
  type PatientAiNoticeVariant,
} from "@/lib/copy/patient/ai";
import { cn } from "@/lib/utils";

const variantMessages: Record<PatientAiNoticeVariant, string> = {
  processing: patientAiCopy.processing,
  summaryReady: patientAiCopy.summaryReady,
  needsReview: patientAiCopy.needsReview,
};

type PatientAiNoticeProps = {
  variant?: PatientAiNoticeVariant;
  className?: string;
  showLockIcon?: boolean;
};

export function PatientAiNotice({
  variant = "processing",
  className,
  showLockIcon = false,
}: PatientAiNoticeProps) {
  return (
    <p
      className={cn(
        "inline-flex items-start gap-1.5 text-xs leading-relaxed text-muted-foreground",
        className,
      )}
    >
      {showLockIcon ? (
        <Lock className="mt-0.5 size-3 shrink-0" aria-hidden />
      ) : null}
      <span>{variantMessages[variant]}</span>
    </p>
  );
}
