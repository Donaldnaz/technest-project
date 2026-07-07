"use client";

import {
  LandingNavLink,
} from "@/components/landing/landing-nav-link";
import { useActiveHashSection } from "@/hooks/use-active-hash-section";
import { getHashId, primaryNavLinks } from "@/lib/landing/navigation";
import { landingNavLinkClassName } from "@/lib/landing/nav-link-styles";

export function LandingNavLinks() {
  const activeId = useActiveHashSection();

  return (
    <>
      {primaryNavLinks.map((link) => {
        const hashId = getHashId(link.href);
        const isActive = hashId !== null && activeId === hashId;

        return (
          <LandingNavLink
            key={link.href}
            href={link.href}
            label={link.label}
            isActive={isActive}
            className={landingNavLinkClassName(isActive)}
          />
        );
      })}
    </>
  );
}

export function LandingMobileNavLinks({
  onNavigate,
}: {
  onNavigate?: () => void;
}) {
  const activeId = useActiveHashSection();

  return (
    <>
      {primaryNavLinks.map((link) => {
        const hashId = getHashId(link.href);
        const isActive = hashId !== null && activeId === hashId;

        return (
          <li key={link.href}>
            <LandingNavLink
              href={link.href}
              label={link.label}
              isActive={isActive}
              className={`${landingNavLinkClassName(isActive)} block rounded-xl px-4 py-3 hover:bg-muted/60`}
              onNavigate={onNavigate}
            />
          </li>
        );
      })}
    </>
  );
}
