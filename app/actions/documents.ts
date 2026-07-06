"use server";

import type { ActionResult } from "@/lib/actions/types";
import type { DocumentCategory } from "@/lib/constants/document-categories";
import { requireUserId } from "@/lib/auth/session";
import { finalizeDocumentUpload } from "@/lib/documents/finalize-upload";
import { getPatientById } from "@/lib/db/queries/patients";
import { toActionError } from "@/lib/errors";

export async function registerDocumentMetadata(input: {
  patientId: string;
  blobUrl: string;
  blobPathname: string;
  fileName: string;
  mimeType: string;
  fileSizeBytes?: number;
  category?: DocumentCategory;
}): Promise<ActionResult<{ id: string }>> {
  try {
    const userId = await requireUserId();
    const patient = await getPatientById(userId, input.patientId);

    if (!patient) {
      return { success: false, error: "Patient not found." };
    }

    const { documentId } = await finalizeDocumentUpload({
      userId,
      ...input,
    });

    return { success: true, data: { id: documentId } };
  } catch (error) {
    return toActionError(error);
  }
}
