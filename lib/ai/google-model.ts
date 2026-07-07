import "server-only";

import { createGoogleGenerativeAI } from "@ai-sdk/google";

export function getGeminiApiKey(): string | undefined {
  return (
    process.env.GEMINI_API_KEY?.trim() ||
    process.env.GOOGLE_GENERATIVE_AI_API_KEY?.trim() ||
    undefined
  );
}

export function getGoogleModel(modelId?: string) {
  const apiKey = getGeminiApiKey();

  if (!apiKey) {
    throw new Error("GEMINI_API_KEY is not configured");
  }

  const resolvedModel =
    modelId?.trim() ||
    process.env.GEMINI_MODEL?.trim() ||
    "gemini-2.5-flash-lite";

  const google = createGoogleGenerativeAI({ apiKey });
  return google(resolvedModel);
}

export function isGeminiConfigured(): boolean {
  return Boolean(getGeminiApiKey());
}
