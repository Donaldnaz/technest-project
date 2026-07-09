import { NextRequest, NextResponse } from "next/server";

import { auth } from "@/lib/auth/server";
import { agentDebugLog } from "@/lib/debug/agent-log";

const neonAuthProxy = auth.middleware({
  loginUrl: "/auth/sign-in",
});

/** OAuth callback lands on `/` with this query param — must stay behind auth proxy. */
const NEON_AUTH_SESSION_VERIFIER_PARAM = "neon_auth_session_verifier";

function isPublicRoute(request: NextRequest): boolean {
  const { pathname } = request.nextUrl;

  if (pathname === "/legal" || pathname.startsWith("/legal/")) {
    return true;
  }

  if (pathname.startsWith("/auth/")) {
    return true;
  }

  if (pathname.startsWith("/api/auth")) {
    return true;
  }

  if (pathname !== "/") {
    return false;
  }

  return !request.nextUrl.searchParams.has(NEON_AUTH_SESSION_VERIFIER_PARAM);
}

function isServerActionRequest(request: NextRequest): boolean {
  return request.method === "POST" && request.headers.has("next-action");
}

/**
 * POST routes that must not run Neon session validation on the original POST
 * body (e.g. Blob upload events, multipart form uploads, empty JSON API posts).
 * Session is checked via a synthetic GET instead.
 */
function isPostWithSyntheticSessionCheck(request: NextRequest): boolean {
  if (request.method !== "POST") return false;

  const { pathname } = request.nextUrl;
  return (
    pathname === "/api/upload" ||
    /^\/api\/documents\/[^/]+\/generate-summary$/.test(pathname)
  );
}

function needsSyntheticGetSessionCheck(request: NextRequest): boolean {
  return isServerActionRequest(request) || isPostWithSyntheticSessionCheck(request);
}

function isJsonApiUnauthorizedResponse(request: NextRequest): boolean {
  const { pathname } = request.nextUrl;
  return (
    pathname === "/api/upload" ||
    pathname.startsWith("/api/documents/")
  );
}

/**
 * Neon Auth proxy validates sessions by proxying the incoming request to
 * get-session, which only accepts GET. Server Actions and Blob upload POSTs send
 * non-session bodies to protected routes, so session checks fail and the client
 * is redirected to sign-in (HTML). That surfaces as "Failed to retrieve the
 * client token" for Vercel Blob uploads.
 */
export default async function proxy(request: NextRequest) {
  if (isPublicRoute(request)) {
    return NextResponse.next();
  }

  const pathname = request.nextUrl.pathname;
  const usesSynthetic = needsSyntheticGetSessionCheck(request);

  // #region agent log
  if (pathname.includes("generate-summary")) {
    agentDebugLog({
      hypothesisId: "A",
      location: "proxy.ts:entry",
      message: "generate-summary proxy entry",
      data: {
        method: request.method,
        pathname,
        usesSynthetic,
      },
    });
  }
  // #endregion

  if (!usesSynthetic) {
    return neonAuthProxy(request);
  }

  const sessionCheckRequest = new NextRequest(request.url, {
    method: "GET",
    headers: request.headers,
  });
  const authResponse = await neonAuthProxy(sessionCheckRequest);
  const redirectLocation = authResponse.headers.get("location");

  // #region agent log
  if (pathname.includes("generate-summary")) {
    agentDebugLog({
      hypothesisId: "A",
      location: "proxy.ts:synthetic-result",
      message: "generate-summary synthetic session check",
      data: {
        pathname,
        redirected: Boolean(redirectLocation),
        redirectLocation,
        status: authResponse.status,
      },
    });
  }
  // #endregion

  if (redirectLocation) {
    if (isJsonApiUnauthorizedResponse(request)) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    return authResponse;
  }

  const response = NextResponse.next({
    request: { headers: request.headers },
  });

  for (const cookie of authResponse.headers.getSetCookie()) {
    response.headers.append("Set-Cookie", cookie);
  }

  return response;
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
