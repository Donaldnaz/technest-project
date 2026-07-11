export const ingestionCopy = {
  dropzone: {
    ariaLabel: "Upload clinical documents by drag and drop or file browse",
    title: "Drop patient documents here",
    formats: "Accepted: PDF, JPEG, or PNG · Maximum 10 MB per file",
    encryption:
      "Files are encrypted in transit and at rest under standard healthcare data protection practices.",
    browse: "Browse files",
    camera: "Capture document photo",
  },
  queue: {
    title: "Upload queue",
    empty:
      "No files staged. Add a patient chart above to begin the ingestion pipeline.",
    uploading: (percent: number) => `Uploading securely — ${percent}%`,
    complete: "Ingestion complete — queued for clinical review",
    failed: "Upload failed — remove file and retry",
    removeAria: (fileName: string) => `Remove ${fileName} from queue`,
  },
  form: {
    clinicalTitle: "Document ingestion",
    clinicalDescription:
      "Attach PDF, JPEG, or PNG files, assign a record category, then submit for encrypted processing.",
    status: {
      uploading: "Transmitting files to secure storage…",
      ready: (count: number) =>
        `${count} file${count === 1 ? "" : "s"} ready for submission`,
      idle: "Assign a category to each file before submitting.",
      postSuccess: "Add additional records below as needed.",
    },
    submit: "Submit for clinical review",
    submitting: "Submitting…",
    storageAlert: {
      title: "Secure storage unavailable",
      body: "Document ingestion is paused. Configure BLOB_READ_WRITE_TOKEN in your environment and restart the application.",
      dismissAria: "Dismiss storage alert",
    },
  },
  preview: {
    emptyTitle: "No document selected",
    emptyDescription:
      "Select or drop a PDF or image (JPEG/PNG) to preview before submission.",
    pending: "Preview loads after the file is staged.",
  },
  success: {
    firstTitle: "First record received",
    firstBody: (name: string) =>
      `The initial document for ${name} is stored and queued for review.`,
    pluralTitle: (count: number) =>
      `${count} record${count === 1 ? "" : "s"} received`,
    pluralBody:
      "Documents are encrypted and queued for AI extraction and clinician verification.",
    firstMilestone: "Profile established — continue adding records as needed.",
    uploadMore: "Add more documents",
    done: "Return to workspace",
    dismissAria: "Dismiss confirmation",
  },
  toasts: {
    noFiles: "Add at least one document before submitting.",
    successFirst: "First record ingested — queued for clinical review.",
    successSingle: "Document ingested — queued for clinical review.",
    successPlural: (count: number) =>
      `${count} documents ingested — queued for clinical review.`,
    partialWarning: (saved: number, failed: number) =>
      `${saved} saved, ${failed} failed. Remove failed files and resubmit.`,
    failure: "Ingestion failed. Verify file type and size, then retry.",
  },
} as const;
