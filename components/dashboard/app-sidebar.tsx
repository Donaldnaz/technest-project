"use client";

import Link from "next/link";
import { Suspense, useState } from "react";
import { HeartPulse, PanelLeftClose, PanelLeftOpen } from "lucide-react";

import { SidebarNav } from "@/components/dashboard/sidebar-nav";
import { patientDashboardCopy } from "@/lib/copy/patient/dashboard";
import { focusRingClassName } from "@/lib/landing/nav-link-styles";
import { cn } from "@/lib/utils";

const STORAGE_KEY = "icare-sidebar-collapsed";

type AppSidebarProps = {
  profileId?: string;
};

function SidebarNavFallback() {
  return <div className="h-40" aria-hidden />;
}

function readCollapsedPreference(): boolean {
  if (typeof window === "undefined") return false;
  return localStorage.getItem(STORAGE_KEY) === "true";
}

export function AppSidebar({ profileId }: AppSidebarProps) {
  const [collapsed, setCollapsed] = useState(readCollapsedPreference);

  function toggleCollapsed() {
    setCollapsed((value) => {
      const next = !value;
      localStorage.setItem(STORAGE_KEY, String(next));
      return next;
    });
  }

  const widthClass = collapsed ? "w-16" : "w-72";

  return (
    <aside
      className={cn(
        "hidden flex-col border-r border-sidebar-border bg-sidebar p-4 transition-[width] duration-200 lg:flex",
        widthClass,
      )}
      suppressHydrationWarning
    >
      <div
        className={cn(
          "mb-8 flex items-center",
          collapsed ? "justify-center" : "justify-between gap-3",
        )}
      >
        <div
          className={cn(
            "flex items-center gap-3",
            collapsed && "justify-center",
          )}
        >
          <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary/15 text-primary">
            <HeartPulse className="size-5" aria-hidden />
          </div>
          {!collapsed && (
            <div className="min-w-0">
              <Link
                href="/dashboard"
                className={cn(
                  "font-heading text-lg font-semibold",
                  focusRingClassName,
                )}
              >
                i<span className="text-primary">Care</span>
              </Link>
              <p className="truncate text-xs text-muted-foreground">
                {patientDashboardCopy.shell.workspaceLabel}
              </p>
            </div>
          )}
        </div>
        {!collapsed && (
          <button
            type="button"
            onClick={toggleCollapsed}
            className={cn(
              "inline-flex size-8 shrink-0 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-sidebar-accent hover:text-foreground",
              focusRingClassName,
            )}
            aria-label="Collapse sidebar"
          >
            <PanelLeftClose className="size-4" aria-hidden />
          </button>
        )}
      </div>

      {collapsed && (
        <button
          type="button"
          onClick={toggleCollapsed}
          className={cn(
            "mb-4 inline-flex size-10 items-center justify-center self-center rounded-lg text-muted-foreground transition-colors hover:bg-sidebar-accent hover:text-foreground",
            focusRingClassName,
          )}
          aria-label="Expand sidebar"
        >
          <PanelLeftOpen className="size-4" aria-hidden />
        </button>
      )}

      <Suspense fallback={<SidebarNavFallback />}>
        <SidebarNav profileId={profileId} collapsed={collapsed} />
      </Suspense>

      <div className={cn("mt-auto space-y-3", collapsed && "text-center")}>
        {!collapsed && (
          <>
            <p className="text-xs leading-relaxed text-muted-foreground">
              {patientDashboardCopy.shell.sidebarTagline}
            </p>
            <Link
              href="/"
              className={cn(
                "inline-flex text-xs font-medium text-muted-foreground transition-colors hover:text-foreground",
                focusRingClassName,
              )}
            >
              {patientDashboardCopy.shell.backToSite}
            </Link>
          </>
        )}
      </div>
    </aside>
  );
}
