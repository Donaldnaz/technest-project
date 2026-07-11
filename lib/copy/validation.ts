export const validationCopy = {
  onboarding: {
    healthcareLocation: "Enter the clinic, hospital, or care site name",
    city: "Enter the city where care is received",
    healthQuarter: "Select the California health region for this care site",
    specialty: "Select the primary healthcare specialty",
    customSpecialty: "Describe the specialty when 'Other' is selected",
    firstName: "Enter a first name",
    lastName: "Enter a last name",
    dateOfBirth: "Enter a valid date of birth (YYYY-MM-DD)",
    medicalRecordNumber:
      "Enter a valid medical record number (up to 50 alphanumeric characters)",
    medicalRecordNumberFormat:
      "Medical record numbers must contain only letters and numbers",
  },
  account: {
    firstName: "Enter your account first name",
    lastName: "Enter your account last name",
  },
  share: {
    email: "Enter a valid provider email address (e.g. doctor@clinic.org)",
    emailRequired: "Provider email is required to process a share request",
  },
  upload: {
    unsupportedType: "Only PDF, JPEG, or PNG files are accepted for ingestion",
    fileTooLarge: "File exceeds the 10 MB limit — compress or split the document",
    metadataFailed: "Document saved to storage but metadata registration failed — retry",
  },
  auth: {
    passwordMin: (min: number) =>
      `Password must be at least ${min} characters`,
    passwordMismatch: "New password and confirmation do not match",
    passwordCurrentWrong:
      "Current password is incorrect — re-enter and try again",
    passwordUpdateFailed: "Password could not be updated — try again",
    passwordUpdated: "Password updated — use the new password on next sign-in",
  },
  general: {
    unauthorized: "Sign in to continue this action",
    notFound: "The requested record was not found or you lack access",
    formErrors: "Correct the highlighted fields before submitting",
    unexpected: "An unexpected error occurred — retry or contact support",
    patientNotFound: "Patient profile not found — return to the overview",
  },
} as const;
