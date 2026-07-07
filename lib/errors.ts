import type { ActionResult } from "@/lib/actions/types";
import { validationCopy } from "@/lib/copy/validation";

export class UnauthorizedError extends Error {
  constructor(message = validationCopy.general.unauthorized) {
    super(message);
    this.name = "UnauthorizedError";
  }
}

export class NotFoundError extends Error {
  constructor(message = validationCopy.general.notFound) {
    super(message);
    this.name = "NotFoundError";
  }
}

export class ValidationError extends Error {
  fieldErrors?: Record<string, string[]>;

  constructor(message: string, fieldErrors?: Record<string, string[]>) {
    super(message);
    this.name = "ValidationError";
    this.fieldErrors = fieldErrors;
  }
}

export function toActionError(error: unknown): ActionResult<never> {
  if (error instanceof UnauthorizedError) {
    return { success: false, error: error.message };
  }

  if (error instanceof NotFoundError) {
    return { success: false, error: error.message };
  }

  if (error instanceof ValidationError) {
    return {
      success: false,
      error: error.message,
      fieldErrors: error.fieldErrors,
    };
  }

  if (error && typeof error === "object" && "issues" in error) {
    const zodError = error as { issues: Array<{ path: (string | number)[]; message: string }> };
    const fieldErrors: Record<string, string[]> = {};

    for (const issue of zodError.issues) {
      const key = issue.path.join(".") || "form";
      fieldErrors[key] = [...(fieldErrors[key] ?? []), issue.message];
    }

    return {
      success: false,
      error: validationCopy.general.formErrors,
      fieldErrors,
    };
  }

  return {
    success: false,
    error: validationCopy.general.unexpected,
  };
}
