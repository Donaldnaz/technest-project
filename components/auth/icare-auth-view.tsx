"use client";

import Link from "next/link";
import { useRef, type ReactNode } from "react";
import { AuthView } from "@neondatabase/auth-ui";

import { AuthModeNav } from "@/components/auth/auth-mode-nav";
import { SignUpPasswordMatchFeedback } from "@/components/auth/sign-up-password-match-feedback";
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
    <div className="icare-auth-custom-footer flex w-full justify-center px-0 pt-1">
      <Link
        href={href}
        className="text-sm font-medium text-primary transition-colors hover:text-primary/80 hover:underline"
      >
        {children}
      </Link>
    </div>
  );
}

function isCredentialSwitchPath(
  path: string,
): path is "sign-in" | "sign-up" {
  return path === "sign-in" || path === "sign-up";
}

export function ICareAuthView({ path }: ICareAuthViewProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  const cardFooter =
    path === "forgot-password" || path === "reset-password" ? (
      <AuthViewFooterLink href="/auth/sign-in">
        {patientAuthCopy.backToSignIn}
      </AuthViewFooterLink>
    ) : undefined;

  const cardHeader = isCredentialSwitchPath(path) ? (
    <div className="space-y-4 text-center">
      <AuthModeNav activePath={path} />
      <p className="mx-auto max-w-sm text-sm leading-relaxed text-muted-foreground md:text-base">
        {path === "sign-in"
          ? patientAuthCopy.nav.signInDescription
          : patientAuthCopy.nav.signUpDescription}
      </p>
    </div>
  ) : undefined;

  return (
    <div
      ref={containerRef}
      className={
        isCredentialSwitchPath(path) ? "icare-auth-credential-switch w-full" : "w-full"
      }
    >
      {path === "sign-up" ? (
        <SignUpPasswordMatchFeedback
          containerRef={containerRef}
          message={patientAuthCopy.signUp.passwordMismatch}
        />
      ) : null}
      <AuthView
        path={path}
        redirectTo={POST_AUTH_REDIRECT}
        socialLayout="vertical"
        className="w-full"
        classNames={authViewClassNames}
        cardHeader={cardHeader}
        cardFooter={cardFooter}
        localization={{
          FORGOT_PASSWORD_LINK: patientAuthCopy.signIn.forgotPassword,
          PASSWORDS_DO_NOT_MATCH: patientAuthCopy.signUp.passwordMismatch,
        }}
      />
    </div>
  );
}
