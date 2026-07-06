export const DOCUMENT_CATEGORIES = [
  "lab_results",
  "imaging",
  "prescriptions",
  "visit_notes",
  "insurance",
  "other",
] as const;

export type DocumentCategory = (typeof DOCUMENT_CATEGORIES)[number];

export const DOCUMENT_CATEGORY_LABELS: Record<DocumentCategory, string> = {
  lab_results: "Lab results",
  imaging: "Imaging",
  prescriptions: "Prescriptions",
  visit_notes: "Visit notes",
  insurance: "Insurance",
  other: "Other",
};
