import "server-only";

import { and, desc, eq } from "drizzle-orm";

import { db } from "@/lib/db";
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
    attentionNote?: string | null;
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
      attentionNote: data.attentionNote ?? null,
    })
    .onConflictDoUpdate({
      target: documentExtractions.documentId,
      set: {
        documentType: data.documentType ?? null,
        reportDate: data.reportDate ?? null,
        collectionDate: data.collectionDate ?? null,
        summary: data.summary ?? null,
        attentionNote: data.attentionNote ?? null,
        extractedAt: new Date(),
      },
    });
}

export async function listRecentDocuments(
  userId: string,
  limit = 5,
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
    .where(eq(documents.userId, userId))
    .orderBy(desc(documents.createdAt))
    .limit(limit);

  return rows.map((row) => ({
    ...row.document,
    extraction: row.extraction,
  }));
}

export async function countDocuments(userId: string): Promise<number> {
  const rows = await db
    .select({ id: documents.id })
    .from(documents)
    .where(eq(documents.userId, userId));

  return rows.length;
}

export async function countDocumentsByStatus(
  userId: string,
  status: Document["status"],
): Promise<number> {
  const rows = await db
    .select({ id: documents.id })
    .from(documents)
    .where(and(eq(documents.userId, userId), eq(documents.status, status)));

  return rows.length;
}

export async function countDocumentsByMimePrefix(
  userId: string,
  mimePrefix: string,
): Promise<number> {
  const rows = await db
    .select({ id: documents.id, mimeType: documents.mimeType })
    .from(documents)
    .where(eq(documents.userId, userId));

  return rows.filter((row) => row.mimeType.startsWith(mimePrefix)).length;
}

export async function countDocumentsForPatient(
  userId: string,
  patientId: string,
): Promise<number> {
  const rows = await db
    .select({ id: documents.id })
    .from(documents)
    .where(
      and(eq(documents.patientId, patientId), eq(documents.userId, userId)),
    );

  return rows.length;
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
