import "server-only";

import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";

import * as relations from "@/lib/db/relations";
import * as schema from "@/lib/db/schema";

function getDatabaseUrl(): string {
  return (
    process.env.DATABASE_URL ??
    "postgresql://placeholder:placeholder@localhost:5432/placeholder"
  );
}

const sql = neon(getDatabaseUrl());

export const db = drizzle(sql, {
  schema: { ...schema, ...relations },
});
