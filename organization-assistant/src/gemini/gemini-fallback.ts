import { generateText } from "ai";

import { getGeminiModelId } from "../env";
import { getGoogleModel } from "./google-model";

export const GEMINI_FALLBACK_MODELS = [
  "gemini-2.5-flash-lite",
  "gemini-2.5-flash",
  "gemini-2.0-flash-lite",
] as const;

export function getGeminiModelCandidates(): string[] {
  const preferred = getGeminiModelId();
  const models = preferred
    ? [preferred, ...GEMINI_FALLBACK_MODELS.filter((model) => model !== preferred)]
    : [...GEMINI_FALLBACK_MODELS];

  return [...new Set(models)];
}

export function isRetryableGeminiError(error: unknown): boolean {
  const message = (
    error instanceof Error ? error.message : String(error)
  ).toLowerCase();

  return (
    message.includes("quota") ||
    message.includes("429") ||
    message.includes("503") ||
    message.includes("unavailable") ||
    message.includes("high demand") ||
    message.includes("rate limit") ||
    message.includes("resource_exhausted") ||
    message.includes("prepayment credits")
  );
}

type GeminiTextOptions = {
  system: string;
  messages: Array<{ role: "user" | "assistant"; content: string }>;
  maxOutputTokens?: number;
  temperature?: number;
};

export async function generateTextWithGeminiFallback(options: GeminiTextOptions) {
  const models = getGeminiModelCandidates();
  let lastError: unknown;

  for (const modelId of models) {
    try {
      return await generateText({
        ...options,
        model: getGoogleModel(modelId),
        maxOutputTokens: options.maxOutputTokens ?? 350,
        temperature: options.temperature ?? 0.4,
      });
    } catch (error) {
      lastError = error;
      if (!isRetryableGeminiError(error)) {
        throw error;
      }
    }
  }

  throw lastError ?? new Error("All Gemini models failed");
}
