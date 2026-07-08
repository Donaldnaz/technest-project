"use client";

import Link from "next/link";
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
      className={cn("legal-subnav-scroll border-b border-border/50", className)}
    >
      <ul className="-mb-px flex gap-6 px-1">
        {legalNavLinks.map((link) => {
          const isActive = pathname === link.href;

          return (
            <li key={link.href} className="shrink-0">
              <Link
                href={link.href}
                aria-current={isActive ? "page" : undefined}
                className={cn(
                  "inline-block border-b-2 pb-3 text-sm font-medium transition-colors",
                  focusRingClassName,
                  isActive
                    ? "border-primary text-foreground"
                    : "border-transparent text-muted-foreground hover:border-border hover:text-foreground",
                )}
              >
                {link.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
