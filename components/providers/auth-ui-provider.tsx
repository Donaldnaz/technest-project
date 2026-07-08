"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCallback } from "react";
import { NeonAuthUIProvider } from "@neondatabase/auth-ui";

import { authClient } from "@/lib/auth/client";
import {
  icareAuthLocalization,
  passwordValidation,
} from "@/lib/auth/auth-ui-config";
import { consumePendingVerifyEmail } from "@/lib/auth/pending-email-verification";
import { POST_AUTH_REDIRECT } from "@/lib/routes/auth";

function buildEmailOtpHref(email: string): string {
  return `/auth/email-otp?email=${encodeURIComponent(email)}`;
}

export function AuthUIProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  const navigate = useCallback(
    (href: string) => {
      const pendingEmail = consumePendingVerifyEmail();
      if (pendingEmail && href.includes("/auth/sign-in")) {
        router.push(buildEmailOtpHref(pendingEmail));
        return;
      }
      router.push(href);
    },
    [router],
  );

  const replace = useCallback(
    (href: string) => {
      const pendingEmail = consumePendingVerifyEmail();
      if (pendingEmail && href.includes("/auth/sign-in")) {
        router.replace(buildEmailOtpHref(pendingEmail));
        return;
      }
      router.replace(href);
    },
    [router],
  );

  return (
    <NeonAuthUIProvider
      authClient={authClient}
      account={{ basePath: "/account", fields: [] }}
      avatar={false}
      changeEmail={false}
      deleteUser={false}
      emailVerification
      localization={icareAuthLocalization}
      nameRequired
      signUp={{ fields: ["name"] }}
      credentials={{
        confirmPassword: true,
        forgotPassword: true,
        passwordValidation,
      }}
      social={{ providers: ["google"] }}
      redirectTo={POST_AUTH_REDIRECT}
      Link={Link}
      navigate={navigate}
      replace={replace}
      onSessionChange={() => router.refresh()}
    >
      {children}
    </NeonAuthUIProvider>
  );
}
