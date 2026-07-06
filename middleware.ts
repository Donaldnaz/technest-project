import { NextRequest, NextResponse } from "next/server";

import { edgeAuth } from "@/lib/auth/edge";

const neonAuthMiddleware = edgeAuth.middleware({
  loginUrl: "/auth/sign-in",
});

function isServerActionRequest(request: NextRequest): boolean {
  return request.method === "POST" && request.headers.has("next-action");
}

/**
 * POST routes that must not run Neon session validation on the original POST
 * body (e.g. Blob upload events). Session is checked via a synthetic GET instead.
 */
function isPostWithSyntheticSessionCheck(request: NextRequest): boolean {
  if (request.method !== "POST") return false;

  const { pathname } = request.nextUrl;
  return pathname === "/api/upload";
}

function needsSyntheticGetSessionCheck(request: NextRequest): boolean {
  return isServerActionRequest(request) || isPostWithSyntheticSessionCheck(request);
}

/**
 * Neon Auth middleware validates sessions by proxying the incoming request to
 * get-session, which only accepts GET. Server Actions and Blob upload POSTs send
 * non-session bodies to protected routes, so session checks fail and the client
 * is redirected to sign-in (HTML). That surfaces as "Failed to retrieve the
 * client token" for Vercel Blob uploads.
 */
export default async function middleware(request: NextRequest) {
  if (!needsSyntheticGetSessionCheck(request)) {
    return neonAuthMiddleware(request);
  }

  const sessionCheckRequest = new NextRequest(request.url, {
    method: "GET",
    headers: request.headers,
  });
  const authResponse = await neonAuthMiddleware(sessionCheckRequest);

  const isUploadApi =
    request.method === "POST" && request.nextUrl.pathname === "/api/upload";

  if (authResponse.headers.get("location")) {
    if (isUploadApi) {
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
