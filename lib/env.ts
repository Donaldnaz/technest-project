import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  server: {
    DATABASE_URL: z.string().min(1),
    NEON_AUTH_BASE_URL: z.string().url(),
    NEON_AUTH_COOKIE_SECRET: z.string().min(32),
    BLOB_READ_WRITE_TOKEN: z.string().min(1).optional(),
    GEMINI_API_KEY: z.string().min(1).optional(),
    SLACK_WEBHOOK_URL: z.string().url().optional(),
  },
  client: {},
  runtimeEnv: {
    DATABASE_URL: process.env.DATABASE_URL,
    NEON_AUTH_BASE_URL: process.env.NEON_AUTH_BASE_URL,
    NEON_AUTH_COOKIE_SECRET: process.env.NEON_AUTH_COOKIE_SECRET,
    BLOB_READ_WRITE_TOKEN: process.env.BLOB_READ_WRITE_TOKEN,
    GEMINI_API_KEY: process.env.GEMINI_API_KEY,
    SLACK_WEBHOOK_URL: process.env.SLACK_WEBHOOK_URL,
  },
  skipValidation: process.env.SKIP_ENV_VALIDATION === "true",
});
