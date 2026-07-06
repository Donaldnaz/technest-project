"use client";

import Link from "next/link";

import { scrollToHash } from "@/lib/landing/scroll-to-hash";

type LandingNavLinkProps = {
  href: string;
  label: string;
  className?: string;
  onNavigate?: () => void;
};

export function LandingNavLink({
  href,
  label,
  className,
  onNavigate,
}: LandingNavLinkProps) {
  if (href.startsWith("#")) {
    return (
      <a
        href={href}
        className={className}
        onClick={(event) => {
          event.preventDefault();
          scrollToHash(href);
          onNavigate?.();
        }}
      >
        {label}
      </a>
    );
  }

  return (
    <Link href={href} className={className} onClick={onNavigate}>
      {label}
    </Link>
  );
}
