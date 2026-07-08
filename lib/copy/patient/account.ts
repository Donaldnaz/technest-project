export const patientAccountCopy = {
  page: {
    title: "Settings",
    description: "Manage your sign-in details and account preferences.",
  },
  nav: {
    label: "Settings menu",
    account: "Account",
    password: "Password",
  },
  profile: {
    title: "Your account",
    description: {
      credential:
        "Your name and email were set when you signed up. Contact support if you need to update them.",
      google:
        "Your name and email are managed through your Google account. Contact support if you need to update them.",
      default:
        "Your account details were set at sign-up. Contact support if you need to update them.",
    },
    fields: {
      name: "Full name",
      email: "Email address",
    },
    googleSignIn: "Signed in with Google",
    emailSignIn: "Signed in with email and password",
    supportHint: "Need help with your account details? Contact support.",
    loading: "Loading your account…",
    signedOut: "Sign in to view your account details.",
  },
  security: {
    title: "Password",
    description:
      "Choose a strong password you do not use on other sites. Updating your password signs you out of other devices.",
    fields: {
      current: "Current password",
      new: "New password",
      confirm: "Confirm new password",
    },
    submit: "Update password",
    submitting: "Updating…",
    minLengthHint: (min: number) =>
      `Use at least ${min} characters with a mix of letters and numbers.`,
    loading: "Loading…",
    signedOut: "Sign in to update your password.",
    toast: {
      tooShort: (min: number) =>
        `Password must be at least ${min} characters.`,
      mismatch: "New passwords do not match.",
      success: "Password updated successfully.",
      error: "Could not update your password. Check your current password.",
    },
  },
} as const;
