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
    <p className="hidden max-w-[28vw] truncate text-sm font-medium leading-none text-muted-foreground md:block md:max-w-[40vw] lg:max-w-none lg:hidden">
      {label}
    </p>
  );
}
