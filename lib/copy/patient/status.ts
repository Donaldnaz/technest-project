export const patientStatusCopy = {
  received: {
    label: "Saved",
    description: "Your document is stored securely",
  },
  processing: {
    label: "Being organized",
    description: "We are preparing this file for your care team",
  },
  validated: {
    label: "Ready to view",
    description: "Summary is available for you to read",
  },
  urgent: {
    label: "Needs your attention",
    description: "Something went wrong — try uploading again",
  },
  failed: {
    label: "Needs your attention",
    description: "This file could not be processed — try uploading again",
  },
  dbMapping: {
    uploaded: "Saved",
    processing: "Being organized",
    ready: "Ready to view",
    failed: "Needs your attention",
  },
} as const;
