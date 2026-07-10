import {
  FileCheck2,
  FileHeart,
  HeartHandshake,
  Lock,
  Share2,
  Upload,
} from "lucide-react";

const features = [
  {
    icon: Upload,
    title: "Secure health record upload",
    description:
      "Add PDFs and photos of lab reports, imaging, and visit notes. Every file is encrypted in transit and stored in your private folder.",
    accent: "bg-teal-100 text-teal-800 dark:bg-teal-950/50 dark:text-teal-200",
  },
  {
    icon: FileCheck2,
    title: "Plain English summaries",
    description:
      "Read organized summaries in everyday language — reviewed by a practitioner on your care team before they are finalized.",
    accent: "bg-sage-100 text-sage-800 dark:bg-sage-950/50 dark:text-sage-200",
  },
  {
    icon: FileHeart,
    title: "Health records in one place",
    description:
      "Lab reports, referrals, and imaging stay organized in your health folder so nothing gets lost between visits.",
    accent: "bg-lavender-100 text-lavender-900 dark:bg-lavender-950/50 dark:text-lavender-100",
  },
  {
    icon: Share2,
    title: "Share on your terms",
    description:
      "Send selected records to your practitioner or clinic when you choose — you stay in control of who sees your information.",
    accent: "bg-amber-100 text-amber-900 dark:bg-amber-950/40 dark:text-amber-200",
  },
  {
    icon: HeartHandshake,
    title: "Built for patients and caregivers",
    description:
      "Upload for yourself or someone you care for, with clear status labels so you always know what is ready or under review.",
    accent: "bg-terracotta-100 text-terracotta-900 dark:bg-terracotta-900/50 dark:text-terracotta-100",
  },
  {
    icon: Lock,
    title: "Private by default",
    description:
      "Your health information stays between you and practitioners you authorize — protected, personal, and never shared without you.",
    accent: "bg-primary/15 text-primary",
  },
];

export function LandingFeatures() {
  return (
    <section
      id="features"
      className="border-t border-border/50 bg-muted/20 px-4 py-20 md:px-6 md:py-28"
    >
      <div className="mx-auto max-w-6xl">
        <div className="mx-auto mb-14 max-w-2xl text-center">
          <p className="text-sm font-medium uppercase tracking-wider text-primary">
            Features
          </p>
          <h2 className="mt-3 font-heading text-3xl font-semibold tracking-tight md:text-4xl">
            Everything you need to manage health records
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Secure upload, AI-reviewed plain English summaries, and
            sharing with your care team — in a calm portal designed for real
            people, not hospital IT departments.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <article
              key={feature.title}
              className="health-card group rounded-3xl p-6 transition-transform hover:-translate-y-1"
            >
              <div
                className={`mb-4 flex size-12 items-center justify-center rounded-2xl ${feature.accent}`}
              >
                <feature.icon className="size-6" aria-hidden />
              </div>
              <h3 className="font-heading text-lg font-semibold">
                {feature.title}
              </h3>
              <p className="mt-2 leading-relaxed text-muted-foreground">
                {feature.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
