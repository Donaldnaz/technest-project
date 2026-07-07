export const slackCopy = {
  documentIngested: {
    header: "System Alert: Secure document ingestion completed",
    fallback: (maskedPatient: string, documentId: string) =>
      `System Alert: Document ingestion completed for ${maskedPatient}. Document ID: ${documentId}. Status: Awaiting clinician sign-off.`,
    fields: {
      patient: "Patient (masked)",
      uploadedBy: "Submitted by",
      documentType: "Record category",
      documentId: "Document ID",
      status: "Status",
      fileLink: "Secure file link",
    },
    statusValue: "Awaiting clinician sign-off",
    fileLinkLabel: "Open in secure storage",
  },
  pdfFileUpload: {
    comment: (maskedPatient: string, categoryLabel: string, documentId: string) =>
      `PDF uploaded for ${maskedPatient} · Category: ${categoryLabel} · Document ID: \`${documentId}\``,
  },
  careShare: {
    header: "System Alert: Provider share request received",
    fallback: (shareId: string) =>
      `System Alert: Care share request logged. Share ID: ${shareId}. Status: Pending care coordination.`,
    fields: {
      providerEmail: "Provider email",
      patient: "Patient (masked)",
      recordCount: "Documents on file",
      shareId: "Share request ID",
      note: "Patient note (sanitized)",
      status: "Status",
    },
    statusValue: "Pending care coordination",
  },
  processing: {
    header: "System Alert: Document processing anomaly",
    fallback: (documentId: string) =>
      `System Alert: Processing anomaly for Document ID ${documentId}. Status: Requires manual review.`,
    extractionMismatch:
      "AI extraction mismatch detected — clinician verification required",
  },
} as const;
