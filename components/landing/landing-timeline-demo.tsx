"use client";

import {
  Calendar,
  FlaskConical,
  Pill,
  Stethoscope,
} from "lucide-react";

const timelineItems = [
  {
    id: "1",
    icon: Calendar,
    title: "Annual checkup with Dr. Lee",
    subtitle: "Today · 2:30 PM",
    accent: "bg-teal-100 text-teal-800 dark:bg-teal-950/50 dark:text-teal-200",
  },
  {
    id: "2",
    icon: Pill,
    title: "Metformin — evening dose",
    subtitle: "In 3 hours",
    accent: "bg-lavender-100 text-lavender-900 dark:bg-lavender-950/50 dark:text-lavender-100",
  },
  {
    id: "3",
    icon: FlaskConical,
    title: "CBC lab results",
    subtitle: "Ready to review",
    accent: "bg-terracotta-100 text-terracotta-900 dark:bg-terracotta-900/50 dark:text-terracotta-100",
  },
  {
    id: "4",
    icon: Stethoscope,
    title: "Physical therapy follow-up",
    subtitle: "Thu · 10:00 AM",
    accent: "bg-sage-100 text-sage-800 dark:bg-sage-950/50 dark:text-sage-200",
  },
];

export function LandingTimelineDemo() {
  return (
    <section
      className="health-card h-full rounded-2xl p-5 md:p-6"
      aria-labelledby="care-timeline-heading"
    >
      <h3 id="care-timeline-heading" className="mb-1 font-heading text-lg font-semibold">
        What&apos;s next
      </h3>
      <p className="mb-5 text-sm text-muted-foreground">
        Appointments, doses, and lab results in one flow.
      </p>

      <ol className="relative space-y-0">
        {timelineItems.map((item, index) => (
          <li key={item.id} className="relative flex gap-4 pb-6 last:pb-0">
            {index < timelineItems.length - 1 && (
              <span
                className="absolute left-5 top-10 h-[calc(100%-1rem)] w-px bg-border"
                aria-hidden
              />
            )}
            <div
              className={`flex size-10 shrink-0 items-center justify-center rounded-full ${item.accent}`}
            >
              <item.icon className="size-4" aria-hidden />
            </div>
            <div className="min-w-0 flex-1 pt-1">
              <p className="font-medium leading-snug">{item.title}</p>
              <p className="text-sm text-muted-foreground">{item.subtitle}</p>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}
