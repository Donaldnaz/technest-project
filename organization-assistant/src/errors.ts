import type { ActionResult } from "./types";

export function toActionError(error: unknown): ActionResult<never> {
  if (error && typeof error === "object" && "issues" in error) {
    const zodError = error as {
      issues: Array<{ path: (string | number)[]; message: string }>;
    };
    const fieldErrors: Record<string, string[]> = {};

    for (const issue of zodError.issues) {
      const key = issue.path.join(".") || "form";
      fieldErrors[key] = [...(fieldErrors[key] ?? []), issue.message];
    }

    return {
      success: false,
      error: "Please check the form for errors.",
      fieldErrors,
    };
  }

  return {
    success: false,
    error: "Something went wrong. Please try again.",
  };
}
