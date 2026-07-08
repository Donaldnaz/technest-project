export const patientDownloadsCopy = {
  title: "Summary reports",
  description:
    "Plain English summaries reviewed by your care team. Download and keep a copy for your personal records.",
  table: {
    columns: ["Document", "Type", "Summary date", "Download"],
    downloadLabel: "Download report",
    downloadAria: (fileName: string) => `Download summary report for ${fileName}`,
    documentTypeFallback: "Health record",
  },
  empty: {
    title: "No summary reports yet",
    description:
      "After you upload health records, your care team prepares plain English summaries. They will appear here when ready to download.",
    cta: "Upload health records",
  },
  notice:
    "These summaries are reviewed by a practitioner before they are made available. They are for your information — not medical advice.",
} as const;
