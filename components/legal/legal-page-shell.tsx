"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

import { AppBreadcrumbs } from "@/components/clinical/app-breadcrumbs";
import { LegalDocPager, LegalSubnav } from "@/components/legal/legal-page-nav";
import { SiteContainer } from "@/components/layout/site-container";
import { legalCopy, type LegalPageKey } from "@/lib/copy/legal";
import { cn } from "@/lib/utils";

const pageKeys: Record<string, LegalPageKey> = {
  "/legal/privacy": "privacy",
  "/legal/terms": "terms",
  "/legal/accessibility": "accessibility",
};

type LegalPageShellProps = {
  title: string;
  description: string;
  children: React.ReactNode;
  showSubnav?: boolean;
  showPager?: boolean;
};

export function LegalPageShell({
  title,
  description,
  children,
  showSubnav = true,
  showPager = true,
}: LegalPageShellProps) {
  const pathname = usePathname();
  const pageKey = pageKeys[pathname];
  const intro = pageKey ? legalCopy.pages[pageKey].intro : description;

  useEffect(() => {
    if (!pathname.startsWith("/legal")) return;
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, [pathname]);

  return (
    <SiteContainer className="py-10 md:py-14">
      <div className="mx-auto w-full max-w-3xl">
        <AppBreadcrumbs
          items={[
            { label: legalCopy.shell.breadcrumbHome, href: "/" },
            { label: legalCopy.shell.breadcrumbLegal, href: "/legal" },
            ...(pageKey ? [{ label: title }] : []),
          ]}
          showBackIcon
          className="mb-6"
        />

        <header className="mb-8 space-y-3 border-b border-border/60 pb-8">
          <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
            {legalCopy.shell.lastUpdated}
          </p>
          <h1 className="font-heading text-3xl font-semibold tracking-tight md:text-4xl">
            {title}
          </h1>
          <p className="max-w-2xl text-base leading-relaxed text-muted-foreground">
            {intro}
          </p>
        </header>

        {showSubnav ? (
          <div className="sticky top-16 z-40 -mx-4 mb-10 bg-background/95 px-4 backdrop-blur-sm supports-[backdrop-filter]:bg-background/80 sm:mx-0 sm:px-0">
            <LegalSubnav />
          </div>
        ) : null}

        <article className={cn(showSubnav ? undefined : "mt-2")}>
          {children}
        </article>

        {showPager ? <LegalDocPager /> : null}
      </div>
    </SiteContainer>
  );
}
