export const patientValidationCopy = {
  onboarding: {
    healthcareLocation: "Please enter your clinic or hospital name",
    city: "Please enter the city where you receive care",
    healthQuarter: "Please select your area in California",
    specialty: "Please select the type of care",
    customSpecialty: "Please describe the type of care",
    firstName: "Please enter a first name",
    lastName: "Please enter a last name",
    dateOfBirth: "Please enter a valid date of birth (YYYY-MM-DD)",
    medicalRecordNumber:
      "Please enter a valid medical record number, or leave this field blank",
  },
  share: {
    email: "Please enter a valid doctor or clinic email address",
  },
  upload: {
    unsupportedType:
      "This file type is not supported. Please upload a PDF or JPEG photo.",
    fileTooLarge:
      "This document exceeds our maximum size limit. Please compress the file or upload separate pages.",
    metadataFailed:
      "Your file was uploaded but we could not save the details. Please try again.",
  },
  auth: {
    passwordMin: (min: number) =>
      `Your password must be at least ${min} characters`,
    passwordMismatch: "Your new passwords do not match. Please try again.",
    passwordCurrentWrong:
      "That current password is not correct. Please try again.",
    passwordUpdateFailed: "We could not update your password. Please try again.",
    passwordUpdated: "Your password was updated successfully.",
  },
  general: {
    unauthorized: "Please sign in to continue",
    notFound: "We could not find that record",
    formErrors: "Please fix the highlighted fields and try again",
    unexpected: "Something went wrong. Please try again.",
    patientNotFound: "We could not find that health profile",
  },
} as const;
