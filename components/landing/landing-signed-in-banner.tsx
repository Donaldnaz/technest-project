import { LinkButton } from "@/components/ui/link-button";
import { SiteContainer } from "@/components/layout/site-container";
import { landingCopy } from "@/lib/copy/landing";

type LandingSignedInBannerProps = {
  dashboardHref: string;
  userName?: string | null;
};

export function LandingSignedInBanner({
  dashboardHref,
  userName,
}: LandingSignedInBannerProps) {
  const firstName = userName?.trim().split(/\s+/)[0];
  const { signedInBanner } = landingCopy;

  return (
    <div className="border-b border-sage-200/80 bg-sage-50/90 dark:border-sage-800 dark:bg-sage-950/40">
      <SiteContainer className="flex flex-col gap-3 py-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-sage-900 dark:text-sage-100">
          {firstName
            ? signedInBanner.welcome(firstName)
            : signedInBanner.signedIn}{" "}
          <span className="text-muted-foreground">{signedInBanner.hint}</span>
        </p>
        <LinkButton href={dashboardHref} size="sm" className="shrink-0 rounded-xl">
          {signedInBanner.dashboard}
        </LinkButton>
      </SiteContainer>
    </div>
  );
}
