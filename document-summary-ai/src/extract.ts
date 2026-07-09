import { generateObject } from "ai";

import { buildDocumentContent } from "./build-content";
import { EXTRACTION_MODEL } from "./constants";
import { isGeminiConfigured } from "./env";
import { getGoogleModel } from "./gemini/google-model";
import { medicalDocumentExtractionSchema } from "./schema";
import type {
  ExtractMedicalDocumentInput,
  MedicalDocumentExtraction,
} from "./types";

/**
 * Reads a medical document buffer and returns a structured plain-language
 * extraction via Gemini. Throws if Gemini is not configured or the model call fails.
 */
export async function extractMedicalDocument(
  input: ExtractMedicalDocumentInput,
): Promise<MedicalDocumentExtraction> {
  if (!isGeminiConfigured()) {
    throw new Error("GEMINI_API_KEY is not configured");
  }

  const { buffer, mimeType, fileName, modelId } = input;
  const documentContent = await buildDocumentContent(
    buffer,
    mimeType,
    fileName,
  );

  const userContent =
    documentContent.type === "file"
      ? [
          {
            type: "text" as const,
            text: `You are helping a patient understand a medical document named "${fileName}". Extract key information and write a comprehensive plain-language report. Do not diagnose or prescribe. If unsure about any detail, say so clearly. Define medical terms in everyday language.`,
          },
          {
            type: "file" as const,
            data: documentContent.data,
            mediaType: documentContent.mediaType,
          },
        ]
      : [
          {
            type: "text" as const,
            text: `You are helping a patient understand a medical document. ${documentContent.text}\n\nExtract key information and write a comprehensive plain-language report. Do not diagnose or prescribe. If unsure about any detail, say so clearly. Define medical terms in everyday language.`,
          },
        ];

  const { object } = await generateObject({
    model: getGoogleModel(modelId ?? EXTRACTION_MODEL),
    schema: medicalDocumentExtractionSchema,
    messages: [
      {
        role: "user",
        content: userContent,
      },
    ],
  });

  return object;
}
