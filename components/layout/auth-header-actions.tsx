"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { ThemeIconToggle } from "@/components/layout/theme-icon-toggle";
import { LinkButton } from "@/components/ui/link-button";
import { focusRingClassName } from "@/lib/landing/nav-link-styles";
import type { PublicNavState } from "@/lib/navigation/public-nav-state";
import { cn } from "@/lib/utils";

type AuthHeaderActionsProps = {
  navState: PublicNavState;
};

export function AuthHeaderActions({ navState }: AuthHeaderActionsProps) {
  const pathname = usePathname();
  const isSignUp = pathname.includes("/auth/sign-up");
  const isSignIn = pathname.includes("/auth/sign-in");
  const isForgotOrReset =
    pathname.includes("/auth/forgot-password") ||
    pathname.includes("/auth/reset-password");
  const showDashboard =
    navState.isAuthenticated && navState.dashboardHref;

  if (showDashboard) {
    return (
      <>
        <LinkButton
          href={navState.dashboardHref!}
          size="lg"
          className="rounded-xl"
        >
          Dashboard
        </LinkButton>
        <ThemeIconToggle />
      </>
    );
  }

  return (
    <>
      {isSignUp || isForgotOrReset ? (
        <Link
          href="/auth/sign-in"
          className={cn(
            "inline-flex h-11 items-center rounded-xl px-4 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground",
            focusRingClassName,
          )}
        >
          Sign in
        </Link>
      ) : null}
      {isSignIn ? (
        <LinkButton href="/auth/sign-up" size="lg" className="rounded-xl">
          Get started
        </LinkButton>
      ) : null}
      <ThemeIconToggle />
    </>
  );
}
