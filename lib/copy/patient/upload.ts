export const patientUploadCopy = {
  dropzone: {
    ariaLabel: "Upload health records by drag and drop or file browse",
    title: "Drop your health records here",
    formats: "PDF, JPEG, or PNG · up to 10 MB each",
    encryption: "Secure, encrypted upload",
    browse: "Choose files",
    camera: "Take a photo of a document",
  },
  queue: {
    title: "Your files",
    empty: "No files added yet. Choose or drop a document above to get started.",
    securing: (percent: number) => `Securing your document… ${percent}%`,
    securingShort: "Securing your document…",
    saved: "Document securely saved to your health folder.",
    analyzing: "Preparing your plain English summary…",
    failed: "This file could not be uploaded. Remove it and try again.",
    removeAria: (fileName: string) => `Remove ${fileName}`,
    completeAria: "Upload complete",
  },
  form: {
    title: "Upload health records",
    description:
      "Add PDF, JPEG, or PNG files, pick a category for each one, then save them to your health folder.",
    status: {
      uploading: "Securing your documents…",
      ready: (count: number) =>
        `${count} file${count === 1 ? "" : "s"} ready to upload`,
      idle: "Choose a category for each file, then upload.",
      postSuccess: "You can add more health records below anytime.",
    },
    submit: "Upload health records",
    submitting: "Uploading…",
    storageAlert: {
      title: "Uploads are temporarily unavailable",
      body: "We could not connect to secure storage. Please try again later or contact support if this continues.",
      dismissAria: "Dismiss alert",
    },
  },
  preview: {
    emptyTitle: "No document selected",
    emptyDescription:
      "Choose a PDF or photo to see a preview before you upload.",
    pending: "Preview will appear here once you add a file.",
  },
  success: {
    firstTitle: "Your first health record is saved",
    firstBody: (name: string) =>
      `Great start${name !== "you" ? ` for ${name}` : ""}. Your file is encrypted and stored in your health folder.`,
    pluralTitle: (count: number) =>
      `${count} health record${count === 1 ? "" : "s"} securely saved`,
    pluralBody:
      "Your files are encrypted and stored in your health folder. AI will prepare plain English summaries for you to download.",
    firstMilestone: "Your health folder is ready — add more records anytime.",
    uploadMore: "Upload another document",
    done: "Done for now",
    dismissAria: "Dismiss message",
  },
  toasts: {
    noFiles: "Please add at least one document before uploading.",
    successFirst: "Your first health record is securely saved.",
    successSingle: "Health record securely saved to your folder.",
    successPlural: (count: number) =>
      `${count} health records securely saved to your folder.`,
    partialWarning: (saved: number, failed: number) =>
      `${saved} saved, ${failed} could not be uploaded. Remove the failed file${failed === 1 ? "" : "s"} and try again.`,
    failure:
      "We could not save your document. Check the file type and size, then try again.",
  },
} as const;
