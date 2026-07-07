"use client";

import { useState } from "react";
import { Lock } from "lucide-react";
import { toast } from "sonner";

import { authClient } from "@/lib/auth/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { patientAccountCopy } from "@/lib/copy/patient/account";

const MIN_PASSWORD_LENGTH = 8;

export function ChangePasswordSettings() {
  const { data: session, isPending: sessionPending } = authClient.useSession();
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [pending, setPending] = useState(false);

  if (sessionPending) {
    return (
      <div className="space-y-4">
        <div className="h-16 animate-pulse rounded-2xl bg-muted/60" />
        <div className="h-11 animate-pulse rounded-xl bg-muted/60" />
        <div className="h-11 animate-pulse rounded-xl bg-muted/60" />
        <div className="h-11 animate-pulse rounded-xl bg-muted/60" />
      </div>
    );
  }

  if (!session?.user) {
    return (
      <p className="text-sm text-muted-foreground">
        {patientAccountCopy.security.signedOut}
      </p>
    );
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (newPassword.length < MIN_PASSWORD_LENGTH) {
      toast.error(
        patientAccountCopy.security.toast.tooShort(MIN_PASSWORD_LENGTH),
      );
      return;
    }

    if (newPassword !== confirmPassword) {
      toast.error(patientAccountCopy.security.toast.mismatch);
      return;
    }

    setPending(true);

    try {
      const result = await authClient.changePassword({
        currentPassword,
        newPassword,
        revokeOtherSessions: true,
      });

      if (result.error) {
        toast.error(
          result.error.message ?? patientAccountCopy.security.toast.error,
        );
        return;
      }

      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
      toast.success(patientAccountCopy.security.toast.success);
    } catch {
      toast.error(patientAccountCopy.security.toast.error);
    } finally {
      setPending(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="flex items-start gap-4 border-b border-border/60 pb-6">
        <span className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-primary">
          <Lock className="size-5" aria-hidden />
        </span>
        <div className="min-w-0">
          <h2 className="font-heading text-xl font-semibold tracking-tight">
            {patientAccountCopy.security.title}
          </h2>
          <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
            {patientAccountCopy.security.description}
          </p>
        </div>
      </div>

      <div className="grid max-w-lg gap-5">
        <div className="grid gap-2">
          <Label htmlFor="currentPassword">
            {patientAccountCopy.security.fields.current}
          </Label>
          <Input
            id="currentPassword"
            type="password"
            autoComplete="current-password"
            value={currentPassword}
            onChange={(event) => setCurrentPassword(event.target.value)}
            required
            disabled={pending}
            className="dashboard-form-control"
          />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="newPassword">
            {patientAccountCopy.security.fields.new}
          </Label>
          <Input
            id="newPassword"
            type="password"
            autoComplete="new-password"
            value={newPassword}
            onChange={(event) => setNewPassword(event.target.value)}
            required
            minLength={MIN_PASSWORD_LENGTH}
            disabled={pending}
            className="dashboard-form-control"
          />
          <p className="text-xs text-muted-foreground">
            {patientAccountCopy.security.minLengthHint(MIN_PASSWORD_LENGTH)}
          </p>
        </div>

        <div className="grid gap-2">
          <Label htmlFor="confirmPassword">
            {patientAccountCopy.security.fields.confirm}
          </Label>
          <Input
            id="confirmPassword"
            type="password"
            autoComplete="new-password"
            value={confirmPassword}
            onChange={(event) => setConfirmPassword(event.target.value)}
            required
            minLength={MIN_PASSWORD_LENGTH}
            disabled={pending}
            className="dashboard-form-control"
          />
        </div>
      </div>

      <div className="border-t border-border/60 pt-6">
        <Button
          type="submit"
          size="lg"
          disabled={pending}
          className="w-full rounded-2xl sm:w-auto"
        >
          {pending
            ? patientAccountCopy.security.submitting
            : patientAccountCopy.security.submit}
        </Button>
      </div>
    </form>
  );
}
