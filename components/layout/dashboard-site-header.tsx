import Link from "next/link";
import { HeartPulse } from "lucide-react";

import { HeaderContext } from "@/components/dashboard/header-context";
import { ThemeToggle } from "@/components/dashboard/theme-toggle";
import { UserMenu } from "@/components/dashboard/user-menu";
import { SiteHeader } from "@/components/layout/site-header";
import { patientDashboardCopy } from "@/lib/copy/patient/dashboard";

export function DashboardSiteHeader() {
  return (
    <SiteHeader
      className="z-30 border-border/60 bg-background/80 backdrop-blur-md"
      containerClassName="max-w-full"
      actionsVisibility="all"
      brand={
        <div className="flex min-w-0 items-center gap-2 sm:gap-3 lg:hidden">
          <Link
            href="/"
            aria-label="Back to iCare home"
            className="flex min-w-0 shrink items-center gap-2"
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
      }
      nav={
        <span className="truncate text-sm font-medium text-muted-foreground">
          {patientDashboardCopy.shell.workspaceLabel}
        </span>
      }
      actions={
        <>
          <ThemeToggle />
          <UserMenu />
        </>
      }
    />
  );
}
