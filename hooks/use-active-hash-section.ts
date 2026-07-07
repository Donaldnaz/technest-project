"use client";

import { useEffect, useState, useSyncExternalStore } from "react";

import { landingSectionIds } from "@/lib/landing/navigation";

function readHashSectionId(): string | null {
  const hash = window.location.hash.slice(1);
  return landingSectionIds.includes(hash) ? hash : null;
}

function subscribeToHash(onStoreChange: () => void) {
  window.addEventListener("hashchange", onStoreChange);
  window.addEventListener("landing-hash-scroll", onStoreChange);
  return () => {
    window.removeEventListener("hashchange", onStoreChange);
    window.removeEventListener("landing-hash-scroll", onStoreChange);
  };
}

function syncUrlHash(sectionId: string | null) {
  const nextHash = sectionId ? `#${sectionId}` : "";
  if (window.location.hash === nextHash) return;

  window.history.replaceState(
    null,
    "",
    `${window.location.pathname}${window.location.search}${nextHash}`,
  );
}

export function useActiveHashSection() {
  const hashActiveId = useSyncExternalStore(
    subscribeToHash,
    readHashSectionId,
    () => null,
  );
  const [scrollActiveId, setScrollActiveId] = useState<string | null>(null);

  useEffect(() => {
    const sections = landingSectionIds
      .map((id) => document.getElementById(id))
      .filter(Boolean) as HTMLElement[];

    if (sections.length === 0) return;

    const ratios = new Map<string, number>();

    function pickActiveSection() {
      let bestId: string | null = null;
      let bestRatio = 0;

      for (const [id, ratio] of ratios) {
        if (ratio > bestRatio) {
          bestRatio = ratio;
          bestId = id;
        }
      }

      if (bestId && bestRatio > 0) {
        setScrollActiveId(bestId);
        syncUrlHash(bestId);
        return;
      }

      setScrollActiveId(null);
      syncUrlHash(null);
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          ratios.set(entry.target.id, entry.intersectionRatio);
        }
        pickActiveSection();
      },
      {
        rootMargin: "-20% 0px -55% 0px",
        threshold: [0, 0.25, 0.5, 0.75, 1],
      },
    );

    for (const section of sections) {
      observer.observe(section);
    }

    return () => observer.disconnect();
  }, []);

  // Scroll position drives nav highlight; hash is fallback until observer runs
  // (e.g. deep link to /#experience before layout settles).
  return scrollActiveId ?? hashActiveId;
}
