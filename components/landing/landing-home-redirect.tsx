"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

type LandingHomeRedirectProps = {
  dashboardHref: string;
};

export function LandingHomeRedirect({ dashboardHref }: LandingHomeRedirectProps) {
  const router = useRouter();

  useEffect(() => {
    if (window.location.hash) return;
    router.replace(dashboardHref);
  }, [dashboardHref, router]);

  return null;
}
