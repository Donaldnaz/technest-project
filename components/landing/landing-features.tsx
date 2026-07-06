import {
  Calendar,
  FileHeart,
  HeartHandshake,
  LineChart,
  Lock,
  Pill,
} from "lucide-react";

const features = [
  {
    icon: HeartHandshake,
    title: "A calmer care experience",
    description:
      "Soft colors and clear layouts help you focus on people — not paperwork — during long days of patient care.",
    accent: "bg-sage-100 text-sage-800 dark:bg-sage-950/50 dark:text-sage-200",
  },
  {
    icon: FileHeart,
    title: "Medical records in one place",
    description:
      "Lab reports, referrals, and imaging stay organized with each patient so nothing gets lost between visits.",
    accent: "bg-teal-100 text-teal-800 dark:bg-teal-950/50 dark:text-teal-200",
  },
  {
    icon: LineChart,
    title: "Daily health at a glance",
    description:
      "Heart rate, sleep, activity, and blood sugar trends — easy to read micro-cards with gentle 7-day charts.",
    accent: "bg-lavender-100 text-lavender-900 dark:bg-lavender-950/50 dark:text-lavender-100",
  },
  {
    icon: Pill,
    title: "Medication reminders",
    description:
      "A visual pillbox makes daily doses feel manageable — tap to mark taken and celebrate small wins.",
    accent: "bg-terracotta-100 text-terracotta-900 dark:bg-terracotta-900/50 dark:text-terracotta-100",
  },
  {
    icon: Calendar,
    title: "Unified care timeline",
    description:
      "Appointments, medication times, and lab releases flow together so you always know what comes next.",
    accent: "bg-amber-100 text-amber-900 dark:bg-amber-950/40 dark:text-amber-200",
  },
  {
    icon: Lock,
    title: "Your health, kept private",
    description:
      "Medical information stays between you and your care team — protected, personal, and never shared without you.",
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
            Everything your care journey needs
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Vitals, appointments, prescriptions, and records — brought together
            in a warm space that feels like care, not a computer system.
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
