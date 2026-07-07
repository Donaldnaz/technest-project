export type LegalSectionItem = {
  id: string;
  title: string;
};

export const legalCopy = {
  nav: {
    label: "Legal documents",
    privacy: "Privacy",
    terms: "Terms",
    accessibility: "Accessibility",
  },
  toc: {
    label: "On this page",
  },
  shell: {
    breadcrumbHome: "Home",
    breadcrumbLegal: "Legal",
    lastUpdated: "Last updated: July 2026",
    documentEyebrow: "Legal document",
  },
  index: {
    eyebrow: "Policies & trust",
    title: "Legal",
    description: "Privacy, terms, and accessibility information for iCare.",
    intro:
      "Find policies that explain how iCare handles your data, the rules for using the portal, and our commitment to accessibility.",
    cardsLabel: "Choose a document",
  },
  flow: {
    previous: "Previous",
    next: "Next",
    allLegal: "All legal documents",
    backHome: "Back to home",
  },
  pages: {
    privacy: {
      title: "Privacy Policy",
      description:
        "How iCare collects, uses, and protects your health information.",
      intro:
        "iCare is a simple healthcare management portal that helps patients upload medical documents and share them with practitioners for review. This policy explains how we handle your information.",
    },
    terms: {
      title: "Terms of Service",
      description: "Terms governing your use of the iCare health records portal.",
      intro:
        "These terms govern your use of iCare, a patient portal for uploading medical documents and sharing them with practitioners for review. By creating an account or using the service, you agree to these terms.",
    },
    accessibility: {
      title: "Accessibility Statement",
      description:
        "iCare's commitment to an accessible health records portal for all users.",
      intro:
        "iCare is committed to making our health records portal usable for patients, caregivers, and practitioners — including people with disabilities. We aim for clear language, readable layouts, and keyboard-friendly interactions throughout the product.",
    },
  },
} as const;

export type LegalPageKey = keyof typeof legalCopy.pages;
