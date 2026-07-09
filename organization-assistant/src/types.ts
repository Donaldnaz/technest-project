export type ActionResult<T = void> =
  | { success: true; data: T }
  | {
      success: false;
      error: string;
      fieldErrors?: Record<string, string[]>;
    };

export type AssistantMessage = {
  role: "user" | "assistant";
  content: string;
};
