"use client";

import { useSyncExternalStore } from "react";

/** True after client hydration; false during SSR. Avoids setState-in-effect for theme/session UI. */
export function useClientMounted(): boolean {
  return useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );
}
