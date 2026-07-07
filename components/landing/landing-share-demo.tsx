import { FileUp } from "lucide-react";

import { landingCopy } from "@/lib/copy/landing";

export function LandingShareDemo() {
  const { activity } = landingCopy.experience;

  return (
    <div className="space-y-6">
      <section
        className="health-card relative overflow-hidden rounded-2xl p-5 shadow-md shadow-primary/5 md:p-6 dark:shadow-primary/5"
        aria-labelledby="landing-activity-heading"
      >
        <div
          className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute -right-10 -top-10 size-28 rounded-full bg-primary/8 blur-2xl"
          aria-hidden
        />

        <div className="relative mb-4 space-y-1">
          <h3 id="landing-activity-heading" className="font-heading text-lg font-semibold">
            {activity.title}
          </h3>
          <p className="text-sm text-muted-foreground">{activity.description}</p>
        </div>

        <ol className="relative space-y-3">
          {activity.items.map((item) => (
            <li
              key={item.title}
              className="relative rounded-2xl bg-card/85 p-3 shadow-sm transition-transform duration-300 hover:-translate-y-0.5 dark:bg-card/65 motion-reduce:transition-none motion-reduce:hover:translate-y-0"
            >
              <div className="flex gap-3">
                <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary shadow-sm">
                  <FileUp className="size-4" aria-hidden />
                </div>
                <div className="min-w-0 flex-1 pt-0.5">
                  <p className="font-medium leading-snug">{item.title}</p>
                  <p className="text-sm text-muted-foreground">{item.subtitle}</p>
                </div>
              </div>
            </li>
          ))}
        </ol>
      </section>
    </div>
  );
}
