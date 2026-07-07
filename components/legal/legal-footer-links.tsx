"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronRight } from "lucide-react";

import { LandingNavLink } from "@/components/landing/landing-nav-link";
import { legalCopy } from "@/lib/copy/legal";
import { legalNavLinks } from "@/lib/landing/navigation";
import { focusRingClassName } from "@/lib/landing/nav-link-styles";
import { cn } from "@/lib/utils";

const footerLinkClassName = cn(
  "inline-block py-1 text-sm text-muted-foreground transition-colors hover:text-foreground",
  focusRingClassName,
);

export function FooterLegalLinks() {
  const pathname = usePathname();

  return (
    <>
      {legalNavLinks.map((link) => (
        <li key={link.href}>
          <LandingNavLink
            href={link.href}
            label={link.label}
            isActive={pathname === link.href}
            className={footerLinkClassName}
          />
        </li>
      ))}
    </>
  );
}

export function LegalIndexLinks({
  className,
}: {
  className?: string;
}) {
  const pages = legalNavLinks.map((link) => {
    const key = link.href.replace("/legal/", "") as keyof typeof legalCopy.pages;
    return {
      href: link.href,
      title: legalCopy.pages[key].title,
      description: legalCopy.pages[key].description,
    };
  });

  return (
    <ul className={cn("divide-y divide-border/60 border-y border-border/60", className)}>
      {pages.map((page) => (
        <li key={page.href}>
          <Link
            href={page.href}
            className={cn(
              "group flex items-start justify-between gap-4 py-5 transition-colors",
              focusRingClassName,
            )}
          >
            <span className="min-w-0 space-y-1">
              <span className="block font-heading text-lg font-semibold text-foreground group-hover:text-primary">
                {page.title}
              </span>
              <span className="block text-sm leading-relaxed text-muted-foreground">
                {page.description}
              </span>
            </span>
            <ChevronRight
              className="mt-1 size-5 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:text-primary"
              aria-hidden
            />
          </Link>
        </li>
      ))}
    </ul>
  );
}
