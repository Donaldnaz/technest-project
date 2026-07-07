"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { getHashId, LANDING_HOME } from "@/lib/landing/navigation";
import { scrollToHash } from "@/lib/landing/scroll-to-hash";

type LandingNavLinkProps = {
  href: string;
  label: string;
  className?: string;
  onNavigate?: () => void;
  isActive?: boolean;
};

export function LandingNavLink({
  href,
  label,
  className,
  onNavigate,
  isActive = false,
}: LandingNavLinkProps) {
  const pathname = usePathname();
  const hashId = getHashId(href);
  const ariaCurrent = isActive
    ? hashId
      ? ("location" as const)
      : ("page" as const)
    : undefined;

  if (hashId) {
    const hashHref = `#${hashId}`;

    if (pathname === LANDING_HOME) {
      return (
        <a
          href={hashHref}
          className={className}
          aria-current={ariaCurrent}
          onClick={(event) => {
            event.preventDefault();
            scrollToHash(hashHref);
            onNavigate?.();
          }}
        >
          {label}
        </a>
      );
    }

    return (
      <Link
        href={href}
        scroll={false}
        className={className}
        aria-current={ariaCurrent}
        onClick={onNavigate}
      >
        {label}
      </Link>
    );
  }

  return (
    <Link
      href={href}
      className={className}
      aria-current={ariaCurrent}
      onClick={onNavigate}
    >
      {label}
    </Link>
  );
}
