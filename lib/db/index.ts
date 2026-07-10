import "server-only";

import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";

import * as relations from "@/lib/db/relations";
import { withDbRetry } from "@/lib/db/retry";
import * as schema from "@/lib/db/schema";
import { env } from "@/lib/env";

/** Strip accidental console tip text that can prepend DATABASE_URL in some shells. */
function sanitizeDatabaseUrl(raw: string | undefined): string | undefined {
  if (!raw) {
    return undefined;
  }

  const trimmed = raw.trim();
  const match = trimmed.match(/postgres(?:ql)?:\/\/\S+/i);
  return match?.[0]?.replace(/[\r\n]+/g, "") ?? undefined;
}

function getDatabaseUrl(): string {
  const url =
    sanitizeDatabaseUrl(env.DATABASE_URL) ??
    sanitizeDatabaseUrl(process.env.DATABASE_URL);

  if (url) {
    return url;
  }

  if (process.env.SKIP_ENV_VALIDATION === "true") {
    return "postgresql://placeholder:placeholder@localhost:5432/placeholder";
  }

  throw new Error("DATABASE_URL must be set in environment variables.");
}

const sql = neon(getDatabaseUrl());

export const db = drizzle(sql, {
  schema: { ...schema, ...relations },
});

export async function dbQuery<T>(operation: () => Promise<T>): Promise<T> {
  return withDbRetry(operation);
}
