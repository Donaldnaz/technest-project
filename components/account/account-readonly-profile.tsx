"use client";

import { authClient } from "@/lib/auth/client";

export function AccountReadonlyProfile() {
  const { data: session, isPending } = authClient.useSession();

  if (isPending) {
    return (
      <div className="space-y-4">
        <div className="h-24 animate-pulse rounded-2xl bg-muted/60" />
        <div className="h-24 animate-pulse rounded-2xl bg-muted/60" />
      </div>
    );
  }

  if (!session?.user) {
    return (
      <p className="text-sm text-muted-foreground">
        Sign in to view your account details.
      </p>
    );
  }

  const { user } = session;

  return (
    <div className="space-y-4">
      <p className="text-sm leading-relaxed text-muted-foreground">
        Your name and email were set when you signed up and cannot be changed
        here. Contact support if you need help with your account details.
      </p>

      <dl className="divide-y divide-border/60 rounded-2xl border border-border/60">
        <div className="px-5 py-4">
          <dt className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
            Full name
          </dt>
          <dd className="mt-1 text-base font-medium">
            {user.name?.trim() || "—"}
          </dd>
        </div>
        <div className="px-5 py-4">
          <dt className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
            Email address
          </dt>
          <dd className="mt-1 text-base font-medium">{user.email ?? "—"}</dd>
        </div>
      </dl>
    </div>
  );
}
