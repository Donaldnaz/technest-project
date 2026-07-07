"use client";

import { useContext } from "react";
import { AuthUIContext, GoogleIcon } from "@neondatabase/auth-ui";
import { Mail, UserRound } from "lucide-react";

import { authClient } from "@/lib/auth/client";
import { patientAccountCopy } from "@/lib/copy/patient/account";

function getInitials(name: string | null | undefined): string {
  if (!name?.trim()) return "?";
  const parts = name.trim().split(/\s+/);
  if (parts.length === 1) return parts[0].charAt(0).toUpperCase();
  return `${parts[0].charAt(0)}${parts[parts.length - 1].charAt(0)}`.toUpperCase();
}

function ProfileField({
  icon: Icon,
  label,
  value,
  breakWords = false,
}: {
  icon: typeof UserRound;
  label: string;
  value: string;
  breakWords?: boolean;
}) {
  return (
    <div className="flex items-start gap-4 rounded-2xl border border-border/60 bg-oat-50/40 p-4 dark:bg-charcoal-950/20">
      <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
        <Icon className="size-4" aria-hidden />
      </span>
      <div className="min-w-0 flex-1">
        <dt className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
          {label}
        </dt>
        <dd
          className={
            breakWords
              ? "mt-1 break-all text-base font-medium leading-snug"
              : "mt-1 truncate text-base font-medium"
          }
        >
          {value}
        </dd>
      </div>
    </div>
  );
}

function GoogleSignInIndicator() {
  const { hooks } = useContext(AuthUIContext);
  const { data: accounts, isPending: accountsPending } = hooks.useListAccounts();
  const usesGoogle = accounts?.some((account) => account.providerId === "google");

  if (accountsPending || !usesGoogle) {
    return null;
  }

  return (
    <div className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-background px-3 py-1.5 text-sm shadow-sm">
      <GoogleIcon className="size-4 shrink-0" aria-hidden />
      <span className="font-medium text-foreground">
        {patientAccountCopy.profile.googleSignIn}
      </span>
    </div>
  );
}

export function AccountReadonlyProfile() {
  const { data: session, isPending } = authClient.useSession();

  if (isPending) {
    return (
      <div className="space-y-5">
        <div className="flex items-center gap-4">
          <div className="size-16 animate-pulse rounded-2xl bg-muted/60" />
          <div className="space-y-2">
            <div className="h-5 w-36 animate-pulse rounded-lg bg-muted/60" />
            <div className="h-4 w-48 animate-pulse rounded-lg bg-muted/60" />
          </div>
        </div>
        <div className="h-20 animate-pulse rounded-2xl bg-muted/60" />
        <div className="h-20 animate-pulse rounded-2xl bg-muted/60" />
      </div>
    );
  }

  if (!session?.user) {
    return (
      <p className="text-sm text-muted-foreground">
        {patientAccountCopy.profile.signedOut}
      </p>
    );
  }

  const { user } = session;
  const displayName = user.name?.trim() || "—";

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4 border-b border-border/60 pb-6">
        <div
          className="flex size-16 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-teal-100 to-sage-100 font-heading text-xl font-semibold text-teal-900 dark:from-teal-950/60 dark:to-sage-950/40 dark:text-teal-100"
          aria-hidden
        >
          {getInitials(user.name)}
        </div>
        <div className="min-w-0 space-y-2">
          <h2 className="font-heading text-xl font-semibold tracking-tight">
            {patientAccountCopy.profile.title}
          </h2>
          <p className="text-sm leading-relaxed text-muted-foreground">
            {patientAccountCopy.profile.description}
          </p>
          <GoogleSignInIndicator />
        </div>
      </div>

      <dl className="grid gap-3">
        <ProfileField
          icon={UserRound}
          label={patientAccountCopy.profile.fields.name}
          value={displayName}
        />
        <ProfileField
          icon={Mail}
          label={patientAccountCopy.profile.fields.email}
          value={user.email ?? "—"}
          breakWords
        />
      </dl>

      <p className="rounded-2xl border border-dashed border-border/70 bg-muted/30 px-4 py-3 text-sm text-muted-foreground">
        {patientAccountCopy.profile.supportHint}
      </p>
    </div>
  );
}
