import { cn } from "@/lib/utils";

export const selectClassName = cn(
  "h-10 w-full min-w-0 rounded-xl border border-input bg-transparent px-3 py-2 text-base transition-colors outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm dark:bg-input/30",
);
