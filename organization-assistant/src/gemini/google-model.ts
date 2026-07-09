import { createGoogleGenerativeAI } from "@ai-sdk/google";

import { getGeminiApiKey, getGeminiModelId } from "../env";

export function getGoogleModel(modelId?: string) {
  const apiKey = getGeminiApiKey();

  if (!apiKey) {
    throw new Error("GEMINI_API_KEY is not configured");
  }

  const resolvedModel =
    modelId?.trim() || getGeminiModelId() || "gemini-2.5-flash-lite";

  const google = createGoogleGenerativeAI({ apiKey });
  return google(resolvedModel);
}
