export type ActionResult<T = void> =
  | { success: true; data: T }
  | {
      success: false;
      error: string;
      fieldErrors?: Record<string, string[]>;
    };

export const initialActionState: ActionResult<never> = {
  success: false,
  error: "",
};
