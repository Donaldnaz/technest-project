"use client";

import { LinkButton } from "@/components/ui/link-button";
import { authClient } from "@/lib/auth/client";

export function PublicNavActionsClient() {
  const { data: session, isPending } = authClient.useSession();
  const dashboardHref = session?.user ? "/dashboard" : undefined;

  if (isPending) {
    return (
      <div
        className="h-10 w-40 animate-pulse rounded-xl bg-muted/60"
        aria-hidden
      />
    );
  }

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
