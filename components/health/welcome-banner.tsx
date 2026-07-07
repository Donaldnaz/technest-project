import { FolderOpen } from "lucide-react";

import {
  getFirstName,
  getGreetingGradient,
  getTimeOfDayGreeting,
} from "@/lib/health/greeting";
import { patientDashboardCopy } from "@/lib/copy/patient/dashboard";
import { cn } from "@/lib/utils";

type WelcomeBannerProps = {
  userName?: string | null;
  documentCount?: number;
  embedded?: boolean;
};

export function WelcomeBanner({
  userName,
  documentCount = 0,
  embedded = false,
}: WelcomeBannerProps) {
  const greeting = getTimeOfDayGreeting();
  const firstName = getFirstName(userName);
  const gradient = getGreetingGradient();
  const hasDocuments = documentCount > 0;

  return (
    <section
      className={cn(
        "relative overflow-hidden",
        embedded
          ? "px-6 py-8 md:px-10 md:py-10"
          : "health-card rounded-3xl p-7 shadow-sm md:p-10",
        `bg-gradient-to-br ${gradient}`,
      )}
    >
      <div className="relative z-10 flex flex-col gap-6 md:flex-row md:items-center md:justify-between md:gap-10">
        <div className="min-w-0 space-y-3">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground/90">
            {patientDashboardCopy.welcome.eyebrow}
          </p>
          <h1 className="font-heading text-3xl font-semibold tracking-tight text-foreground md:text-[2.125rem] md:leading-tight lg:text-4xl">
            {greeting}, {firstName}
          </h1>
          <p className="max-w-xl text-sm leading-relaxed text-muted-foreground md:text-base md:leading-7">
            {hasDocuments
              ? patientDashboardCopy.welcome.withDocuments(documentCount)
              : patientDashboardCopy.welcome.emptyBody}
          </p>
        </div>

        {hasDocuments ? (
          <div className="flex shrink-0 items-center gap-3 self-start rounded-2xl border border-border/50 bg-card/70 px-4 py-3 backdrop-blur-sm md:self-center dark:bg-card/40">
            <div className="flex size-10 items-center justify-center rounded-xl bg-primary/12 text-primary">
              <FolderOpen className="size-5" aria-hidden />
            </div>
            <div>
              <p className="font-heading text-2xl font-semibold leading-none tracking-tight">
                {documentCount}
              </p>
              <p className="mt-1 text-xs font-medium text-muted-foreground">
                {documentCount === 1 ? "document saved" : "documents saved"}
              </p>
            </div>
          </div>
        ) : null}
      </div>

      <div
        className="pointer-events-none absolute -right-10 -top-10 size-44 rounded-full bg-primary/10 blur-3xl"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -bottom-12 left-1/4 size-36 rounded-full bg-accent/25 blur-3xl"
        aria-hidden
      />
    </section>
  );
}
