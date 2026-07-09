import { config } from "dotenv";
import { defineConfig } from "drizzle-kit";

// Next.js reads `.env.local`; drizzle-kit does not unless we load it explicitly.
config({ path: ".env.local", quiet: true, override: true });
config({ path: ".env", quiet: true, override: true });

function sanitizeDatabaseUrl(raw: string | undefined): string {
  const trimmed = raw?.trim() ?? "";
  const match = trimmed.match(/postgres(?:ql)?:\/\/\S+/i);
  const url = match?.[0]?.replace(/[\r\n]+/g, "");
  if (!url) {
    throw new Error("DATABASE_URL must be a valid postgres connection string.");
  }
  return url;
}

export default defineConfig({
  schema: "./lib/db/schema.ts",
  out: "./drizzle",
  dialect: "postgresql",
  dbCredentials: {
    url: sanitizeDatabaseUrl(process.env.DATABASE_URL),
  },
});
