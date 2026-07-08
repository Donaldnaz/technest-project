import { OrganizationAssistant } from "@/components/assistant/organization-assistant";
import { LandingFooter } from "@/components/landing/landing-footer";
import { LandingHashScroll } from "@/components/landing/landing-hash-scroll";
import { LandingNav } from "@/components/landing/landing-nav";
import { SkipLink } from "@/components/layout/skip-link";

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <LandingHashScroll />
      <SkipLink />
      <LandingNav />
      <main id="main-content" className="flex-1">
        {children}
      </main>
      <LandingFooter />
      <OrganizationAssistant />
    </div>
  );
}
