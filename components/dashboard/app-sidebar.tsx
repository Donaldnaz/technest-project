"use client";

import Link from "next/link";
import { Suspense, useState } from "react";
import { ChevronLeft, HeartPulse } from "lucide-react";

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

type SidebarToggleProps = {
  collapsed: boolean;
  onToggle: () => void;
};

function SidebarToggle({ collapsed, onToggle }: SidebarToggleProps) {
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-expanded={!collapsed}
      aria-controls="app-sidebar"
      aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
      className={cn(
        "absolute -right-3 top-[calc(max(1rem,env(safe-area-inset-top))+1rem)] z-10 flex size-7 items-center justify-center rounded-full border border-border/60 bg-card text-muted-foreground shadow-sm transition-all duration-200",
        "hover:border-primary/30 hover:bg-primary/5 hover:text-primary hover:shadow-md",
        "active:scale-95",
        focusRingClassName,
      )}
    >
      <ChevronLeft
        className={cn(
          "size-3.5 transition-transform duration-200",
          collapsed && "rotate-180",
        )}
        aria-hidden
      />
    </button>
  );
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
      id="app-sidebar"
      className={cn(
        "relative hidden flex-col border-r border-sidebar-border bg-sidebar px-4 pb-4 pt-safe transition-[width] duration-200 lg:flex",
        widthClass,
      )}
      suppressHydrationWarning
    >
      <SidebarToggle collapsed={collapsed} onToggle={toggleCollapsed} />

      <div
        className={cn(
          "mb-8 flex h-14 items-center",
          collapsed ? "justify-center" : "gap-3",
        )}
      >
        <Link
          href="/"
          aria-label="Back to iCare home"
          className={cn(
            "flex items-center gap-3",
            collapsed && "justify-center",
            focusRingClassName,
          )}
        >
          <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary/15 text-primary shadow-sm ring-1 ring-primary/10">
            <HeartPulse className="size-5" aria-hidden />
          </div>
          {!collapsed && (
            <div className="min-w-0">
              <span className="font-heading text-lg font-semibold">
                i<span className="text-primary">Care</span>
              </span>
              <p className="truncate text-xs text-muted-foreground">
                {patientDashboardCopy.shell.workspaceLabel}
              </p>
            </div>
          )}
        </Link>
      </div>

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
