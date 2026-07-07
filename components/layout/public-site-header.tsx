import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import { PublicNavActions } from "@/components/layout/public-nav-actions";
import { SiteBrandLink } from "@/components/layout/site-brand-link";
import { SiteHeader } from "@/components/layout/site-header";
import { ThemeIconToggle } from "@/components/layout/theme-icon-toggle";
import { getPublicNavState } from "@/lib/navigation/public-nav-state";

type PublicSiteHeaderProps = {
  centerLabel?: string;
  homeHref?: string;
};

export async function PublicSiteHeader({
  centerLabel,
  homeHref = "/",
}: PublicSiteHeaderProps) {
  const navState = await getPublicNavState();

  return (
    <SiteHeader
      brand={<SiteBrandLink compact />}
      nav={
        centerLabel ? (
          <span className="text-sm font-medium text-muted-foreground">
            {centerLabel}
          </span>
        ) : undefined
      }
      actions={
        <>
          <Link
            href={homeHref}
            className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft className="size-4" aria-hidden />
            Home
          </Link>
          <ThemeIconToggle />
          <PublicNavActions navState={navState} />
        </>
      }
      mobileActions={
        <>
          <Link
            href={homeHref}
            className="inline-flex items-center gap-1.5 rounded-xl px-2 py-1.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground lg:hidden"
          >
            <ArrowLeft className="size-4" aria-hidden />
            <span className="hidden sm:inline">Home</span>
          </Link>
          <ThemeIconToggle />
          <div className="lg:hidden">
            <PublicNavActions navState={navState} />
          </div>
        </>
      }
    />
  );
}
