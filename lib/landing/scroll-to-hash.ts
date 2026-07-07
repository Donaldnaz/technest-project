function normalizeHashHref(href: string): string | null {
  if (href.startsWith("#")) return href;
  if (href.startsWith("/#")) return href.slice(1);
  return null;
}

export function scrollToHash(href: string) {
  const hash = normalizeHashHref(href);
  if (!hash) return;

  const target = document.getElementById(hash.slice(1));
  if (!target) return;

  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;

  target.scrollIntoView({
    behavior: prefersReducedMotion ? "auto" : "smooth",
    block: "start",
  });
  window.history.replaceState(
    null,
    "",
    `${window.location.pathname}${window.location.search}${hash}`,
  );
  window.dispatchEvent(new Event("landing-hash-scroll"));

  target.setAttribute("tabindex", "-1");
  target.focus({ preventScroll: true });
}
