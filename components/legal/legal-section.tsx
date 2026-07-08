import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

type LegalSectionProps = {
  title: string;
  children: ReactNode;
  id?: string;
  variant?: "default" | "callout";
};

export function LegalSection({
  title,
  children,
  id,
  variant = "default",
}: LegalSectionProps) {
  const isCallout = variant === "callout";

  return (
    <section
      id={id}
      className={cn(
        isCallout
          ? "rounded-2xl border border-border/50 bg-muted/25 p-6 md:p-8"
          : "scroll-mt-24 border-t border-border/40 pt-10 first:border-t-0 first:pt-0",
      )}
      aria-labelledby={id ? `${id}-heading` : undefined}
    >
      <h2
        id={id ? `${id}-heading` : undefined}
        className={cn(
          "font-heading text-lg font-semibold tracking-tight text-foreground md:text-xl",
          isCallout && "md:text-2xl",
        )}
      >
        {title}
      </h2>
      <div
        className={cn(
          "space-y-4 text-[0.9375rem] leading-7 text-muted-foreground md:text-base md:leading-8",
          "mt-4",
          "[&_a]:font-medium [&_a]:text-primary [&_a]:underline-offset-4 [&_a]:hover:underline",
          "[&_li]:pl-0.5 [&_strong]:font-medium [&_strong]:text-foreground",
          "[&_ul]:list-disc [&_ul]:space-y-2.5 [&_ul]:pl-5",
        )}
      >
        {children}
      </div>
    </section>
  );
}
