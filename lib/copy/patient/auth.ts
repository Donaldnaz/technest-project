export const patientAuthCopy = {
  nav: {
    signIn: "Sign in",
    signUp: "Sign up",
    signInDescription: "Welcome back",
    signUpDescription:
      "Create your account to upload and organize health records securely.",
  },
  hero: {
    title: "Your secure health folder",
    description:
      "Sign in to upload health records, read plain English summaries reviewed by practitioners, and share with your care team when you are ready.",
    highlights: [
      "Your private profile — only you and practitioners you authorize can access your files",
      "Every upload is encrypted from the moment you add a document",
    ],
    footer:
      "Your health information is protected under standard privacy and security safeguards. iCare does not provide medical advice.",
  },
  signUp: {
    consent:
      "By creating an account, you agree to our Privacy Policy and Terms of Service.",
    passwordMismatch:
      "Your passwords do not match. Please check both fields and try again.",
  },
  signIn: {
    hint: "Sign in with Google or the email and password you used when you signed up.",
    sessionNote:
      "For your security, you may need to sign in again after being away for a while.",
    forgotPassword: "Forgot your password?",
  },
  emailOtp: {
    enterCodeTitle: "Enter verification code",
    enterCodeDescription: (email: string) =>
      `Enter the 6-digit code we sent to ${email} to finish creating your account.`,
    codeLabel: "Verification code",
    codePlaceholder: "000000",
    verifyCode: "Verify and continue",
    resendCode: "Resend code",
    codeSent: "We sent a new verification code. Check your inbox.",
    verified: "Email verified. Taking you to your dashboard…",
    verifiedSignIn:
      "Email verified. Sign in with your password to continue.",
    sendFailed: "Could not send a verification code. Try again in a moment.",
    verifyFailed: "That code did not work. Check the code and try again.",
    invalidCode: "Enter the 6-digit code from your email.",
    hint: "This step completes your new account setup.",
    backToSignUp: "Back to sign up",
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
