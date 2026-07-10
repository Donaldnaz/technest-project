import Link from "next/link";
import { HeartPulse } from "lucide-react";

import { cn } from "@/lib/utils";

export function SiteBrandLink({
  className,
  compact = false,
}: {
  className?: string;
  compact?: boolean;
}) {
  return (
    <Link
      href="/"
      className={cn(
        "flex min-h-11 min-w-0 items-center gap-2.5",
        className,
      )}
      aria-label="Back to iCare home"
    >
      <div className="flex size-11 shrink-0 items-center justify-center rounded-2xl bg-primary/15 text-primary">
        <HeartPulse className="size-5" aria-hidden />
      </div>
      <span
        className={cn(
          "truncate font-heading text-xl font-semibold tracking-tight",
          compact && "hidden sm:inline",
        )}
      >
        i<span className="text-primary">Care</span>
      </span>
    </Link>
  );
}
