export { patientAccountCopy } from "@/lib/copy/patient/account";
export { patientAiCopy, type PatientAiNoticeVariant } from "@/lib/copy/patient/ai";
export { patientAuthCopy } from "@/lib/copy/patient/auth";
export { patientDashboardCopy } from "@/lib/copy/patient/dashboard";
export {
  getPatientCategoryLabel,
  PATIENT_CATEGORY_LABELS,
  PATIENT_CATEGORY_PILLS,
  patientLibraryCopy,
} from "@/lib/copy/patient/library";
export { patientOnboardingCopy } from "@/lib/copy/patient/onboarding";
export { patientShareCopy } from "@/lib/copy/patient/share";
export { patientStatusCopy } from "@/lib/copy/patient/status";
export { patientUploadCopy } from "@/lib/copy/patient/upload";
export { patientValidationCopy } from "@/lib/copy/patient/validation";

import { patientAccountCopy } from "@/lib/copy/patient/account";
import { patientAiCopy } from "@/lib/copy/patient/ai";
import { patientAuthCopy } from "@/lib/copy/patient/auth";
import { patientDashboardCopy } from "@/lib/copy/patient/dashboard";
import { patientLibraryCopy } from "@/lib/copy/patient/library";
import { patientOnboardingCopy } from "@/lib/copy/patient/onboarding";
import { patientShareCopy } from "@/lib/copy/patient/share";
import { patientStatusCopy } from "@/lib/copy/patient/status";
import { patientUploadCopy } from "@/lib/copy/patient/upload";
import { patientValidationCopy } from "@/lib/copy/patient/validation";

export const patientCopy = {
  account: patientAccountCopy,
  auth: patientAuthCopy,
  onboarding: patientOnboardingCopy,
  upload: patientUploadCopy,
  dashboard: patientDashboardCopy,
  library: patientLibraryCopy,
  share: patientShareCopy,
  ai: patientAiCopy,
  status: patientStatusCopy,
  validation: patientValidationCopy,
} as const;
