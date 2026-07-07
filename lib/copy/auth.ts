export const authCopy = {
  hero: {
    title: "Secure clinical document workspace",
    description:
      "Sign in to upload, review, and share health records under strict compliance controls.",
    highlights: [
      "Encrypted document ingestion with audit-ready storage",
      "AI-assisted extraction with mandatory clinician verification",
    ],
    footer:
      "Your health records are securely managed under applicable privacy and security requirements.",
  },
  signUp: {
    hint: "Full name, email, and password are required. Use at least 8 characters.",
    consent:
      "By creating an account, you confirm you are authorized to upload the health information you submit and agree to iCare's Privacy Policy and Terms of Service.",
    hipaaAck:
      "I understand that health information I upload is handled under standard healthcare privacy safeguards and is not shared without my authorization.",
  },
  signIn: {
    hint: "Sign in with Google, GitHub, or your registered email and password.",
    sessionNote:
      "Sessions expire after inactivity. Sign in again to resume document ingestion.",
  },
  oauth: {
    google: "Continue with Google — identity verified by your Google account",
    github: "Continue with GitHub — identity verified by your GitHub account",
  },
  backToHome: "Back to home",
} as const;
