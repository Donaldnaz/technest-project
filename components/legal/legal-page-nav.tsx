"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronLeft, ChevronRight } from "lucide-react";

import { legalCopy } from "@/lib/copy/legal";
import { legalNavLinks } from "@/lib/landing/navigation";
import { focusRingClassName } from "@/lib/landing/nav-link-styles";
import { cn } from "@/lib/utils";

export function LegalSubnav({ className }: { className?: string }) {
  const pathname = usePathname();

  return (
    <nav
      aria-label={legalCopy.nav.label}
      className={cn(
        "flex gap-1 overflow-x-auto border-b border-border/60",
        className,
      )}
    >
      {legalNavLinks.map((link) => {
        const isActive = pathname === link.href;

        return (
          <Link
            key={link.href}
            href={link.href}
            aria-current={isActive ? "page" : undefined}
            className={cn(
              "-mb-px shrink-0 border-b-2 px-3 py-2.5 text-sm font-medium transition-colors sm:px-4",
              focusRingClassName,
              isActive
                ? "border-primary text-foreground"
                : "border-transparent text-muted-foreground hover:border-border hover:text-foreground",
            )}
          >
            {link.label}
          </Link>
        );
      })}
    </nav>
  );
}

export function LegalDocPager() {
  const pathname = usePathname();
  const currentIndex = legalNavLinks.findIndex((link) => link.href === pathname);

  if (currentIndex === -1) return null;

  const previous = legalNavLinks[currentIndex - 1];
  const next = legalNavLinks[currentIndex + 1];

  return (
    <nav
      aria-label="Legal document pages"
      className="mt-12 flex flex-col gap-4 border-t border-border/60 pt-8 sm:flex-row sm:items-center sm:justify-between"
    >
      {previous ? (
        <Link
          href={previous.href}
          className={cn(
            "inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground",
            focusRingClassName,
          )}
        >
          <ChevronLeft className="size-4 shrink-0" aria-hidden />
          <span>
            {legalCopy.flow.previous}: {previous.label}
          </span>
        </Link>
      ) : (
        <span aria-hidden />
      )}

      <Link
        href="/legal"
        className={cn(
          "text-center text-sm font-medium text-muted-foreground transition-colors hover:text-foreground sm:order-none",
          focusRingClassName,
        )}
      >
        {legalCopy.flow.allLegal}
      </Link>

      {next ? (
        <Link
          href={next.href}
          className={cn(
            "inline-flex items-center justify-end gap-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground sm:text-right",
            focusRingClassName,
          )}
        >
          <span>
            {legalCopy.flow.next}: {next.label}
          </span>
          <ChevronRight className="size-4 shrink-0" aria-hidden />
        </Link>
      ) : (
        <span aria-hidden />
      )}
    </nav>
  );
}
