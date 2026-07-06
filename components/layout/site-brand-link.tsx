import Link from "next/link";
import { HeartPulse } from "lucide-react";

import { cn } from "@/lib/utils";

export function SiteBrandLink({ className }: { className?: string }) {
  return (
    <Link
      href="/"
      className={cn("flex items-center gap-2.5", className)}
      aria-label="Back to iCare home"
    >
      <div className="flex size-10 items-center justify-center rounded-2xl bg-primary/15 text-primary">
        <HeartPulse className="size-5" aria-hidden />
      </div>
      <span className="font-heading text-xl font-semibold tracking-tight">
        i<span className="text-primary">Care</span>
      </span>
    </Link>
  );
}
