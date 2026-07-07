import { SiteBrandLink } from "@/components/layout/site-brand-link";
import { SiteContainer } from "@/components/layout/site-container";

export default function OnboardingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-b from-oat-50/50 via-background to-background dark:from-charcoal-950 dark:via-background">
      <header className="sticky top-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-xl">
        <SiteContainer className="flex h-16 items-center">
          <SiteBrandLink />
        </SiteContainer>
      </header>

      <main className="flex-1 py-10 md:py-14">{children}</main>
    </div>
  );
}
