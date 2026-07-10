"use client";

import { useEffect, useState } from "react";

function normalizeBaseUrl(url: string): string {
  return url.endsWith("/") ? url.slice(0, -1) : url;
}

export function resolveAppBaseUrl(): string {
  if (typeof window !== "undefined") {
    return normalizeBaseUrl(window.location.origin);
  }

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

export function useAppBaseUrl(): string {
  const [baseURL, setBaseURL] = useState("");

  useEffect(() => {
    setBaseURL(resolveAppBaseUrl());
  }, []);

  return baseURL;
}
