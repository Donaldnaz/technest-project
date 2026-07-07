import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

type LegalSectionProps = {
  title: string;
  children: ReactNode;
  id?: string;
};

export function LegalSection({ title, children, id }: LegalSectionProps) {
  return (
    <section
      id={id}
      className={cn(
        "scroll-mt-24 border-t border-border/60 pt-8 first:border-t-0 first:pt-0",
      )}
      aria-labelledby={id ? `${id}-heading` : undefined}
    >
      <h2
        id={id ? `${id}-heading` : undefined}
        className="font-heading text-xl font-semibold tracking-tight text-foreground"
      >
        {title}
      </h2>
      <div className="mt-4 space-y-4 text-base leading-7 text-muted-foreground [&_a]:font-medium [&_a]:text-primary [&_a]:underline-offset-4 [&_a]:hover:underline [&_li]:pl-1 [&_strong]:font-medium [&_strong]:text-foreground [&_ul]:list-disc [&_ul]:space-y-2 [&_ul]:pl-5">
        {children}
      </div>
    </section>
  );
}
