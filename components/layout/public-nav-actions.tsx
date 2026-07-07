import { LinkButton } from "@/components/ui/link-button";
import type { PublicNavState } from "@/lib/navigation/public-nav-state";

type PublicNavActionsProps = {
  navState: PublicNavState;
};

export function PublicNavActions({ navState }: PublicNavActionsProps) {
  const { dashboardHref } = navState;

  return (
    <>
      {dashboardHref ? (
        <LinkButton
          href={dashboardHref}
          size="lg"
          className="shrink-0 rounded-xl whitespace-nowrap"
        >
          Dashboard
        </LinkButton>
      ) : (
        <>
          <LinkButton
            href="/auth/sign-in"
            variant="outline"
            size="lg"
            className="shrink-0 rounded-xl whitespace-nowrap"
          >
            Sign in
          </LinkButton>
          <LinkButton
            href="/auth/sign-up"
            size="lg"
            className="shrink-0 rounded-xl whitespace-nowrap"
          >
            Get started
          </LinkButton>
        </>
      )}
    </>
  );
}
