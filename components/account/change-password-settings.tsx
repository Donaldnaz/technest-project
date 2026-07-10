"use client";

import { useState } from "react";
import { toast } from "sonner";

import { authClient } from "@/lib/auth/client";
import { PASSWORD_MIN_LENGTH, validatePassword } from "@/lib/auth/password-policy";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { PasswordInput } from "@/components/ui/password-input";

export function ChangePasswordSettings() {
  const { data: session, isPending: sessionPending } = authClient.useSession();
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [pending, setPending] = useState(false);

  if (sessionPending) {
    return (
      <div className="h-40 animate-pulse rounded-2xl bg-muted/60" />
    );
  }

  if (!session?.user) {
    return (
      <p className="text-sm text-muted-foreground">
        Sign in to update your password.
      </p>
    );
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const passwordCheck = validatePassword(newPassword);
    if (!passwordCheck.valid) {
      toast.error(passwordCheck.message);
      return;
    }

    if (newPassword !== confirmPassword) {
      toast.error("New passwords do not match.");
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
        toast.error(result.error.message ?? "Could not update your password.");
        return;
      }

      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
      toast.success("Password updated successfully.");
    } catch {
      toast.error("Could not update your password. Check your current password.");
    } finally {
      setPending(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="grid max-w-lg gap-4">
      <p className="text-sm leading-relaxed text-muted-foreground">
        Update your sign-in password. Your name and email cannot be changed here.
      </p>

      <div className="grid gap-2">
        <Label htmlFor="currentPassword">Current password</Label>
        <PasswordInput
          id="currentPassword"
          autoComplete="current-password"
          value={currentPassword}
          onChange={(event) => setCurrentPassword(event.target.value)}
          required
          disabled={pending}
          className="dashboard-form-control"
        />
      </div>

      <div className="grid gap-2">
        <Label htmlFor="newPassword">New password</Label>
        <PasswordInput
          id="newPassword"
          autoComplete="new-password"
          value={newPassword}
          onChange={(event) => setNewPassword(event.target.value)}
          required
          minLength={PASSWORD_MIN_LENGTH}
          disabled={pending}
          className="dashboard-form-control"
        />
      </div>

      <div className="grid gap-2">
        <Label htmlFor="confirmPassword">Confirm new password</Label>
        <PasswordInput
          id="confirmPassword"
          autoComplete="new-password"
          value={confirmPassword}
          onChange={(event) => setConfirmPassword(event.target.value)}
          required
          minLength={PASSWORD_MIN_LENGTH}
          disabled={pending}
          className="dashboard-form-control"
        />
      </div>

      <Button
        type="submit"
        disabled={pending}
        className="min-h-11 w-full rounded-xl sm:w-auto"
      >
        {pending ? "Updating..." : "Update password"}
      </Button>
    </form>
  );
}
