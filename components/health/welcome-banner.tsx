import Link from "next/link";
import { ArrowRight, FileUp } from "lucide-react";

import { patientDashboardCopy } from "@/lib/copy/patient/dashboard";
import {
  getFirstName,
  getGreetingGradient,
  getTimeOfDayGreeting,
} from "@/lib/health/greeting";
import { profilePath } from "@/lib/routes/profile";
import { cn } from "@/lib/utils";

type WelcomeBannerProps = {
  userName?: string | null;
  profileId?: string;
  documentCount?: number;
};

export function WelcomeBanner({
  userName,
  profileId,
  documentCount = 0,
}: WelcomeBannerProps) {
  const greeting = getTimeOfDayGreeting();
  const firstName = getFirstName(userName);
  const gradient = getGreetingGradient();
  const hasDocuments = documentCount > 0;
  const { welcome } = patientDashboardCopy;

  return (
    <section
      className={cn(
        "health-card relative overflow-hidden rounded-3xl shadow-sm",
        `bg-gradient-to-br ${gradient}`,
      )}
    >
      <div className="relative flex flex-col gap-6 px-7 py-8 md:flex-row md:items-end md:justify-between md:gap-8 md:px-10 md:py-10">
        <div className="min-w-0 max-w-2xl space-y-2">
          <h1 className="break-words font-heading text-3xl font-semibold tracking-tight text-foreground md:text-[2.125rem] md:leading-tight lg:text-4xl">
            {greeting}, {firstName}
          </h1>
          <p className="text-sm leading-relaxed text-muted-foreground md:text-base md:leading-7">
            {hasDocuments
              ? welcome.withDocuments(documentCount)
              : welcome.emptyBody}
          </p>
        </div>

        {profileId ? (
          <Link
            href={profilePath(profileId)}
            className="group flex w-full shrink-0 items-center gap-3 rounded-2xl border border-primary/25 bg-background/90 px-5 py-4 shadow-sm backdrop-blur-sm transition-colors hover:border-primary/40 hover:bg-background md:w-auto md:min-w-[15rem]"
          >
            <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-primary/12 text-primary">
              <FileUp className="size-5" aria-hidden />
            </span>
            <span className="min-w-0 flex-1">
              <span className="block font-medium text-foreground">
                {welcome.primaryAction.label}
              </span>
              <span className="text-xs text-muted-foreground">
                {welcome.primaryAction.hint}
              </span>
            </span>
            <ArrowRight
              className="size-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:text-primary"
              aria-hidden
            />
          </Link>
        ) : null}
      </div>

      <div
        className="pointer-events-none absolute -right-10 -top-10 -z-10 size-44 rounded-full bg-primary/10 blur-3xl"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -bottom-12 left-1/4 -z-10 size-36 rounded-full bg-accent/25 blur-3xl"
        aria-hidden
      />
    </section>
  );
}
