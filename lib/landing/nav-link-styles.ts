import { cn } from "@/lib/utils";

export function landingNavLinkClassName(active = false) {
  return cn(
    "rounded-lg px-1 py-2 text-sm font-medium transition-colors",
    active
      ? "text-foreground"
      : "text-muted-foreground hover:text-foreground",
  );
}
