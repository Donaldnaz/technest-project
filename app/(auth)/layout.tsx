import { OrganizationAssistant } from "@/components/assistant/organization-assistant";
import { AuthSiteHeader } from "@/components/layout/auth-site-header";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <AuthSiteHeader />

      <div className="flex-1">{children}</div>
      <OrganizationAssistant />
    </div>
  );
}
