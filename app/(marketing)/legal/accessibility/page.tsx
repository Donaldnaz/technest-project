import type { Metadata } from "next";

import { LegalPageShell } from "@/components/legal/legal-page-shell";
import { LegalSection } from "@/components/legal/legal-section";
import { legalCopy } from "@/lib/copy/legal";
import { contactEmail } from "@/lib/landing/navigation";

const { accessibility } = legalCopy.pages;

export const metadata: Metadata = {
  title: accessibility.title,
  description: accessibility.description,
};

export default function AccessibilityPage() {
  return (
    <LegalPageShell
      title={accessibility.title}
      description={accessibility.description}
    >
      <LegalSection title="Our approach" id="approach">
        <p>
          We design iCare to be calm and easy to navigate. That includes
          sufficient color contrast, readable typography, descriptive labels on
          forms and buttons, and logical page structure so assistive technologies
          can interpret content correctly.
        </p>
      </LegalSection>

      <LegalSection title="Features we prioritize" id="features">
        <ul>
          <li>
            Keyboard navigation for core flows such as sign-in, upload, and
            sharing
          </li>
          <li>Visible focus indicators on interactive elements</li>
          <li>Text alternatives for meaningful icons where needed</li>
          <li>Responsive layouts that work on mobile and desktop screen sizes</li>
          <li>Plain-language copy to reduce confusion for all users</li>
        </ul>
      </LegalSection>

      <LegalSection title="Ongoing improvements" id="improvements">
        <p>
          Accessibility is an ongoing effort. We review new features for
          usability and compatibility with common assistive tools, and we update
          the product as standards and best practices evolve.
        </p>
      </LegalSection>

      <LegalSection title="Feedback and assistance" id="feedback">
        <p>
          If you have trouble using any part of iCare — or if you use assistive
          technology and encounter a barrier — please tell us. Include the page or
          feature involved and, if possible, the device and browser you are using.
          We will do our best to help and to improve the experience.
        </p>
      </LegalSection>

      <LegalSection title="Contact us" id="contact">
        <p>
          Email <a href={`mailto:${contactEmail}`}>{contactEmail}</a> with the
          subject line &ldquo;Accessibility&rdquo; and we will respond as soon as
          we can.
        </p>
      </LegalSection>
    </LegalPageShell>
  );
}
