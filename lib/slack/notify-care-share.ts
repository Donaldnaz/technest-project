import "server-only";

import { maskFreeTextNote, maskPatientName } from "@/lib/slack/mask-phi";

export type CareShareSlackPayload = {
  shareId: string;
  patientId: string;
  patientFirstName: string;
  patientLastName: string;
  providerEmail: string;
  documentCount: number;
  message?: string | null;
};

function getWebhookUrl(): string | null {
  const url = process.env.SLACK_WEBHOOK_URL?.trim();
  return url || null;
}

export async function notifyCareShareRequest(
  payload: CareShareSlackPayload,
): Promise<{ sent: boolean }> {
  const webhookUrl = getWebhookUrl();

  if (!webhookUrl) {
    console.warn(
      "[slack] SLACK_WEBHOOK_URL is not configured — care share saved to DB only.",
    );
    return { sent: false };
  }

  const maskedName = maskPatientName(
    payload.patientFirstName,
    payload.patientLastName,
  );
  const maskedNote = maskFreeTextNote(payload.message);

  const blocks: Record<string, unknown>[] = [
    {
      type: "header",
      text: {
        type: "plain_text",
        text: "New care share request",
        emoji: true,
      },
    },
    {
      type: "section",
      fields: [
        {
          type: "mrkdwn",
          text: `*Provider email:*\n${payload.providerEmail}`,
        },
        {
          type: "mrkdwn",
          text: `*Patient (masked):*\n${maskedName}`,
        },
        {
          type: "mrkdwn",
          text: `*Records on file:*\n${payload.documentCount}`,
        },
        {
          type: "mrkdwn",
          text: `*Share ID:*\n\`${payload.shareId}\``,
        },
      ],
    },
    {
      type: "context",
      elements: [
        {
          type: "mrkdwn",
          text: `Patient ID: \`${payload.patientId}\` — lookup in database for full details.`,
        },
      ],
    },
  ];

  if (maskedNote) {
    blocks.splice(2, 0, {
      type: "section",
      text: {
        type: "mrkdwn",
        text: `*Patient note:*\n${maskedNote}`,
      },
    });
  }

  try {
    const response = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        text: `New care share request — Share ID: ${payload.shareId}`,
        blocks,
      }),
    });

    if (!response.ok) {
      console.error(
        `[slack] Webhook failed with status ${response.status}`,
      );
      return { sent: false };
    }

    return { sent: true };
  } catch (error) {
    console.error("[slack] Failed to send care share notification:", error);
    return { sent: false };
  }
}
