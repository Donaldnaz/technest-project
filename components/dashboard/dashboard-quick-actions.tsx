import Link from "next/link";
import { ArrowRight, FileUp, Share2 } from "lucide-react";

import { profilePath } from "@/lib/routes/profile";

type DashboardQuickActionsProps = {
  profileId?: string;
};

export function DashboardQuickActions({ profileId }: DashboardQuickActionsProps) {
  if (!profileId) {
    return null;
  }

  const profileHref = profilePath(profileId);
  const shareHref = `${profileHref}#share`;

  return (
    <section className="health-card rounded-3xl p-5 md:p-6">
      <h2 className="font-heading text-lg font-semibold">Quick actions</h2>
      <p className="mt-1 text-sm text-muted-foreground">
        Upload and manage your health records
      </p>

      <div className="mt-5 grid gap-3 sm:grid-cols-2">
        <Link
          href={profileHref}
          className="group flex items-center gap-3 rounded-2xl border border-border/60 bg-oat-50/50 p-4 transition-colors hover:border-sage-300 hover:bg-sage-50/50 dark:bg-charcoal-950/20 dark:hover:bg-sage-950/20"
        >
          <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-sage-100 text-sage-800 dark:bg-sage-950/50 dark:text-sage-200">
            <FileUp className="size-5" aria-hidden />
          </span>
          <span className="min-w-0 flex-1">
            <span className="block font-medium">Upload records</span>
            <span className="text-xs text-muted-foreground">
              Add lab reports or scans
            </span>
          </span>
          <ArrowRight
            className="size-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5"
            aria-hidden
          />
        </Link>

        <Link
          href={shareHref}
          className="group flex items-center gap-3 rounded-2xl border border-border/60 bg-oat-50/50 p-4 transition-colors hover:border-sage-300 hover:bg-sage-50/50 dark:bg-charcoal-950/20"
        >
          <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-teal-100 text-teal-800 dark:bg-teal-950/50 dark:text-teal-200">
            <Share2 className="size-5" aria-hidden />
          </span>
          <span className="min-w-0 flex-1">
            <span className="block font-medium">Share with provider</span>
            <span className="text-xs text-muted-foreground">
              Send records to your doctor
            </span>
          </span>
          <ArrowRight className="size-4 shrink-0 text-muted-foreground" aria-hidden />
        </Link>
      </div>
    </section>
  );
}
