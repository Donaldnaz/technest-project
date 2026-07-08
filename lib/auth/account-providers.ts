export const CREDENTIAL_PROVIDER_ID = "credential" as const;
export const GOOGLE_PROVIDER_ID = "google" as const;

export type LinkedAccount = {
  providerId: string;
};

export type SignInMethod = "credential" | "google" | "unknown";

export function hasCredentialAccount(
  accounts: LinkedAccount[] | null | undefined,
): boolean {
  return (
    accounts?.some(
      (account) => account.providerId === CREDENTIAL_PROVIDER_ID,
    ) ?? false
  );
}

export function hasGoogleAccount(
  accounts: LinkedAccount[] | null | undefined,
): boolean {
  return (
    accounts?.some((account) => account.providerId === GOOGLE_PROVIDER_ID) ??
    false
  );
}

/** Prefer email/password when both credential and Google accounts are linked. */
export function getPrimarySignInMethod(
  accounts: LinkedAccount[] | null | undefined,
): SignInMethod {
  if (hasCredentialAccount(accounts)) return "credential";
  if (hasGoogleAccount(accounts)) return "google";
  return "unknown";
}
