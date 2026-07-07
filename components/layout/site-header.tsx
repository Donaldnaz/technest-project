import { SiteContainer } from "@/components/layout/site-container";
import { cn } from "@/lib/utils";

type SiteHeaderProps = {
  brand: React.ReactNode;
  nav?: React.ReactNode;
  actions?: React.ReactNode;
  mobileActions?: React.ReactNode;
  className?: string;
  variant?: "default" | "minimal";
};

export function SiteHeader({
  brand,
  nav,
  actions,
  mobileActions,
  className,
  variant = "default",
}: SiteHeaderProps) {
  const isMinimal = variant === "minimal";

  return (
    <header
      className={cn(
        "sticky top-0 z-50 border-b border-border/50 bg-background/90 backdrop-blur-md",
        className,
      )}
    >
      <SiteContainer
        className={cn(
          "relative flex h-16 items-center gap-4",
          isMinimal ? "justify-between" : "justify-between",
        )}
      >
        <div className="z-10 flex min-w-0 shrink-0 items-center">{brand}</div>

        {!isMinimal && nav ? (
          <nav
            className="absolute left-1/2 top-1/2 hidden -translate-x-1/2 -translate-y-1/2 items-center gap-8 lg:flex"
            aria-label="Primary"
          >
            {nav}
          </nav>
        ) : null}

        <div className="z-10 flex shrink-0 items-center justify-end gap-2 sm:gap-3">
          {actions ? (
            isMinimal ? (
              <div className="flex items-center gap-2 sm:gap-3">{actions}</div>
            ) : (
              <div className="hidden items-center gap-2 sm:gap-3 lg:flex">
                {actions}
              </div>
            )
          ) : null}
          {!isMinimal && mobileActions}
        </div>
      </SiteContainer>
    </header>
  );
}
