import { Mail, MapPin, Phone } from "lucide-react";

import { LinkButton } from "@/components/ui/link-button";
import { SectionHeader } from "@/components/layout/section-header";
import { SiteContainer } from "@/components/layout/site-container";
import {
  contactEmail,
  contactPhone,
  headquartersAddress,
  headquartersAddressLines,
} from "@/lib/landing/navigation";

const contactTelHref = `tel:${contactPhone.replace(/[^\d+]/g, "")}`;

export function LandingContact() {
  return (
    <section id="contact" className="site-section scroll-mt-20">
      <SiteContainer className="py-16 md:py-24">
        <div className="health-card relative mx-auto max-w-4xl overflow-hidden rounded-3xl p-6 sm:p-8 md:p-10">
          <div
            className="pointer-events-none absolute -right-10 -top-10 size-32 rounded-full bg-lavender-100/60 blur-2xl dark:bg-lavender-950/30"
            aria-hidden
          />

          <div className="relative mx-auto max-w-3xl">
            <SectionHeader
              eyebrow="Contact us"
              title="We'd love to hear from you"
              description="Questions about iCare? Reach out anytime."
              align="center"
            />

            <div className="mt-10 grid gap-5 md:grid-cols-3 md:gap-6">
              <div className="flex h-full flex-col rounded-2xl border border-border/50 bg-muted/20 p-6">
                <div className="flex size-12 items-center justify-center rounded-2xl bg-primary/15 text-primary">
                  <Mail className="size-5" aria-hidden />
                </div>
                <div className="mt-4 space-y-1">
                  <p className="text-sm font-semibold">Email</p>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    We typically respond within 1–2 business days.
                  </p>
                </div>
                <div className="mt-auto pt-5">
                  <LinkButton
                    href={`mailto:${contactEmail}`}
                    size="lg"
                    className="w-full rounded-xl"
                  >
                    {contactEmail}
                  </LinkButton>
                </div>
              </div>

              <div className="flex h-full flex-col rounded-2xl border border-border/50 bg-muted/20 p-6">
                <div className="flex size-12 items-center justify-center rounded-2xl bg-primary/15 text-primary">
                  <Phone className="size-5" aria-hidden />
                </div>
                <div className="mt-4 space-y-1">
                  <p className="text-sm font-semibold">Phone</p>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    Call us if you need help with your account or uploads.
                  </p>
                </div>
                <div className="mt-auto pt-5">
                  <LinkButton
                    href={contactTelHref}
                    size="lg"
                    variant="outline"
                    className="w-full rounded-xl"
                  >
                    {contactPhone}
                  </LinkButton>
                </div>
              </div>

              <address className="flex h-full flex-col rounded-2xl border border-border/50 bg-muted/20 p-6 not-italic">
                <div className="flex size-12 items-center justify-center rounded-2xl bg-primary/15 text-primary">
                  <MapPin className="size-5" aria-hidden />
                </div>
                <div className="mt-4 space-y-1">
                  <p className="text-sm font-semibold">
                    {headquartersAddress.name}
                  </p>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    Our home base in California
                  </p>
                </div>
                <p className="mt-auto pt-5 text-sm leading-relaxed text-foreground/90">
                  {headquartersAddressLines.map((line) => (
                    <span key={line} className="block">
                      {line}
                    </span>
                  ))}
                </p>
              </address>
            </div>
          </div>
        </div>
      </SiteContainer>
    </section>
  );
}
