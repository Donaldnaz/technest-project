import { PublicSiteHeader } from "@/components/layout/public-site-header";
import { SkipLink } from "@/components/layout/skip-link";

export default function OnboardingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-b from-oat-50/50 via-background to-background dark:from-charcoal-950 dark:via-background">
      <SkipLink />
      <PublicSiteHeader centerLabel="Set up your account" />
      <main id="main-content" className="flex-1 py-10 md:py-14">
        {children}
      </main>
    </div>
  );
}
