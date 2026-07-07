"use client";

import { usePathname } from "next/navigation";

import { patientDashboardCopy } from "@/lib/copy/patient/dashboard";

export function HeaderContext() {
  const pathname = usePathname();

  let label: string = patientDashboardCopy.nav.overview;

  if (pathname.startsWith("/dashboard/patients/")) {
    label = patientDashboardCopy.nav.records;
  } else if (pathname.startsWith("/account")) {
    label = patientDashboardCopy.nav.settings;
  }

  return (
    <p className="truncate text-xs font-medium text-muted-foreground lg:hidden">
      {label}
    </p>
  );
}
