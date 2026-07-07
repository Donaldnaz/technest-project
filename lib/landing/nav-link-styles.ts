import { cn } from "@/lib/utils";

const focusRingClassName =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2";

export function landingNavLinkClassName(active = false) {
  return cn(
    "rounded-lg px-3 py-2 text-sm font-medium transition-colors",
    focusRingClassName,
    active
      ? "font-semibold text-foreground underline decoration-primary underline-offset-4"
      : "text-muted-foreground hover:text-foreground",
  );
}

export { focusRingClassName };
