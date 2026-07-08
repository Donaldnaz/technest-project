"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import {
  onboardingSectionIds,
  patientOnboardingCopy,
} from "@/lib/copy/patient/onboarding";
import { cn } from "@/lib/utils";

const steps = [
  {
    id: onboardingSectionIds.account,
    label: patientOnboardingCopy.progress.account,
    shortLabel: "You",
  },
  {
    id: onboardingSectionIds.profile,
    label: patientOnboardingCopy.progress.profile,
    shortLabel: "Profile",
  },
  {
    id: onboardingSectionIds.location,
    label: patientOnboardingCopy.progress.location,
    shortLabel: "Location",
  },
  {
    id: onboardingSectionIds.consent,
    label: patientOnboardingCopy.progress.finish,
    shortLabel: "Finish",
  },
] as const;

/** Matches section `scroll-mt-32` plus sticky header clearance. */
const SCROLL_SPY_OFFSET = 152;

function resolveActiveIndex(sectionElements: HTMLElement[]) {
  const scrollPosition = window.scrollY + SCROLL_SPY_OFFSET;
  let active = 0;

  for (let index = 0; index < sectionElements.length; index++) {
    const sectionTop =
      sectionElements[index]!.getBoundingClientRect().top + window.scrollY;
    if (scrollPosition >= sectionTop) {
      active = index;
    }
  }

  return active;
}

export function OnboardingProgress() {
  const [activeIndex, setActiveIndex] = useState(0);
  const progressPercent =
    steps.length > 1 ? (activeIndex / (steps.length - 1)) * 100 : 0;

  useEffect(() => {
    let sectionElements: HTMLElement[] = [];
    let rafId = 0;

    const bindSections = () => {
      sectionElements = steps
        .map((step) => document.getElementById(step.id))
        .filter((element): element is HTMLElement => element != null);

      return sectionElements.length === steps.length;
    };

    const updateActiveIndex = () => {
      if (sectionElements.length === 0) return;
      setActiveIndex(resolveActiveIndex(sectionElements));
    };

    const onScroll = () => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(updateActiveIndex);
    };

    if (!bindSections()) {
      rafId = requestAnimationFrame(() => {
        bindSections();
        updateActiveIndex();
      });
    } else {
      updateActiveIndex();
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <nav
      aria-label={patientOnboardingCopy.progress.navLabel}
      className="sticky top-[calc(3.75rem+env(safe-area-inset-top,0px))] z-40 -mx-4 mb-8 border-b border-border/40 bg-background/90 px-4 py-4 backdrop-blur-md md:mb-10 md:-mx-6 md:px-6"
    >
      <p className="sr-only" aria-live="polite">
        {patientOnboardingCopy.progress.stepLabel(
          activeIndex + 1,
          steps.length,
        )}
      </p>
      <ol className="relative grid grid-cols-4 gap-2">
        <div
          className="pointer-events-none absolute inset-x-[12.5%] top-4 h-px"
          aria-hidden
        >
          <div className="absolute inset-0 bg-border/70" />
          <div
            className="absolute inset-y-0 left-0 bg-primary motion-safe:transition-[width] motion-safe:duration-300 motion-safe:ease-out"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
        {steps.map((step, index) => {
          const isActive = index === activeIndex;
          const isComplete = index < activeIndex;

          return (
            <li key={step.id} className="relative flex flex-col items-center">
              <Link
                href={`#${step.id}`}
                aria-current={isActive ? "step" : undefined}
                className={cn(
                  "group flex w-full flex-col items-center gap-2 rounded-2xl px-1 py-2 text-center motion-safe:transition-colors",
                  "hover:bg-muted/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
                )}
              >
                <span
                  className={cn(
                    "relative z-10 flex size-8 shrink-0 items-center justify-center rounded-full border-2 bg-background text-xs font-semibold motion-safe:transition-colors motion-safe:duration-300",
                    isActive &&
                      "border-primary bg-primary text-primary-foreground",
                    isComplete &&
                      "border-primary/40 bg-primary/10 text-primary",
                    !isActive &&
                      !isComplete &&
                      "border-primary/25 text-primary group-hover:border-primary/50",
                  )}
                >
                  {index + 1}
                </span>
                <span
                  className={cn(
                    "hidden text-xs font-medium sm:block",
                    isActive
                      ? "text-foreground"
                      : "text-muted-foreground group-hover:text-foreground",
                  )}
                >
                  {step.label}
                </span>
                <span
                  className={cn(
                    "text-[0.6875rem] font-medium sm:hidden",
                    isActive
                      ? "text-foreground"
                      : "text-muted-foreground group-hover:text-foreground",
                  )}
                >
                  {step.shortLabel}
                </span>
              </Link>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
