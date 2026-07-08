"use client";

import { useEffect, useState } from "react";

import {
  type LinkedAccount,
} from "@/lib/auth/account-providers";
import { authClient } from "@/lib/auth/client";

export function useLinkedAccounts(userId: string | undefined) {
  const [accounts, setAccounts] = useState<LinkedAccount[] | null>(null);
  const [isPending, setIsPending] = useState(Boolean(userId));

  useEffect(() => {
    if (!userId) {
      setAccounts(null);
      setIsPending(false);
      return;
    }

    let cancelled = false;
    setIsPending(true);
    setAccounts(null);

    void authClient
      .listAccounts({ fetchOptions: { throw: true } })
      .then((data) => {
        if (!cancelled) {
          setAccounts(data);
        }
      })
      .catch(() => {
        if (!cancelled) {
          setAccounts([]);
        }
      })
      .finally(() => {
        if (!cancelled) {
          setIsPending(false);
        }
      });

    return () => {
      cancelled = true;
    };
  }, [userId]);

  return { accounts, isPending };
}
