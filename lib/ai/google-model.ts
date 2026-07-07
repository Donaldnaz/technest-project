import "server-only";

import { createGoogleGenerativeAI } from "@ai-sdk/google";

export function getGeminiApiKey(): string | undefined {
  return (
    process.env.GEMINI_API_KEY?.trim() ||
    process.env.GOOGLE_GENERATIVE_AI_API_KEY?.trim() ||
    undefined
  );
}

export function getGoogleModel(modelId = "gemini-2.0-flash") {
  const apiKey = getGeminiApiKey();

  if (!apiKey) {
    throw new Error("GEMINI_API_KEY is not configured");
  }

  const google = createGoogleGenerativeAI({ apiKey });
  return google(modelId);
}

export function isGeminiConfigured(): boolean {
  return Boolean(getGeminiApiKey());
}
