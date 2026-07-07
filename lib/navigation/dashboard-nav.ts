import type { LucideIcon } from "lucide-react";
import { LayoutDashboard, Settings, Users } from "lucide-react";

import { patientDashboardCopy } from "@/lib/copy/patient/dashboard";
import {
  isDashboardHomeActive,
  isPatientRecordsNavActive,
  patientRecordsHref,
} from "@/lib/navigation/patient-nav";

export type DashboardNavLink = {
  href: string;
  label: string;
  icon: LucideIcon;
  isActive: (pathname: string, profileId?: string) => boolean;
  isProfile?: boolean;
};

export function getDashboardNavLinks(profileId?: string): DashboardNavLink[] {
  const recordsHref = profileId ? patientRecordsHref(profileId) : "/dashboard";

  return [
    {
      href: "/dashboard",
      label: patientDashboardCopy.nav.overview,
      icon: LayoutDashboard,
      isActive: (pathname) => isDashboardHomeActive(pathname),
    },
    {
      href: recordsHref,
      label: patientDashboardCopy.nav.records,
      icon: Users,
      isActive: (pathname, pid) => isPatientRecordsNavActive(pathname, pid),
      isProfile: true,
    },
    {
      href: "/account/settings",
      label: patientDashboardCopy.nav.settings,
      icon: Settings,
      isActive: (pathname) => pathname.startsWith("/account"),
    },
  ];
}
