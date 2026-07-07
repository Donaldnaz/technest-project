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
  },
  index: {
    eyebrow: "Policies and trust",
    title: "Legal",
    description: "Privacy, terms, and accessibility information for iCare.",
    intro:
      "These policies explain how iCare handles your health information, the rules for using the portal, and our commitment to accessible, plain-language design.",
    cardsLabel: "Choose a document",
  },
  flow: {
    backHome: "Back to home",
  },
  pages: {
    privacy: {
      title: "Privacy Policy",
      description:
        "How iCare collects, uses, stores, and protects your health information.",
    },
    terms: {
      title: "Terms of Service",
      description:
        "Terms governing your use of the iCare health records portal, including important disclaimers.",
    },
    accessibility: {
      title: "Accessibility Statement",
      description:
        "iCare's commitment to an accessible health records portal for all users.",
    },
  },
} as const;

export type LegalPageKey = keyof typeof legalCopy.pages;
