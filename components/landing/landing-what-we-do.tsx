import {
  FileHeart,
  FileText,
  FileUp,
  FolderOpen,
  HeartHandshake,
  Share2,
  Shield,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

import { SectionHeader } from "@/components/layout/section-header";
import { SiteContainer } from "@/components/layout/site-container";
import { landingCopy } from "@/lib/copy/landing";

const offeringIcons: LucideIcon[] = [
  FileUp,
  FolderOpen,
  FileText,
  Share2,
  Shield,
  HeartHandshake,
];

const offeringAccents = [
  "bg-teal-100 text-teal-800 dark:bg-teal-950/50 dark:text-teal-200",
  "bg-terracotta-100 text-terracotta-900 dark:bg-terracotta-900/50 dark:text-terracotta-100",
  "bg-sage-100 text-sage-800 dark:bg-sage-950/50 dark:text-sage-200",
  "bg-amber-100 text-amber-900 dark:bg-amber-950/40 dark:text-amber-200",
  "bg-lavender-100 text-lavender-900 dark:bg-lavender-950/50 dark:text-lavender-100",
  "bg-rose-100 text-rose-800 dark:bg-rose-950/40 dark:text-rose-200",
];

export function LandingWhatWeDo() {
  const { whatWeDo } = landingCopy;

  return (
    <section id="what-we-do" className="site-section scroll-mt-20 border-t border-border/50">
      <SiteContainer className="py-16 md:py-24">
        <SectionHeader
          eyebrow={whatWeDo.eyebrow}
          title={whatWeDo.title}
          description={whatWeDo.description}
          align="center"
          className="mb-10 md:mb-12"
        />

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {whatWeDo.offerings.map((item, index) => {
            const Icon = offeringIcons[index] ?? FileHeart;
            const accent = offeringAccents[index] ?? offeringAccents[0];

            return (
              <article
                key={item.title}
                className="health-card group rounded-3xl p-6 transition-transform duration-300 hover:-translate-y-0.5"
              >
                <div
                  className={`mb-4 flex size-12 items-center justify-center rounded-2xl transition-transform duration-300 group-hover:scale-105 ${accent}`}
                >
                  <Icon className="size-6" aria-hidden />
                </div>
                <h3 className="font-heading text-lg font-semibold">{item.title}</h3>
                <p className="mt-2 leading-relaxed text-muted-foreground">
                  {item.description}
                </p>
              </article>
            );
          })}
        </div>
      </SiteContainer>
    </section>
  );
}
