import "server-only";

import { isOnboardingComplete } from "@/lib/auth/onboarding";
import { getOptionalSession } from "@/lib/auth/session";

export type PublicNavState = {
  isAuthenticated: boolean;
  dashboardHref?: string;
  userName?: string | null;
};

export async function getPublicNavState(): Promise<PublicNavState> {
  const session = await getOptionalSession();

  if (!session?.user) {
    return { isAuthenticated: false };
  }

  const complete = await isOnboardingComplete(session.user.id);

  return {
    isAuthenticated: true,
    dashboardHref: complete ? "/dashboard" : "/onboarding",
    userName: session.user.name,
  };
}
