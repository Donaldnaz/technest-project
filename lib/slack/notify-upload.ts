import "server-only";

import {
  DOCUMENT_CATEGORY_LABELS,
  type DocumentCategory,
} from "@/lib/constants/document-categories";
import { slackCopy } from "@/lib/copy/slack";
import { getSlackWebhookUrl } from "@/lib/env";
import {
  maskMedicalRecordNumber,
  maskPatientName,
} from "@/lib/slack/mask-phi";

export type DashboardDocumentSlackPayload = {
  documentId: string;
  fileName: string;
  patientFirstName: string;
  patientLastName: string;
  uploaderEmail: string;
  category: DocumentCategory;
  typeOfCare: string;
  hospitalName: string;
  medicalRecordNumber: string | null;
  filePermalink?: string;
  fileAttachedInChannel?: boolean;
};

async function postSlackWebhook(payload: {
  text: string;
  blocks: Record<string, unknown>[];
}): Promise<{ sent: boolean }> {
  const webhookUrl = getSlackWebhookUrl();

  if (!webhookUrl) {
    console.warn(
      "[slack] SLACK_WEBHOOK_URL is not configured — document saved to DB only.",
    );
    return { sent: false };
  }

  try {
    const response = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const body = await response.text();
      console.error(
        `[slack] Webhook failed with status ${response.status}: ${body}`,
      );
      return { sent: false };
    }

    return { sent: true };
  } catch (error) {
    console.error("[slack] Failed to send upload notification:", error);
    return { sent: false };
  }
}

function sanitizeSlackLinkText(text: string): string {
  return text.replace(/[<>|]/g, "_").trim() || "document";
}

function buildDocumentLine(payload: DashboardDocumentSlackPayload): string {
  const label = slackCopy.documentIngested.fields.document;
  const safeFileName = sanitizeSlackLinkText(payload.fileName);

  if (payload.filePermalink) {
    return `*${label}:* <${payload.filePermalink}|${safeFileName}>`;
  }

  if (payload.fileAttachedInChannel) {
    return `*${label}:* ${safeFileName} (${slackCopy.documentIngested.documentAttachedInChannel})`;
  }

  return `*${label}:* ${safeFileName} (${slackCopy.documentIngested.documentUnavailable})`;
}

function buildDocumentIngestedFieldLines(
  payload: DashboardDocumentSlackPayload,
  documentLine: string,
): string[] {
  const maskedName = maskPatientName(
    payload.patientFirstName,
    payload.patientLastName,
  );
  const categoryLabel = DOCUMENT_CATEGORY_LABELS[payload.category];
  const maskedMrn = maskMedicalRecordNumber(payload.medicalRecordNumber);

  return [
    `*${slackCopy.documentIngested.fields.patient}:* ${maskedName}`,
    `*${slackCopy.documentIngested.fields.uploadedBy}:* ${payload.uploaderEmail}`,
    `*${slackCopy.documentIngested.fields.typeOfCare}:* ${payload.typeOfCare}`,
    `*${slackCopy.documentIngested.fields.hospitalName}:* ${payload.hospitalName}`,
    `*${slackCopy.documentIngested.fields.medicalRecordNumber}:* \`${maskedMrn}\``,
    `*${slackCopy.documentIngested.fields.documentType}:* \`${categoryLabel}\``,
    `*${slackCopy.documentIngested.fields.documentId}:* \`${payload.documentId}\``,
    documentLine,
  ];
}

/** Full alert text for a single Slack file-upload message (PDF + metadata together). */
export function buildDocumentIngestedAlertText(
  payload: DashboardDocumentSlackPayload,
): string {
  const documentLine = `*${slackCopy.documentIngested.fields.document}:* ${sanitizeSlackLinkText(payload.fileName)}`;

  return [
    `*${slackCopy.documentIngested.header}*`,
    ...buildDocumentIngestedFieldLines(payload, documentLine),
  ].join("\n");
}

export async function notifyDashboardDocumentUploaded(
  payload: DashboardDocumentSlackPayload,
): Promise<{ sent: boolean }> {
  const maskedName = maskPatientName(
    payload.patientFirstName,
    payload.patientLastName,
  );
  const lines = buildDocumentIngestedFieldLines(payload, buildDocumentLine(payload));

  return postSlackWebhook({
    text: slackCopy.documentIngested.fallback(
      maskedName,
      payload.fileName,
      payload.documentId,
    ),
    blocks: [
      {
        type: "header",
        text: {
          type: "plain_text",
          text: slackCopy.documentIngested.header,
          emoji: true,
        },
      },
      {
        type: "section",
        text: {
          type: "mrkdwn",
          text: lines.join("\n"),
        },
      },
    ],
  });
}
