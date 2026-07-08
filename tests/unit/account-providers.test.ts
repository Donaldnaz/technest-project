import { describe, expect, it } from "vitest";

import {
  getPrimarySignInMethod,
  hasCredentialAccount,
  hasGoogleAccount,
} from "@/lib/auth/account-providers";

describe("account provider detection", () => {
  it("detects email/password accounts", () => {
    const accounts = [{ providerId: "credential" }];

    expect(hasCredentialAccount(accounts)).toBe(true);
    expect(hasGoogleAccount(accounts)).toBe(false);
    expect(getPrimarySignInMethod(accounts)).toBe("credential");
  });

  it("detects Google accounts", () => {
    const accounts = [{ providerId: "google" }];

    expect(hasCredentialAccount(accounts)).toBe(false);
    expect(hasGoogleAccount(accounts)).toBe(true);
    expect(getPrimarySignInMethod(accounts)).toBe("google");
  });

  it("prefers email/password when both providers are linked", () => {
    const accounts = [{ providerId: "google" }, { providerId: "credential" }];

    expect(getPrimarySignInMethod(accounts)).toBe("credential");
  });

  it("returns unknown when no linked accounts are present", () => {
    expect(getPrimarySignInMethod([])).toBe("unknown");
    expect(getPrimarySignInMethod(null)).toBe("unknown");
  });
});
