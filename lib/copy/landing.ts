export const landingCopy = {
  hero: {
    eyebrow: "Secure healthcare document portal",
    headline: "Upload medical records safely.",
    headlineAccent: "Share only when you're ready.",
    body: "iCare is a simple healthcare management portal for patients and caregivers. Upload lab results, imaging, and clinical notes to a protected folder — then share them with your doctor on your terms.",
    tags: "Encrypted upload · Private storage · Practitioner review",
    primaryCta: "Create free account",
    secondaryCta: "See the portal",
    preview: {
      greetingLabel: "Your health records",
      userName: "Sarah",
      documentsSaved: "Documents saved",
      readyToRead: "Ready to review",
      processing: "Processing",
      recentLabel: "Recent uploads",
      recentItems: [
        { name: "CBC lab results.pdf", status: "Ready" },
        { name: "Chest X-ray report.pdf", status: "Ready" },
        { name: "Referral cardiology.jpg", status: "Processing" },
      ],
      shareChip: "Share with Dr. Lee",
      shareHint: "3 records ready to send",
    },
  },
  whatWeDo: {
    eyebrow: "What we do",
    title: "One calm place for your medical files",
    description:
      "iCare helps you upload, organize, and share health documents without the complexity of hospital portals — built for real patients, not IT departments.",
    offerings: [
      {
        title: "Secure document upload",
        description:
          "Add PDFs and photos of lab reports, imaging, referrals, and visit notes. Every file is encrypted in transit and stored in your private folder.",
      },
      {
        title: "Protected records library",
        description:
          "See everything you have uploaded in one place, with clear status labels so you know what is ready and what is still being processed.",
      },
      {
        title: "Plain-language summaries",
        description:
          "Review organized summaries of your documents in everyday language before you decide what to share with your care team.",
      },
      {
        title: "Share with your practitioner",
        description:
          "Send selected records to your doctor or clinic when you choose — they receive files that are ready for review before your appointment.",
      },
      {
        title: "Consent-first access",
        description:
          "Providers only see what you explicitly share. You can upload privately, review first, and stay in control of your medical information.",
      },
      {
        title: "A portal that stays simple",
        description:
          "Clear layouts, plain language, and focused workflows — so uploading health records feels manageable, not overwhelming.",
      },
    ],
  },
  experience: {
    eyebrow: "Portal",
    title: "Your secure upload workspace",
    description:
      "Upload documents, track their status, and share them with your practitioner — all from one patient-friendly portal.",
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
      description: "Drag and drop lab reports, imaging, or doctor's notes here",
      hint: "PDF and JPEG files · Encrypted before storage",
    },
    share: {
      title: "Send to my doctor",
      description: "Share selected records with a provider for review",
      providerLabel: "Provider email",
      providerPlaceholder: "doctor@clinic.example",
      messageLabel: "Message (optional)",
      messagePlaceholder: "Please review these before my visit on Thursday.",
      submit: "Send records securely",
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
    title: "Healthcare records, handled with care",
    description:
      "iCare was built for people who need a trustworthy way to upload and manage medical files — without confusing hospital software or worrying about who can see their information.",
    highlights: [
      {
        title: "Built for patients & caregivers",
        description:
          "Upload for yourself or someone you care for. Keep records organized in one secure folder until you are ready to share them.",
      },
      {
        title: "Designed for clinical review",
        description:
          "Practitioners receive the documents you choose in a clear, review-ready format — so appointments start with context, not paperwork hunts.",
      },
      {
        title: "Private and protected by default",
        description:
          "Your files stay in your account until you share them. Encryption, access controls, and plain-language privacy practices are built into every step.",
      },
    ],
  },
  contact: {
    eyebrow: "Contact us",
    title: "We're here to help",
    description:
      "Questions about uploads, sharing with your doctor, or getting started? Reach out — our team supports patients, caregivers, and clinic partners.",
    phoneLabel: "Phone",
    emailLabel: "Email",
    addressLabel: "Headquarters",
    hoursLabel: "Hours",
    hours: "Monday–Friday, 9:00 AM – 5:00 PM PT",
    responseNote: "We typically respond within 1–2 business days.",
  },
  cta: {
    title: "Ready to upload your first document?",
    description:
      "Create a free account, add your medical files to a protected folder, and share with your practitioner whenever you are ready.",
    createAccount: "Create account",
    signIn: "Sign in",
    signedIn: {
      title: "Your records folder is ready",
      description:
        "Continue uploading documents or share files with your practitioner from your dashboard.",
      dashboard: "Go to dashboard",
    },
  },
  signedInBanner: {
    welcome: (firstName: string) => `Welcome back, ${firstName}.`,
    signedIn: "You are signed in.",
    hint: "Continue to your secure upload workspace or browse the site.",
    dashboard: "Go to dashboard",
  },
  footer: {
    tagline:
      "A simple healthcare management portal for secure medical document upload, protected storage, and practitioner review.",
  },
  assistant: {
    welcome:
      "Hi! I can help with questions about uploading medical files securely, sharing records with your doctor, and how iCare keeps your information protected.",
    title: "Ask iCare",
    subtitle: "Help with uploads, sharing, and privacy",
    placeholder: "Ask about secure upload, sharing, or privacy…",
    thinking: "One moment…",
    disclaimer:
      "General information only — not medical advice. Do not share personal health details in this chat.",
    openAria: "Open iCare assistant",
    sendAria: "Send message",
    inputAria: "Message to iCare assistant",
  },
} as const;
