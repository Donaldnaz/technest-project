import "server-only";

import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";

import * as relations from "@/lib/db/relations";
import { withDbRetry } from "@/lib/db/retry";
import * as schema from "@/lib/db/schema";
import { env } from "@/lib/env";

function getDatabaseUrl(): string {
  const url = env.DATABASE_URL?.trim();
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
