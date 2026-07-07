import { AuthHeaderActions } from "@/components/layout/auth-header-actions";
import { SiteBrandLink } from "@/components/layout/site-brand-link";
import { SiteHeader } from "@/components/layout/site-header";

export function AuthSiteHeader() {
  return (
    <SiteHeader
      variant="minimal"
      brand={<SiteBrandLink compact />}
      actions={<AuthHeaderActions />}
    />
  );
}
