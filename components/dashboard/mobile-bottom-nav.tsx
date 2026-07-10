"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

import { getDashboardNavLinks } from "@/lib/navigation/dashboard-nav";
import { cn } from "@/lib/utils";

type MobileBottomNavProps = {
  profileId?: string;
};

export function MobileBottomNav({ profileId }: MobileBottomNavProps) {
  const pathname = usePathname();
  const links = getDashboardNavLinks(profileId);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const nav = (
    <nav
      className="fixed bottom-0 left-0 right-0 z-50 w-full border-t border-border/60 bg-card/95 px-4 py-2 pb-safe shadow-[0_-4px_24px_oklch(0_0_0/0.08)] backdrop-blur-md lg:hidden"
      aria-label="Main navigation"
    >
      <ul className="mx-auto flex w-full max-w-md items-center justify-around gap-1">
        {links.map((link) => {
          const isActive = link.isActive(pathname, profileId);

          return (
            <li key={link.label}>
              <Link
                href={link.href}
                aria-current={isActive ? "page" : undefined}
                className={cn(
                  "flex min-h-11 flex-col items-center justify-center gap-1 rounded-2xl px-3 py-2.5 text-xs font-medium transition-colors",
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

  if (!mounted) {
    return null;
  }

  return createPortal(nav, document.body);
}
