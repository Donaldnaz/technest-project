import "server-only";

import { and, count, desc, eq, like, sql } from "drizzle-orm";

import { db, dbQuery } from "@/lib/db";
import type { DocumentCategory } from "@/lib/constants/document-categories";
import {
  careShares,
  documentExtractions,
  documents,
  type Document,
  type DocumentExtraction,
} from "@/lib/db/schema";

export type DocumentWithExtraction = Document & {
  extraction: DocumentExtraction | null;
};

export async function getDocumentByBlobPathname(
  blobPathname: string,
): Promise<Document | null> {
  const [row] = await db
    .select()
    .from(documents)
    .where(eq(documents.blobPathname, blobPathname))
    .limit(1);

  return row ?? null;
}

export async function getDocumentById(
  userId: string,
  documentId: string,
): Promise<Document | null> {
  const [row] = await db
    .select()
    .from(documents)
    .where(and(eq(documents.id, documentId), eq(documents.userId, userId)))
    .limit(1);

  return row ?? null;
}

export async function listDocumentsForPatient(
  userId: string,
  patientId: string,
): Promise<DocumentWithExtraction[]> {
  const rows = await db
    .select({
      document: documents,
      extraction: documentExtractions,
    })
    .from(documents)
    .leftJoin(
      documentExtractions,
      eq(documentExtractions.documentId, documents.id),
    )
    .where(
      and(eq(documents.patientId, patientId), eq(documents.userId, userId)),
    )
    .orderBy(desc(documents.createdAt));

  return rows.map((row) => ({
    ...row.document,
    extraction: row.extraction,
  }));
}

export async function insertDocument(
  userId: string,
  data: {
    patientId: string;
    blobUrl: string;
    blobPathname: string;
    fileName: string;
    mimeType: string;
    fileSizeBytes?: number;
    category?: DocumentCategory;
    status?: Document["status"];
  },
): Promise<string> {
  const [row] = await db
    .insert(documents)
    .values({
      ...data,
      userId,
      category: data.category ?? "other",
      status: data.status ?? "processing",
    })
    .returning({ id: documents.id });

  return row.id;
}

export async function updateDocumentStatus(
  documentId: string,
  status: Document["status"],
): Promise<void> {
  await db
    .update(documents)
    .set({ status })
    .where(eq(documents.id, documentId));
}

export async function upsertDocumentExtraction(
  documentId: string,
  data: {
    documentType?: string | null;
    reportDate?: string | null;
    collectionDate?: string | null;
    summary?: string | null;
    plainLanguageReport?: string | null;
    keyFindings?: string[] | null;
    attentionNote?: string | null;
    reviewStatus?: DocumentExtraction["reviewStatus"];
    reviewedAt?: Date | null;
    reviewedBy?: string | null;
    reviewerNotes?: string | null;
  },
): Promise<void> {
  await db
    .insert(documentExtractions)
    .values({
      documentId,
      documentType: data.documentType ?? null,
      reportDate: data.reportDate ?? null,
      collectionDate: data.collectionDate ?? null,
      summary: data.summary ?? null,
      plainLanguageReport: data.plainLanguageReport ?? null,
      keyFindings: data.keyFindings ?? null,
      attentionNote: data.attentionNote ?? null,
      reviewStatus: data.reviewStatus ?? "approved",
      reviewedAt: data.reviewedAt ?? null,
      reviewedBy: data.reviewedBy ?? null,
      reviewerNotes: data.reviewerNotes ?? null,
    })
    .onConflictDoUpdate({
      target: documentExtractions.documentId,
      set: {
        documentType: data.documentType ?? null,
        reportDate: data.reportDate ?? null,
        collectionDate: data.collectionDate ?? null,
        summary: data.summary ?? null,
        plainLanguageReport: data.plainLanguageReport ?? null,
        keyFindings: data.keyFindings ?? null,
        attentionNote: data.attentionNote ?? null,
        reviewStatus: data.reviewStatus ?? "approved",
        reviewedAt: data.reviewedAt ?? null,
        reviewedBy: data.reviewedBy ?? null,
        reviewerNotes: data.reviewerNotes ?? null,
        extractedAt: new Date(),
      },
    });
}

export async function markSummaryGenerationRequested(
  documentId: string,
): Promise<void> {
  await db
    .update(documents)
    .set({ summaryGenerationRequestedAt: new Date() })
    .where(eq(documents.id, documentId));
}

export async function getDocumentWithExtraction(
  userId: string,
  documentId: string,
): Promise<DocumentWithExtraction | null> {
  const [row] = await db
    .select({
      document: documents,
      extraction: documentExtractions,
    })
    .from(documents)
    .leftJoin(
      documentExtractions,
      eq(documentExtractions.documentId, documents.id),
    )
    .where(and(eq(documents.id, documentId), eq(documents.userId, userId)))
    .limit(1);

  if (!row) {
    return null;
  }

  return {
    ...row.document,
    extraction: row.extraction,
  };
}

export async function listRecentDocuments(
  userId: string,
  limit = 5,
): Promise<DocumentWithExtraction[]> {
  return dbQuery(async () => {
    const rows = await db
      .select({
        document: documents,
        extraction: documentExtractions,
      })
      .from(documents)
      .leftJoin(
        documentExtractions,
        eq(documentExtractions.documentId, documents.id),
      )
      .where(eq(documents.userId, userId))
      .orderBy(desc(documents.createdAt))
      .limit(limit);

    return rows.map((row) => ({
      ...row.document,
      extraction: row.extraction,
    }));
  });
}

export type DocumentDashboardStats = {
  documentCount: number;
  readyCount: number;
  processingCount: number;
  pdfCount: number;
  jpegCount: number;
};

export async function getDocumentDashboardStats(
  userId: string,
): Promise<DocumentDashboardStats> {
  return dbQuery(async () => {
    const [row] = await db
      .select({
        documentCount: count(),
        readyCount:
          sql<number>`count(*) filter (where ${documents.status} = 'ready')`.mapWith(
            Number,
          ),
        processingCount:
          sql<number>`count(*) filter (where ${documents.status} = 'processing')`.mapWith(
            Number,
          ),
        pdfCount:
          sql<number>`count(*) filter (where ${documents.mimeType} like 'application/pdf%')`.mapWith(
            Number,
          ),
        jpegCount:
          sql<number>`count(*) filter (where ${documents.mimeType} like 'image/jpeg%')`.mapWith(
            Number,
          ),
      })
      .from(documents)
      .where(eq(documents.userId, userId));

    return {
      documentCount: row?.documentCount ?? 0,
      readyCount: row?.readyCount ?? 0,
      processingCount: row?.processingCount ?? 0,
      pdfCount: row?.pdfCount ?? 0,
      jpegCount: row?.jpegCount ?? 0,
    };
  });
}

export async function countDocuments(userId: string): Promise<number> {
  const [row] = await db
    .select({ total: count() })
    .from(documents)
    .where(eq(documents.userId, userId));

  return row?.total ?? 0;
}

export async function countDocumentsByStatus(
  userId: string,
  status: Document["status"],
): Promise<number> {
  const [row] = await db
    .select({ total: count() })
    .from(documents)
    .where(and(eq(documents.userId, userId), eq(documents.status, status)));

  return row?.total ?? 0;
}

export async function countDocumentsByMimePrefix(
  userId: string,
  mimePrefix: string,
): Promise<number> {
  const [row] = await db
    .select({ total: count() })
    .from(documents)
    .where(
      and(eq(documents.userId, userId), like(documents.mimeType, `${mimePrefix}%`)),
    );

  return row?.total ?? 0;
}

export async function countDocumentsForPatient(
  userId: string,
  patientId: string,
): Promise<number> {
  const [row] = await db
    .select({ total: count() })
    .from(documents)
    .where(
      and(eq(documents.patientId, patientId), eq(documents.userId, userId)),
    );

  return row?.total ?? 0;
}

export async function createCareShare(
  userId: string,
  data: {
    patientId: string;
    providerEmail: string;
    message?: string | null;
  },
): Promise<string> {
  const [row] = await db
    .insert(careShares)
    .values({
      patientId: data.patientId,
      grantedByUserId: userId,
      providerEmail: data.providerEmail.toLowerCase().trim(),
      message: data.message ?? null,
      status: "pending",
    })
    .returning({ id: careShares.id });

  return row.id;
}
