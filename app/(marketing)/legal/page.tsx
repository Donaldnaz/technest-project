import type { Metadata } from "next";

import { LegalIndexLinks } from "@/components/legal/legal-footer-links";
import { LegalPageShell } from "@/components/legal/legal-page-shell";
import { legalCopy } from "@/lib/copy/legal";

const { index } = legalCopy;

export const metadata: Metadata = {
  title: index.title,
  description: index.description,
};

export default function LegalIndexPage() {
  return (
    <LegalPageShell
      title={index.title}
      description={index.description}
      showSubnav={false}
      showPager={false}
    >
      <LegalIndexLinks />
    </LegalPageShell>
  );
}
