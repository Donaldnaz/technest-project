export const onboardingCopy = {
  page: {
    title: "Patient profile setup",
    description:
      "Complete this intake before ingesting documents. Accurate demographics reduce extraction errors and sharing delays.",
  },
  sections: {
    account: {
      title: "Account holder",
      description: "The signed-in user responsible for this workspace",
    },
    profile: {
      title: "Primary health profile",
      description:
        "Demographics and care-site details used to route documents and provider shares",
    },
    relationship: {
      title: "Record subject",
      description: "Who these medical records belong to",
      self: "Myself (I am the patient)",
      other: "Someone I care for (dependent or family member)",
      aria: "Select record subject",
    },
  },
  fields: {
    firstName: "Legal first name",
    lastName: "Legal last name",
    dateOfBirth: "Date of birth",
    mrn: "Medical record number (optional)",
    mrnHint:
      "If known, enter the MRN from your clinic or hospital chart. Leave blank if unavailable.",
    notes: "Clinical context (optional)",
    notesPlaceholder:
      "Specialty-specific context for the care team (e.g. upcoming procedure, preferred pharmacy)",
    location: {
      sectionTitle: "Care site",
      sectionDescription:
        "California care location — used for routing and regional compliance",
      site: "Healthcare facility name",
      sitePlaceholder: "e.g. UCSF Medical Center, Primary Care Clinic",
      city: "City",
      cityPlaceholder: "City in California",
      region: "California health region",
      regionPlaceholder: "Select region",
      state: "State",
      country: "Country",
    },
    specialty: {
      label: "Primary specialty",
      placeholder: "Select specialty",
      other: "Describe specialty",
    },
  },
  consent: {
    accuracy:
      "I confirm the information entered is accurate to the best of my knowledge.",
    authorization:
      "I am authorized to submit health information for the record subject identified above.",
  },
  submit: "Complete profile setup",
  submitting: "Saving profile…",
} as const;
