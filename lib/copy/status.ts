export const statusCopy = {
  received: {
    label: "Received",
    description: "Document stored — queued for AI extraction",
  },
  processing: {
    label: "In review",
    description: "Extraction or clinician verification in progress",
  },
  validated: {
    label: "Verified",
    description: "Summary approved — available for clinical use",
  },
  urgent: {
    label: "Action required",
    description: "Processing failed or extraction mismatch — review document",
  },
  failed: {
    label: "Action required",
    description: "Ingestion or extraction failed — re-upload or escalate",
  },
  dbMapping: {
    uploaded: "Received",
    processing: "In review",
    ready: "Verified",
    failed: "Action required",
  },
} as const;
