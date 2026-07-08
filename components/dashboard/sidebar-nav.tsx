"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { focusRingClassName } from "@/lib/landing/nav-link-styles";
import { getDashboardNavLinks } from "@/lib/navigation/dashboard-nav";
import { cn } from "@/lib/utils";

type SidebarNavProps = {
  profileId?: string;
  collapsed?: boolean;
};

export function SidebarNav({ profileId, collapsed = false }: SidebarNavProps) {
  const pathname = usePathname();
  const links = getDashboardNavLinks(profileId);

  return (
    <nav
      className="flex flex-col gap-1"
      aria-label="Main navigation"
    >
      {links.map((link) => {
        const isActive = link.isActive(pathname, profileId);

        return (
          <Link
            key={link.label}
            href={link.href}
            aria-current={isActive ? "page" : undefined}
            title={collapsed ? link.label : undefined}
            className={cn(
              "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all",
              focusRingClassName,
              collapsed && "justify-center px-2",
              isActive
                ? "bg-primary text-primary-foreground shadow-sm"
                : "text-muted-foreground hover:bg-sidebar-accent hover:text-foreground",
            )}
          >
            <link.icon className="size-4 shrink-0" aria-hidden />
            {!collapsed && <span>{link.label}</span>}
          </Link>
        );
      })}
    </nav>
  );
}
