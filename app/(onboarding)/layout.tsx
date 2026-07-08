import { SiteBrandLink } from "@/components/layout/site-brand-link";
import { SiteContainer } from "@/components/layout/site-container";
import { SkipLink } from "@/components/layout/skip-link";

export default function OnboardingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-b from-oat-50/50 via-background to-background dark:from-charcoal-950 dark:via-background">
      <SkipLink />
      <header className="sticky top-0 z-50 border-b border-border/50 bg-background/80 pt-safe backdrop-blur-xl">
        <SiteContainer className="flex min-h-[3.75rem] items-center py-3.5">
          <SiteBrandLink />
        </SiteContainer>
      </header>

      <main id="main-content" className="flex-1 py-10 md:py-14">
        {children}
      </main>
    </div>
  );
}
