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
    let lastPickedId: string | null | undefined;
    let pickRafId = 0;
    let hashSyncTimer: ReturnType<typeof setTimeout> | null = null;

    function scheduleHashSync(sectionId: string | null) {
      if (hashSyncTimer) clearTimeout(hashSyncTimer);
      hashSyncTimer = setTimeout(() => {
        syncUrlHash(sectionId);
      }, 150);
    }

    function pickActiveSection() {
      let bestId: string | null = null;
      let bestRatio = 0;

      for (const [id, ratio] of ratios) {
        if (ratio > bestRatio) {
          bestRatio = ratio;
          bestId = id;
        }
      }

      const nextId = bestId && bestRatio > 0 ? bestId : null;
      if (nextId === lastPickedId) return;
      lastPickedId = nextId;

      if (nextId) {
        setScrollActiveId(nextId);
        scheduleHashSync(nextId);
        return;
      }

      setScrollActiveId(null);
      scheduleHashSync(null);
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          ratios.set(entry.target.id, entry.intersectionRatio);
        }
        cancelAnimationFrame(pickRafId);
        pickRafId = requestAnimationFrame(pickActiveSection);
      },
      {
        rootMargin: "-20% 0px -55% 0px",
        threshold: [0, 0.5, 1],
      },
    );

    for (const section of sections) {
      observer.observe(section);
    }

    return () => {
      if (hashSyncTimer) clearTimeout(hashSyncTimer);
      cancelAnimationFrame(pickRafId);
      observer.disconnect();
    };
  }, []);

  // Scroll position drives nav highlight; hash is fallback until observer runs
  // (e.g. deep link to /#experience before layout settles).
  return scrollActiveId ?? hashActiveId;
}
