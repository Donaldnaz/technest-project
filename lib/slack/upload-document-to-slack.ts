import "server-only";

import { fetchPrivateBlob } from "@/lib/blob/fetch-private-blob";
import { ALLOWED_MIME_TYPES } from "@/lib/constants/upload";
import { getSlackBotConfig } from "@/lib/env";
import {
  callSlackApi,
  getSlackFilePermalink,
} from "@/lib/slack/slack-api";

export type UploadDocumentToSlackPayload = {
  blobUrl: string;
  documentId: string;
  fileName: string;
  mimeType: string;
  /** Full ingestion alert shown above the attached file in one Slack message. */
  channelMessage: string;
};

type SlackUploadMimeType = (typeof ALLOWED_MIME_TYPES)[number];

function resolveUploadMimeType(mimeType: string): SlackUploadMimeType | null {
  const normalized = mimeType.toLowerCase().trim();
  if (normalized === "image/jpg") return "image/jpeg";
  if ((ALLOWED_MIME_TYPES as readonly string[]).includes(normalized)) {
    return normalized as SlackUploadMimeType;
  }
  return null;
}

function uploadFileMeta(mimeType: SlackUploadMimeType): {
  extension: string;
  contentType: string;
} {
  if (mimeType === "image/jpeg") {
    return { extension: "jpg", contentType: "image/jpeg" };
  }
  return { extension: "pdf", contentType: "application/pdf" };
}

async function resolvePermalink(
  token: string,
  fileId: string,
  completeResult: Awaited<ReturnType<typeof callSlackApi>>,
): Promise<string | undefined> {
  const fromComplete = completeResult.files?.[0]?.permalink;
  if (fromComplete) return fromComplete;
  return getSlackFilePermalink(token, fileId);
}

export async function uploadDocumentToSlackChannel(
  payload: UploadDocumentToSlackPayload,
): Promise<{ sent: boolean; permalink?: string }> {
  const config = getSlackBotConfig();
  const uploadMimeType = resolveUploadMimeType(payload.mimeType);

  if (!uploadMimeType) {
    console.warn(
      `[slack] Unsupported mime type for Slack upload: ${payload.mimeType}`,
    );
    return { sent: false };
  }

  if (!config) {
    console.warn(
      "[slack] SLACK_BOT_TOKEN or SLACK_CHANNEL_ID is not configured — file not posted to channel.",
    );
    return { sent: false };
  }

  try {
    const blob = await fetchPrivateBlob(payload.blobUrl);

    if (!blob) {
      console.error("[slack] Could not download document from blob storage.");
      return { sent: false };
    }

    const buffer = blob.buffer;
    const { extension, contentType } = uploadFileMeta(uploadMimeType);
    const storageFilename = `document-${payload.documentId}.${extension}`;

    const uploadUrlResult = await callSlackApi(
      config.token,
      "files.getUploadURLExternal",
      {
        filename: storageFilename,
        length: buffer.length,
      },
    );

    if (
      !uploadUrlResult.ok ||
      !uploadUrlResult.upload_url ||
      !uploadUrlResult.file_id
    ) {
      console.error(
        `[slack] files.getUploadURLExternal failed: ${uploadUrlResult.error ?? "unknown error"}`,
      );
      return { sent: false };
    }

    const binaryUpload = await fetch(uploadUrlResult.upload_url, {
      method: "POST",
      headers: {
        "Content-Type": contentType,
      },
      body: new Uint8Array(buffer),
    });

    if (!binaryUpload.ok) {
      console.error(
        `[slack] Binary upload failed with status ${binaryUpload.status}.`,
      );
      return { sent: false };
    }

    const completeResult = await callSlackApi(
      config.token,
      "files.completeUploadExternal",
      {
        files: [{ id: uploadUrlResult.file_id, title: payload.fileName }],
        channel_id: config.channelId,
        initial_comment: payload.channelMessage,
      },
    );

    if (!completeResult.ok) {
      console.error(
        `[slack] files.completeUploadExternal failed: ${completeResult.error ?? "unknown error"}`,
      );
      return { sent: false };
    }

    const permalink = await resolvePermalink(
      config.token,
      uploadUrlResult.file_id,
      completeResult,
    );

    return { sent: true, permalink };
  } catch (error) {
    console.error("[slack] Failed to upload document to channel:", error);
    return { sent: false };
  }
}
