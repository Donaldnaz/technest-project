"use client";

import { NeonAuthUIProvider } from "@neondatabase/auth-ui";

import { authClient } from "@/lib/auth/client";
import {
  icareAuthLocalization,
  passwordValidation,
} from "@/lib/auth/auth-ui-config";
import { POST_AUTH_REDIRECT } from "@/lib/routes/auth";

export function AuthUIProvider({ children }: { children: React.ReactNode }) {
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
    >
      {children}
    </NeonAuthUIProvider>
  );
}
