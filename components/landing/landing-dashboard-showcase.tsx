"use client";

import { LandingPillboxDemo } from "@/components/landing/landing-pillbox-demo";
import { LandingTimelineDemo } from "@/components/landing/landing-timeline-demo";
import { LandingVitalsDemo } from "@/components/landing/landing-vitals-demo";
import { LandingWelcomeStrip } from "@/components/landing/landing-welcome-strip";
import { SectionHeader } from "@/components/layout/section-header";
import { SiteContainer } from "@/components/layout/site-container";

export function LandingDashboardShowcase() {
  return (
    <section
      id="experience"
      className="site-section border-t border-border/50 bg-gradient-to-b from-oat-50/80 via-lavender-100/20 to-background dark:from-charcoal-950/50 dark:via-charcoal-950/30 dark:to-background"
    >
      <SiteContainer className="py-16 md:py-24">
        <SectionHeader
          eyebrow="Platform"
          title="Your daily care dashboard"
          description="Vitals at center stage, what's next on the right, and a visual pillbox below — tap through the demo to feel the calm."
          align="center"
          className="mb-8 md:mb-10"
        />

        <div className="rounded-[1.75rem] bg-muted/40 p-4 ring-1 ring-border/40 md:p-6 dark:bg-muted/15">
          <div className="space-y-6">
            <LandingWelcomeStrip />

            <div className="grid gap-6 lg:grid-cols-12 lg:gap-8">
              <div className="order-2 space-y-6 lg:order-1 lg:col-span-8">
                <LandingVitalsDemo />
                <LandingPillboxDemo />
              </div>
              <div className="order-1 lg:order-2 lg:col-span-4">
                <LandingTimelineDemo />
              </div>
            </div>
          </div>
        </div>
      </SiteContainer>
    </section>
  );
}
