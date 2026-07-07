"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import { AuthView } from "@neondatabase/auth-ui";

import { authViewClassNames } from "@/lib/auth/auth-view-styles";
import { patientAuthCopy } from "@/lib/copy/patient/auth";
import { POST_AUTH_REDIRECT } from "@/lib/routes/auth";

type ICareAuthViewProps = {
  path: string;
};

function AuthViewFooterLink({
  href,
  children,
}: {
  href: string;
  children: ReactNode;
}) {
  return (
    <div className="flex w-full justify-center px-0 pt-1">
      <Link
        href={href}
        className="text-sm font-medium text-primary transition-colors hover:text-primary/80 hover:underline"
      >
        {children}
      </Link>
    </div>
  );
}

export function ICareAuthView({ path }: ICareAuthViewProps) {
  const cardFooter =
    path === "sign-in" ? (
      <AuthViewFooterLink href="/auth/forgot-password">
        {patientAuthCopy.signIn.forgotPassword}
      </AuthViewFooterLink>
    ) : path === "forgot-password" || path === "reset-password" ? (
      <AuthViewFooterLink href="/auth/sign-in">
        {patientAuthCopy.backToSignIn}
      </AuthViewFooterLink>
    ) : undefined;

  return (
    <AuthView
      path={path}
      redirectTo={POST_AUTH_REDIRECT}
      socialLayout="vertical"
      className="w-full"
      classNames={authViewClassNames}
      cardFooter={cardFooter}
    />
  );
}
