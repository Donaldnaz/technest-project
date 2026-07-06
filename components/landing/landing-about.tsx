import { HeartHandshake, Moon, Users } from "lucide-react";

import { SectionHeader } from "@/components/layout/section-header";
import { SiteContainer } from "@/components/layout/site-container";

const highlights = [
  {
    icon: Users,
    title: "Patients & caregivers",
    description:
      "Upload for yourself or someone you care for, then share with their doctor.",
  },
  {
    icon: HeartHandshake,
    title: "Consent-first sharing",
    description:
      "Providers only see what you invite them to — and you can revoke access anytime.",
  },
  {
    icon: Moon,
    title: "Private by default",
    description:
      "Records are stored securely and opened only through your signed-in account.",
  },
];

export function LandingAbout() {
  return (
    <section
      id="about"
      className="site-section border-t border-border/50 bg-gradient-to-br from-oat-50/60 via-background to-lavender-100/30 dark:from-charcoal-950/40 dark:via-background dark:to-charcoal-950/30"
    >
      <SiteContainer className="py-16 md:py-24">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
          <SectionHeader
            eyebrow="About us"
            title="Health records that feel human"
            description="iCare was built so uploading and sharing medical records feels calm — not like hospital software. Patients stay in control; providers get what they need before the visit."
          />

          <div className="space-y-4">
            {highlights.map((item) => (
              <article
                key={item.title}
                className="health-card flex gap-4 rounded-2xl p-5 transition-transform duration-300 hover:-translate-y-0.5"
              >
                <div className="flex size-11 shrink-0 items-center justify-center rounded-2xl bg-primary/15 text-primary">
                  <item.icon className="size-5" aria-hidden />
                </div>
                <div>
                  <h3 className="font-heading font-semibold">{item.title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                    {item.description}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </SiteContainer>
    </section>
  );
}
