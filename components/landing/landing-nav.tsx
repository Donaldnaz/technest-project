import { LandingMobileMenu } from "@/components/landing/landing-mobile-menu";
import { LandingNavLinks } from "@/components/landing/landing-nav-links";
import { PublicNavActions } from "@/components/layout/public-nav-actions";
import { SiteBrandLink } from "@/components/layout/site-brand-link";
import { SiteHeader } from "@/components/layout/site-header";
import { ThemeIconToggle } from "@/components/layout/theme-icon-toggle";
import type { PublicNavState } from "@/lib/navigation/public-nav-state";

type LandingNavProps = {
  navState: PublicNavState;
};

export function LandingNav({ navState }: LandingNavProps) {
  return (
    <SiteHeader
      brand={<SiteBrandLink compact />}
      nav={<LandingNavLinks />}
      actions={
        <>
          <ThemeIconToggle />
          <PublicNavActions navState={navState} />
        </>
      }
      mobileActions={
        <div className="flex items-center gap-2 lg:hidden">
          <ThemeIconToggle />
          <LandingMobileMenu dashboardHref={navState.dashboardHref} />
        </div>
      }
    />
  );
}
