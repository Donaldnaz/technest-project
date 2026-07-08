"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

import {
  clearPendingVerifyEmail,
  setPendingVerifyEmail,
} from "@/lib/auth/pending-email-verification";

function readSignupEmailFromBody(body: BodyInit | null | undefined): string | null {
  if (!body || typeof body !== "string") return null;
  try {
    const parsed = JSON.parse(body) as { email?: string };
    const email = parsed.email?.trim().toLowerCase();
    return email && email.includes("@") ? email : null;
  } catch {
    return null;
  }
}

export function SignUpFetchRedirect() {
  const router = useRouter();

  useEffect(() => {
    const originalFetch = window.fetch.bind(window);

    window.fetch = async (input, init) => {
      const response = await originalFetch(input, init);
      const url = String(input);
      const isSignupRequest =
        url.includes("/api/auth/sign-up/email") && init?.method === "POST";

      if (isSignupRequest) {
        const cloned = response.clone();
        const email = readSignupEmailFromBody(init?.body);

        if (cloned.ok && email) {
          setPendingVerifyEmail(email);
          router.replace(`/auth/email-otp?email=${encodeURIComponent(email)}`);
        } else if (!cloned.ok) {
          clearPendingVerifyEmail();
        }
      }

      return response;
    };

    return () => {
      window.fetch = originalFetch;
    };
  }, [router]);

  return null;
}
