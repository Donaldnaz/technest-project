"use server";

import type { ActionResult } from "@/lib/actions/types";
import type { DocumentCategory } from "@/lib/constants/document-categories";
import { requireSession } from "@/lib/auth/session";
import { finalizeDocumentUpload } from "@/lib/documents/finalize-upload";
import { getPatientById } from "@/lib/db/queries/patients";
import { toActionError } from "@/lib/errors";
import { notifyDocumentUploadSlack } from "@/lib/slack/post-upload-notifications";

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
    const session = await requireSession();
    const userId = session.user.id;
    const patient = await getPatientById(userId, input.patientId);

    if (!patient) {
      return { success: false, error: "Patient not found." };
    }

    const { documentId, created } = await finalizeDocumentUpload({
      userId,
      ...input,
    });

    if (created) {
      await notifyDocumentUploadSlack({
        userId,
        patientId: input.patientId,
        documentId,
        fileName: input.fileName,
        category: input.category ?? "other",
        mimeType: input.mimeType,
        blobUrl: input.blobUrl,
        created: true,
        uploaderEmail: session.user.email ?? undefined,
      });
    }

    return { success: true, data: { id: documentId } };
  } catch (error) {
    return toActionError(error);
  }
}
