import "server-only";

import { and, desc, eq, isNotNull } from "drizzle-orm";

import { db } from "@/lib/db";
import {
  documentAccessLogs,
  documentExtractions,
  documents,
  type DocumentExtraction,
  type Document,
} from "@/lib/db/schema";

export type PractitionerSummaryReport = Document & {
  extraction: DocumentExtraction & { summary: string };
};

export async function listPractitionerSummaryReportsForPatient(
  userId: string,
  patientId: string,
): Promise<PractitionerSummaryReport[]> {
  const rows = await db
    .select({
      document: documents,
      extraction: documentExtractions,
    })
    .from(documents)
    .innerJoin(
      documentExtractions,
      eq(documentExtractions.documentId, documents.id),
    )
    .where(
      and(
        eq(documents.patientId, patientId),
        eq(documents.userId, userId),
        eq(documents.status, "ready"),
        isNotNull(documentExtractions.summary),
      ),
    )
    .orderBy(desc(documentExtractions.extractedAt));

  return rows
    .filter(
      (row): row is typeof row & { extraction: { summary: string } } =>
        Boolean(row.extraction.summary?.trim()),
    )
    .map((row) => ({
      ...row.document,
      extraction: {
        ...row.extraction,
        summary: row.extraction.summary!.trim(),
      },
    }));
}

export async function getPractitionerSummaryReportByDocumentId(
  userId: string,
  documentId: string,
): Promise<PractitionerSummaryReport | null> {
  const [row] = await db
    .select({
      document: documents,
      extraction: documentExtractions,
    })
    .from(documents)
    .innerJoin(
      documentExtractions,
      eq(documentExtractions.documentId, documents.id),
    )
    .where(
      and(
        eq(documents.id, documentId),
        eq(documents.userId, userId),
        eq(documents.status, "ready"),
        isNotNull(documentExtractions.summary),
      ),
    )
    .limit(1);

  if (!row?.extraction.summary?.trim()) {
    return null;
  }

  return {
    ...row.document,
    extraction: {
      ...row.extraction,
      summary: row.extraction.summary.trim(),
    },
  };
}

export async function logDocumentAccess(
  documentId: string,
  accessedByUserId: string,
  accessType: string,
): Promise<void> {
  await db.insert(documentAccessLogs).values({
    documentId,
    accessedByUserId,
    accessType,
  });
}
