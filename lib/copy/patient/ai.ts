export const patientAiCopy = {
  processing:
    "Our secure processing system is organizing your file for your doctor's review.",
  summaryReady:
    "We created a plain-language summary of this document. Your doctor will review it before it is finalized.",
  needsReview:
    "This document needs a quick review. Your care team has been notified.",
  assistant: {
    welcome:
      "Hi! I can answer questions about how iCare works — uploading documents, sharing with your doctor, and keeping your records secure.",
    title: "Help & support",
    subtitle: "Questions about your account and uploads",
    placeholder: "Ask how uploads, sharing, or privacy work…",
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
    "How do I share records with my doctor?",
    "What does 'Being organized' mean?",
  ],
} as const;

export type PatientAiNoticeVariant = "processing" | "summaryReady" | "needsReview";
