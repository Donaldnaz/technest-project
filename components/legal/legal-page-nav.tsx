"use client";

import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { usePathname } from "next/navigation";

import { legalCopy } from "@/lib/copy/legal";
import { legalNavLinks } from "@/lib/landing/navigation";
import { focusRingClassName } from "@/lib/landing/nav-link-styles";
import { cn } from "@/lib/utils";

export function LegalSubnav({ className }: { className?: string }) {
  const pathname = usePathname();

  return (
    <nav
      aria-label={legalCopy.nav.label}
      className={cn("overflow-x-auto overscroll-x-contain", className)}
    >
      <div
        className="inline-flex min-w-max gap-1 rounded-xl border border-border/50 bg-muted/30 p-1 sm:min-w-0 sm:w-full sm:max-w-md"
        role="tablist"
      >
        {legalNavLinks.map((link) => {
          const isActive = pathname === link.href;

          return (
            <Link
              key={link.href}
              href={link.href}
              role="tab"
              aria-selected={isActive}
              aria-current={isActive ? "page" : undefined}
              className={cn(
                "flex-1 whitespace-nowrap rounded-lg px-4 py-2 text-center text-sm font-medium transition-colors",
                focusRingClassName,
                isActive
                  ? "bg-background text-foreground shadow-sm ring-1 ring-border/40"
                  : "text-muted-foreground hover:bg-background/60 hover:text-foreground",
              )}
            >
              {link.label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}

export function LegalDocPager() {
  const pathname = usePathname();
  const currentIndex = legalNavLinks.findIndex((link) => link.href === pathname);

  if (currentIndex === -1) return null;

  const previous = legalNavLinks[currentIndex - 1];
  const next = legalNavLinks[currentIndex + 1];

  const pagerLinkClassName = cn(
    "group inline-flex min-w-0 max-w-full items-center gap-2 rounded-xl border border-border/60 bg-background/60 px-4 py-2.5 text-sm transition-colors hover:border-border hover:bg-muted/30",
    focusRingClassName,
  );

  return (
    <nav
      aria-label="Legal document pages"
      className="mt-14 flex flex-col gap-3 border-t border-border/50 pt-8 sm:flex-row sm:items-stretch sm:justify-between"
    >
      <div className="min-w-0 sm:flex-1">
        {previous ? (
          <Link href={previous.href} className={pagerLinkClassName}>
            <ChevronLeft
              className="size-4 shrink-0 text-muted-foreground transition-colors group-hover:text-foreground"
              aria-hidden
            />
            <span className="min-w-0 truncate">
              <span className="text-muted-foreground">{legalCopy.flow.previous}</span>{" "}
              <span className="font-medium text-foreground">{previous.label}</span>
            </span>
          </Link>
        ) : (
          <span aria-hidden className="hidden sm:block" />
        )}
      </div>

      <div className="min-w-0 sm:flex-1 sm:text-right">
        {next ? (
          <Link
            href={next.href}
            className={cn(pagerLinkClassName, "sm:ml-auto sm:flex-row-reverse")}
          >
            <ChevronRight
              className="size-4 shrink-0 text-muted-foreground transition-colors group-hover:text-foreground"
              aria-hidden
            />
            <span className="min-w-0 truncate">
              <span className="text-muted-foreground">{legalCopy.flow.next}</span>{" "}
              <span className="font-medium text-foreground">{next.label}</span>
            </span>
          </Link>
        ) : null}
      </div>
    </nav>
  );
}
