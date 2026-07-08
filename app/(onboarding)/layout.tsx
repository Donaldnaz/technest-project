import { SiteBrandLink } from "@/components/layout/site-brand-link";
import { SiteHeader } from "@/components/layout/site-header";
import { SkipLink } from "@/components/layout/skip-link";

export default function OnboardingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-b from-oat-50/50 via-background to-background dark:from-charcoal-950 dark:via-background">
      <SkipLink />
      <SiteHeader
        className="bg-background/80 backdrop-blur-xl"
        brand={<SiteBrandLink />}
      />

      <main id="main-content" className="flex-1 py-10 md:py-14">
        {children}
      </main>
    </div>
  );
}
