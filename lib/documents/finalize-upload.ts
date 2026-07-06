import "server-only";

import { revalidatePath, revalidateTag } from "next/cache";

import { processDocumentExtraction } from "@/lib/ai/extract-document";
import type { DocumentCategory } from "@/lib/constants/document-categories";
import {
  getDocumentByBlobPathname,
  insertDocument,
} from "@/lib/db/queries/documents";

export async function finalizeDocumentUpload(input: {
  userId: string;
  patientId: string;
  blobUrl: string;
  blobPathname: string;
  fileName: string;
  mimeType: string;
  fileSizeBytes?: number;
  category?: DocumentCategory;
}): Promise<{ documentId: string; created: boolean }> {
  const existing = await getDocumentByBlobPathname(input.blobPathname);
  if (existing) {
    return { documentId: existing.id, created: false };
  }

  const documentId = await insertDocument(input.userId, {
    patientId: input.patientId,
    blobUrl: input.blobUrl,
    blobPathname: input.blobPathname,
    fileName: input.fileName,
    mimeType: input.mimeType,
    fileSizeBytes: input.fileSizeBytes,
    category: input.category ?? "other",
    status: "processing",
  });

  void processDocumentExtraction(
    documentId,
    input.blobUrl,
    input.mimeType,
    input.fileName,
  );

  revalidateTag("documents", "max");
  revalidatePath(`/dashboard/patients/${input.patientId}`);
  revalidatePath("/dashboard");

  return { documentId, created: true };
}
