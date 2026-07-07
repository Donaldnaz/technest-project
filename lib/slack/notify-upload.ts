import "server-only";

import { getSignedDocumentUrl } from "@/lib/blob/access";
import {
  DOCUMENT_CATEGORY_LABELS,
  type DocumentCategory,
} from "@/lib/constants/document-categories";
import { slackCopy } from "@/lib/copy/slack";
import { maskPatientName } from "@/lib/slack/mask-phi";

export type DashboardDocumentSlackPayload = {
  documentId: string;
  patientFirstName: string;
  patientLastName: string;
  uploaderEmail: string;
  category: DocumentCategory;
  vercelBlobUrl: string;
};

function getWebhookUrl(): string | null {
  const url = process.env.SLACK_WEBHOOK_URL?.trim();
  return url || null;
}

async function postSlackWebhook(payload: {
  text: string;
  blocks: Record<string, unknown>[];
}): Promise<{ sent: boolean }> {
  const webhookUrl = getWebhookUrl();

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

export async function notifyDashboardDocumentUploaded(
  payload: DashboardDocumentSlackPayload,
): Promise<{ sent: boolean }> {
  const maskedName = maskPatientName(
    payload.patientFirstName,
    payload.patientLastName,
  );
  const categoryLabel = DOCUMENT_CATEGORY_LABELS[payload.category];
  const fileLink = getSignedDocumentUrl(payload.vercelBlobUrl);

  return postSlackWebhook({
    text: slackCopy.documentIngested.fallback(maskedName, payload.documentId),
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
          text: [
            `*${slackCopy.documentIngested.fields.patient}:* ${maskedName}`,
            `*${slackCopy.documentIngested.fields.uploadedBy}:* ${payload.uploaderEmail}`,
            `*${slackCopy.documentIngested.fields.documentType}:* \`${categoryLabel}\``,
            `*${slackCopy.documentIngested.fields.documentId}:* \`${payload.documentId}\``,
            `*${slackCopy.documentIngested.fields.status}:* ${slackCopy.documentIngested.statusValue}`,
            `*${slackCopy.documentIngested.fields.fileLink}:* <${fileLink}|${slackCopy.documentIngested.fileLinkLabel}>`,
          ].join("\n"),
        },
      },
    ],
  });
}
