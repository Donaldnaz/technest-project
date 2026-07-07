import Link from "next/link";
import { Accessibility, ChevronRight, FileText, ShieldCheck } from "lucide-react";

import { legalCopy } from "@/lib/copy/legal";
import { legalNavLinks } from "@/lib/landing/navigation";
import { focusRingClassName } from "@/lib/landing/nav-link-styles";
import { cn } from "@/lib/utils";

const hubCardMeta = {
  privacy: {
    icon: ShieldCheck,
    accent:
      "bg-sage-100/80 text-sage-800 dark:bg-sage-950/40 dark:text-sage-200",
  },
  terms: {
    icon: FileText,
    accent:
      "bg-lavender-100/80 text-lavender-900 dark:bg-lavender-950/40 dark:text-lavender-100",
  },
  accessibility: {
    icon: Accessibility,
    accent:
      "bg-teal-100/80 text-teal-800 dark:bg-teal-950/40 dark:text-teal-200",
  },
} as const;

type LegalHubCardsProps = {
  className?: string;
};

export function LegalHubCards({ className }: LegalHubCardsProps) {
  const pages = legalNavLinks.map((link) => {
    const key = link.href.replace("/legal/", "") as keyof typeof legalCopy.pages;
    const meta = hubCardMeta[key];

    return {
      href: link.href,
      label: link.label,
      title: legalCopy.pages[key].title,
      description: legalCopy.pages[key].description,
      icon: meta.icon,
      accent: meta.accent,
    };
  });

  return (
    <div className={className}>
      <p className="mb-5 text-sm font-medium tracking-wide text-muted-foreground">
        {legalCopy.index.cardsLabel}
      </p>
      <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {pages.map((page) => {
          const Icon = page.icon;

          return (
            <li key={page.href} className="flex">
              <Link
                href={page.href}
                className={cn(
                  "health-card group flex h-full w-full flex-col rounded-2xl border border-border/40 p-5 transition-colors duration-200 hover:border-border/70 md:p-6",
                  focusRingClassName,
                )}
              >
                <div className="flex items-start gap-3">
                  <div
                    className={cn(
                      "flex size-9 shrink-0 items-center justify-center rounded-lg",
                      page.accent,
                    )}
                  >
                    <Icon className="size-4" aria-hidden />
                  </div>
                  <div className="min-w-0 flex-1">
                    <span className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                      {page.label}
                    </span>
                    <h2 className="mt-0.5 font-heading text-lg font-semibold tracking-tight text-foreground transition-colors group-hover:text-primary">
                      {page.title}
                    </h2>
                  </div>
                  <ChevronRight
                    className="mt-0.5 size-4 shrink-0 text-muted-foreground/70 transition-transform group-hover:translate-x-0.5 group-hover:text-primary"
                    aria-hidden
                  />
                </div>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  {page.description}
                </p>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
