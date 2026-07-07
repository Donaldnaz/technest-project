import { HeartHandshake, Moon, Users } from "lucide-react";

import { SectionHeader } from "@/components/layout/section-header";
import { SiteContainer } from "@/components/layout/site-container";
import { landingCopy } from "@/lib/copy/landing";

const highlightIcons = [Users, HeartHandshake, Moon] as const;

export function LandingAbout() {
  const { about } = landingCopy;

  return (
    <section
      id="about"
      className="site-section scroll-mt-20 border-t border-border/50 bg-gradient-to-br from-oat-50/60 via-background to-lavender-100/30 dark:from-charcoal-950/40 dark:via-background dark:to-charcoal-950/30"
    >
      <SiteContainer className="py-16 md:py-24">
        <SectionHeader
          eyebrow={about.eyebrow}
          title={about.title}
          description={about.description}
          align="center"
          className="mx-auto max-w-3xl"
        />

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {about.highlights.map((item, index) => {
            const Icon = highlightIcons[index] ?? Users;

            return (
              <article
                key={item.title}
                className="health-card flex h-full flex-col gap-4 rounded-2xl p-6 transition-transform duration-300 hover:-translate-y-0.5"
              >
                <div className="flex size-11 shrink-0 items-center justify-center rounded-2xl bg-primary/15 text-primary">
                  <Icon className="size-5" aria-hidden />
                </div>
                <div>
                  <h3 className="font-heading text-lg font-semibold">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {item.description}
                  </p>
                </div>
              </article>
            );
          })}
        </div>
      </SiteContainer>
    </section>
  );
}
