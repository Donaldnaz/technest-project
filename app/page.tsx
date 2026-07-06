import { LandingPage } from "@/components/landing/landing-page";
import { isOnboardingComplete } from "@/lib/auth/onboarding";
import { getOptionalSession } from "@/lib/auth/session";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const session = await getOptionalSession();

  let dashboardHref: string | undefined;

  if (session?.user) {
    const complete = await isOnboardingComplete(session.user.id);
    dashboardHref = complete ? "/dashboard" : "/onboarding";
  }

  return <LandingPage dashboardHref={dashboardHref} />;
}
