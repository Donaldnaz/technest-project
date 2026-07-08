"use client";

import { useEffect, useState } from "react";

import {
  type LinkedAccount,
} from "@/lib/auth/account-providers";
import { authClient } from "@/lib/auth/client";

export function useLinkedAccounts(userId: string | undefined) {
  const [state, setState] = useState<{
    forUserId?: string;
    accounts: LinkedAccount[] | null;
    isPending: boolean;
  }>({ accounts: null, isPending: false });

  useEffect(() => {
    if (!userId) return;

    let cancelled = false;

    void authClient
      .listAccounts({ fetchOptions: { throw: true } })
      .then((data) => {
        if (!cancelled) {
          setState({ forUserId: userId, accounts: data, isPending: false });
        }
      })
      .catch(() => {
        if (!cancelled) {
          setState({ forUserId: userId, accounts: [], isPending: false });
        }
      });

    return () => {
      cancelled = true;
    };
  }, [userId]);

  if (!userId) {
    return { accounts: null, isPending: false };
  }

  if (state.forUserId !== userId) {
    return { accounts: null, isPending: true };
  }

  return { accounts: state.accounts, isPending: state.isPending };
}
