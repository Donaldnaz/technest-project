function getErrorText(error: unknown): string {
  if (!(error instanceof Error)) {
    return String(error);
  }

  const parts = [error.message];
  let current: unknown = error.cause;

  while (current instanceof Error) {
    parts.push(current.message);
    current = current.cause;
  }

  return parts.join(" ").toLowerCase();
}

export function isTransientDbError(error: unknown): boolean {
  const text = getErrorText(error);

  return (
    text.includes("fetch failed") ||
    text.includes("error connecting to database") ||
    text.includes("econnreset") ||
    text.includes("etimedout") ||
    text.includes("socket hang up") ||
    text.includes("network")
  );
}

export async function withDbRetry<T>(
  operation: () => Promise<T>,
  maxAttempts = 3,
): Promise<T> {
  let lastError: unknown;

  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    try {
      return await operation();
    } catch (error) {
      lastError = error;

      if (!isTransientDbError(error) || attempt === maxAttempts) {
        throw error;
      }

      await new Promise((resolve) => setTimeout(resolve, 50 * attempt));
    }
  }

  throw lastError;
}
