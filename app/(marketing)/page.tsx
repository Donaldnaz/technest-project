import { LandingHomeRedirect } from "@/components/landing/landing-home-redirect";
import { LandingPage } from "@/components/landing/landing-page";
import { getPublicNavState } from "@/lib/navigation/public-nav-state";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const navState = await getPublicNavState();

  return (
    <>
      <LandingPage />
      {navState.isAuthenticated && navState.dashboardHref ? (
        <LandingHomeRedirect dashboardHref={navState.dashboardHref} />
      ) : null}
    </>
  );
}
