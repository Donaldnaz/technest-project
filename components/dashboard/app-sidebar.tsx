"use client";

import Link from "next/link";
import {
  Suspense,
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  useSyncExternalStore,
} from "react";
import { ChevronLeft, HeartPulse } from "lucide-react";

import { SidebarNav } from "@/components/dashboard/sidebar-nav";
import { patientDashboardCopy } from "@/lib/copy/patient/dashboard";
import { focusRingClassName } from "@/lib/landing/nav-link-styles";
import { cn } from "@/lib/utils";

const STORAGE_KEY = "icare-sidebar-collapsed";
const SIDEBAR_COLLAPSED_EVENT = "icare-sidebar-collapsed-change";
const SIDEBAR_SEAM_VAR = "--dashboard-sidebar-seam";
const SIDEBAR_TRANSITION_MS = 200;

function subscribeSidebarCollapsed(onStoreChange: () => void): () => void {
  window.addEventListener("storage", onStoreChange);
  window.addEventListener(SIDEBAR_COLLAPSED_EVENT, onStoreChange);
  return () => {
    window.removeEventListener("storage", onStoreChange);
    window.removeEventListener(SIDEBAR_COLLAPSED_EVENT, onStoreChange);
  };
}

function getSidebarCollapsedServerSnapshot(): boolean {
  return false;
}

type AppSidebarProps = {
  profileId?: string;
};

function SidebarNavFallback() {
  return <div className="h-40" aria-hidden />;
}

function readCollapsedPreference(): boolean {
  return localStorage.getItem(STORAGE_KEY) === "true";
}

function isDesktopViewport(): boolean {
  return typeof window !== "undefined" && window.innerWidth >= 1024;
}

function setSidebarSeam(px: number): void {
  document.documentElement.style.setProperty(SIDEBAR_SEAM_VAR, `${px}px`);
}

type SidebarToggleProps = {
  collapsed: boolean;
  onToggle: () => void;
  show: boolean;
};

function SidebarToggle({ collapsed, onToggle, show }: SidebarToggleProps) {
  if (!show) return null;

  return (
    <button
      type="button"
      onClick={onToggle}
      aria-expanded={!collapsed}
      aria-controls="app-sidebar"
      aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
      className={cn(
        "fixed top-[calc(max(1rem,env(safe-area-inset-top))+0.875rem)] z-50 hidden size-7 -translate-x-1/2 items-center justify-center rounded-full border border-border/60 bg-card text-muted-foreground shadow-sm transition-[box-shadow,background-color,border-color,color] duration-200 [left:var(--dashboard-sidebar-seam,18rem)] lg:flex",
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
  const collapsed = useSyncExternalStore(
    subscribeSidebarCollapsed,
    readCollapsedPreference,
    getSidebarCollapsedServerSnapshot,
  );
  const [showToggle, setShowToggle] = useState(false);
  const asideRef = useRef<HTMLElement>(null);

  function toggleCollapsed() {
    const next = !collapsed;
    localStorage.setItem(STORAGE_KEY, String(next));
    window.dispatchEvent(new Event(SIDEBAR_COLLAPSED_EVENT));
  }

  const widthClass = collapsed ? "w-16" : "w-72";

  const updateSeamPosition = useCallback(() => {
    const aside = asideRef.current;
    if (!aside || !isDesktopViewport()) {
      setShowToggle(false);
      return;
    }

    const sidebarRect = aside.getBoundingClientRect();
    if (sidebarRect.width === 0) {
      setShowToggle(false);
      return;
    }

    setShowToggle(true);
    setSidebarSeam(sidebarRect.right);
  }, []);

  useLayoutEffect(() => {
    updateSeamPosition();
  }, [collapsed, updateSeamPosition]);

  useEffect(() => {
    const aside = asideRef.current;
    if (!aside) return;

    const observer = new ResizeObserver(updateSeamPosition);
    observer.observe(aside);
    window.addEventListener("resize", updateSeamPosition);

    let raf = 0;
    const start = performance.now();
    const trackDuringTransition = (now: number) => {
      updateSeamPosition();
      if (now - start < SIDEBAR_TRANSITION_MS + 32) {
        raf = requestAnimationFrame(trackDuringTransition);
      }
    };
    raf = requestAnimationFrame(trackDuringTransition);

    const onTransitionEnd = (event: TransitionEvent) => {
      if (event.propertyName !== "width") return;
      updateSeamPosition();
    };
    aside.addEventListener("transitionend", onTransitionEnd);

    return () => {
      observer.disconnect();
      window.removeEventListener("resize", updateSeamPosition);
      aside.removeEventListener("transitionend", onTransitionEnd);
      cancelAnimationFrame(raf);
    };
  }, [collapsed, updateSeamPosition]);

  return (
    <>
      <aside
        ref={asideRef}
        id="app-sidebar"
        className={cn(
          "relative hidden shrink-0 flex-col border-r border-sidebar-border bg-sidebar px-4 pb-4 pt-safe transition-[width] duration-200 lg:flex",
          widthClass,
        )}
        suppressHydrationWarning
      >
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
      <SidebarToggle
        collapsed={collapsed}
        onToggle={toggleCollapsed}
        show={showToggle}
      />
    </>
  );
}
