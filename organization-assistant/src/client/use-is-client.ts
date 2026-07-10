"use client";

import { useSyncExternalStore } from "react";

function subscribeNoop() {
  return () => {};
}

export function useIsClient(): boolean {
  return useSyncExternalStore(subscribeNoop, () => true, () => false);
}
