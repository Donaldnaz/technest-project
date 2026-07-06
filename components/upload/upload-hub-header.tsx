import { ShieldCheck } from "lucide-react";

import { getFirstName, getTimeOfDayGreeting } from "@/lib/health/greeting";

type UploadHubHeaderProps = {
  userName?: string | null;
  patientFirstName: string;
  patientRelationship: "self" | "other";
};

export function UploadHubHeader({
  userName,
  patientFirstName,
  patientRelationship,
}: UploadHubHeaderProps) {
  const greeting = getTimeOfDayGreeting();
  const firstName = getFirstName(userName);
  const recordsFor =
    patientRelationship === "self"
      ? "your records"
      : `${patientFirstName}'s records`;

  return (
    <header className="space-y-3 text-center lg:text-left">
      <p className="text-sm font-medium text-muted-foreground">Secure upload</p>
      <h2 className="font-heading text-2xl font-semibold tracking-tight text-foreground">
        {greeting}, {firstName}
      </h2>
      <p className="text-sm leading-relaxed text-muted-foreground">
        Add {recordsFor}. Drag files in, label them, and submit when ready.
      </p>
      <div className="inline-flex items-center gap-2 rounded-full border border-sage-200/80 bg-sage-100/60 px-3 py-1.5 text-xs font-medium text-sage-800 dark:border-sage-800 dark:bg-sage-950/40 dark:text-sage-200">
        <ShieldCheck className="size-4 shrink-0" aria-hidden />
        Private & secure upload
      </div>
    </header>
  );
}
