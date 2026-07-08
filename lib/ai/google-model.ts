import "server-only";

import { createGoogleGenerativeAI } from "@ai-sdk/google";

import { env, getGeminiApiKeyFromEnv } from "@/lib/env";

export function getGeminiApiKey(): string | undefined {
  return getGeminiApiKeyFromEnv();
}

export function getGoogleModel(modelId?: string) {
  const apiKey = getGeminiApiKey();

  if (!apiKey) {
    throw new Error("GEMINI_API_KEY is not configured");
  }

  const resolvedModel =
    modelId?.trim() ||
    env.GEMINI_MODEL?.trim() ||
    "gemini-2.5-flash-lite";

  const google = createGoogleGenerativeAI({ apiKey });
  return google(resolvedModel);
}

export function isGeminiConfigured(): boolean {
  return Boolean(getGeminiApiKey());
}
