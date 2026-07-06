import { createNeonAuth } from "@neondatabase/auth/next/server";

import { getNeonAuthConfig } from "@/lib/auth/config";

const neonAuthConfig = getNeonAuthConfig();

/** Edge-compatible Neon Auth instance for middleware only (no server-only import). */
export const edgeAuth = createNeonAuth({
  baseUrl: neonAuthConfig.baseUrl,
  cookies: {
    secret: neonAuthConfig.secret,
    sameSite: "lax",
  },
});
