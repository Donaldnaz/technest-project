import { ArrowRight, Calendar, Pill, Stethoscope } from "lucide-react";

const steps = [
  {
    step: "01",
    icon: Stethoscope,
    title: "Set up your health profile",
    description:
      "Add the people you care for — names, dates of birth, and medical record numbers in a simple, gentle form.",
  },
  {
    step: "02",
    icon: Calendar,
    title: "Track visits and results",
    description:
      "Keep lab reports, referrals, and imaging with each patient so every appointment builds on what came before.",
  },
  {
    step: "03",
    icon: Pill,
    title: "Stay on top of daily care",
    description:
      "Use the care timeline and pillbox to see what is next — doses, follow-ups, and results ready to review.",
  },
];

export function LandingWorkflow() {
  return (
    <section id="how-it-works" className="px-4 py-20 md:px-6 md:py-28">
      <div className="mx-auto max-w-6xl">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          <div>
            <p className="text-sm font-medium uppercase tracking-wider text-primary">
              How it works
            </p>
            <h2 className="mt-3 font-heading text-3xl font-semibold tracking-tight md:text-4xl">
              Three gentle steps to better care
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
              iCare helps you stay present for the people who matter — with less
              hunting for files and more time for healing.
            </p>

            <div className="mt-10 space-y-8">
              {steps.map((item, index) => (
                <div key={item.step} className="flex gap-5">
                  <div className="flex flex-col items-center">
                    <div className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-primary/15 text-primary">
                      <item.icon className="size-5" aria-hidden />
                    </div>
                    {index < steps.length - 1 && (
                      <span className="mt-2 h-full w-px bg-border" aria-hidden />
                    )}
                  </div>
                  <div className="pb-2">
                    <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                      Step {item.step}
                    </p>
                    <h3 className="mt-1 font-heading text-lg font-semibold">
                      {item.title}
                    </h3>
                    <p className="mt-1 text-muted-foreground">
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="health-card rounded-3xl p-8">
            <div className="space-y-6">
              <div className="rounded-2xl bg-gradient-to-br from-teal-100/80 via-oat-50 to-sage-100/70 p-6 dark:from-teal-950/40 dark:via-charcoal-900 dark:to-sage-950/30">
                <p className="text-sm font-medium text-muted-foreground">
                  Today&apos;s pillbox
                </p>
                <div className="mt-4 flex gap-6">
                  <div className="flex flex-col items-center gap-2">
                    <span className="flex size-16 items-center justify-center rounded-full bg-rose-200 text-rose-900 shadow-md dark:bg-rose-900/40 dark:text-rose-100">
                      AM
                    </span>
                    <span className="text-xs text-muted-foreground">
                      Morning dose
                    </span>
                  </div>
                  <div className="flex flex-col items-center gap-2">
                    <span className="flex h-14 w-20 items-center justify-center rounded-full bg-sky-200 text-sky-900 shadow-md dark:bg-sky-950/50 dark:text-sky-100">
                      PM
                    </span>
                    <span className="text-xs text-muted-foreground">
                      Evening dose
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between rounded-2xl border border-border/60 bg-card p-4">
                <div>
                  <p className="text-sm font-medium">Rest Mode</p>
                  <p className="text-xs text-muted-foreground">
                    Easier on the eyes for late-night care
                  </p>
                </div>
                <div className="flex gap-1 rounded-xl bg-muted p-1">
                  <span className="rounded-lg bg-background px-2 py-1 text-xs">
                    Light
                  </span>
                  <span className="rounded-lg px-2 py-1 text-xs text-muted-foreground">
                    Dark
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2 text-sm font-medium text-primary">
                Open your care dashboard
                <ArrowRight className="size-4" aria-hidden />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
