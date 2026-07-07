import type { Metadata } from "next";

import { LegalPageShell } from "@/components/legal/legal-page-shell";
import { LegalSection } from "@/components/legal/legal-section";
import { legalCopy } from "@/lib/copy/legal";
import { contactEmail } from "@/lib/landing/navigation";

const { terms } = legalCopy.pages;

export const metadata: Metadata = {
  title: terms.title,
  description: terms.description,
};

export default function TermsPage() {
  return (
    <LegalPageShell title={terms.title} description={terms.description}>
      <LegalSection title="The service" id="service">
        <p>
          iCare provides tools for patients and caregivers to upload, organize,
          and share health records. iCare is not a medical provider and does not
          offer medical advice, diagnosis, or treatment.
        </p>
      </LegalSection>

      <LegalSection title="Your account" id="account">
        <p>
          You are responsible for keeping your sign-in credentials secure and for
          activity that occurs under your account. Provide accurate information
          when registering and notify us if you suspect unauthorized access.
        </p>
      </LegalSection>

      <LegalSection title="Health information you upload" id="uploads">
        <p>
          By uploading documents, you confirm that you are authorized to submit
          the health information contained in those files — for example, your own
          records or records for someone you are permitted to manage as a
          caregiver.
        </p>
      </LegalSection>

      <LegalSection title="Sharing with practitioners" id="sharing">
        <p>
          You control when records are shared with doctors or other care
          providers. Shared information is provided for review in connection with
          your care. Practitioners are responsible for how they use information
          they receive outside of iCare.
        </p>
      </LegalSection>

      <LegalSection title="Acceptable use" id="acceptable-use">
        <p>You agree not to:</p>
        <ul>
          <li>
            Use iCare for unlawful purposes or to upload content you do not have
            rights to share
          </li>
          <li>
            Attempt to access another person&apos;s account or data without
            permission
          </li>
          <li>Interfere with the security or operation of the platform</li>
          <li>
            Misrepresent your identity or relationship to a patient profile
          </li>
        </ul>
      </LegalSection>

      <LegalSection title="Availability and changes" id="changes">
        <p>
          We may update iCare over time, including adding or changing features.
          We may also update these terms. Continued use of the service after
          changes take effect means you accept the revised terms.
        </p>
      </LegalSection>

      <LegalSection title="Disclaimer" id="disclaimer">
        <p>
          iCare is provided on an &ldquo;as is&rdquo; basis. While we work to keep
          the service reliable and secure, we do not guarantee uninterrupted
          access or that every document will be processed without error. Always
          follow your care team&apos;s guidance for urgent medical decisions.
        </p>
      </LegalSection>

      <LegalSection title="Contact us" id="contact" variant="callout">
        <p>
          Questions about these terms? Email{" "}
          <a href={`mailto:${contactEmail}`}>{contactEmail}</a>.
        </p>
      </LegalSection>
    </LegalPageShell>
  );
}
