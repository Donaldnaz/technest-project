export const landingCopy = {
  hero: {
    eyebrow: "Secure health records portal",
    headline: "Upload your medical documents.",
    headlineAccent: "Share with your doctor.",
    body: "A simple healthcare management portal for patients. Upload lab reports, imaging, and doctor's notes securely — then share them with your practitioner for review.",
    tags: "Secure upload · Practitioner review · Your records in one place",
    preview: {
      documentsSaved: "Documents saved",
      readyToRead: "Ready to read",
      processing: "Still processing",
      shareChip: "Share with Dr. Lee",
      shareHint: "Ready for practitioner review",
    },
  },
  whatWeDo: {
    eyebrow: "What we do",
    title: "Everything you need to manage your health records",
    description:
      "iCare helps patients upload, organize, and share medical documents with practitioners — without the complexity of hospital software.",
    offerings: [
      {
        title: "Secure document upload",
        description:
          "Add lab reports, imaging, referrals, and doctor's notes as PDFs or images — stored safely in your private folder.",
      },
      {
        title: "Records library",
        description:
          "See every file in one place with clear status tracking so you always know what's ready and what's still being processed.",
      },
      {
        title: "Plain-language summaries",
        description:
          "Review organized summaries of your uploads in language that's easy to understand before you share them.",
      },
      {
        title: "Share with your practitioner",
        description:
          "Send your records to your doctor or care team when you're ready — they review what you choose to share.",
      },
      {
        title: "Consent-first access",
        description:
          "Providers only see what you invite them to. You stay in control of your medical information at every step.",
      },
      {
        title: "A calm, simple portal",
        description:
          "Clear layouts and plain language keep the focus on your health records — not paperwork or confusing menus.",
      },
    ],
  },
  experience: {
    eyebrow: "Portal",
    title: "A simple place for your health records",
    description:
      "Upload documents securely, track their status, and share them with your practitioner for review — all from one patient portal.",
    welcomeStrip: {
      badge: "Your health records",
      body: (documentCount: number, readyCount: number) =>
        `${documentCount} document${documentCount === 1 ? "" : "s"} in your folder — ${readyCount} ready for your doctor to review.`,
    },
    documents: {
      title: "Your documents",
      description: "Medical files you have uploaded and their current status",
      columns: ["File name", "Type", "Status"],
      rows: [
        {
          fileName: "CBC_lab_results.pdf",
          type: "PDF",
          status: "ready" as const,
        },
        {
          fileName: "Chest_X-ray_report.pdf",
          type: "PDF",
          status: "ready" as const,
        },
        {
          fileName: "Referral_cardiology.jpg",
          type: "Image",
          status: "processing" as const,
        },
      ],
    },
    upload: {
      title: "Upload documents",
      description: "Drag lab reports, imaging, or doctor's notes here",
      hint: "PDF and image files supported",
    },
    share: {
      title: "Send to my doctor",
      description: "Share your records with a provider for review",
      providerLabel: "Provider email",
      providerPlaceholder: "doctor@clinic.example",
      messageLabel: "Message (optional)",
      messagePlaceholder: "Please review before my appointment on Thursday.",
      submit: "Send records",
    },
    activity: {
      title: "Recent activity",
      description: "Your latest uploads and shares",
      items: [
        {
          title: "CBC lab results uploaded",
          subtitle: "Ready for review · 2 hours ago",
        },
        {
          title: "Chest X-ray report uploaded",
          subtitle: "Ready for review · Yesterday",
        },
        {
          title: "Shared with Dr. Lee",
          subtitle: "3 documents sent · 3 days ago",
        },
      ],
    },
  },
  about: {
    eyebrow: "About us",
    title: "Health records that work for patients and practitioners",
    description:
      "iCare was built so uploading and sharing medical records feels simple — not like hospital software. Patients stay in control; practitioners get what they need to review before the visit.",
    highlights: [
      {
        title: "Patients & caregivers",
        description:
          "Upload for yourself or someone you care for, then share with their doctor when the time is right.",
      },
      {
        title: "Practitioner review",
        description:
          "Doctors and care teams receive the documents you share — organized and ready to review.",
      },
      {
        title: "Private by default",
        description:
          "Records are stored securely and opened only through your signed-in account until you choose to share.",
      },
    ],
  },
  cta: {
    title: "Ready to upload your first document?",
    description:
      "Create a free account and start building your health records folder. Share with your practitioner whenever you're ready.",
    createAccount: "Create account",
    signIn: "Sign in",
  },
  footer: {
    tagline:
      "A simple healthcare management portal for secure document upload and practitioner review.",
  },
  assistant: {
    welcome:
      "Hi! I can answer questions about iCare — how uploads work, sharing with your doctor, and keeping your records private.",
    title: "Ask iCare",
    subtitle: "Questions about the portal and how it works",
    placeholder: "Ask about uploads, sharing, or privacy…",
    thinking: "One moment…",
    disclaimer:
      "General information only — not medical advice. Do not share personal health details in this chat.",
    openAria: "Open iCare assistant",
    sendAria: "Send message",
    inputAria: "Message to iCare assistant",
  },
} as const;
