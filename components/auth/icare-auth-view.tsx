"use client";

import Link from "next/link";
import { Suspense, useRef, type ReactNode } from "react";
import { AuthView } from "@neondatabase/auth-ui";

import { AuthModeNav } from "@/components/auth/auth-mode-nav";
import { AuthPasswordVisibility } from "@/components/auth/auth-password-visibility";
import { EmailVerificationOtpView } from "@/components/auth/email-verification-otp-view";
import { PostSignupVerifyRedirect } from "@/components/auth/post-signup-verify-redirect";
import { SignUpFetchRedirect } from "@/components/auth/sign-up-fetch-redirect";
import { SignUpPasswordMatchFeedback } from "@/components/auth/sign-up-password-match-feedback";
import { icareAuthLocalization } from "@/lib/auth/auth-ui-config";
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
    ) : path === "email-otp" ? (
      <AuthViewFooterLink href="/auth/sign-up">
        {patientAuthCopy.emailOtp.backToSignUp}
      </AuthViewFooterLink>
    ) : undefined;

  const cardHeader = isCredentialSwitchPath(path) ? (
    <div className="space-y-3 text-center">
      <AuthModeNav activePath={path} />
      <p className="mx-auto max-w-sm text-sm leading-relaxed text-muted-foreground md:text-base">
        {path === "sign-in"
          ? patientAuthCopy.nav.signInDescription
          : patientAuthCopy.nav.signUpDescription}
      </p>
    </div>
  ) : undefined;

  if (path === "email-otp") {
    return (
      <div ref={containerRef} className="w-full">
        <Suspense fallback={null}>
          <EmailVerificationOtpView />
        </Suspense>
        {cardFooter}
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className={
        isCredentialSwitchPath(path) ? "icare-auth-credential-switch w-full" : "w-full"
      }
    >
      {path === "sign-up" ? (
        <>
          <SignUpFetchRedirect />
          <SignUpPasswordMatchFeedback
            containerRef={containerRef}
            message={patientAuthCopy.signUp.passwordMismatch}
          />
        </>
      ) : null}
      {path === "sign-in" ? <PostSignupVerifyRedirect /> : null}
      <AuthPasswordVisibility containerRef={containerRef} />
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
          SIGN_UP_EMAIL: icareAuthLocalization.SIGN_UP_EMAIL,
        }}
      />
    </div>
  );
}
