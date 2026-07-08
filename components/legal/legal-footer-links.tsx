"use client";

import { LandingNavLink } from "@/components/landing/landing-nav-link";
import { legalNavLinks } from "@/lib/landing/navigation";
import { focusRingClassName } from "@/lib/landing/nav-link-styles";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";

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
