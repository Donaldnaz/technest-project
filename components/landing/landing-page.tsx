import { LandingAbout } from "@/components/landing/landing-about";
import { LandingContact } from "@/components/landing/landing-contact";
import { LandingCta } from "@/components/landing/landing-cta";
import { LandingDashboardShowcase } from "@/components/landing/landing-dashboard-showcase";
import { LandingFooter } from "@/components/landing/landing-footer";
import { LandingHero } from "@/components/landing/landing-hero";
import { LandingNav } from "@/components/landing/landing-nav";
import { LandingWhatWeDo } from "@/components/landing/landing-what-we-do";
import { SkipLink } from "@/components/layout/skip-link";

type LandingPageProps = {
  dashboardHref?: string;
};

export function LandingPage({ dashboardHref }: LandingPageProps) {
  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-b from-oat-50/50 via-background to-oat-50/30 text-foreground dark:from-charcoal-950 dark:via-background dark:to-charcoal-950">
      <SkipLink />
      <LandingNav dashboardHref={dashboardHref} />
      <main id="main-content" className="flex-1">
        <LandingHero />
        <LandingWhatWeDo />
        <LandingDashboardShowcase />
        <LandingAbout />
        <LandingContact />
        <LandingCta />
      </main>
      <LandingFooter />
    </div>
  );
}
