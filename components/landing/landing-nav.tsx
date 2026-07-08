import { LandingMobileMenu } from "@/components/landing/landing-mobile-menu";
import { LandingNavLinks } from "@/components/landing/landing-nav-links";
import { PublicNavActionsClient } from "@/components/layout/public-nav-actions-client";
import { SiteBrandLink } from "@/components/layout/site-brand-link";
import { SiteHeader } from "@/components/layout/site-header";
import { ThemeIconToggle } from "@/components/layout/theme-icon-toggle";

export function LandingNav() {
  return (
    <SiteHeader
      brand={<SiteBrandLink compact />}
      nav={<LandingNavLinks />}
      actions={
        <>
          <ThemeIconToggle />
          <PublicNavActionsClient />
        </>
      }
      mobileActions={
        <div className="flex items-center gap-2 lg:hidden">
          <ThemeIconToggle />
          <LandingMobileMenu />
        </div>
      }
    />
  );
}
