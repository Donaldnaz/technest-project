import { OrganizationAssistant } from "@/components/assistant/organization-assistant";
import { SiteBrandLink } from "@/components/layout/site-brand-link";
import { SiteContainer } from "@/components/layout/site-container";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <header className="sticky top-0 z-50 border-b border-border/50 bg-background/80 pt-safe backdrop-blur-xl">
        <SiteContainer className="flex h-16 items-center">
          <SiteBrandLink />
        </SiteContainer>
      </header>

      <div className="flex-1">{children}</div>
      <OrganizationAssistant />
    </div>
  );
}
