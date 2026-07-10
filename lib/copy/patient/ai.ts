export const patientAiCopy = {
  processing:
    "We are preparing a plain English summary of this file. It will appear in Downloads when ready.",
  summaryReady:
    "A plain English summary of this document is ready for you to download.",
  needsReview:
    "We could not prepare a summary for this document. You can try generating it again.",
  assistant: {
    welcome:
      "Hi! I can answer questions about how iCare works — uploading health records, plain English summaries, sharing with your care team, and keeping your information private.",
    title: "Help and support",
    subtitle: "Questions about your account and uploads",
    placeholder: "Ask how uploads, summaries, sharing, or privacy work…",
    thinking: "One moment…",
    disclaimer:
      "General help only — not medical advice. Do not share personal health details in this chat.",
    openAria: "Open help and support",
    sendAria: "Send message",
    inputAria: "Message to help and support",
  },
  suggestedQuestions: [
    "What file types can I upload?",
    "How is my information kept private?",
    "How do I share health records with my practitioner?",
    "How do plain English summaries work?",
  ],
} as const;

export type PatientAiNoticeVariant = "processing" | "summaryReady" | "needsReview";
