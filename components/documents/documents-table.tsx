"use client";

import { useState } from "react";
import { FileText } from "lucide-react";
import Link from "next/link";

import {
  ClinicalStatusBadge,
  mapDocumentStatusToClinical,
} from "@/components/clinical/clinical-status-badge";
import {
  DataTableShell,
  truncateCellClassName,
} from "@/components/clinical/data-table-shell";
import { EmptyState } from "@/components/clinical/empty-state";
import { DocumentPreviewSheet } from "@/components/documents/document-preview-sheet";
import { LinkButton } from "@/components/ui/link-button";
import { patientDashboardCopy } from "@/lib/copy/patient/dashboard";
import {
  getPatientCategoryLabel,
  patientLibraryCopy,
} from "@/lib/copy/patient/library";
import { patientTabHref } from "@/lib/navigation/patient-nav";
import { TableCell, TableRow } from "@/components/ui/table";
import type { DocumentCategory } from "@/lib/constants/document-categories";
import type { DocumentWithExtraction } from "@/lib/db/queries/documents";
import { formatDisplayDateTime } from "@/lib/dates";
import { focusRingClassName } from "@/lib/landing/nav-link-styles";
import { cn } from "@/lib/utils";

type DocumentsTableProps = {
  documents: DocumentWithExtraction[];
  patientId: string;
};

function formatFileSize(bytes: number | null | undefined): string {
  if (!bytes || bytes <= 0) return "—";
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

function getFileTypeLabel(mimeType: string): string {
  if (mimeType === "application/pdf") return patientLibraryCopy.types.pdf;
  if (mimeType.startsWith("image/")) return patientLibraryCopy.types.image;
  return mimeType.split("/")[1]?.toUpperCase() ?? patientLibraryCopy.types.file;
}

export function DocumentsTable({ documents, patientId }: DocumentsTableProps) {
  const [previewId, setPreviewId] = useState<string | null>(null);
  const previewDoc = documents.find((doc) => doc.id === previewId);

  if (documents.length === 0) {
    return (
      <EmptyState
        icon={FileText}
        title={patientLibraryCopy.table.empty.title}
        description={patientLibraryCopy.table.empty.description}
        action={
          <LinkButton
            href={patientTabHref(patientId, "upload")}
            size="sm"
          >
            {patientLibraryCopy.table.empty.cta}
          </LinkButton>
        }
      />
    );
  }

  return (
    <div className="min-w-0">
      <DataTableShell columns={[...patientLibraryCopy.table.columns]}>
        {documents.map((document) => (
          <TableRow
            key={document.id}
            className={cn(
              "clinical-table-row cursor-pointer",
              focusRingClassName,
            )}
            tabIndex={0}
            role="button"
            aria-label={patientLibraryCopy.table.previewAria(document.fileName)}
            onClick={() => setPreviewId(document.id)}
            onKeyDown={(event) => {
              if (event.key === "Enter" || event.key === " ") {
                event.preventDefault();
                setPreviewId(document.id);
              }
            }}
          >
            <TableCell className={truncateCellClassName()}>
              <span title={document.fileName}>{document.fileName}</span>
            </TableCell>
            <TableCell>{getFileTypeLabel(document.mimeType)}</TableCell>
            <TableCell>
              {getPatientCategoryLabel(document.category as DocumentCategory)}
            </TableCell>
            <TableCell>
              <ClinicalStatusBadge
                status={mapDocumentStatusToClinical(document.status)}
                audience="patient"
              />
            </TableCell>
            <TableCell className="text-muted-foreground">
              {formatDisplayDateTime(document.createdAt)}
            </TableCell>
            <TableCell className="text-muted-foreground">
              {formatFileSize(document.fileSizeBytes)}
            </TableCell>
          </TableRow>
        ))}
      </DataTableShell>

      <p className="mt-2 text-xs text-muted-foreground">
        {patientDashboardCopy.patient.documents.previewHint}{" "}
        <Link
          href={patientTabHref(patientId, "upload")}
          className="font-medium text-primary hover:underline"
        >
          {patientDashboardCopy.patient.documents.uploadMore}
        </Link>
      </p>

      <DocumentPreviewSheet
        documentId={previewId}
        fileName={previewDoc?.fileName}
        mimeType={previewDoc?.mimeType}
        open={previewId !== null}
        onOpenChange={(open) => {
          if (!open) setPreviewId(null);
        }}
      />
    </div>
  );
}
