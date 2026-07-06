export const HEALTHCARE_SPECIALTIES = [
  "Primary care",
  "Cardiology",
  "Dermatology",
  "Endocrinology",
  "Gastroenterology",
  "Neurology",
  "Obstetrics & gynecology",
  "Oncology",
  "Orthopedics",
  "Pediatrics",
  "Psychiatry",
  "Pulmonology",
  "Rheumatology",
  "Urology",
  "Other",
] as const;

export type HealthcareSpecialty = (typeof HEALTHCARE_SPECIALTIES)[number];

export const OTHER_SPECIALTY = "Other" as const;
