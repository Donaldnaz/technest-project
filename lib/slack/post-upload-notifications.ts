import "server-only";

import { auth } from "@/lib/auth/server";
import type { DocumentCategory } from "@/lib/constants/document-categories";
import { getPatientById } from "@/lib/db/queries/patients";
import { agentDebugLog } from "@/lib/debug/agent-log";
import { getSlackBotConfig, getSlackWebhookUrl } from "@/lib/env";
import {
  buildDocumentIngestedAlertText,
  notifyDashboardDocumentUploaded,
} from "@/lib/slack/notify-upload";
import { uploadDocumentToSlackChannel } from "@/lib/slack/upload-document-to-slack";

export type DocumentUploadSlackInput = {
  userId: string;
  patientId: string;
  documentId: string;
  fileName: string;
  category: DocumentCategory;
  mimeType: string;
  blobUrl: string;
  /** Only notify Slack when the document row was newly created. */
  created: boolean;
  /** Pass from the active request when available — avoids lost auth in async work. */
  uploaderEmail?: string;
};

export async function notifyDocumentUploadSlack(
  input: DocumentUploadSlackInput,
): Promise<void> {
  if (!input.created) return;

  try {
    const [patient, { data: session }] = await Promise.all([
      getPatientById(input.userId, input.patientId),
      auth.getSession(),
    ]);

    const uploaderEmail = input.uploaderEmail ?? session?.user?.email;
    if (!patient || !uploaderEmail) return;

    const slackBotConfigured = Boolean(getSlackBotConfig());
    const slackWebhookConfigured = Boolean(getSlackWebhookUrl());

    // #region agent log
    agentDebugLog(
      "H1",
      "lib/slack/post-upload-notifications.ts:notifyDocumentUploadSlack",
      "slack-upload-init",
      {
        created: input.created,
        slackBotConfigured,
        slackWebhookConfigured,
        mimeType: input.mimeType,
        category: input.category,
      },
    );
    // #endregion

    const alertPayload = {
      documentId: input.documentId,
      fileName: input.fileName,
      patientFirstName: patient.firstName,
      patientLastName: patient.lastName,
      uploaderEmail,
      category: input.category,
      typeOfCare: patient.healthcareSpecialty,
      hospitalName: patient.healthcareLocation,
      medicalRecordNumber: patient.medicalRecordNumber,
    };

    const uploadResult = await uploadDocumentToSlackChannel({
      blobUrl: input.blobUrl,
      documentId: input.documentId,
      fileName: input.fileName,
      mimeType: input.mimeType,
      channelMessage: buildDocumentIngestedAlertText(alertPayload),
    });

    // #region agent log
    agentDebugLog(
      "H3",
      "lib/slack/post-upload-notifications.ts:notifyDocumentUploadSlack",
      "slack-upload-result",
      {
        uploadSent: uploadResult.sent,
        permalinkPresent: Boolean(uploadResult.permalink),
        fallbackWillRun: !uploadResult.sent,
      },
    );
    // #endregion

    if (uploadResult.sent) return;

    await notifyDashboardDocumentUploaded({
      ...alertPayload,
      filePermalink: uploadResult.permalink,
      fileAttachedInChannel: false,
    });
  } catch (error) {
    console.error("[slack] Document upload notification failed:", error);
  }
}
