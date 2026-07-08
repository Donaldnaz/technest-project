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
    "Verify your email before signing in. Use the code we sent when you created your account.",
  INVALID_EMAIL_OR_PASSWORD:
    "Incorrect email or password. If you just signed up, enter the verification code from your email first.",
  INVALID_PASSWORD: passwordRequirementsText,
  PASSWORD_TOO_SHORT: `Password must be at least ${PASSWORD_MIN_LENGTH} characters.`,
  PASSWORD_TOO_LONG: `Password must be at most ${PASSWORD_MAX_LENGTH} characters.`,
  SIGN_UP_EMAIL:
    "Account created. Check your inbox for your verification code.",
  PASSWORDS_DO_NOT_MATCH: patientAuthCopy.signUp.passwordMismatch,
} as const;

export { passwordValidation };
