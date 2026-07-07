import { FooterLegalLinks } from "@/components/legal/legal-footer-links";
import { LandingNavLink } from "@/components/landing/landing-nav-link";
import { SiteBrandLink } from "@/components/layout/site-brand-link";
import { SiteContainer } from "@/components/layout/site-container";
import {
  contactEmail,
  contactPhone,
  footerCompanyLinks,
  footerProductLinks,
  headquartersAddressLines,
} from "@/lib/landing/navigation";
import { focusRingClassName } from "@/lib/landing/nav-link-styles";
import { landingCopy } from "@/lib/copy/landing";
import { cn } from "@/lib/utils";

const contactTelHref = `tel:${contactPhone.replace(/[^\d+]/g, "")}`;

const footerLinkClassName = cn(
  "inline-block py-1 text-sm text-muted-foreground transition-colors hover:text-foreground",
  focusRingClassName,
);

function FooterNavColumn({
  title,
  links,
  children,
}: {
  title: string;
  links?: { href: string; label: string }[];
  children?: React.ReactNode;
}) {
  return (
    <nav aria-label={title} className="min-w-0">
      <h2 className="font-heading text-sm font-semibold text-foreground">
        {title}
      </h2>
      <ul className="mt-3 space-y-0.5">
        {links
          ? links.map((link) => (
              <li key={link.href}>
                <LandingNavLink
                  href={link.href}
                  label={link.label}
                  className={footerLinkClassName}
                />
              </li>
            ))
          : children}
      </ul>
    </nav>
  );
}

function FooterContactColumn() {
  return (
    <div className="min-w-0">
      <h2 className="font-heading text-sm font-semibold text-foreground">
        Contact
      </h2>
      <address className="mt-3 space-y-1 text-sm not-italic leading-relaxed text-muted-foreground">
        <a href={`mailto:${contactEmail}`} className={footerLinkClassName}>
          {contactEmail}
        </a>
        <a href={contactTelHref} className={footerLinkClassName}>
          {contactPhone}
        </a>
        <span className="block pt-2 leading-relaxed">
          {headquartersAddressLines.map((line) => (
            <span key={line} className="block">
              {line}
            </span>
          ))}
        </span>
      </address>
    </div>
  );
}

export function LandingFooter() {
  return (
    <footer className="border-t border-border/50 bg-muted/20">
      <SiteContainer className="py-12 md:py-14">
        <div className="grid items-start gap-10 lg:grid-cols-12 lg:gap-x-12 lg:gap-y-8">
          <div className="lg:col-span-4">
            <SiteBrandLink />
            <p className="mt-3 max-w-sm text-sm leading-relaxed text-muted-foreground">
              {landingCopy.footer.tagline}
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-4 lg:col-span-8 lg:gap-10">
            <FooterNavColumn title="Product" links={footerProductLinks} />
            <FooterNavColumn title="Company" links={footerCompanyLinks} />
            <FooterContactColumn />
            <FooterNavColumn title="Legal">
              <FooterLegalLinks />
            </FooterNavColumn>
          </div>
        </div>

        <p className="mt-10 border-t border-border/50 pt-6 text-sm text-muted-foreground">
          © {new Date().getFullYear()} iCare. All rights reserved.
        </p>
      </SiteContainer>
    </footer>
  );
}
