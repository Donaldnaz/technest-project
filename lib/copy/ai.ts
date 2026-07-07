export const aiCopy = {
  labels: {
    flashExtraction:
      "AI-extracted fields (Gemini) — verify against source document before clinical use",
    claudeSummary:
      "AI-generated summary (Claude) — confirm accuracy against the original record before sign-off",
    genericSummary:
      "AI-generated summary — verify against original document before clinical signing",
    attention:
      "AI flag — requires clinician review",
  },
  verification: {
    panelTitle: "Field verification",
    panelDescription:
      "Compare extracted values to the source PDF. Correct any mismatches before approving.",
    sourcePane: "Source document",
    extractedPane: "Extracted fields",
    approve: "Approve extraction",
    reject: "Flag for manual review",
    pending: "Awaiting clinician verification",
  },
  assistant: {
    welcome:
      "I provide platform and workflow guidance for iCare. I do not interpret medical records or provide clinical advice.",
    title: "Platform assistant",
    subtitle: "Ingestion workflow, account, and compliance questions only",
    placeholder: "Ask about ingestion, sharing, or account access…",
    thinking: "Processing request…",
    disclaimer:
      "Operational guidance only — not medical advice. Do not enter patient identifiers in this chat.",
    openAria: "Open platform assistant",
    sendAria: "Send message",
    inputAria: "Message to platform assistant",
  },
  suggestedQuestions: [
    "What file types can I upload?",
    "How is my data encrypted?",
    "How do I share records with a provider?",
    "What does 'Being reviewed' status mean?",
  ],
} as const;
