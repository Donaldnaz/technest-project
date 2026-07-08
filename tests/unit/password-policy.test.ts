import { describe, expect, it } from "vitest";

import { validatePassword } from "@/lib/auth/password-policy";

describe("validatePassword", () => {
  it("accepts a strong password", () => {
    expect(validatePassword("SecurePass1!")).toEqual({ valid: true });
  });

  it("rejects passwords shorter than 12 characters", () => {
    expect(validatePassword("Short1!")).toEqual({
      valid: false,
      message: "Password must be at least 12 characters.",
    });
  });

  it("rejects passwords without complexity", () => {
    expect(validatePassword("alllowercase1!")).toEqual({
      valid: false,
      message:
        "Password must include uppercase, lowercase, a number, and a special character.",
    });
  });

  it("rejects passwords over max length", () => {
    const tooLong = `Aa1!${"x".repeat(130)}`;
    expect(validatePassword(tooLong).valid).toBe(false);
  });
});
