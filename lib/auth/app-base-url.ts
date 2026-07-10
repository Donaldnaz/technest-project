"use client";

import { useSyncExternalStore } from "react";

function normalizeBaseUrl(url: string): string {
  return url.endsWith("/") ? url.slice(0, -1) : url;
}

function resolveServerBaseUrl(): string {
  const configured = process.env.NEXT_PUBLIC_APP_URL?.trim();
  if (configured) {
    return normalizeBaseUrl(configured);
  }

  const vercelUrl = process.env.VERCEL_URL?.trim();
  if (vercelUrl) {
    return normalizeBaseUrl(`https://${vercelUrl}`);
  }

  return "";
}

function subscribeNoop() {
  return () => {};
}

export function resolveAppBaseUrl(): string {
  if (typeof window !== "undefined") {
    return normalizeBaseUrl(window.location.origin);
  }

  return resolveServerBaseUrl();
}

export function useAppBaseUrl(): string {
  return useSyncExternalStore(
    subscribeNoop,
    resolveAppBaseUrl,
    resolveServerBaseUrl,
  );
}
