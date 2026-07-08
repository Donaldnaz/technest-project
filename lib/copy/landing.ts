export const landingCopy = {
  hero: {
    eyebrow: "Health records portal",
    headline: "Upload health records safely.",
    headlineAccent: "Share only when you choose.",
    body: "Upload lab results, imaging, and clinical notes to a private folder. Practitioners review plain English summaries before you share anything with your care team.",
    tags: "Encrypted upload · Private storage · Practitioner-reviewed summaries",
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
    title: "A place for your health records",
    description:
      "Upload, organize, and share health documents — with plain English summaries reviewed by practitioners.",
    offerings: [
      {
        title: "Secure document upload",
        description:
          "Add PDFs and photos of lab reports, imaging, referrals, and visit notes. Files are encrypted in transit and stored in your private health folder.",
      },
      {
        title: "Organized records library",
        description:
          "See your uploads in one place, with status labels for what is ready, under review, or still being processed.",
      },
      {
        title: "Plain English summaries",
        description:
          "Read summaries of your documents in everyday language, reviewed by a practitioner on your care team before they are finalized.",
      },
      {
        title: "Share with your care team",
        description:
          "Send selected health records to your practitioner or clinic when you choose, so appointments have the documents you need.",
      },
      {
        title: "You choose what to share",
        description:
          "Practitioners only see what you explicitly share. Upload privately, review summaries first, and decide when to share.",
      },
      {
        title: "Kept straightforward",
        description:
          "Clear layouts, plain language, and focused steps for managing health records.",
      },
    ],
  },
  experience: {
    eyebrow: "Portal",
    title: "Your upload workspace",
    description:
      "Upload health records, track their status, and share them with practitioners from one portal.",
    welcomeStrip: {
      badge: "Your health records",
      body: (documentCount: number, readyCount: number) =>
        `${documentCount} health record${documentCount === 1 ? "" : "s"} in your folder — ${readyCount} plain English summar${readyCount === 1 ? "y" : "ies"} ready for your care team to review.`,
    },
    upload: {
      title: "Upload health records",
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
          subtitle: "Practitioner review complete · Yesterday",
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
    title: "Health records, handled carefully",
    description:
      "iCare is for people who need a clear way to upload and manage health records, with control over who can see their information.",
    highlights: [
      {
        title: "For patients and caregivers",
        description:
          "Upload for yourself or someone you care for. Keep health records organized in one folder until you are ready to share them.",
      },
      {
        title: "Made for clinical review",
        description:
          "Practitioners receive the documents you choose in a review-ready format, with plain English summaries to support conversations about your care.",
      },
      {
        title: "Private until you share",
        description:
          "Your files stay in your account until you share them. Encryption, access controls, and clear privacy practices apply throughout.",
      },
    ],
  },
  contact: {
    eyebrow: "Contact us",
    title: "Get in touch",
    description:
      "Questions about uploads, sharing with your care team, or getting started? Reach out — we support patients, caregivers, and clinic partners.",
    phoneLabel: "Phone",
    emailLabel: "Email",
    addressLabel: "Headquarters",
    hoursLabel: "Hours",
    hours: "Monday–Friday, 9:00 AM – 5:00 PM PT",
    responseNote: "We typically respond within 1–2 business days.",
  },
  cta: {
    title: "Ready to upload a health record?",
    description:
      "Create a free account, add your documents to a protected folder, and share with your practitioner when you are ready.",
    createAccount: "Create account",
    signIn: "Sign in",
    signedIn: {
      title: "Your health folder is ready",
      description:
        "Continue uploading health records or share files with your care team from your dashboard.",
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
      "A health records portal for encrypted upload, private storage, practitioner-reviewed summaries, and sharing on your terms.",
  },
  assistant: {
    welcome:
      "Hi! I can help with questions about uploading health records, sharing with your care team, and how iCare handles privacy.",
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
