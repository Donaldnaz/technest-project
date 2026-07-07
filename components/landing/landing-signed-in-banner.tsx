import { LinkButton } from "@/components/ui/link-button";
import { SiteContainer } from "@/components/layout/site-container";

type LandingSignedInBannerProps = {
  dashboardHref: string;
  userName?: string | null;
};

export function LandingSignedInBanner({
  dashboardHref,
  userName,
}: LandingSignedInBannerProps) {
  const firstName = userName?.trim().split(/\s+/)[0];

  return (
    <div className="border-b border-sage-200/80 bg-sage-50/90 dark:border-sage-800 dark:bg-sage-950/40">
      <SiteContainer className="flex flex-col gap-3 py-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-sage-900 dark:text-sage-100">
          {firstName ? `Welcome back, ${firstName}.` : "You are signed in."}{" "}
          <span className="text-muted-foreground">
            Continue to your upload workspace or browse the site.
          </span>
        </p>
        <LinkButton href={dashboardHref} size="default" className="shrink-0 rounded-xl">
          Go to dashboard
        </LinkButton>
      </SiteContainer>
    </div>
  );
}
