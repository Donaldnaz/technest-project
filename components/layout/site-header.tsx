import type { CSSProperties } from "react";

import { SiteContainer } from "@/components/layout/site-container";
import { cn } from "@/lib/utils";

type SiteHeaderProps = {
  brand: React.ReactNode;
  nav?: React.ReactNode;
  actions?: React.ReactNode;
  mobileActions?: React.ReactNode;
  className?: string;
  containerClassName?: string;
  variant?: "default" | "minimal";
  /** When "all", actions stay visible on every breakpoint (e.g. dashboard). */
  actionsVisibility?: "desktop-only" | "all";
};

export function SiteHeader({
  brand,
  nav,
  actions,
  mobileActions,
  className,
  containerClassName,
  variant = "default",
  actionsVisibility = "desktop-only",
}: SiteHeaderProps) {
  const isMinimal = variant === "minimal";
  const showActionsOnAllBreakpoints =
    isMinimal || actionsVisibility === "all";

  return (
    <header
      style={
        {
          "--site-header-height": isMinimal ? "2.5rem" : "3.5rem",
        } as CSSProperties
      }
      className={cn(
        "sticky top-0 z-50 border-b border-border/50 bg-background/90 pt-[env(safe-area-inset-top,0px)] backdrop-blur-md",
        className,
      )}
    >
      <SiteContainer
        className={cn(
          "relative grid grid-cols-[auto_1fr_auto] items-center gap-4",
          isMinimal ? "h-10" : "h-14",
          containerClassName,
        )}
      >
        <div className="z-10 flex min-w-0 shrink-0 items-center">{brand}</div>

        {!isMinimal && nav ? (
          <nav
            className="hidden min-w-0 items-center justify-center gap-8 lg:flex"
            aria-label="Primary"
          >
            {nav}
          </nav>
        ) : null}

        <div className="z-10 flex shrink-0 items-center justify-end gap-2 sm:gap-3">
          {actions ? (
            <div
              className={cn(
                "flex items-center gap-2 sm:gap-3",
                !showActionsOnAllBreakpoints && "hidden lg:flex",
              )}
            >
              {actions}
            </div>
          ) : null}
          {!isMinimal && mobileActions}
        </div>
      </SiteContainer>
    </header>
  );
}
