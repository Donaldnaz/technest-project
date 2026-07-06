import { Mail } from "lucide-react";

import { LinkButton } from "@/components/ui/link-button";
import { SectionHeader } from "@/components/layout/section-header";
import { SiteContainer } from "@/components/layout/site-container";
import { contactEmail } from "@/lib/landing/navigation";

export function LandingContact() {
  return (
    <section id="contact" className="site-section">
      <SiteContainer className="py-16 md:py-24">
        <div className="health-card relative mx-auto max-w-xl overflow-hidden rounded-3xl p-8 text-center md:p-10">
          <div
            className="pointer-events-none absolute -right-10 -top-10 size-32 rounded-full bg-lavender-100/60 blur-2xl dark:bg-lavender-950/30"
            aria-hidden
          />

          <div className="relative">
            <SectionHeader
              eyebrow="Contact us"
              title="We'd love to hear from you"
              description="Questions about iCare? Reach out anytime."
              align="center"
            />

            <div className="mt-6 flex flex-col items-center gap-4">
              <div className="flex size-14 items-center justify-center rounded-2xl bg-primary/15 text-primary">
                <Mail className="size-6" aria-hidden />
              </div>
              <p className="text-sm text-muted-foreground">
                We typically respond within 1–2 business days.
              </p>
              <LinkButton
                href={`mailto:${contactEmail}`}
                size="lg"
                className="rounded-2xl"
              >
                {contactEmail}
              </LinkButton>
            </div>
          </div>
        </div>
      </SiteContainer>
    </section>
  );
}
