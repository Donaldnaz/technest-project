import { AuthHeaderActions } from "@/components/layout/auth-header-actions";
import { SiteBrandLink } from "@/components/layout/site-brand-link";
import { SiteHeader } from "@/components/layout/site-header";
import { getPublicNavState } from "@/lib/navigation/public-nav-state";

export async function AuthSiteHeader() {
  const navState = await getPublicNavState();

  return (
    <SiteHeader
      brand={<SiteBrandLink compact />}
      actions={<AuthHeaderActions navState={navState} />}
      actionsVisibility="all"
    />
  );
}
