import {
  Activity,
  CalendarHeart,
  FileHeart,
  HeartHandshake,
  LineChart,
  Pill,
} from "lucide-react";

import { SectionHeader } from "@/components/layout/section-header";
import { SiteContainer } from "@/components/layout/site-container";

const offerings = [
  {
    icon: HeartHandshake,
    title: "A calmer care experience",
    description:
      "Soft colors and clear layouts help you focus on your health — not paperwork.",
    accent: "bg-sage-100 text-sage-800 dark:bg-sage-950/50 dark:text-sage-200",
  },
  {
    icon: Activity,
    title: "Daily vitals at a glance",
    description:
      "Heart rate, sleep, activity, and more — with gentle trend lines that are easy to read.",
    accent: "bg-rose-100 text-rose-800 dark:bg-rose-950/40 dark:text-rose-200",
  },
  {
    icon: CalendarHeart,
    title: "Care timeline",
    description:
      "Appointments, doses, and lab results in one flowing view so you always know what's next.",
    accent: "bg-teal-100 text-teal-800 dark:bg-teal-950/50 dark:text-teal-200",
  },
  {
    icon: FileHeart,
    title: "Medical records in one place",
    description:
      "Lab reports, referrals, and imaging stay organized with plain-language summaries.",
    accent: "bg-terracotta-100 text-terracotta-900 dark:bg-terracotta-900/50 dark:text-terracotta-100",
  },
  {
    icon: Pill,
    title: "Visual pillbox",
    description:
      "Today's medications as friendly, tappable shapes — with a little celebration when you're done.",
    accent: "bg-lavender-100 text-lavender-900 dark:bg-lavender-950/50 dark:text-lavender-100",
  },
  {
    icon: LineChart,
    title: "Share with providers",
    description:
      "Upload records securely and share with your doctor when you are ready.",
    accent: "bg-amber-100 text-amber-900 dark:bg-amber-950/40 dark:text-amber-200",
  },
];

export function LandingWhatWeDo() {
  return (
    <section id="what-we-do" className="site-section border-t border-border/50">
      <SiteContainer className="py-16 md:py-24">
        <SectionHeader
          eyebrow="What we do"
          title="Everything you need, nothing overwhelming"
          description="iCare brings vitals, timelines, medications, and records into one warm, readable home."
          align="center"
          className="mb-10 md:mb-12"
        />

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {offerings.map((item) => (
            <article
              key={item.title}
              className="health-card group rounded-3xl p-6 transition-transform duration-300 hover:-translate-y-0.5"
            >
              <div
                className={`mb-4 flex size-12 items-center justify-center rounded-2xl transition-transform duration-300 group-hover:scale-105 ${item.accent}`}
              >
                <item.icon className="size-6" aria-hidden />
              </div>
              <h3 className="font-heading text-lg font-semibold">{item.title}</h3>
              <p className="mt-2 leading-relaxed text-muted-foreground">
                {item.description}
              </p>
            </article>
          ))}
        </div>
      </SiteContainer>
    </section>
  );
}
