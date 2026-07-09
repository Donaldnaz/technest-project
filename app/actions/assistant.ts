"use server";

import { askOrganizationAssistant as askFromPackage } from "@icare/organization-assistant/server";

/**
 * Host-app server-action boundary for the organization assistant.
 * Next.js requires async function declarations in "use server" files
 * (re-exports are not allowed).
 */
export async function askOrganizationAssistant(input: unknown) {
  // #region agent log
  fetch("http://127.0.0.1:7863/ingest/5dd3f215-8ab7-42f7-a6cd-7326877028c0", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Debug-Session-Id": "3f90c7",
    },
    body: JSON.stringify({
      sessionId: "3f90c7",
      runId: "post-fix",
      hypothesisId: "A",
      location: "app/actions/assistant.ts:askOrganizationAssistant",
      message: "host server action invoked",
      data: {
        hasInput: Boolean(input),
        inputType: typeof input,
      },
      timestamp: Date.now(),
    }),
  }).catch(() => {});
  // #endregion

  return askFromPackage(input);
}
