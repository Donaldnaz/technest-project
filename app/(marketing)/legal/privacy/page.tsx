import type { Metadata } from "next";

import { LegalPageShell } from "@/components/legal/legal-page-shell";
import { LegalSection } from "@/components/legal/legal-section";
import { legalCopy } from "@/lib/copy/legal";
import { contactEmail } from "@/lib/landing/navigation";

const { privacy } = legalCopy.pages;

export const metadata: Metadata = {
  title: privacy.title,
  description: privacy.description,
};

export default function PrivacyPage() {
  return (
    <LegalPageShell title={privacy.title} description={privacy.description}>
      <LegalSection title="Information we collect" id="information">
        <p>When you use iCare, we may collect:</p>
        <ul>
          <li>
            <strong>Account information</strong> — such as your name and email
            address when you sign up or sign in.
          </li>
          <li>
            <strong>Health records</strong> — files you upload, including lab
            reports, imaging, referrals, visit notes, and other clinical
            documents.
          </li>
          <li>
            <strong>Profile details</strong> — information you provide during
            setup, such as patient name, location, and care preferences.
          </li>
          <li>
            <strong>Usage data</strong> — basic technical information about how
            you use the service, such as device type and log data needed to keep
            the platform secure and reliable.
          </li>
        </ul>
      </LegalSection>

      <LegalSection title="How we use your information" id="use">
        <p>We use your information to:</p>
        <ul>
          <li>Provide and maintain your health records portal</li>
          <li>Process, organize, and prepare plain English summaries of documents you upload</li>
          <li>Enable you to share health records with practitioners you choose</li>
          <li>Send service-related communications, such as account notices</li>
          <li>Improve security, performance, and the overall user experience</li>
        </ul>
      </LegalSection>

      <LegalSection title="How sharing works" id="sharing">
        <p>
          Your health records stay private until you choose to share them.
          When you send records to a practitioner, only the information you
          select is shared with that recipient. You can revoke access when the
          product supports it, or contact us for help.
        </p>
      </LegalSection>

      <LegalSection title="How we protect your data" id="protection">
        <p>
          We use industry-standard safeguards to protect your account and
          uploaded documents, including encryption in transit and access controls.
          Only authorized systems and personnel with a legitimate need may access
          your data to operate the service.
        </p>
      </LegalSection>

      <LegalSection title="Your choices" id="choices">
        <p>You can:</p>
        <ul>
          <li>Access and review documents in your account</li>
          <li>Choose when and with whom to share your records</li>
          <li>
            Contact us to ask questions about your data or request account help
          </li>
        </ul>
      </LegalSection>

      <LegalSection title="Contact us" id="contact" variant="callout">
        <p>
          If you have questions about this privacy policy or your information,
          email us at{" "}
          <a href={`mailto:${contactEmail}`}>{contactEmail}</a>.
        </p>
      </LegalSection>
    </LegalPageShell>
  );
}
