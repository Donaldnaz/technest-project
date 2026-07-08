export const PENDING_VERIFY_EMAIL_KEY = "icare-pending-verify-email";

export function setPendingVerifyEmail(email: string): void {
  if (typeof window === "undefined") return;
  sessionStorage.setItem(PENDING_VERIFY_EMAIL_KEY, email.trim().toLowerCase());
}

export function consumePendingVerifyEmail(): string | null {
  if (typeof window === "undefined") return null;
  const email = sessionStorage.getItem(PENDING_VERIFY_EMAIL_KEY);
  if (email) sessionStorage.removeItem(PENDING_VERIFY_EMAIL_KEY);
  return email;
}

export function getPendingVerifyEmail(): string | null {
  if (typeof window === "undefined") return null;
  return sessionStorage.getItem(PENDING_VERIFY_EMAIL_KEY);
}

export function clearPendingVerifyEmail(): void {
  if (typeof window === "undefined") return;
  sessionStorage.removeItem(PENDING_VERIFY_EMAIL_KEY);
}
