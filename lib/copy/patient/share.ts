export const patientShareCopy = {
  success: {
    title: "Request sent",
    body: "Our team will help send your records to your provider. You do not need to do anything else right now.",
    done: "Done",
    sendAnother: "Send to another doctor",
    dismissAria: "Dismiss message",
    toast: "Your share request was sent. Our team will follow up.",
  },
  form: {
    title: "Send records to my doctor",
    description:
      "Enter your doctor or clinic email. Our team will coordinate secure delivery — no links for you to manage.",
    steps: [
      "Enter your doctor's email",
      "Add a note if helpful",
      "We handle secure delivery",
    ],
    providerEmailLabel: "Doctor or clinic email",
    providerEmailPlaceholder: "doctor@clinic.org",
    providerEmailHint:
      "Use the email address your clinic or doctor uses for medical records.",
    noteLabel: "Optional note",
    noteLabelSuffix: "for our care team",
    noteHint: "Mention the visit, specialist, or anything that helps your care team.",
    notePlaceholderSelf: "e.g. Cardiology follow-up next Tuesday",
    notePlaceholderOther: (firstName: string) =>
      `e.g. ${firstName}'s upcoming visit with Dr. Smith`,
    consent:
      "By sending this request, you allow iCare to share your uploaded records with the provider listed above.",
    submit: "Send to my doctor",
    submitting: "Sending…",
  },
} as const;
