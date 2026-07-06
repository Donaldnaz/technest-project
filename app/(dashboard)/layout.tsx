import Link from "next/link";
import { redirect } from "next/navigation";
import { HeartPulse } from "lucide-react";

import { OrganizationAssistant } from "@/components/assistant/organization-assistant";
import { MobileBottomNav } from "@/components/dashboard/mobile-bottom-nav";
import { SidebarNav } from "@/components/dashboard/sidebar-nav";
import { ThemeToggle } from "@/components/dashboard/theme-toggle";
import { UserMenu } from "@/components/dashboard/user-menu";
import { SkipLink } from "@/components/layout/skip-link";
import { isOnboardingComplete } from "@/lib/auth/onboarding";
import { getOptionalSession } from "@/lib/auth/session";
import { listRecentPatients } from "@/lib/db/queries/patients";

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
      <aside className="hidden w-72 flex-col border-r border-sidebar-border bg-sidebar p-6 lg:flex">
        <div className="mb-10 flex items-center gap-3">
          <div className="flex size-11 items-center justify-center rounded-2xl bg-primary/15 text-primary">
            <HeartPulse className="size-5" aria-hidden />
          </div>
          <div>
            <Link href="/dashboard" className="font-heading text-lg font-semibold">
              i<span className="text-primary">Care</span>
            </Link>
            <p className="text-xs text-muted-foreground">
              Upload health documents & records
            </p>
          </div>
        </div>
        <SidebarNav profileId={profileId} />
        <p className="mt-auto text-xs leading-relaxed text-muted-foreground">
            Your health document upload portal.
        </p>
      </aside>

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-border/60 bg-background/80 px-4 backdrop-blur-md md:px-8">
          <div className="flex items-center gap-2 lg:hidden">
            <div className="flex size-9 items-center justify-center rounded-xl bg-primary/15 text-primary">
              <HeartPulse className="size-4" aria-hidden />
            </div>
            <Link href="/dashboard" className="font-heading font-semibold">
              i<span className="text-primary">Care</span>
            </Link>
          </div>
          <div className="hidden text-sm text-muted-foreground lg:block">
            Your upload workspace
          </div>
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <UserMenu />
          </div>
        </header>

        <main id="main-content" className="flex-1 px-4 py-6 md:px-8 md:py-8">
          {children}
        </main>
      </div>

      <MobileBottomNav profileId={profileId} />
      <OrganizationAssistant />
    </div>
  );
}
