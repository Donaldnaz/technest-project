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

type MobileBottomNavProps = {
  profileId?: string;
};

export function MobileBottomNav({ profileId }: MobileBottomNavProps) {
  const pathname = usePathname();
  const recordsHref = profileId ? patientRecordsHref(profileId) : "/dashboard";

  const links = [
    {
      href: "/dashboard",
      label: patientDashboardCopy.nav.home,
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
      className="fixed inset-x-0 bottom-0 z-40 border-t border-border/60 bg-card/95 shadow-lg backdrop-blur-md md:hidden"
      aria-label="Main navigation"
    >
      <ul className="mx-auto grid h-16 max-w-lg grid-cols-3 px-1 pb-[max(0.25rem,env(safe-area-inset-bottom))]">
        {links.map((link) => (
          <li key={link.label} className="flex items-stretch">
            <Link
              href={link.href}
              aria-current={link.isActive ? "page" : undefined}
              className={cn(
                "flex w-full flex-col items-center justify-center gap-1 rounded-xl px-1 py-1.5 text-[0.65rem] font-medium transition-colors sm:text-[0.7rem]",
                focusRingClassName,
                link.isActive
                  ? "text-primary"
                  : "text-muted-foreground hover:text-foreground",
              )}
            >
              <link.icon className="size-5 shrink-0" aria-hidden />
              <span className="truncate">{link.label}</span>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
