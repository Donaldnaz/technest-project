export const authCopy = {
  hero: {
    title: "Secure health records workspace",
    description:
      "Sign in to upload, review, and share health records with encryption and practitioner oversight.",
    highlights: [
      "Encrypted upload and private storage for every health record",
      "Plain English summaries reviewed by practitioners before they are finalized",
    ],
    footer:
      "Your health records are managed under applicable privacy and security requirements. iCare does not provide medical advice.",
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
      "Sessions expire after inactivity. Sign in again to continue working with your health records.",
  },
  oauth: {
    google: "Continue with Google",
    github: "Continue with GitHub",
  },
  backToHome: "Back to home",
} as const;
