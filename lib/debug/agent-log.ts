import "server-only";

import fs from "node:fs";
import path from "node:path";

const DEBUG_ENDPOINT =
  "http://127.0.0.1:7863/ingest/5dd3f215-8ab7-42f7-a6cd-7326877028c0";
const DEBUG_LOG_PATH = path.join(process.cwd(), ".cursor/debug-227e70.log");
const SESSION_ID = "227e70";

/** Dual-write debug NDJSON (ingest + file) for diagnostics. */
export function agentDebugLog(
  hypothesisId: string,
  location: string,
  message: string,
  data: Record<string, unknown>,
  runId = "verify-email",
): void {
  const entry = {
    sessionId: SESSION_ID,
    runId,
    hypothesisId,
    location,
    message,
    data,
    timestamp: Date.now(),
  };

  // #region agent log
  try {
    fs.mkdirSync(path.dirname(DEBUG_LOG_PATH), { recursive: true });
    fs.appendFileSync(DEBUG_LOG_PATH, `${JSON.stringify(entry)}\n`);
  } catch {
    // Ignore filesystem logging failures (e.g. serverless read-only FS).
  }

  fetch(DEBUG_ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Debug-Session-Id": SESSION_ID,
    },
    body: JSON.stringify(entry),
  }).catch(() => {});
  // #endregion
}
