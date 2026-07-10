export const landingCopy = {
  hero: {
    eyebrow: "Healthcare management system",
    headline: "Convert medical documents.",
    headlineAccent: "Read them in plain English.",
    body: "iCare is a healthcare management system that helps patients convert medical documents to plain English with system-enabled AI. Your records stay safely stored and private.",
    tags: "Medical documents · Plain English · Private records",
    primaryCta: "Create free account",
    secondaryCta: "See the portal",
    preview: {
      greetingLabel: "Your health records",
      userName: "Sarah",
      documentsSaved: "Health records saved",
      readyToRead: "Plain English ready",
      processing: "Under review",
      recentLabel: "Recent uploads",
      recentItems: [
        { name: "CBC lab results.pdf", status: "Ready" },
        { name: "Chest X-ray report.pdf", status: "Ready" },
        { name: "Referral cardiology.jpg", status: "Reviewing" },
      ],
      shareChip: "Share with your practitioner",
      shareHint: "3 records ready to send",
    },
  },
  whatWeDo: {
    eyebrow: "What we do",
    title: "Healthcare management, in plain English",
    description:
      "iCare is a healthcare management system that helps patients convert medical documents to plain English with system-enabled AI. Records are safely stored and private.",
    offerings: [
      {
        title: "Healthcare management system",
        description:
          "One place for patients to upload, manage, and understand their medical documents.",
      },
      {
        title: "Convert medical documents",
        description:
          "Turn lab reports, imaging, referrals, and visit notes into clear plain English.",
      },
      {
        title: "System-enabled AI",
        description:
          "Our system-enabled AI explains medical documents in everyday language.",
      },
      {
        title: "Safely stored and private",
        description:
          "Your records stay encrypted in your account and private until you choose to share.",
      },
      {
        title: "Organized records library",
        description:
          "See your uploads in one place, with status labels for what is ready or still processing.",
      },
      {
        title: "Share when you choose",
        description:
          "Review the plain English first, then send selected records to your care team.",
      },
    ],
  },
  experience: {
    eyebrow: "Portal",
    title: "Your upload workspace",
    description:
      "Upload medical documents, get plain English summaries, and manage them in one AI-enabled portal.",
    welcomeStrip: {
      badge: "Your health records",
      body: (documentCount: number, readyCount: number) =>
        `${documentCount} health record${documentCount === 1 ? "" : "s"} in your folder — ${readyCount} plain English summar${readyCount === 1 ? "y" : "ies"} ready.`,
    },
    upload: {
      title: "Upload medical documents",
      description: "Drag and drop lab reports, imaging, or visit notes here",
      hint: "PDF and JPEG files · Encrypted before storage",
    },
    activity: {
      title: "Recent activity",
      description: "Your latest uploads and shares",
      items: [
        {
          title: "CBC lab results uploaded",
          subtitle: "Plain English summary ready · 2 hours ago",
        },
        {
          title: "Chest X-ray report uploaded",
          subtitle: "AI summary ready · Yesterday",
        },
        {
          title: "Shared with your care team",
          subtitle: "3 health records sent · 3 days ago",
        },
      ],
    },
  },
  about: {
    eyebrow: "About us",
    title: "A simple way to understand medical documents",
    description:
      "iCare is a healthcare management system that helps patients convert medical documents to plain English with system-enabled AI. Records are safely stored and private.",
    highlights: [
      {
        title: "Built for patients",
        description:
          "Upload medical documents for yourself or someone you care for, then read them in plain English.",
      },
      {
        title: "System-enabled AI",
        description:
          "Our AI converts medical language into clear, everyday wording you can follow.",
      },
      {
        title: "Safely stored and private",
        description:
          "Your records stay in your account, encrypted and private, until you choose to share them.",
      },
    ],
  },
  contact: {
    eyebrow: "Contact us",
    title: "Get in touch",
    description:
      "Questions about uploads, plain English summaries, or getting started? Reach out — we support patients, caregivers, and clinic partners.",
    phoneLabel: "Phone",
    emailLabel: "Email",
    addressLabel: "Headquarters",
    hoursLabel: "Hours",
    hours: "Monday–Friday, 9:00 AM – 5:00 PM PT",
    responseNote: "We typically respond within 1–2 business days.",
  },
  cta: {
    title: "Ready to upload a medical document?",
    description:
      "Create a free account, upload your documents, and read them in plain English in our AI-enabled healthcare portal.",
    createAccount: "Create account",
    signIn: "Sign in",
    signedIn: {
      title: "Your health folder is ready",
      description:
        "Continue uploading medical documents or open your dashboard.",
      dashboard: "Go to dashboard",
    },
  },
  signedInBanner: {
    welcome: (firstName: string) => `Welcome back, ${firstName}.`,
    signedIn: "You are signed in.",
    hint: "Continue to your upload workspace or browse the site.",
    dashboard: "Go to dashboard",
  },
  footer: {
    tagline:
      "A healthcare management system that helps patients convert medical documents to plain English. Records are safely stored and private.",
  },
  assistant: {
    welcome:
      "Hi! I can help with questions about uploading medical documents, plain English summaries, and how iCare works.",
    title: "Ask iCare",
    subtitle: "Help with uploads, sharing, and privacy",
    placeholder: "Ask about upload, sharing, or privacy…",
    thinking: "One moment…",
    disclaimer:
      "General information only — not medical advice. Do not share personal health details in this chat.",
    openAria: "Open iCare assistant",
    sendAria: "Send message",
    inputAria: "Message to iCare assistant",
  },
} as const;
