/**
 * Public API for @icare/document-summary-ai.
 *
 * Host apps fetch the file (e.g. from Blob), call `extractMedicalDocument`,
 * then persist the result. Gemini keys stay in the host environment.
 */
export { extractMedicalDocument } from "./extract";
export { isGeminiConfigured, getGeminiApiKey, getGeminiModelId } from "./env";
export { EXTRACTION_MODEL, DOCX_MIME_TYPE } from "./constants";
export { medicalDocumentExtractionSchema } from "./schema";
export type {
  MedicalDocumentExtraction,
  ExtractMedicalDocumentInput,
} from "./types";
