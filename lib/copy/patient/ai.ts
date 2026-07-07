export const patientAiCopy = {
  processing:
    "Your care team is organizing this file and preparing a plain English summary for practitioner review.",
  summaryReady:
    "A plain English summary of this document is ready for you to read. A practitioner on your care team has reviewed it before it was finalized.",
  needsReview:
    "This document needs a quick review. Your care team has been notified.",
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
    "What does 'Under review' mean?",
  ],
} as const;

export type PatientAiNoticeVariant = "processing" | "summaryReady" | "needsReview";
