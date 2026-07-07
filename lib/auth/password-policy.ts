export const PASSWORD_MIN_LENGTH = 12;
export const PASSWORD_MAX_LENGTH = 128;

/** Uppercase, lowercase, digit, and special character required. */
export const PASSWORD_COMPLEXITY_REGEX =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9])/;

export const passwordValidation = {
  minLength: PASSWORD_MIN_LENGTH,
  maxLength: PASSWORD_MAX_LENGTH,
  regex: PASSWORD_COMPLEXITY_REGEX,
} as const;

export const passwordRequirementsText =
  "Use at least 12 characters with uppercase, lowercase, a number, and a special character.";

export type PasswordValidationResult =
  | { valid: true }
  | { valid: false; message: string };

export function validatePassword(password: string): PasswordValidationResult {
  if (password.length < PASSWORD_MIN_LENGTH) {
    return {
      valid: false,
      message: `Password must be at least ${PASSWORD_MIN_LENGTH} characters.`,
    };
  }

  if (password.length > PASSWORD_MAX_LENGTH) {
    return {
      valid: false,
      message: `Password must be at most ${PASSWORD_MAX_LENGTH} characters.`,
    };
  }

  if (!PASSWORD_COMPLEXITY_REGEX.test(password)) {
    return {
      valid: false,
      message:
        "Password must include uppercase, lowercase, a number, and a special character.",
    };
  }

  return { valid: true };
}
