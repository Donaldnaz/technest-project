import type { DocumentCategory } from "@/lib/constants/document-categories";

export const PATIENT_CATEGORY_LABELS: Record<DocumentCategory, string> = {
  lab_results: "Lab Report",
  imaging: "Imaging Report",
  prescriptions: "Prescription",
  visit_notes: "Doctor's Note",
  insurance: "Insurance",
  other: "Other document",
};

export const PATIENT_CATEGORY_PILLS: Record<
  DocumentCategory,
  { label: string; emoji: string }
> = {
  lab_results: { label: "Lab Report", emoji: "📋" },
  imaging: { label: "Imaging", emoji: "🩻" },
  prescriptions: { label: "Prescription", emoji: "💊" },
  visit_notes: { label: "Doctor's Note", emoji: "📝" },
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
        "Your medical folder is ready. Upload your recent lab results, imaging reports, or vaccine records to share them directly with your provider.",
      cta: "Upload document",
    },
    previewHint: "Select a document to preview it.",
    uploadMore: "Upload another document",
    previewAria: (fileName: string) => `Preview ${fileName}`,
  },
  preview: {
    defaultTitle: "Document",
    description: "Preview of your uploaded document",
    loading: "Opening your document…",
    unavailable: "We could not open this preview. Your file is still saved securely.",
    unsupported: "Preview is not available for this file type. Your file is still saved securely.",
  },
  types: {
    pdf: "PDF",
    image: "Image",
    file: "File",
  },
} as const;
