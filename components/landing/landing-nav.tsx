import { SiteBrandLink } from "@/components/layout/site-brand-link";
import {
  LandingNavLink,
} from "@/components/landing/landing-nav-link";
import { LandingMobileMenu } from "@/components/landing/landing-mobile-menu";
import { ThemeSwitcher } from "@/components/landing/theme-switcher";
import { SiteContainer } from "@/components/layout/site-container";
import { LinkButton } from "@/components/ui/link-button";
import { primaryNavLinks } from "@/lib/landing/navigation";
import { landingNavLinkClassName } from "@/lib/landing/nav-link-styles";

type LandingNavProps = {
  dashboardHref?: string;
};

export function LandingNav({ dashboardHref }: LandingNavProps) {
  return (
    <header className="sticky top-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-xl">
      <SiteContainer className="flex h-16 items-center justify-between gap-4">
        <SiteBrandLink />

        <nav
          className="hidden items-center gap-6 md:flex"
          aria-label="Primary"
        >
          {primaryNavLinks.map((link) => (
            <LandingNavLink
              key={link.href}
              href={link.href}
              label={link.label}
              className={landingNavLinkClassName()}
            />
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <ThemeSwitcher className="hidden sm:inline-flex" />
          {dashboardHref ? (
            <LinkButton href={dashboardHref} size="lg" className="hidden rounded-2xl sm:inline-flex">
              Dashboard
            </LinkButton>
          ) : (
            <>
              <LinkButton
                href="/auth/sign-in"
                variant="ghost"
                className="hidden sm:inline-flex"
              >
                Sign in
              </LinkButton>
              <LinkButton href="/auth/sign-up" size="lg" className="hidden rounded-2xl sm:inline-flex">
                Get started
              </LinkButton>
            </>
          )}
          <LandingMobileMenu dashboardHref={dashboardHref} />
        </div>
      </SiteContainer>
    </header>
  );
}
