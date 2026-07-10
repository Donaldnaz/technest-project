"use client";

import { DocumentsList } from "@/components/documents/documents-list";
import { DocumentsTable } from "@/components/documents/documents-table";
import type { DocumentWithExtraction } from "@/lib/db/queries/documents";

type DocumentsPanelProps = {
  documents: DocumentWithExtraction[];
  patientId: string;
};

/**
 * Mobile: card list. md+: data table.
 * Mirrors the summary-reports card/table swap pattern.
 */
export function DocumentsPanel({ documents, patientId }: DocumentsPanelProps) {
  return (
    <div className="min-w-0">
      <div className="md:hidden">
        <DocumentsList documents={documents} patientId={patientId} />
      </div>
      <div className="hidden md:block">
        <DocumentsTable documents={documents} patientId={patientId} />
      </div>
    </div>
  );
}
