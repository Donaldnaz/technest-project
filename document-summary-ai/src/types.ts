export type MedicalDocumentExtraction = {
  documentType: string;
  reportDate: string | null;
  collectionDate: string | null;
  summary: string;
  plainLanguageReport: string;
  keyFindings: string[];
  attentionNote: string | null;
};

export type ExtractMedicalDocumentInput = {
  buffer: Buffer;
  mimeType: string;
  fileName: string;
  /** Override the default extraction model (`gemini-2.5-flash`). */
  modelId?: string;
};
