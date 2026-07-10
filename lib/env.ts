import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

function sanitizeDatabaseUrl(raw: string | undefined): string | undefined {
  if (!raw) {
    return undefined;
  }

  const match = raw.trim().match(/postgres(?:ql)?:\/\/\S+/i);
  return match?.[0]?.replace(/[\r\n]+/g, "") ?? undefined;
}

export const env = createEnv({
  server: {
    DATABASE_URL: z.string().min(1),
    NEON_AUTH_BASE_URL: z.string().url(),
    NEON_AUTH_COOKIE_SECRET: z.string().min(32),
    BLOB_READ_WRITE_TOKEN: z.string().min(1).optional(),
    GEMINI_API_KEY: z.string().min(1).optional(),
    GOOGLE_GENERATIVE_AI_API_KEY: z.string().min(1).optional(),
    GEMINI_MODEL: z.string().min(1).optional(),
    SLACK_WEBHOOK_URL: z.string().url().optional(),
    SLACK_BOT_TOKEN: z.string().min(1).optional(),
    SLACK_CHANNEL_ID: z.string().min(1).optional(),
  },
  client: {},
  runtimeEnv: {
    DATABASE_URL: sanitizeDatabaseUrl(process.env.DATABASE_URL),
    NEON_AUTH_BASE_URL: process.env.NEON_AUTH_BASE_URL,
    NEON_AUTH_COOKIE_SECRET: process.env.NEON_AUTH_COOKIE_SECRET,
    BLOB_READ_WRITE_TOKEN: process.env.BLOB_READ_WRITE_TOKEN,
    GEMINI_API_KEY: process.env.GEMINI_API_KEY,
    GOOGLE_GENERATIVE_AI_API_KEY: process.env.GOOGLE_GENERATIVE_AI_API_KEY,
    GEMINI_MODEL: process.env.GEMINI_MODEL,
    SLACK_WEBHOOK_URL: process.env.SLACK_WEBHOOK_URL,
    SLACK_BOT_TOKEN: process.env.SLACK_BOT_TOKEN,
    SLACK_CHANNEL_ID: process.env.SLACK_CHANNEL_ID,
  },
  skipValidation: process.env.SKIP_ENV_VALIDATION === "true",
});

/** Resolved Gemini API key (primary or Google AI alias). */
export function getGeminiApiKeyFromEnv(): string | undefined {
  return (
    env.GEMINI_API_KEY?.trim() ||
    env.GOOGLE_GENERATIVE_AI_API_KEY?.trim() ||
    undefined
  );
}

/** Slack incoming webhook URL, trimmed; null when unset. */
export function getSlackWebhookUrl(): string | null {
  const url = env.SLACK_WEBHOOK_URL?.trim();
  return url || null;
}

/** Slack bot upload config; null when token or channel is unset. */
export function getSlackBotConfig(): { token: string; channelId: string } | null {
  const token = env.SLACK_BOT_TOKEN?.trim();
  const channelId = env.SLACK_CHANNEL_ID?.trim();

  if (!token || !channelId) {
    return null;
  }

  return { token, channelId };
}
