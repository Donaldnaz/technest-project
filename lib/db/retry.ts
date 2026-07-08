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
        // #region agent log
        fetch("http://127.0.0.1:7863/ingest/5dd3f215-8ab7-42f7-a6cd-7326877028c0", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "X-Debug-Session-Id": "f39b93",
          },
          body: JSON.stringify({
            sessionId: "f39b93",
            runId: "post-fix",
            hypothesisId: "H1",
            location: "lib/db/retry.ts:withDbRetry",
            message: "Database operation failed",
            data: {
              attempt,
              maxAttempts,
              transient: isTransientDbError(error),
              error: getErrorText(error).slice(0, 200),
            },
            timestamp: Date.now(),
          }),
        }).catch(() => {});
        // #endregion
        throw error;
      }

      // #region agent log
      fetch("http://127.0.0.1:7863/ingest/5dd3f215-8ab7-42f7-a6cd-7326877028c0", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Debug-Session-Id": "f39b93",
        },
        body: JSON.stringify({
          sessionId: "f39b93",
          runId: "post-fix",
          hypothesisId: "H1",
          location: "lib/db/retry.ts:withDbRetry",
          message: "Retrying transient database error",
          data: { attempt, nextAttempt: attempt + 1, error: getErrorText(error).slice(0, 200) },
          timestamp: Date.now(),
        }),
      }).catch(() => {});
      // #endregion

      await new Promise((resolve) => setTimeout(resolve, 50 * attempt));
    }
  }

  throw lastError;
}
