"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

import { LANDING_HOME } from "@/lib/landing/navigation";
import { scrollToHash } from "@/lib/landing/scroll-to-hash";

const MAX_SCROLL_ATTEMPTS = 30;

function scrollToCurrentHash(attempt = 0) {
  const hash = window.location.hash;
  if (!hash) return;

  const target = document.getElementById(hash.slice(1));
  if (!target) {
    if (attempt < MAX_SCROLL_ATTEMPTS) {
      window.requestAnimationFrame(() => scrollToCurrentHash(attempt + 1));
    }
    return;
  }

  scrollToHash(hash);
}

export function LandingHashScroll() {
  const pathname = usePathname();

  useEffect(() => {
    if (pathname !== LANDING_HOME) return;

    scrollToCurrentHash();

    function onHashChange() {
      scrollToCurrentHash();
    }

    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, [pathname]);

  return null;
}
