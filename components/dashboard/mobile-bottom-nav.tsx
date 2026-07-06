"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Users } from "lucide-react";

import { profilePath } from "@/lib/routes/profile";
import { cn } from "@/lib/utils";

type MobileBottomNavProps = {
  profileId?: string;
};

export function MobileBottomNav({ profileId }: MobileBottomNavProps) {
  const pathname = usePathname();
  const recordsHref = profileId ? profilePath(profileId) : "/dashboard";

  const links = [
    { href: "/dashboard", label: "Home", icon: LayoutDashboard },
    { href: recordsHref, label: "Records", icon: Users, isProfile: true },
  ];

  return (
    <nav
      className="fixed inset-x-0 bottom-0 z-40 border-t bg-card/95 px-4 py-2 shadow-lg backdrop-blur-md md:hidden"
      aria-label="Main navigation"
    >
      <ul className="mx-auto flex max-w-md items-center justify-around gap-2">
        {links.map((link) => {
          const isActive =
            pathname === link.href ||
            (link.isProfile && pathname.startsWith("/dashboard/patients/")) ||
            (link.href === "/dashboard" && pathname === "/dashboard");

          return (
            <li key={link.label}>
              <Link
                href={link.href}
                className={cn(
                  "flex flex-col items-center gap-1 rounded-2xl px-4 py-2 text-xs font-medium transition-colors",
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
