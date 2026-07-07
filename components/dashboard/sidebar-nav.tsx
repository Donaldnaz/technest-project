"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Settings, Users } from "lucide-react";

import { patientDashboardCopy } from "@/lib/copy/patient/dashboard";
import { focusRingClassName } from "@/lib/landing/nav-link-styles";
import {
  isDashboardHomeActive,
  isPatientRecordsNavActive,
  patientRecordsHref,
} from "@/lib/navigation/patient-nav";
import { cn } from "@/lib/utils";

type SidebarNavProps = {
  profileId?: string;
  collapsed?: boolean;
};

export function SidebarNav({ profileId, collapsed = false }: SidebarNavProps) {
  const pathname = usePathname();
  const recordsHref = profileId ? patientRecordsHref(profileId) : "/dashboard";

  const links = [
    {
      href: "/dashboard",
      label: patientDashboardCopy.nav.overview,
      icon: LayoutDashboard,
      isActive: isDashboardHomeActive(pathname),
    },
    {
      href: recordsHref,
      label: patientDashboardCopy.nav.records,
      icon: Users,
      isActive: isPatientRecordsNavActive(pathname, profileId),
    },
    {
      href: "/account/settings",
      label: patientDashboardCopy.nav.settings,
      icon: Settings,
      isActive: pathname.startsWith("/account"),
    },
  ];

  return (
    <nav
      className="flex flex-col gap-1"
      aria-label="Main navigation"
    >
      {links.map((link) => (
        <Link
          key={link.label}
          href={link.href}
          aria-current={link.isActive ? "page" : undefined}
          title={collapsed ? link.label : undefined}
          className={cn(
            "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all",
            focusRingClassName,
            collapsed && "justify-center px-2",
            link.isActive
              ? "bg-primary text-primary-foreground shadow-sm"
              : "text-muted-foreground hover:bg-sidebar-accent hover:text-foreground",
          )}
        >
          <link.icon className="size-4 shrink-0" aria-hidden />
          {!collapsed && <span>{link.label}</span>}
        </Link>
      ))}
    </nav>
  );
}
