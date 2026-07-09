import type { DocumentCategory } from "@/lib/constants/document-categories";

export const PATIENT_CATEGORY_LABELS: Record<DocumentCategory, string> = {
  lab_results: "Lab report",
  imaging: "Imaging report",
  prescriptions: "Prescription",
  visit_notes: "Visit note",
  insurance: "Insurance",
  other: "Other document",
};

export const PATIENT_CATEGORY_PILLS: Record<
  DocumentCategory,
  { label: string; emoji: string }
> = {
  lab_results: { label: "Lab report", emoji: "📋" },
  imaging: { label: "Imaging", emoji: "🩻" },
  prescriptions: { label: "Prescription", emoji: "💊" },
  visit_notes: { label: "Visit note", emoji: "📝" },
  insurance: { label: "Insurance", emoji: "🏥" },
  other: { label: "Other", emoji: "📄" },
};

export function getPatientCategoryLabel(category: DocumentCategory): string {
  return PATIENT_CATEGORY_LABELS[category];
}

export const patientLibraryCopy = {
  table: {
    columns: ["Name", "Type", "Category", "Status", "Uploaded", "Size"],
    empty: {
      title: "Your folder is empty",
      description:
        "Your health folder is ready. Upload recent lab results, imaging reports, or visit notes — AI will prepare plain English summaries for you to download.",
      cta: "Upload health records",
    },
    previewHint: "Select a document to preview it.",
    uploadMore: "Upload another document",
    previewAria: (fileName: string) => `Preview ${fileName}`,
  },
  preview: {
    defaultTitle: "Document",
    description: "Preview of your uploaded health record",
    loading: "Opening your document…",
    unavailable:
      "We could not open this preview. Your file is still saved securely.",
    unsupported:
      "Preview is not available for this file type. Your file is still saved securely.",
  },
  types: {
    pdf: "PDF",
    image: "Image",
    file: "File",
  },
} as const;
