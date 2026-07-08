export const patientOnboardingCopy = {
  page: {
    eyebrow: "Account setup",
    title: "Set up your health folder",
    description:
      "A few details help us keep your health records organized and ready to share with your care team.",
    timeEstimate: "Takes about 3 minutes",
  },
  progress: {
    account: "About you",
    profile: "Health profile",
    location: "Care location",
    finish: "Finish",
    navLabel: "Onboarding progress",
    stepLabel: (current: number, total: number) =>
      `Step ${current} of ${total}`,
  },
  form: {
    requiredLegend: "Required fields are marked with an asterisk (*).",
    errorSummaryTitle: "Please fix the following before continuing:",
    optional: "Optional",
  },
  sections: {
    account: {
      title: "About you",
      description: "The person signing in to iCare",
      step: "1",
    },
    profile: {
      title: "Health profile",
      description:
        "Basic information about the patient these health records belong to",
      step: "2",
      patientDetails: "Patient details",
      careDetails: "Care details",
    },
    location: {
      title: "Where you receive care",
      description:
        "Your clinic or hospital in the United States or Canada",
      step: "3",
    },
    consent: {
      title: "Review and finish",
      description: "Confirm your details before entering your health folder",
      step: "4",
    },
    relationship: {
      title: "Who are these records for?",
      description: "Choose who you are uploading health records for",
      self: "Myself",
      selfHint: "I am the patient and will manage my own records",
      other: "Someone I care for",
      otherHint: "A family member, dependent, or person I support",
      aria: "Who are these records for?",
    },
  },
  fields: {
    firstName: "First name",
    lastName: "Last name",
    dateOfBirth: "Date of birth",
    dateOfBirthHint: "Used to match records from your care team",
    mrn: "Medical record number",
    mrnHint:
      "Enter the record number from your clinic or hospital chart.",
    notes: "Additional notes",
    notesPlaceholder:
      "For example: upcoming surgery, preferred pharmacy, or specialist name",
    location: {
      sectionTitle: "Where you receive care",
      sectionDescription:
        "Tell us where care is provided in the United States or Canada",
      site: "Clinic or hospital name",
      sitePlaceholder: "e.g. City Medical Center, Primary Care Clinic",
      city: "City",
      cityPlaceholder: "Enter your city",
      region: "Care region",
      regionHint:
        "Helps organize records by broader care area within your country",
      regionPlaceholder: "Select your region",
      state: "State",
      province: "Province or territory",
      subdivisionPlaceholder: "Select…",
      country: "Country",
      countryPlaceholder: "Select country",
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
    privacyNote:
      "Your information is stored securely and used only to organize your health records.",
    privacyLink: "Read our Privacy Policy",
  },
  submit: "Finish setup",
  submitting: "Saving your profile…",
} as const;

export const onboardingSectionIds = {
  account: "onboarding-account",
  profile: "onboarding-profile",
  location: "onboarding-location",
  consent: "onboarding-consent",
} as const;

export const onboardingFieldSectionMap: Record<string, string> = {
  accountFirstName: onboardingSectionIds.account,
  accountLastName: onboardingSectionIds.account,
  relationship: onboardingSectionIds.profile,
  patientFirstName: onboardingSectionIds.profile,
  patientLastName: onboardingSectionIds.profile,
  dateOfBirth: onboardingSectionIds.profile,
  medicalRecordNumber: onboardingSectionIds.profile,
  healthcareSpecialty: onboardingSectionIds.profile,
  customSpecialty: onboardingSectionIds.profile,
  additionalNotes: onboardingSectionIds.profile,
  healthcareLocation: onboardingSectionIds.location,
  city: onboardingSectionIds.location,
  state: onboardingSectionIds.location,
  country: onboardingSectionIds.location,
  healthQuarter: onboardingSectionIds.location,
  consentAccuracy: onboardingSectionIds.consent,
  consentAuthorization: onboardingSectionIds.consent,
};

export const onboardingFieldLabels: Record<string, string> = {
  accountFirstName: "First name (account)",
  accountLastName: "Last name (account)",
  relationship: "Record subject",
  patientFirstName: "Patient first name",
  patientLastName: "Patient last name",
  dateOfBirth: "Date of birth",
  medicalRecordNumber: "Medical record number",
  healthcareSpecialty: "Type of care",
  customSpecialty: "Custom type of care",
  additionalNotes: "Additional notes",
  healthcareLocation: "Clinic or hospital",
  city: "City",
  state: "State or province",
  country: "Country",
  healthQuarter: "Care region",
  consentAccuracy: "Accuracy confirmation",
  consentAuthorization: "Authorization confirmation",
};
