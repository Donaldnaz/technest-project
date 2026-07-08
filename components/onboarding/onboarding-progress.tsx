"use client";

import { useEffect, useRef, useState } from "react";

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

/** Keep in sync with sticky site header + progress nav height. */
export const onboardingSectionScrollMarginClass =
  "scroll-mt-[calc(3.75rem+env(safe-area-inset-top,0px)+5rem)]";

function resolveActiveIndex(sectionElements: HTMLElement[], marker: number) {
  const lastIndex = sectionElements.length - 1;
  const lastRect = sectionElements[lastIndex]!.getBoundingClientRect();

  if (lastRect.top <= marker + 64 && lastRect.bottom > marker) {
    return lastIndex;
  }

  if (
    window.innerHeight + window.scrollY >=
    document.documentElement.scrollHeight - 32
  ) {
    return lastIndex;
  }

  for (let index = 0; index < sectionElements.length; index++) {
    const rect = sectionElements[index]!.getBoundingClientRect();
    if (rect.top <= marker && rect.bottom > marker) {
      return index;
    }
  }

  const firstTop = sectionElements[0]?.getBoundingClientRect().top ?? Infinity;
  if (firstTop > marker) {
    return 0;
  }

  for (let index = sectionElements.length - 1; index >= 0; index--) {
    if (sectionElements[index]!.getBoundingClientRect().top <= marker) {
      return index;
    }
  }

  return 0;
}

export function OnboardingProgress() {
  const navRef = useRef<HTMLElement>(null);
  const clickedIndexRef = useRef<number | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const progressPercent =
    steps.length > 1 ? (activeIndex / (steps.length - 1)) * 100 : 0;

  useEffect(() => {
    const sectionElements = steps
      .map((step) => document.getElementById(step.id))
      .filter((element): element is HTMLElement => element != null);

    if (sectionElements.length !== steps.length) return;

    let rafId = 0;

    const updateActiveIndex = () => {
      const nav = navRef.current;
      if (!nav) return;

      if (clickedIndexRef.current !== null) {
        return;
      }

      const navRect = nav.getBoundingClientRect();
      const headerHeight = 60;
      const isStuck = navRect.top <= headerHeight + 8;
      const nextIndex = isStuck
        ? resolveActiveIndex(sectionElements, navRect.bottom)
        : 0;

      setActiveIndex(nextIndex);
    };

    const onScroll = () => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        if (clickedIndexRef.current !== null) {
          setActiveIndex(clickedIndexRef.current);
          return;
        }
        updateActiveIndex();
      });
    };

    const onScrollEnd = () => {
      clickedIndexRef.current = null;
    };

    rafId = requestAnimationFrame(updateActiveIndex);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    window.addEventListener("scrollend", onScrollEnd, { passive: true });

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      window.removeEventListener("scrollend", onScrollEnd);
    };
  }, []);

  const scrollToStep = (sectionId: string, index: number) => {
    clickedIndexRef.current = index;
    setActiveIndex(index);
    document.getElementById(sectionId)?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  return (
    <nav
      ref={navRef}
      aria-label={patientOnboardingCopy.progress.navLabel}
      className="sticky top-[calc(var(--site-header-height,4rem)+env(safe-area-inset-top,0px))] z-40 -mx-4 mb-6 border-b border-border/40 bg-background/95 px-4 py-3 backdrop-blur-md md:mb-8"
    >
      <p className="sr-only" aria-live="polite">
        {patientOnboardingCopy.progress.stepLabel(
          activeIndex + 1,
          steps.length,
        )}
      </p>
      <ol className="relative grid grid-cols-4 gap-0.5 max-xs:gap-0 sm:gap-1">
        <div
          className="pointer-events-none absolute inset-x-[12.5%] top-4 h-px"
          aria-hidden
        >
          <div className="absolute inset-0 bg-border/70" />
          <div
            className="absolute inset-y-0 left-0 bg-primary motion-safe:transition-[width] motion-safe:duration-300"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
        {steps.map((step, index) => {
          const isActive = index === activeIndex;
          const isComplete = index < activeIndex;

          return (
            <li key={step.id} className="relative flex flex-col items-center">
              <a
                href={`#${step.id}`}
                aria-current={isActive ? "step" : undefined}
                onClick={(event) => {
                  event.preventDefault();
                  scrollToStep(step.id, index);
                }}
                className={cn(
                  "group flex min-h-11 w-full flex-col items-center justify-center gap-1.5 rounded-xl px-0.5 py-1.5 text-center motion-safe:transition-colors max-xs:px-0",
                  "hover:bg-muted/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
                )}
              >
                <span
                  className={cn(
                    "relative z-10 flex size-10 shrink-0 items-center justify-center rounded-full border-2 bg-background text-xs font-semibold motion-safe:transition-colors coarse:size-10 sm:size-8",
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
              </a>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
