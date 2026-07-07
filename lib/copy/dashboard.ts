export const dashboardCopy = {
  shell: {
    workspaceLabel: "Clinical workspace",
    sidebarTagline: "Secure document ingestion and review",
    backToSite: "Return to public site",
  },
  nav: {
    overview: "Overview",
    records: "Records",
    upload: "Upload",
    settings: "Settings",
    home: "Home",
  },
  overview: {
    recordsTitle: "Record inventory",
    recordsDescription:
      "Uploaded documents and current processing status across your profile.",
    welcomeTitle: "Clinical record summary",
    welcomeCta: "Ingest documents",
    metrics: {
      total: {
        label: "Documents on file",
        hint: "PDF and JPEG records submitted to the ingestion pipeline",
      },
      ready: {
        label: "Verified summaries",
        hint: "AI-extracted summaries approved or pending clinician sign-off",
      },
      processing: {
        label: "In processing",
        hint: "Documents awaiting extraction or clinician verification",
      },
    },
    quickActions: {
      title: "Actions",
      description: "Common ingestion and sharing tasks",
      upload: { label: "Ingest documents", hint: "Add lab reports, imaging, or referrals" },
      share: { label: "Request provider share", hint: "Authorize release to a clinician" },
    },
  },
  patient: {
    workspaceTitle: "Patient record workspace",
    workspaceDescription:
      "Review profile data, manage documents, and coordinate provider sharing.",
    tabs: {
      overview: "Overview",
      documents: "Documents",
      upload: "Ingest",
      share: "Share",
      timeline: "Timeline",
    },
    profile: {
      title: "Patient profile",
      description: "Demographics and care-site information on file",
      relationshipSelf: "Self (account holder)",
      relationshipOther: "Dependent / care recipient",
    },
    documents: {
      title: "Document registry",
      withCount: (count: number) =>
        `${count} document${count === 1 ? "" : "s"} on file`,
      withoutCount: "No documents on file — ingest a record to begin processing",
      previewHint: "Select a row to open the source document preview.",
      uploadMore: "Ingest additional documents",
    },
    share: {
      titleSelf: "Authorize provider access",
      titleOther: (firstName: string) =>
        `Authorize provider access for ${firstName}`,
      descriptionSelf:
        "Submit the receiving clinician's email. Our care coordination team will process the release.",
      descriptionOther: (firstName: string) =>
        `Submit the receiving clinician's email for ${firstName}'s records. Our care coordination team will process the release.`,
    },
    timeline: {
      title: "Ingestion activity",
      description: "Chronological log of document submissions and status changes",
    },
    loading: "Loading patient workspace…",
  },
  alerts: {
    extractionMismatch: "AI extraction mismatch — verify patient date of birth",
    processingFailed: "Ingestion error — re-upload document or contact support",
    awaitingReview: "Clinician sign-off required — open document to verify fields",
    storageDown: "Secure storage offline — ingestion paused until resolved",
  },
  empty: {
    documentsTable: {
      title: "No documents on file",
      description:
        "No documents uploaded yet. Drag and drop a patient chart or browse files to trigger the ingestion pipeline.",
      cta: "Ingest first document",
    },
    timeline:
      "No ingestion activity recorded. Submit a lab report, imaging study, or referral to begin.",
    careShare: "No share requests submitted. Enter a provider email to authorize release.",
  },
  errors: {
    pageTitle: "Workspace unavailable",
    pageDescription:
      "This view could not be loaded. Retry or return to the overview.",
    retry: "Retry",
    notFoundTitle: "Patient profile not found",
    notFoundDescription:
      "This profile does not exist or is not linked to your account.",
    backToOverview: "Return to overview",
  },
} as const;
