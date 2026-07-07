export const patientAuthCopy = {
  hero: {
    title: "Your secure health folder",
    description:
      "Sign in to upload medical records, keep them private, and share with your doctor when you are ready.",
    highlights: [
      "Your own private profile — only you and your care team can access your files",
      "Every upload is encrypted from the moment you add a document",
    ],
    footer:
      "Your health information is protected under standard privacy and security rules.",
  },
  signUp: {
    consent:
      "By creating an account, you agree to our Privacy Policy and Terms of Service.",
  },
  signIn: {
    hint: "Sign in with Google or the email and password you used when you signed up.",
    sessionNote:
      "For your security, you may need to sign in again after being away for a while.",
    forgotPassword: "Forgot your password?",
  },
  forgotPassword: {
    hint: "Enter the email you used when you signed up. We will send you a link to reset your password.",
  },
  resetPassword: {
    hint: "Choose a new password for your account.",
  },
  backToSignIn: "Back to sign in",
  signOut: {
    label: "Sign out",
    confirmTitle: "Sign out?",
    confirmDescription: "Are you sure you want to sign out?",
    confirmAction: "Sign out",
    cancel: "Cancel",
    signingOut: "Signing out…",
  },
  oauth: {
    google: "Continue with Google",
  },
  backToHome: "Back to home",
} as const;
