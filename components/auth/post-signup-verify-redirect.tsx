"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

import { consumePendingVerifyEmail } from "@/lib/auth/pending-email-verification";

export function PostSignupVerifyRedirect() {
  const router = useRouter();

  useEffect(() => {
    const email = consumePendingVerifyEmail();
    if (!email) return;

    router.replace(`/auth/email-otp?email=${encodeURIComponent(email)}`);
  }, [router]);

  return null;
}
