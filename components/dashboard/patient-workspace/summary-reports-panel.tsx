"use client";

import { Download, FileText } from "lucide-react";
import Link from "next/link";

import { EmptyState } from "@/components/clinical/empty-state";
import { GenerateSummaryButton } from "@/components/documents/generate-summary-button";
import { buttonVariants } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { DocumentCategory } from "@/lib/constants/document-categories";
import { patientDownloadsCopy } from "@/lib/copy/patient/downloads";
import { getPatientCategoryLabel } from "@/lib/copy/patient/library";
import type { DocumentWithExtraction } from "@/lib/db/queries/documents";
import type { PractitionerSummaryReport } from "@/lib/db/queries/summary-reports";
import { formatDisplayDate } from "@/lib/dates";
import { cn } from "@/lib/utils";

type SummaryReportsPanelProps = {
  reports: PractitionerSummaryReport[];
  documents?: DocumentWithExtraction[];
  patientId?: string;
};

const TABLE_COLUMNS = patientDownloadsCopy.table.columns;

function reportTypeLabel(report: PractitionerSummaryReport) {
  return (
    report.extraction.documentType ??
    getPatientCategoryLabel(report.category as DocumentCategory)
  );
}

function DownloadLinks({
  reportId,
  fileName,
  className,
}: {
  reportId: string;
  fileName: string;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "inline-flex flex-nowrap items-center gap-2 whitespace-nowrap",
        className,
      )}
      role="group"
      aria-label={patientDownloadsCopy.table.downloadGroupAria(fileName)}
    >
      <a
        href={`/api/documents/${reportId}/summary`}
        download
        className={cn(
          buttonVariants({ variant: "outline", size: "touch" }),
          "shrink-0 gap-1.5 px-3 text-primary hover:border-primary/40 hover:bg-primary/5 hover:text-primary sm:h-8 sm:min-h-0 sm:px-2.5 sm:text-[0.8rem]",
        )}
        aria-label={patientDownloadsCopy.table.downloadTxtAria(fileName)}
      >
        <Download className="size-3.5" aria-hidden />
        {patientDownloadsCopy.table.downloadTxtLabel}
      </a>
      <a
        href={`/api/documents/${reportId}/summary?format=pdf`}
        download
        className={cn(
          buttonVariants({ variant: "outline", size: "touch" }),
          "shrink-0 gap-1.5 px-3 text-primary hover:border-primary/40 hover:bg-primary/5 hover:text-primary sm:h-8 sm:min-h-0 sm:px-2.5 sm:text-[0.8rem]",
        )}
        aria-label={patientDownloadsCopy.table.downloadPdfAria(fileName)}
      >
        <Download className="size-3.5" aria-hidden />
        {patientDownloadsCopy.table.downloadPdfLabel}
      </a>
    </div>
  );
}

function PanelHeader() {
  return (
    <div className="space-y-1">
      <h2 className="font-heading text-lg font-semibold leading-snug">
        {patientDownloadsCopy.title}
      </h2>
      <p className="max-w-2xl text-sm leading-relaxed text-muted-foreground">
        {patientDownloadsCopy.description}
      </p>
    </div>
  );
}

export function SummaryReportsPanel({
  reports,
  documents = [],
  patientId,
}: SummaryReportsPanelProps) {
  const processingDocuments = documents.filter(
    (document) => document.status === "processing",
  );
  const retryDocuments = documents
    .filter(
      (document) =>
        document.status === "failed" ||
        document.extraction?.reviewStatus === "rejected",
    )
    .slice(0, 3);

  if (reports.length === 0) {
    return (
      <div className="clinical-card p-4 md:p-5">
        <PanelHeader />

        <div className="mt-4">
          <EmptyState
            icon={FileText}
            title={patientDownloadsCopy.empty.title}
            description={patientDownloadsCopy.empty.description}
            className="border-border/60 bg-muted/20"
            action={
              patientId ? (
                <div className="flex flex-wrap items-center justify-center gap-2">
                  <Link
                    href={`/dashboard/patients/${patientId}?tab=upload`}
                    className={cn(
                      buttonVariants({ variant: "outline", size: "touch" }),
                      "px-4 text-primary hover:border-primary/40 hover:bg-primary/5 hover:text-primary",
                    )}
                  >
                    {patientDownloadsCopy.empty.cta}
                  </Link>
                  {retryDocuments.map((document) => (
                    <GenerateSummaryButton
                      key={document.id}
                      documentId={document.id}
                      label={patientDownloadsCopy.empty.regenerateLabel}
                    />
                  ))}
                </div>
              ) : undefined
            }
          />
        </div>

        {processingDocuments.length > 0 ? (
          <p className="mt-4 text-center text-sm text-muted-foreground">
            {patientDownloadsCopy.empty.processing(processingDocuments.length)}
          </p>
        ) : null}
      </div>
    );
  }

  return (
    <div className="clinical-card p-4 md:p-5">
      <PanelHeader />

      <ul className="mt-4 space-y-3 sm:hidden">
        {reports.map((report) => (
          <li
            key={report.id}
            className="rounded-xl border border-border/50 bg-muted/20 p-4"
          >
            <div className="flex items-start justify-between gap-3">
              <div className="flex min-w-0 flex-1 items-start gap-3">
                <span className="mt-0.5 flex size-9 shrink-0 items-center justify-center rounded-lg bg-muted text-muted-foreground">
                  <FileText className="size-4" aria-hidden />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="truncate font-medium" title={report.fileName}>
                    {report.fileName}
                  </p>
                  <p className="mt-1 truncate text-sm text-muted-foreground">
                    <span>{reportTypeLabel(report)}</span>
                    <span className="mx-1.5 text-border" aria-hidden>
                      ·
                    </span>
                    <span className="whitespace-nowrap">
                      {formatDisplayDate(report.extraction.extractedAt)}
                    </span>
                  </p>
                </div>
              </div>
            </div>
            <div className="mt-3 flex items-center justify-end border-t border-border/50 pt-3">
              <DownloadLinks reportId={report.id} fileName={report.fileName} />
            </div>
          </li>
        ))}
      </ul>

      <div className="mt-4 hidden overflow-hidden rounded-xl border border-border/50 sm:block">
        <Table className="table-fixed">
          <colgroup>
            <col className="w-[40%]" />
            <col className="w-[22%]" />
            <col className="w-[16%]" />
            <col className="w-[22%]" />
          </colgroup>
          <TableHeader>
            <TableRow className="hover:bg-transparent">
              <TableHead className="px-3">{TABLE_COLUMNS[0]}</TableHead>
              <TableHead className="px-3">{TABLE_COLUMNS[1]}</TableHead>
              <TableHead className="px-3">{TABLE_COLUMNS[2]}</TableHead>
              <TableHead className="px-3 text-right">
                {TABLE_COLUMNS[3]}
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {reports.map((report) => (
              <TableRow key={report.id}>
                <TableCell className="max-w-0 px-3 align-middle">
                  <div className="flex min-w-0 items-center gap-2.5">
                    <span className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-muted/80 text-muted-foreground">
                      <FileText className="size-3.5" aria-hidden />
                    </span>
                    <span
                      className="min-w-0 truncate font-medium"
                      title={report.fileName}
                    >
                      {report.fileName}
                    </span>
                  </div>
                </TableCell>
                <TableCell
                  className="max-w-0 truncate px-3 align-middle text-muted-foreground"
                  title={reportTypeLabel(report)}
                >
                  {reportTypeLabel(report)}
                </TableCell>
                <TableCell className="px-3 align-middle whitespace-nowrap text-muted-foreground">
                  {formatDisplayDate(report.extraction.extractedAt)}
                </TableCell>
                <TableCell className="px-3 text-right align-middle whitespace-nowrap">
                  <DownloadLinks
                    reportId={report.id}
                    fileName={report.fileName}
                    className="justify-end"
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <p className="mt-4 border-t border-border/50 pt-3 text-xs leading-relaxed text-muted-foreground">
        {patientDownloadsCopy.notice}
      </p>
    </div>
  );
}
