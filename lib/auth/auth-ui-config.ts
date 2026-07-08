import { authLocalization } from "@neondatabase/auth-ui";

import {
  PASSWORD_MAX_LENGTH,
  PASSWORD_MIN_LENGTH,
  passwordRequirementsText,
  passwordValidation,
} from "@/lib/auth/password-policy";
import { patientAuthCopy } from "@/lib/copy/patient/auth";

export const icareAuthLocalization = {
  ...authLocalization,
  EMAIL_NOT_VERIFIED:
    "Verify your email before signing in. Check your inbox for the link we sent when you created your account.",
  INVALID_EMAIL_OR_PASSWORD:
    "Incorrect email or password. If you just signed up, verify your email first, then try again.",
  INVALID_PASSWORD: passwordRequirementsText,
  PASSWORD_TOO_SHORT: `Password must be at least ${PASSWORD_MIN_LENGTH} characters.`,
  PASSWORD_TOO_LONG: `Password must be at most ${PASSWORD_MAX_LENGTH} characters.`,
  SIGN_UP_EMAIL:
    "Account created. Check your email and click the verification link before signing in.",
  PASSWORDS_DO_NOT_MATCH: patientAuthCopy.signUp.passwordMismatch,
} as const;

export { passwordValidation };
