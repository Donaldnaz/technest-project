"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { getDashboardNavLinks } from "@/lib/navigation/dashboard-nav";
import { cn } from "@/lib/utils";

type MobileBottomNavProps = {
  profileId?: string;
};

export function MobileBottomNav({ profileId }: MobileBottomNavProps) {
  const pathname = usePathname();
  const links = getDashboardNavLinks(profileId);

  return (
    <nav
      className="fixed inset-x-0 bottom-0 z-40 border-t bg-card/95 px-4 py-2 pb-safe shadow-lg backdrop-blur-md lg:hidden"
      aria-label="Main navigation"
    >
      <ul className="mx-auto flex max-w-md items-center justify-around gap-1">
        {links.map((link) => {
          const isActive = link.isActive(pathname, profileId);

          return (
            <li key={link.label}>
              <Link
                href={link.href}
                aria-current={isActive ? "page" : undefined}
                className={cn(
                  "flex flex-col items-center gap-1 rounded-2xl px-3 py-2 text-xs font-medium transition-colors",
                  isActive
                    ? "text-primary"
                    : "text-muted-foreground hover:text-foreground",
                )}
              >
                <link.icon className="size-5" aria-hidden />
                {link.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
