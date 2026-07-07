import { LandingAbout } from "@/components/landing/landing-about";
import { LandingContact } from "@/components/landing/landing-contact";
import { LandingCta } from "@/components/landing/landing-cta";
import { LandingDashboardShowcase } from "@/components/landing/landing-dashboard-showcase";
import { LandingHero } from "@/components/landing/landing-hero";
import { LandingWhatWeDo } from "@/components/landing/landing-what-we-do";

export function LandingPage() {
  return (
    <div className="bg-gradient-to-b from-oat-50/50 via-background to-oat-50/30 text-foreground dark:from-charcoal-950 dark:via-background dark:to-charcoal-950">
      <LandingHero />
      <LandingWhatWeDo />
      <LandingDashboardShowcase />
      <LandingAbout />
      <LandingContact />
      <LandingCta />
    </div>
  );
}
