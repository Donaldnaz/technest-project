export const patientDashboardCopy = {
  shell: {
    workspaceLabel: "Your health records",
    sidebarTagline: "Upload and manage your health records",
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
      "Your health folder is ready. Upload recent lab results, imaging reports, or visit notes — your care team will prepare plain English summaries you can review before sharing.",
    withDocuments: (count: number) =>
      `${count} health record${count === 1 ? "" : "s"} in your folder`,
    savedLabel: (count: number) =>
      count === 1 ? "health record saved" : "health records saved",
    cta: "Upload health records",
  },
  overview: {
    recordsTitle: "Your documents",
    recordsDescription:
      "Health records you have uploaded and their current status",
    metrics: {
      total: {
        label: "Health records saved",
        hint: "Lab reports, imaging, and other files you have uploaded",
      },
      ready: {
        label: "Plain English ready",
        hint: "Practitioner-reviewed summaries you can read",
      },
      processing: {
        label: "Under review",
        hint: "Your care team is preparing your summary",
      },
    },
    quickActions: {
      title: "What would you like to do?",
      description: "Common tasks for your health records",
      upload: {
        label: "Upload health records",
        hint: "Add lab reports, imaging, or visit notes",
      },
      share: {
        label: "Share with my practitioner",
        hint: "Send selected records to your care team",
      },
    },
  },
  patient: {
    workspaceTitle: "My health records",
    workspaceDescription:
      "View your profile, upload health records, and share with your care team.",
    tabs: {
      overview: "Overview",
      documents: "My documents",
      upload: "Upload",
      share: "Share with practitioner",
      timeline: "Activity",
      download: "Download",
      downloadWithCount: (count: number) =>
        `Download, ${count} report${count === 1 ? "" : "s"}`,
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
        `${count} health record${count === 1 ? "" : "s"} in your folder`,
      withoutCount:
        "No health records yet — upload a lab report, imaging study, or visit note to get started.",
      previewHint: "Tap a document to preview it.",
      uploadMore: "Upload another document",
    },
    share: {
      titleSelf: "Share records with my practitioner",
      titleOther: (firstName: string) =>
        `Share ${firstName}'s records with a practitioner`,
      descriptionSelf:
        "Enter your practitioner or clinic email. Our care team will help send your health records securely.",
      descriptionOther: (firstName: string) =>
        `Enter the practitioner or clinic email for ${firstName}'s records. Our care team will help send them securely.`,
    },
    timeline: {
      title: "Recent activity",
      description: "Health records you have uploaded recently",
      uploadedLabel: "Uploaded",
      viewAll: "View all activity",
      fullTitle: "Activity",
      fullDescription:
        "A complete history of health records uploaded to this profile",
    },
    loading: "Loading your health records…",
  },
  empty: {
    timeline:
      "No uploads yet. Add a lab report, imaging study, or visit note to see activity here.",
    pillboxLink: "Open your health profile",
  },
  pillbox: {
    title: "Your health records at a glance",
    description: "Uploads, plain English summaries, and review progress",
    pdf: { label: "Lab reports", hint: "PDF uploads" },
    jpeg: { label: "Imaging & scans", hint: "Photo and scan uploads" },
    ready: { label: "Plain English ready", hint: "Summaries you can read" },
    processing: { label: "Under review", hint: "Summary in progress" },
    profileLink: "Open your health profile →",
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
