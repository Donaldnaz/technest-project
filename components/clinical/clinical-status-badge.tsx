import {
  AlertCircle,
  CheckCircle2,
  CircleDot,
  Clock,
  Inbox,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { patientStatusCopy } from "@/lib/copy/patient/status";
import { statusCopy } from "@/lib/copy/status";
import { cn } from "@/lib/utils";

export type ClinicalStatus =
  | "urgent"
  | "processing"
  | "validated"
  | "received"
  | "failed";

type StatusAudience = "patient" | "clinical";

function getStatusLabels(audience: StatusAudience) {
  if (audience === "patient") {
    return patientStatusCopy;
  }
  return statusCopy;
}

const statusVariants: Record<
  ClinicalStatus,
  {
    variant: "destructive" | "secondary" | "outline" | "default";
    icon: typeof CircleDot;
    className?: string;
  }
> = {
  urgent: {
    variant: "destructive",
    icon: AlertCircle,
  },
  failed: {
    variant: "destructive",
    icon: AlertCircle,
  },
  processing: {
    variant: "secondary",
    icon: Clock,
    className:
      "bg-amber-100 text-amber-900 dark:bg-amber-950/40 dark:text-amber-200",
  },
  validated: {
    variant: "secondary",
    icon: CheckCircle2,
    className:
      "bg-sage-100 text-sage-800 dark:bg-sage-950/50 dark:text-sage-200",
  },
  received: {
    variant: "outline",
    icon: Inbox,
    className: "text-muted-foreground",
  },
};

export function mapDocumentStatusToClinical(
  status: "uploaded" | "processing" | "ready" | "failed",
): ClinicalStatus {
  switch (status) {
    case "failed":
      return "urgent";
    case "processing":
      return "processing";
    case "ready":
      return "validated";
    case "uploaded":
    default:
      return "received";
  }
}

type ClinicalStatusBadgeProps = {
  status: ClinicalStatus;
  audience?: StatusAudience;
  className?: string;
};

export function ClinicalStatusBadge({
  status,
  audience = "patient",
  className,
}: ClinicalStatusBadgeProps) {
  const labels = getStatusLabels(audience);
  const config = statusVariants[status];
  const labelConfig = labels[status];
  const Icon = config.icon;

  return (
    <Badge
      variant={config.variant}
      className={cn("gap-1.5 font-medium", config.className, className)}
    >
      <CircleDot className="size-2 fill-current" aria-hidden />
      <Icon className="size-3" aria-hidden />
      <span>{labelConfig.label}</span>
      <span className="sr-only">{labelConfig.description}</span>
    </Badge>
  );
}
