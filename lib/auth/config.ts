const buildPlaceholderSecret =
  "build-time-placeholder-secret-min-32-chars";

export function getNeonAuthConfig() {
  const baseUrl = process.env.NEON_AUTH_BASE_URL;
  const secret = process.env.NEON_AUTH_COOKIE_SECRET;

  if (!baseUrl || !secret) {
    if (process.env.SKIP_ENV_VALIDATION === "true") {
      return {
        baseUrl: baseUrl ?? "https://placeholder.invalid/auth",
        secret: secret ?? buildPlaceholderSecret,
      };
    }

    throw new Error(
      "NEON_AUTH_BASE_URL and NEON_AUTH_COOKIE_SECRET must be set in environment variables.",
    );
  }

  if (secret.length < 32) {
    throw new Error(
      "NEON_AUTH_COOKIE_SECRET must be at least 32 characters. Generate one with: openssl rand -base64 32",
    );
  }

  return { baseUrl, secret };
}
