import Link from "next/link";
import { HeartPulse } from "lucide-react";

import { LandingNavLink } from "@/components/landing/landing-nav-link";
import { SiteContainer } from "@/components/layout/site-container";
import { footerNavGroups } from "@/lib/landing/navigation";
import { landingNavLinkClassName } from "@/lib/landing/nav-link-styles";

export function LandingFooter() {
  return (
    <footer className="border-t border-border/50 bg-muted/20 py-12">
      <SiteContainer>
        <div className="flex flex-col gap-10">
          <div className="flex flex-col gap-3">
            <Link href="/" className="flex items-center gap-2.5">
              <HeartPulse className="size-5 text-primary" aria-hidden />
              <span className="font-heading text-lg font-semibold">
                i<span className="text-primary">Care</span>
              </span>
            </Link>
            <p className="max-w-sm text-sm text-muted-foreground">
              Compassionate care, beautifully organized.
            </p>
          </div>

          <div className="grid gap-8 sm:grid-cols-3">
            {footerNavGroups.map((group) => (
              <nav key={group.title} aria-label={group.title}>
                <h2 className="font-heading text-sm font-semibold">
                  {group.title}
                </h2>
                <ul className="mt-3 space-y-2">
                  {group.links.map((link) => (
                    <li key={link.href}>
                      <LandingNavLink
                        href={link.href}
                        label={link.label}
                        className={landingNavLinkClassName()}
                      />
                    </li>
                  ))}
                </ul>
              </nav>
            ))}
          </div>

          <p className="border-t border-border/50 pt-6 text-sm text-muted-foreground">
            © {new Date().getFullYear()} iCare. All rights reserved.
          </p>
        </div>
      </SiteContainer>
    </footer>
  );
}
