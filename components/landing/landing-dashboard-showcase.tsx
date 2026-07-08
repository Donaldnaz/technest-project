"use client";

import { LandingShareDemo } from "@/components/landing/landing-share-demo";
import { LandingUploadDemo } from "@/components/landing/landing-upload-demo";
import { LandingWelcomeStrip } from "@/components/landing/landing-welcome-strip";
import { SectionHeader } from "@/components/layout/section-header";
import { SiteContainer } from "@/components/layout/site-container";
import { landingCopy } from "@/lib/copy/landing";

export function LandingDashboardShowcase() {
  const { experience } = landingCopy;

  return (
    <section
      id="experience"
      className="site-section scroll-mt-20 border-t border-border/50 bg-gradient-to-b from-oat-50/80 via-lavender-100/20 to-background dark:from-charcoal-950/50 dark:via-charcoal-950/30 dark:to-background"
    >
      <SiteContainer className="py-16 md:py-24">
        <SectionHeader
          eyebrow={experience.eyebrow}
          title={experience.title}
          description={experience.description}
          align="center"
          className="mb-8 md:mb-10"
        />

        <div className="landing-hero-stage relative px-2 py-4 sm:px-4">
          <div
            className="pointer-events-none absolute -right-3 top-10 -z-10 h-[72%] w-14 skew-x-[-10deg] rounded-2xl bg-gradient-to-b from-primary/14 via-primary/6 to-transparent max-lg:skew-x-0"
            aria-hidden
          />

          <div className="transition-transform duration-300 ease-out lg:rotate-1 lg:hover:-translate-y-1 motion-reduce:transform-none">
            <div className="relative overflow-hidden rounded-[1.75rem] bg-muted/40 p-4 shadow-xl shadow-primary/10 ring-1 ring-border/40 md:p-6 dark:bg-muted/15 dark:shadow-primary/5">
              <div
                className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/25 to-transparent"
                aria-hidden
              />
              <div
                className="pointer-events-none absolute -right-16 -top-16 size-48 rounded-full bg-primary/8 blur-3xl"
                aria-hidden
              />
              <div
                className="pointer-events-none absolute -bottom-20 left-1/4 size-40 rounded-full bg-accent/15 blur-3xl"
                aria-hidden
              />

              <div className="relative space-y-6">
                <LandingWelcomeStrip />

                <div className="grid gap-6 lg:grid-cols-12 lg:gap-8">
                  <div className="order-2 space-y-6 lg:order-1 lg:col-span-8">
                    <LandingUploadDemo />
                  </div>
                  <div className="order-1 lg:order-2 lg:col-span-4">
                    <LandingShareDemo />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div
            className="pointer-events-none absolute -bottom-4 -left-4 -z-10 size-full rounded-[1.75rem] bg-primary/8 blur-xl"
            aria-hidden
          />
        </div>
      </SiteContainer>
    </section>
  );
}
