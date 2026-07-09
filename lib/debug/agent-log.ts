import { appendFileSync, mkdirSync } from "node:fs";
import { dirname } from "node:path";

const DEBUG_LOG_PATH =
  "/Users/apple/Desktop/Technest Project./.cursor/debug-3f90c7.log";

export function agentDebugLog(payload: {
  hypothesisId: string;
  location: string;
  message: string;
  data?: Record<string, unknown>;
  runId?: string;
}): void {
  const entry = {
    sessionId: "3f90c7",
    runId: payload.runId ?? "pre-fix",
    hypothesisId: payload.hypothesisId,
    location: payload.location,
    message: payload.message,
    data: payload.data ?? {},
    timestamp: Date.now(),
  };

  try {
    mkdirSync(dirname(DEBUG_LOG_PATH), { recursive: true });
    appendFileSync(DEBUG_LOG_PATH, `${JSON.stringify(entry)}\n`);
  } catch {
    // ignore logging failures
  }

  fetch("http://127.0.0.1:7863/ingest/5dd3f215-8ab7-42f7-a6cd-7326877028c0", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Debug-Session-Id": "3f90c7",
    },
    body: JSON.stringify(entry),
  }).catch(() => {});
}
