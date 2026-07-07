import {
  getFirstName,
  getGreetingGradient,
  getTimeOfDayGreeting,
} from "@/lib/health/greeting";
import { patientDashboardCopy } from "@/lib/copy/patient/dashboard";
import { patientTabHref } from "@/lib/navigation/patient-nav";
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
      className={`health-card relative overflow-hidden rounded-3xl bg-gradient-to-br ${gradient} p-7 shadow-sm md:p-10`}
    >
      <div className="relative z-10 flex flex-col gap-5 md:flex-row md:items-center md:justify-between md:gap-8">
        <div className="space-y-3">
          <p className="text-sm font-medium text-muted-foreground">
            {patientDashboardCopy.welcome.eyebrow}
          </p>
          <h1 className="font-heading text-3xl font-semibold tracking-tight md:text-4xl">
            {greeting}, {firstName}
          </h1>
          <p className="max-w-xl text-base leading-relaxed text-muted-foreground md:text-[1.05rem] md:leading-7">
            {documentCount === 0
              ? patientDashboardCopy.welcome.emptyBody
              : patientDashboardCopy.welcome.withDocuments(documentCount)}
          </p>
        </div>
        {profileId && (
          <LinkButton
            href={patientTabHref(profileId, "upload")}
            size="lg"
            className="shrink-0 rounded-2xl px-6"
          >
            {patientDashboardCopy.welcome.cta}
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
