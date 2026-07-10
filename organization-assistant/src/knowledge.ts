import {
  assistantCopy,
  contactEmail,
  contactPhone,
  headquartersAddress,
  headquartersAddressLines,
} from "./copy";

/**
 * Curated iCare website knowledge for the organization assistant.
 * Keep in sync with public landing page content.
 */
export const ORGANIZATION_KNOWLEDGE = `
# iCare — Organization reference (from the public website)

## Tagline
A secure health records portal for encrypted upload, private storage, and AI-reviewed plain English summaries.

## Mission
iCare helps patients and caregivers upload health records in a calm, private space — not like hospital software. You stay in control of what you share with your care team.

## What we do
- Secure health record upload: Add lab reports, referrals, imaging, and visit notes (PDF and JPEG). Files are encrypted and stored in your private folder.
- Plain English summaries: Our AI-enabled system prepares summaries in everyday language — reviewed by a practitioner before they are finalized.
- Share with your care team: Submit your practitioner's email and our care team coordinates secure delivery — you do not manage invite links yourself.
- For patients and caregivers: Manage your own health records or upload for someone you care for in one workspace.

## About us
- Health records handled with care — uploading should feel calm, not clinical.
- Patients and caregivers can upload for themselves or someone they care for.
- Consent-first sharing: practitioners only see what you choose to share.
- Private by default: uploads are tied to your signed-in account until you share them.

## Platform features (patient portal)
- Upload hub for lab reports, imaging, and visit notes
- Health records list showing file name, type, status, and upload date
- Overview metrics: health records saved, plain English ready, under review
- Recent uploads timeline
- Summary reports for download after practitioner review
- Account settings: name and email are set at sign-up and read-only; password can be updated under Password settings
- Setup creates your health profile when you first join

## Getting started
- Sign up free at /auth/sign-up (Google or email)
- Complete setup to create your health profile
- Upload health records from your patient profile page
- Share with a practitioner when ready by submitting their email on your profile page

## Common questions (answer in this style)

**What is iCare?**
iCare is a secure health records portal where you upload lab reports and visit notes, get plain English summaries, and share with your care team when you are ready.
- Private encrypted storage tied to your account
- AI-enabled summaries reviewed by a practitioner
- Consent-first sharing — you choose what to send

**How do I upload health records?**
You upload from your patient workspace under Upload records. Supported files are PDF and JPEG.
1. Sign in and open My records
2. Go to the Upload tab
3. Add your lab report, imaging, or visit note
Files stay private until you choose to share them.

**How do plain English summaries work?**
After you upload a document, iCare prepares a plain English summary in everyday language.
- Summaries are reviewed by a practitioner before they are finalized
- You can read and download them from your health records list
- They are for your information — not medical advice

**How does sharing with my practitioner work?**
You submit your practitioner's email on your profile page and our care team coordinates secure delivery.
- You do not manage invite links yourself
- Practitioners only see what you choose to share
- Contact ${contactEmail} if you need help with a share request

**What file types can I upload?**
iCare accepts PDF and JPEG for lab reports, imaging studies, referrals, and visit notes.
- Files are encrypted and stored in your private folder
- Upload from the Upload tab in your patient workspace

## Contact
- Email: ${contactEmail}
- Phone: ${contactPhone}
- ${headquartersAddress.name}: ${headquartersAddressLines.join(", ")}
- Hours: ${assistantCopy.contactHours}
- ${assistantCopy.contactResponseNote}

## Important boundaries
- iCare is not a substitute for emergency medical care.
- Plain English summaries are for your information — not medical advice.
- The assistant explains iCare the organization and platform — not personal medical advice or diagnosis.
- Do not invent features, pricing, or policies not listed here.
`.trim();

export const ASSISTANT_SUGGESTED_QUESTIONS = [
  "What is iCare?",
  "How do I upload health records?",
  "How do plain English summaries work?",
  "How does sharing with my practitioner work?",
  "What file types can I upload?",
] as const;
