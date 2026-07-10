export const contactEmail = "hello@icare.app";
export const contactPhone = "+1 (415) 555-0100";

export const headquartersAddress = {
  name: "Headquarters",
  street: "548 Market Street, Suite 35410",
  city: "San Francisco",
  state: "CA",
  postalCode: "94104",
  country: "United States",
} as const;

export const headquartersAddressLines = [
  headquartersAddress.street,
  `${headquartersAddress.city}, ${headquartersAddress.state} ${headquartersAddress.postalCode}`,
  headquartersAddress.country,
] as const;

export const assistantCopy = {
  welcome:
    "Hi! Ask me for short answers about upload, sharing, and privacy on iCare.",
  title: "Ask iCare",
  subtitle: "Short answers about upload, sharing, and privacy",
  placeholder: "Ask about upload, sharing, or privacy…",
  thinking: "One moment…",
  disclaimer:
    "General information only — not medical advice. Do not share personal health details in this chat.",
  openAria: "Open iCare assistant",
  sendAria: "Send message",
  inputAria: "Message to iCare assistant",
  contactHours: "Monday–Friday, 9:00 AM – 5:00 PM PT",
  contactResponseNote: "We typically respond within 1–2 business days.",
} as const;
