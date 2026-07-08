export const patientShareCopy = {
  success: {
    title: "Request sent",
    body: "Our care team will help send your health records to your practitioner. You do not need to do anything else right now.",
    done: "Done",
    sendAnother: "Share with another practitioner",
    dismissAria: "Dismiss message",
    toast: "Your share request was sent. Our care team will follow up.",
  },
  form: {
    title: "Share records with my practitioner",
    description:
      "Enter your practitioner or clinic email. Our care team will coordinate secure delivery — no links for you to manage.",
    steps: [
      "Enter your practitioner's email",
      "Add a note if helpful",
      "We handle secure delivery",
    ],
    providerEmailLabel: "Practitioner or clinic email",
    providerEmailPlaceholder: "doctor@clinic.org",
    providerEmailHint:
      "Use the email address your clinic or practitioner uses for health records.",
    noteLabel: "Optional note",
    noteLabelSuffix: "for our care team",
    noteHint:
      "Mention the visit, specialist, or anything that helps your care team.",
    notePlaceholderSelf: "e.g. Cardiology follow-up next Tuesday",
    notePlaceholderOther: (firstName: string) =>
      `e.g. ${firstName}'s upcoming visit with Dr. Smith`,
    consent:
      "By sending this request, you allow iCare to share your uploaded health records with the practitioner listed above.",
    submit: "Share with my practitioner",
    submitting: "Sending…",
  },
} as const;
