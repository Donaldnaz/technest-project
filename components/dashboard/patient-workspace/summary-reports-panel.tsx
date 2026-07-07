"use client";

import { Download, FileText } from "lucide-react";

import {
  DataTableShell,
  truncateCellClassName,
} from "@/components/clinical/data-table-shell";
import { EmptyState } from "@/components/clinical/empty-state";
import { TableCell, TableRow } from "@/components/ui/table";
import type { DocumentCategory } from "@/lib/constants/document-categories";
import { patientDownloadsCopy } from "@/lib/copy/patient/downloads";
import { getPatientCategoryLabel } from "@/lib/copy/patient/library";
import type { PractitionerSummaryReport } from "@/lib/db/queries/summary-reports";
import { formatDisplayDate } from "@/lib/dates";

type SummaryReportsPanelProps = {
  reports: PractitionerSummaryReport[];
};

export function SummaryReportsPanel({
  reports,
}: SummaryReportsPanelProps) {
  if (reports.length === 0) {
    return (
      <div className="clinical-card p-4 md:p-5">
        <EmptyState
          icon={FileText}
          title={patientDownloadsCopy.empty.title}
          description={patientDownloadsCopy.empty.description}
        />
      </div>
    );
  }

  return (
    <div className="clinical-card p-4 md:p-5">
      <div className="mb-4">
        <h2 className="font-heading text-lg font-semibold">
          {patientDownloadsCopy.title}
        </h2>
        <p className="mt-1 text-sm text-muted-foreground">
          {patientDownloadsCopy.description}
        </p>
      </div>

      <DataTableShell columns={[...patientDownloadsCopy.table.columns]}>
        {reports.map((report) => (
          <TableRow key={report.id} className="clinical-table-row">
            <TableCell className={truncateCellClassName()}>
              <span title={report.fileName}>{report.fileName}</span>
            </TableCell>
            <TableCell>
              {report.extraction.documentType ??
                getPatientCategoryLabel(report.category as DocumentCategory)}
            </TableCell>
            <TableCell className="text-muted-foreground">
              {formatDisplayDate(report.extraction.extractedAt)}
            </TableCell>
            <TableCell>
              <a
                href={`/api/documents/${report.id}/summary`}
                download
                className="inline-flex items-center gap-1.5 rounded-lg border border-border/70 bg-background px-2.5 py-1.5 text-sm font-medium text-primary transition-colors hover:border-primary/40 hover:bg-primary/5"
                aria-label={patientDownloadsCopy.table.downloadAria(
                  report.fileName,
                )}
              >
                <Download className="size-3.5" aria-hidden />
                {patientDownloadsCopy.table.downloadLabel}
              </a>
            </TableCell>
          </TableRow>
        ))}
      </DataTableShell>

      <p className="mt-3 text-xs text-muted-foreground">
        {patientDownloadsCopy.notice}
      </p>
    </div>
  );
}
