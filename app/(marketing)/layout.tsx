import { OrganizationAssistant } from "@/components/assistant/organization-assistant";
import { LandingFooter } from "@/components/landing/landing-footer";
import { LandingHashScroll } from "@/components/landing/landing-hash-scroll";
import { LandingNav } from "@/components/landing/landing-nav";
import { SkipLink } from "@/components/layout/skip-link";
import { getPublicNavState } from "@/lib/navigation/public-nav-state";

export default async function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const navState = await getPublicNavState();

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <LandingHashScroll />
      <SkipLink />
      <LandingNav navState={navState} />
      <main id="main-content" className="flex-1">
        {children}
      </main>
      <LandingFooter />
      <OrganizationAssistant />
    </div>
  );
}
