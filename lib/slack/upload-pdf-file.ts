import "server-only";

import { get } from "@vercel/blob";

import {
  DOCUMENT_CATEGORY_LABELS,
  type DocumentCategory,
} from "@/lib/constants/document-categories";
import { slackCopy } from "@/lib/copy/slack";

export type UploadPdfToSlackPayload = {
  blobUrl: string;
  documentId: string;
  category: DocumentCategory;
  maskedPatientName: string;
};

function getSlackBotConfig(): { token: string; channelId: string } | null {
  const token = process.env.SLACK_BOT_TOKEN?.trim();
  const channelId = process.env.SLACK_CHANNEL_ID?.trim();

  if (!token || !channelId) {
    return null;
  }

  return { token, channelId };
}

export async function uploadPdfToSlackChannel(
  payload: UploadPdfToSlackPayload,
): Promise<{ sent: boolean }> {
  const config = getSlackBotConfig();

  if (!config) {
    console.warn(
      "[slack] SLACK_BOT_TOKEN or SLACK_CHANNEL_ID is not configured — PDF file not posted to channel.",
    );
    return { sent: false };
  }

  try {
    const blobResult = await get(payload.blobUrl, { access: "private" });
    if (!blobResult || blobResult.statusCode !== 200 || !blobResult.stream) {
      console.error("[slack] Could not download PDF from blob storage.");
      return { sent: false };
    }

    const buffer = Buffer.from(
      await new Response(blobResult.stream).arrayBuffer(),
    );

    const categoryLabel = DOCUMENT_CATEGORY_LABELS[payload.category];
    const filename = `document-${payload.documentId}.pdf`;
    const initialComment = slackCopy.pdfFileUpload.comment(
      payload.maskedPatientName,
      categoryLabel,
      payload.documentId,
    );

    const formData = new FormData();
    formData.append(
      "file",
      new Blob([buffer], { type: "application/pdf" }),
      filename,
    );
    formData.append("channels", config.channelId);
    formData.append("initial_comment", initialComment);
    formData.append("filename", filename);
    formData.append("token", config.token);

    const response = await fetch("https://slack.com/api/files.upload", {
      method: "POST",
      body: formData,
    });

    const result = (await response.json()) as { ok: boolean; error?: string };

    if (!result.ok) {
      console.error(
        `[slack] PDF file upload failed: ${result.error ?? "unknown error"}`,
      );
      return { sent: false };
    }

    return { sent: true };
  } catch (error) {
    console.error("[slack] Failed to upload PDF file to channel:", error);
    return { sent: false };
  }
}
