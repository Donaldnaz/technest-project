import Link from "next/link";

import { AuthSiteHeader } from "@/components/layout/auth-site-header";
import { SkipLink } from "@/components/layout/skip-link";
import { SiteContainer } from "@/components/layout/site-container";
import { legalNavLinks } from "@/lib/landing/navigation";

export const dynamic = "force-dynamic";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <SkipLink />
      <AuthSiteHeader />
      <div className="flex-1">{children}</div>
      <footer className="border-t border-border/50 bg-muted/20">
        <SiteContainer className="flex flex-col items-center justify-between gap-3 py-4 sm:flex-row">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} iCare
          </p>
          <nav aria-label="Legal" className="flex flex-wrap justify-center gap-4 text-xs">
            {legalNavLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </SiteContainer>
      </footer>
    </div>
  );
}
