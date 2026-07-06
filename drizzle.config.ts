import { config } from "dotenv";
import { defineConfig } from "drizzle-kit";

// Next.js reads `.env.local`; drizzle-kit does not unless we load it explicitly.
config({ path: ".env.local" });
config();

export default defineConfig({
  schema: "./lib/db/schema.ts",
  out: "./drizzle",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
});
