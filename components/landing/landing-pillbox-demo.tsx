"use client";

import { useState } from "react";
import { Check, Pill } from "lucide-react";

import { ConfettiBurst } from "@/components/landing/confetti-burst";
import { cn } from "@/lib/utils";

type MedPill = {
  id: string;
  label: string;
  dose: string;
  shape: "round" | "capsule";
  colorClass: string;
};

const pills: MedPill[] = [
  {
    id: "metformin",
    label: "Metformin",
    dose: "500 mg · morning",
    shape: "round",
    colorClass:
      "bg-rose-200 text-rose-900 dark:bg-rose-900/40 dark:text-rose-100",
  },
  {
    id: "vitamin-d",
    label: "Vitamin D",
    dose: "1000 IU · with food",
    shape: "capsule",
    colorClass:
      "bg-sky-200 text-sky-900 dark:bg-sky-950/50 dark:text-sky-100",
  },
  {
    id: "aspirin",
    label: "Low-dose aspirin",
    dose: "81 mg · evening",
    shape: "round",
    colorClass:
      "bg-sage-200 text-sage-800 dark:bg-sage-950/50 dark:text-sage-100",
  },
];

export function LandingPillboxDemo() {
  const [taken, setTaken] = useState<Record<string, boolean>>({});
  const allTaken = pills.every((pill) => taken[pill.id]);
  const showCelebration = allTaken && Object.keys(taken).length > 0;

  function toggle(id: string) {
    setTaken((prev) => ({ ...prev, [id]: !prev[id] }));
  }

  return (
    <div className="relative health-card rounded-2xl p-5 md:p-6">
      <ConfettiBurst active={showCelebration} />

      <div className="relative z-10">
        <h3 className="mb-5 font-heading text-lg font-semibold">
          Today&apos;s pillbox
        </h3>

        <div className="flex flex-wrap justify-center gap-8 sm:justify-start">
          {pills.map((pill) => {
            const isTaken = taken[pill.id];
            return (
              <button
                key={pill.id}
                type="button"
                onClick={() => toggle(pill.id)}
                className="flex cursor-pointer flex-col items-center gap-2 text-center transition-transform hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                aria-pressed={isTaken}
                aria-label={`Mark ${pill.label} as taken`}
              >
                <span
                  className={cn(
                    "relative flex items-center justify-center shadow-md transition-all duration-300",
                    pill.shape === "round"
                      ? "size-[4.5rem] rounded-full"
                      : "h-14 w-[5.5rem] rounded-full",
                    pill.colorClass,
                    isTaken &&
                      "scale-95 opacity-90 ring-2 ring-primary ring-offset-2",
                  )}
                >
                  <Pill className="size-6 opacity-70" aria-hidden />
                  {isTaken && (
                    <span className="absolute -right-1 -top-1 flex size-7 items-center justify-center rounded-full bg-primary text-primary-foreground shadow">
                      <Check className="size-4" aria-hidden />
                    </span>
                  )}
                </span>
                <span className="text-sm font-medium">{pill.label}</span>
                <span className="text-xs text-muted-foreground">{pill.dose}</span>
              </button>
            );
          })}
        </div>

        {showCelebration && (
          <p
            className="mt-5 rounded-2xl bg-primary/10 px-4 py-3 text-center text-sm font-medium text-primary"
            role="status"
          >
            All done for today.
          </p>
        )}
      </div>
    </div>
  );
}
