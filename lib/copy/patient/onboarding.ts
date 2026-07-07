export const patientOnboardingCopy = {
  page: {
    title: "Let's set up your health folder",
    description:
      "A few details help us keep your records organized and ready to share with your doctor.",
  },
  sections: {
    account: {
      title: "About you",
      description: "The person signing in to iCare",
    },
    profile: {
      title: "Health profile",
      description: "Basic information about the patient these records belong to",
    },
    relationship: {
      title: "Who are these records for?",
      description: "Choose who you are uploading documents for",
      self: "Myself",
      other: "Someone I care for",
      aria: "Who are these records for?",
    },
  },
  fields: {
    firstName: "First name",
    lastName: "Last name",
    dateOfBirth: "Date of birth",
    mrn: "Medical record number (optional)",
    mrnHint:
      "If your clinic gave you a record number, you can add it here. Leave blank if you do not have one.",
    notes: "Anything else we should know? (optional)",
    notesPlaceholder:
      "For example: upcoming surgery, preferred pharmacy, or specialist name",
    location: {
      sectionTitle: "Where you receive care",
      sectionDescription: "Your clinic or hospital in California",
      site: "Clinic or hospital name",
      sitePlaceholder: "e.g. City Medical Center",
      city: "City",
      cityPlaceholder: "City in California",
      region: "Region",
      regionPlaceholder: "Select your area",
      state: "State",
      country: "Country",
    },
    specialty: {
      label: "Type of care",
      placeholder: "Select specialty",
      other: "Describe the type of care",
    },
  },
  consent: {
    accuracy:
      "I confirm this information is correct to the best of my knowledge.",
    authorization:
      "I am allowed to upload health information for the person named above.",
  },
  submit: "Finish setup",
  submitting: "Saving your profile…",
} as const;
