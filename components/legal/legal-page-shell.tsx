"use client";

import Link from "next/link";
import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { ArrowLeft } from "lucide-react";

import { AppBreadcrumbs } from "@/components/clinical/app-breadcrumbs";
import { LegalHubCards } from "@/components/legal/legal-hub-cards";
import { LegalDocPager, LegalSubnav } from "@/components/legal/legal-page-nav";
import { SectionHeader } from "@/components/layout/section-header";
import { SiteContainer } from "@/components/layout/site-container";
import { legalCopy, type LegalPageKey } from "@/lib/copy/legal";
import { focusRingClassName } from "@/lib/landing/nav-link-styles";
import { cn } from "@/lib/utils";

const pageKeys: Record<string, LegalPageKey> = {
  "/legal/privacy": "privacy",
  "/legal/terms": "terms",
  "/legal/accessibility": "accessibility",
};

const sectionBackgroundClassName =
  "border-t border-border/50 bg-gradient-to-br from-oat-50/60 via-background to-lavender-100/30 dark:from-charcoal-950/40 dark:via-background dark:to-charcoal-950/30";

type LegalPageShellProps = {
  title: string;
  description: string;
  children?: React.ReactNode;
  variant?: "hub" | "document";
  showSubnav?: boolean;
  showPager?: boolean;
};

function LastUpdatedBadge({ className }: { className?: string }) {
  return (
    <p
      className={cn(
        "inline-flex items-center rounded-full border border-border/50 bg-muted/30 px-3 py-1 text-xs font-medium text-muted-foreground",
        className,
      )}
    >
      {legalCopy.shell.lastUpdated}
    </p>
  );
}

export function LegalPageShell({
  title,
  description,
  children,
  variant = "document",
  showSubnav = true,
  showPager = true,
}: LegalPageShellProps) {
  const pathname = usePathname();
  const pageKey = pageKeys[pathname];
  const isHub = variant === "hub";
  const intro = isHub
    ? legalCopy.index.intro
    : pageKey
      ? legalCopy.pages[pageKey].intro
      : description;

  useEffect(() => {
    if (!pathname.startsWith("/legal")) return;
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, [pathname]);

  if (isHub) {
    return (
      <section className={cn("site-section", sectionBackgroundClassName)}>
        <SiteContainer className="py-10 md:py-16 lg:py-20">
          <div className="mx-auto w-full max-w-5xl">
            <AppBreadcrumbs
              items={[
                { label: legalCopy.shell.breadcrumbHome, href: "/" },
                { label: legalCopy.shell.breadcrumbLegal },
              ]}
              showBackIcon
              className="mb-8 md:mb-10"
            />

            <SectionHeader
              eyebrow={legalCopy.index.eyebrow}
              title={title}
              description={intro}
              className="max-w-3xl"
            />

            <LastUpdatedBadge className="mt-6" />

            <LegalHubCards className="mt-10 md:mt-14" />

            <div className="mt-12 flex border-t border-border/50 pt-8 md:mt-14">
              <Link
                href="/"
                className={cn(
                  "inline-flex items-center gap-2 rounded-lg px-1 py-1 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground",
                  focusRingClassName,
                )}
              >
                <ArrowLeft className="size-4 shrink-0" aria-hidden />
                {legalCopy.flow.backHome}
              </Link>
            </div>
          </div>
        </SiteContainer>
      </section>
    );
  }

  return (
    <section className={cn("site-section", sectionBackgroundClassName)}>
      <SiteContainer className="py-8 md:py-12 lg:py-14">
        <div className="mx-auto w-full max-w-3xl">
          <AppBreadcrumbs
            items={[
              { label: legalCopy.shell.breadcrumbHome, href: "/" },
              { label: legalCopy.shell.breadcrumbLegal, href: "/legal" },
              ...(pageKey ? [{ label: title }] : []),
            ]}
            showBackIcon
            className="mb-6 md:mb-8"
          />

          <Link
            href="/legal"
            className={cn(
              "mb-8 inline-flex items-center gap-1.5 rounded-lg px-1 py-1 text-sm text-muted-foreground transition-colors hover:text-foreground",
              focusRingClassName,
            )}
          >
            <ArrowLeft className="size-3.5 shrink-0" aria-hidden />
            {legalCopy.flow.allLegal}
          </Link>

          <header className="border-l-2 border-primary/35 pl-5 md:pl-6">
            <span className="inline-flex items-center rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium tracking-wide text-primary">
              {legalCopy.shell.documentEyebrow}
            </span>
            <h1 className="mt-3 font-heading text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
              {title}
            </h1>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg md:leading-8">
              {intro}
            </p>
            <LastUpdatedBadge className="mt-5" />
          </header>

          {showSubnav ? <LegalSubnav className="mt-8 md:mt-10" /> : null}

          <article className="mt-10 md:mt-12">{children}</article>

          {showPager ? <LegalDocPager /> : null}
        </div>
      </SiteContainer>
    </section>
  );
}
