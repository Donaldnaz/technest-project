import { contactEmail } from "@/lib/landing/navigation";

/**
 * Curated iCare website knowledge for the organization assistant.
 * Keep in sync with public landing page content.
 */
export const ORGANIZATION_KNOWLEDGE = `
# iCare — Organization reference (from the public website)

## Tagline
Your records, ready for your doctor.

## Mission
iCare helps patients and families upload health documents and records in a calm, private space — not like hospital software. The platform is for uploading health documents and records; patients stay in control of what they share.

## What we do
- Secure record uploads: Add lab reports, referrals, and imaging (PDF and JPEG). Files are uploaded to your account.
- Plain-language summaries: Each upload is reviewed and summarized so you know what you uploaded.
- Share with provider: Submit your provider's email and our care team coordinates sharing — you do not manage invite links yourself.
- For patients and caregivers: Manage your own records or upload for someone you care for in one workspace.

## About us
- Health records that feel human — uploading should feel calm, not clinical.
- Patients and caregivers can upload for themselves or someone they care for.
- Consent-first sharing: providers only see what you choose to share; you can withdraw requests.
- Private by default: uploads are tied to your signed-in account.

## Platform features (patient portal)
- Upload hub for lab reports and scans
- Medical records list showing upload proof (file name, type, status, upload date)
- Care overview metrics: records uploaded, summaries ready, being reviewed
- Recent uploads timeline
- Account settings: name and email are set at sign-up and read-only; password can be updated under Password settings
- Onboarding creates your health profile when you first join

## Getting started
- Sign up free at /auth/sign-up (Google or email)
- Complete onboarding to set up your health profile
- Upload records from your patient profile page
- Share with a provider when ready by submitting their email on your profile page

## Contact
- Email: ${contactEmail}
- We typically respond within 1–2 business days.

## Important boundaries
- iCare is not a substitute for emergency medical care.
- The assistant explains iCare the organization and platform — not personal medical advice or diagnosis.
- Do not invent features, pricing, or policies not listed here.
`.trim();

export const ASSISTANT_SUGGESTED_QUESTIONS = [
  "What is iCare?",
  "How do I upload my health records?",
  "How does sharing with a provider work?",
  "What file types can I upload?",
  "How do I change my password?",
] as const;
