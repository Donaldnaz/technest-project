import { Suspense } from "react";
import { redirect } from "next/navigation";

import { OrganizationAssistant } from "@/components/assistant/organization-assistant";
import { AppSidebar } from "@/components/dashboard/app-sidebar";
import { MobileBottomNav } from "@/components/dashboard/mobile-bottom-nav";
import { DashboardSiteHeader } from "@/components/layout/dashboard-site-header";
import { SkipLink } from "@/components/layout/skip-link";
import { isOnboardingComplete } from "@/lib/auth/onboarding";
import { getOptionalSession } from "@/lib/auth/session";
import { listRecentPatients } from "@/lib/db/queries/patients";

function NavFallback() {
  return <div className="h-32" aria-hidden />;
}

export default async function DashboardGroupLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getOptionalSession();

  if (!session?.user) {
    redirect("/auth/sign-in");
  }

  if (!(await isOnboardingComplete(session.user.id))) {
    redirect("/onboarding");
  }

  const [profile] = await listRecentPatients(session.user.id, 1);
  const profileId = profile?.id;

  return (
    <div className="flex min-h-screen bg-background">
      <SkipLink />
      <AppSidebar profileId={profileId} />

      <div className="relative flex min-w-0 flex-1 flex-col">
        <DashboardSiteHeader />

        <main
          id="main-content"
          className="flex-1 px-4 py-6 pb-24 md:px-8 md:py-8 lg:pb-10"
        >
          {children}
        </main>
      </div>

      <Suspense fallback={<NavFallback />}>
        <MobileBottomNav profileId={profileId} />
      </Suspense>
      <OrganizationAssistant />
    </div>
  );
}
