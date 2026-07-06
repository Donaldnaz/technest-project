export function scrollToHash(href: string) {
  if (!href.startsWith("#")) return;

  const target = document.getElementById(href.slice(1));
  if (target) {
    target.scrollIntoView({ behavior: "smooth", block: "start" });
    window.history.replaceState(null, "", href);
  }
}
