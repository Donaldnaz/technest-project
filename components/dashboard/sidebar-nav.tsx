"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Settings, Users } from "lucide-react";

import { profilePath } from "@/lib/routes/profile";
import { cn } from "@/lib/utils";

type SidebarNavProps = {
  profileId?: string;
};

export function SidebarNav({ profileId }: SidebarNavProps) {
  const pathname = usePathname();
  const recordsHref = profileId ? profilePath(profileId) : "/dashboard";

  const links = [
    { href: "/dashboard", label: "Overview", icon: LayoutDashboard },
    { href: recordsHref, label: "My records", icon: Users, isProfile: true },
    { href: "/account/settings", label: "Settings", icon: Settings },
  ];

  return (
    <nav className="flex flex-col gap-2">
      {links.map((link) => {
        const isActive =
          pathname === link.href ||
          (link.href === "/account/settings" &&
            pathname.startsWith("/account")) ||
          (link.isProfile && pathname.startsWith("/dashboard/patients/")) ||
          (link.href === "/dashboard" && pathname === "/dashboard");

        return (
          <Link
            key={link.label}
            href={link.href}
            className={cn(
              "flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium transition-all",
              isActive
                ? "bg-primary text-primary-foreground shadow-sm"
                : "text-muted-foreground hover:bg-sidebar-accent hover:text-foreground",
            )}
          >
            <link.icon className="size-4 shrink-0" aria-hidden />
            {link.label}
          </Link>
        );
      })}
    </nav>
  );
}
