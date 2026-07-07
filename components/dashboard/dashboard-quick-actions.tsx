import Link from "next/link";
import { ArrowRight, FileUp, Share2 } from "lucide-react";
import { patientDashboardCopy } from "@/lib/copy/patient/dashboard";
import { patientTabHref } from "@/lib/navigation/patient-nav";

type DashboardQuickActionsProps = {
  profileId?: string;
};

export function DashboardQuickActions({ profileId }: DashboardQuickActionsProps) {
  if (!profileId) {
    return null;
  }

  const uploadHref = patientTabHref(profileId, "upload");
  const shareHref = patientTabHref(profileId, "share");

  return (
    <section className="health-card rounded-3xl p-6 md:p-8">
      <div className="space-y-2">
        <h2 className="font-heading text-lg font-semibold md:text-xl">
          {patientDashboardCopy.overview.quickActions.title}
        </h2>
        <p className="max-w-2xl text-sm leading-relaxed text-muted-foreground md:text-base">
          {patientDashboardCopy.overview.quickActions.description}
        </p>
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <Link
          href={uploadHref}
          className="group flex items-center gap-4 rounded-2xl border border-border/60 bg-oat-50/50 p-5 transition-colors hover:border-sage-300 hover:bg-sage-50/50 dark:bg-charcoal-950/20 dark:hover:bg-sage-950/20"
        >
          <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-sage-100 text-sage-800 dark:bg-sage-950/50 dark:text-sage-200">
            <FileUp className="size-5" aria-hidden />
          </span>
          <span className="min-w-0 flex-1">
            <span className="block font-medium">
              {patientDashboardCopy.overview.quickActions.upload.label}
            </span>
            <span className="text-xs text-muted-foreground">
              {patientDashboardCopy.overview.quickActions.upload.hint}
            </span>
          </span>
          <ArrowRight
            className="size-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5"
            aria-hidden
          />
        </Link>

        <Link
          href={shareHref}
          className="group flex items-center gap-4 rounded-2xl border border-border/60 bg-oat-50/50 p-5 transition-colors hover:border-sage-300 hover:bg-sage-50/50 dark:bg-charcoal-950/20"
        >
          <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-teal-100 text-teal-800 dark:bg-teal-950/50 dark:text-teal-200">
            <Share2 className="size-5" aria-hidden />
          </span>
          <span className="min-w-0 flex-1">
            <span className="block font-medium">
              {patientDashboardCopy.overview.quickActions.share.label}
            </span>
            <span className="text-xs text-muted-foreground">
              {patientDashboardCopy.overview.quickActions.share.hint}
            </span>
          </span>
          <ArrowRight className="size-4 shrink-0 text-muted-foreground" aria-hidden />
        </Link>
      </div>
    </section>
  );
}
