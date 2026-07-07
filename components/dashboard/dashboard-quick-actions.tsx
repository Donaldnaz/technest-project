import Link from "next/link";
import { ArrowRight, FileUp } from "lucide-react";

import { patientDashboardCopy } from "@/lib/copy/patient/dashboard";
import { patientTabHref } from "@/lib/navigation/patient-nav";
import { cn } from "@/lib/utils";

type DashboardQuickActionsProps = {
  profileId?: string;
  embedded?: boolean;
};

export function DashboardQuickActions({
  profileId,
  embedded = false,
}: DashboardQuickActionsProps) {
  if (!profileId) {
    return null;
  }

  const uploadHref = patientTabHref(profileId, "upload");
  const { upload } = patientDashboardCopy.overview.quickActions;

  return (
    <section
      className={cn(
        embedded
          ? "border-t border-border/50 bg-card/40 px-6 py-7 md:px-10 md:py-8 dark:bg-card/20"
          : "health-card rounded-3xl p-6 md:p-8",
      )}
    >
      <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between lg:gap-10">
        <div className="min-w-0 space-y-1.5 lg:max-w-sm">
          <h2 className="font-heading text-lg font-semibold tracking-tight md:text-xl">
            {patientDashboardCopy.overview.quickActions.title}
          </h2>
          <p className="text-sm leading-relaxed text-muted-foreground md:text-[0.9375rem]">
            {patientDashboardCopy.overview.quickActions.description}
          </p>
        </div>

        <Link
          href={uploadHref}
          className="group flex w-full items-center gap-4 rounded-2xl border border-border/60 bg-background/80 p-4 shadow-sm transition-all hover:border-primary/25 hover:bg-background hover:shadow-md md:p-5 lg:max-w-md lg:shrink-0 dark:bg-background/50"
        >
          <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-sage-100 text-sage-800 transition-colors group-hover:bg-sage-200/80 dark:bg-sage-950/50 dark:text-sage-200 dark:group-hover:bg-sage-900/60">
            <FileUp className="size-5" aria-hidden />
          </span>
          <span className="min-w-0 flex-1 text-left">
            <span className="block text-sm font-semibold md:text-base">
              {upload.label}
            </span>
            <span className="mt-0.5 block text-xs leading-relaxed text-muted-foreground md:text-sm">
              {upload.hint}
            </span>
          </span>
          <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-muted/60 text-muted-foreground transition-all group-hover:bg-primary/10 group-hover:text-primary">
            <ArrowRight
              className="size-4 transition-transform group-hover:translate-x-0.5"
              aria-hidden
            />
          </span>
        </Link>
      </div>
    </section>
  );
}
