import { LandingContactDetails } from "@/components/landing/landing-contact-details";
import { SectionHeader } from "@/components/layout/section-header";
import { SiteContainer } from "@/components/layout/site-container";
import { landingCopy } from "@/lib/copy/landing";

export function LandingContact() {
  const { contact } = landingCopy;

  return (
    <section
      id="contact"
      className="site-section scroll-mt-20 border-t border-border/50 bg-gradient-to-b from-background to-oat-50/40 dark:to-charcoal-950/30"
    >
      <SiteContainer className="py-16 md:py-24">
        <div className="grid items-start gap-10 lg:grid-cols-12 lg:gap-14">
          <SectionHeader
            eyebrow={contact.eyebrow}
            title={contact.title}
            description={contact.description}
            className="lg:col-span-5 lg:pt-2"
          />

          <LandingContactDetails
            className="lg:col-span-7"
            phoneLabel={contact.phoneLabel}
            emailLabel={contact.emailLabel}
            addressLabel={contact.addressLabel}
            hoursLabel={contact.hoursLabel}
            hours={contact.hours}
            responseNote={contact.responseNote}
          />
        </div>
      </SiteContainer>
    </section>
  );
}
