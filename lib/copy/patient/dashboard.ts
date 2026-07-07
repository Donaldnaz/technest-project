export const patientDashboardCopy = {
  shell: {
    workspaceLabel: "Your health records",
    sidebarTagline: "Upload and manage your medical documents",
    backToSite: "Back to iCare home",
  },
  nav: {
    overview: "Home",
    records: "My records",
    upload: "Upload",
    settings: "Settings",
    home: "Home",
  },
  welcome: {
    eyebrow: "Your health records",
    emptyBody:
      "Your medical folder is ready. Upload your recent lab results, imaging reports, or vaccine records to share them directly with your provider.",
    withDocuments: (count: number) =>
      `${count} document${count === 1 ? "" : "s"} in your folder`,
    cta: "Upload documents",
  },
  overview: {
    recordsTitle: "Your documents",
    recordsDescription: "Medical files you have uploaded and their current status",
    metrics: {
      total: {
        label: "Documents saved",
        hint: "Lab reports, imaging, and other files you have uploaded",
      },
      ready: {
        label: "Ready to read",
        hint: "Summaries you can review in plain language",
      },
      processing: {
        label: "Still being processed",
        hint: "We are organizing these files for your care team",
      },
    },
    quickActions: {
      title: "What would you like to do?",
      description: "Common tasks for your health records",
      upload: {
        label: "Upload documents",
        hint: "Add lab reports, imaging, or doctor's notes",
      },
      share: {
        label: "Send to my doctor",
        hint: "Share your records with a provider",
      },
    },
  },
  patient: {
    workspaceTitle: "My health records",
    workspaceDescription:
      "View your profile, upload documents, and send records to your doctor.",
    tabs: {
      overview: "Overview",
      documents: "My documents",
      upload: "Upload",
      share: "Share with doctor",
      timeline: "Activity",
    },
    profile: {
      title: "Your profile",
      description: "Information on file with iCare",
      relationshipSelf: "Myself",
      relationshipOther: "Someone I care for",
    },
    documents: {
      title: "My documents",
      withCount: (count: number) =>
        `${count} document${count === 1 ? "" : "s"} in your folder`,
      withoutCount:
        "No documents yet — upload a lab report, imaging study, or doctor's note to get started.",
      previewHint: "Tap a document to preview it.",
      uploadMore: "Upload another document",
    },
    share: {
      titleSelf: "Send records to my doctor",
      titleOther: (firstName: string) =>
        `Send ${firstName}'s records to a doctor`,
      descriptionSelf:
        "Enter your doctor or clinic email. Our team will help send your records securely.",
      descriptionOther: (firstName: string) =>
        `Enter the doctor or clinic email for ${firstName}'s records. Our team will help send them securely.`,
    },
    timeline: {
      title: "Recent activity",
      description: "Documents you have uploaded recently",
    },
    loading: "Loading your records…",
  },
  empty: {
    timeline:
      "No uploads yet. Add a lab report, imaging study, or doctor's note to see activity here.",
    pillboxLink: "Open your health profile",
  },
  pillbox: {
    title: "Your uploads at a glance",
    description: "Types of documents in your folder",
    pdf: { label: "PDF documents", hint: "Reports and forms" },
    jpeg: { label: "Photos & scans", hint: "Pictures of paper records" },
    ready: { label: "Ready to read", hint: "Summaries available" },
    processing: { label: "Being processed", hint: "Still being organized" },
  },
  errors: {
    pageTitle: "Something went wrong",
    pageDescription: "We could not load this page. Please try again.",
    retry: "Try again",
    notFoundTitle: "Profile not found",
    notFoundDescription:
      "This profile is not available in your account.",
    backToOverview: "Back to home",
  },
} as const;
