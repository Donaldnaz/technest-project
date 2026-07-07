import Link from "next/link";
import { ChevronLeft } from "lucide-react";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { cn } from "@/lib/utils";

export type BreadcrumbItemData = {
  label: string;
  href?: string;
};

type AppBreadcrumbsProps = {
  items: BreadcrumbItemData[];
  showBackIcon?: boolean;
  className?: string;
};

export function AppBreadcrumbs({
  items,
  showBackIcon = false,
  className,
}: AppBreadcrumbsProps) {
  if (items.length === 0) return null;

  const parentItems = items.slice(0, -1);
  const firstWithHref = [...parentItems].reverse().find((item) => item.href);

  return (
    <div className={cn("flex items-center gap-2", className)}>
      {showBackIcon && firstWithHref?.href && (
        <Link
          href={firstWithHref.href}
          className="inline-flex size-8 shrink-0 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
          aria-label={`Back to ${firstWithHref.label}`}
        >
          <ChevronLeft className="size-4" aria-hidden />
        </Link>
      )}
      <Breadcrumb>
        <BreadcrumbList>
          {items.map((item, index) => {
            const isLast = index === items.length - 1;

            return (
              <span key={`${item.label}-${index}`} className="contents">
                <BreadcrumbItem>
                  {isLast || !item.href ? (
                    <BreadcrumbPage>{item.label}</BreadcrumbPage>
                  ) : (
                    <BreadcrumbLink
                      render={<Link href={item.href} />}
                    >
                      {item.label}
                    </BreadcrumbLink>
                  )}
                </BreadcrumbItem>
                {!isLast && <BreadcrumbSeparator />}
              </span>
            );
          })}
        </BreadcrumbList>
      </Breadcrumb>
    </div>
  );
}
