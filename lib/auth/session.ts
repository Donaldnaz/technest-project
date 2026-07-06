import "server-only";

import { UnauthorizedError } from "@/lib/errors";
import { auth } from "@/lib/auth/server";

export async function requireSession() {
  const { data: session } = await auth.getSession();

  if (!session?.user?.id) {
    throw new UnauthorizedError();
  }

  return session;
}

export async function requireUserId(): Promise<string> {
  const session = await requireSession();
  return session.user.id;
}

export async function getOptionalSession() {
  const { data: session } = await auth.getSession();
  return session;
}
