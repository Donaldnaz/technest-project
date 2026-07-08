import { Suspense } from "react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { HeartPulse } from "lucide-react";

import { OrganizationAssistant } from "@/components/assistant/organization-assistant";
import { AppSidebar } from "@/components/dashboard/app-sidebar";
import { HeaderContext } from "@/components/dashboard/header-context";
import { MobileBottomNav } from "@/components/dashboard/mobile-bottom-nav";
import { ThemeToggle } from "@/components/dashboard/theme-toggle";
import { UserMenu } from "@/components/dashboard/user-menu";
import { SkipLink } from "@/components/layout/skip-link";
import { patientDashboardCopy } from "@/lib/copy/patient/dashboard";
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

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="sticky top-0 z-30 border-b border-border/60 bg-background/80 pt-safe backdrop-blur-md">
          <div className="mx-auto grid min-h-[3.75rem] w-full max-w-full grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] items-center gap-x-4 px-4 py-3.5 md:gap-x-6 md:px-6 lg:px-8">
            <div className="flex min-w-0 items-center gap-2.5 sm:gap-3 lg:invisible lg:w-0 lg:overflow-hidden">
              <Link
                href="/"
                aria-label="Back to iCare home"
                className="flex shrink-0 items-center gap-2"
              >
                <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-primary/15 text-primary">
                  <HeartPulse className="size-4" aria-hidden />
                </div>
                <span className="truncate font-heading text-[0.9375rem] font-semibold leading-none sm:text-base">
                  i<span className="text-primary">Care</span>
                </span>
              </Link>
              <span
                className="hidden h-4 w-px shrink-0 bg-border/60 sm:block"
                aria-hidden
              />
              <HeaderContext />
            </div>

            <p className="hidden truncate text-sm font-medium text-muted-foreground lg:block">
              {patientDashboardCopy.shell.workspaceLabel}
            </p>

            <div className="flex items-center justify-end gap-2 sm:gap-3">
              <ThemeToggle />
              <UserMenu />
            </div>
          </div>
        </header>

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
