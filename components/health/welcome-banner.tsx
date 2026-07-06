import {
  getFirstName,
  getGreetingGradient,
  getTimeOfDayGreeting,
} from "@/lib/health/greeting";
import { profilePath } from "@/lib/routes/profile";
import { LinkButton } from "@/components/ui/link-button";

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

  return (
    <section
      className={`health-card relative overflow-hidden rounded-3xl bg-gradient-to-br ${gradient} p-6 shadow-sm md:p-8`}
    >
      <div className="relative z-10 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="space-y-2">
          <p className="text-sm font-medium text-muted-foreground">
            Your health records
          </p>
          <h1 className="font-heading text-3xl font-semibold tracking-tight md:text-4xl">
            {greeting}, {firstName}
          </h1>
          <p className="max-w-lg text-base leading-relaxed text-muted-foreground">
            Upload your lab reports and scans in one secure place. We&apos;ll
            help you understand them and share with your care team when you are
            ready.
          </p>
          {documentCount > 0 && (
            <div className="flex flex-wrap gap-2 pt-1">
              <span className="inline-flex items-center rounded-full border border-sage-200/80 bg-sage-100/60 px-3 py-1 text-xs font-medium text-sage-800 dark:border-sage-800 dark:bg-sage-950/40 dark:text-sage-200">
                {documentCount} record{documentCount === 1 ? "" : "s"} uploaded
              </span>
            </div>
          )}
        </div>
        {profileId && (
          <LinkButton
            href={profilePath(profileId)}
            size="lg"
            className="shrink-0 rounded-2xl px-6"
          >
            Upload records
          </LinkButton>
        )}
      </div>
      <div
        className="pointer-events-none absolute -right-8 -top-8 size-40 rounded-full bg-primary/10 blur-2xl"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -bottom-10 left-1/3 size-32 rounded-full bg-accent/30 blur-2xl"
        aria-hidden
      />
    </section>
  );
}
