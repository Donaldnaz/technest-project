"use client";

import { LandingHeroPreview } from "@/components/landing/landing-hero-preview";
import { SiteContainer } from "@/components/layout/site-container";
import { landingCopy } from "@/lib/copy/landing";

export function LandingHero() {
  const { hero } = landingCopy;

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-oat-50/80 via-background to-background dark:from-charcoal-950/60 dark:via-background">
      <div
        className="pointer-events-none absolute -left-24 top-0 size-96 rounded-full bg-teal-100/50 blur-3xl dark:bg-teal-950/25 max-lg:hidden"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -right-16 top-32 size-80 rounded-full bg-lavender-100/40 blur-3xl dark:bg-lavender-950/15 max-lg:hidden"
        aria-hidden
      />

      <SiteContainer className="relative py-16 md:py-24 lg:py-28">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div className="space-y-7">
            <p className="inline-flex items-center rounded-full border border-sage-200/80 bg-sage-100/60 px-4 py-1.5 text-sm font-medium text-sage-800 dark:border-sage-800 dark:bg-sage-950/40 dark:text-sage-200">
              {hero.eyebrow}
            </p>

            <h1 className="font-heading text-4xl font-semibold leading-[1.12] tracking-tight md:text-5xl lg:text-[3.25rem]">
              {hero.headline}{" "}
              <span className="text-primary">{hero.headlineAccent}</span>
            </h1>

            <p className="max-w-lg text-lg leading-relaxed text-muted-foreground">
              {hero.body}
            </p>

            <p className="text-sm text-muted-foreground">{hero.tags}</p>
          </div>

          <div className="relative overflow-visible px-2 py-4 sm:px-4">
            <LandingHeroPreview />
          </div>
        </div>
      </SiteContainer>
    </section>
  );
}
