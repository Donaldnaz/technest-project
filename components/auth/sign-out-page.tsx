"use client";

import { useRouter } from "next/navigation";

import { SignOutConfirmDialog } from "@/components/auth/sign-out-confirm-dialog";

export function SignOutPage() {
  const router = useRouter();

  return (
    <SignOutConfirmDialog
      open
      onOpenChange={(open) => {
        if (!open) {
          router.replace("/dashboard");
        }
      }}
    />
  );
}
