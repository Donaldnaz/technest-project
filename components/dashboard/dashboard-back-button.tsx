import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import { cn } from "@/lib/utils";

type DashboardBackButtonProps = {
  href: string;
  label?: string;
  className?: string;
};

export function DashboardBackButton({
  href,
  label = "Go back",
  className,
}: DashboardBackButtonProps) {
  return (
    <Link
      href={href}
      aria-label={label}
      className={cn(
        "inline-flex size-11 items-center justify-center rounded-2xl border border-border/60 bg-background text-muted-foreground transition-colors hover:border-sage-300 hover:bg-sage-50 hover:text-foreground dark:hover:bg-sage-950/30",
        className,
      )}
    >
      <ArrowLeft className="size-5" aria-hidden />
    </Link>
  );
}
