"use client";

import { useState } from "react";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth/client";
import { clearPendingVerifyEmail } from "@/lib/auth/pending-email-verification";
import { patientAuthCopy } from "@/lib/copy/patient/auth";

type SignOutConfirmDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export function SignOutConfirmDialog({
  open,
  onOpenChange,
}: SignOutConfirmDialogProps) {
  const [pending, setPending] = useState(false);

  async function handleSignOut() {
    setPending(true);

    try {
      const result = await authClient.signOut();

      if (result.error) {
        throw new Error(result.error.message ?? "Could not sign out.");
      }

      clearPendingVerifyEmail();
      window.location.assign("/auth/sign-in");
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Could not sign out.",
      );
      setPending(false);
    }
  }

  function handleOpenChange(next: boolean) {
    if (pending) return;
    onOpenChange(next);
  }

  return (
    <AlertDialog open={open} onOpenChange={handleOpenChange}>
      <AlertDialogContent className="gap-0 overflow-hidden rounded-3xl border-border/60 p-0 shadow-xl sm:max-w-[22.5rem]">
        <div className="flex flex-col items-center px-6 pt-8 pb-7 text-center">
          <AlertDialogHeader className="w-full place-items-center gap-2 text-center">
            <AlertDialogTitle className="font-heading text-xl font-semibold tracking-tight">
              {patientAuthCopy.signOut.confirmTitle}
            </AlertDialogTitle>
            <AlertDialogDescription className="max-w-[16rem] text-sm leading-relaxed text-muted-foreground">
              {patientAuthCopy.signOut.confirmDescription}
            </AlertDialogDescription>
          </AlertDialogHeader>
        </div>

        <AlertDialogFooter className="m-0 flex-row gap-3 border-t border-border/50 bg-muted/25 px-4 py-4 sm:justify-stretch">
          <AlertDialogCancel
            disabled={pending}
            className="h-11 flex-1 rounded-xl"
          >
            {patientAuthCopy.signOut.cancel}
          </AlertDialogCancel>
          <Button
            type="button"
            variant="destructive"
            className="h-11 flex-1 rounded-xl"
            disabled={pending}
            onClick={handleSignOut}
          >
            {pending ? (
              <>
                <Loader2 className="size-4 animate-spin" aria-hidden />
                {patientAuthCopy.signOut.signingOut}
              </>
            ) : (
              patientAuthCopy.signOut.confirmAction
            )}
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
