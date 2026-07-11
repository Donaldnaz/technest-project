import { UPLOAD_FORMATS_LABEL } from "@/lib/constants/upload";

const BLOB_NOT_CONFIGURED =
  "Upload storage is not configured. Add BLOB_READ_WRITE_TOKEN to .env.local and restart the dev server.";

const SESSION_EXPIRED = "Your session expired. Sign in again and retry.";

const FILE_TOO_LARGE = "File is too large — maximum size is 10 MB.";

const UNSUPPORTED_TYPE = `Only ${UPLOAD_FORMATS_LABEL} files are supported.`;

const GENERIC =
  "Upload failed. Try again or remove this file.";

const CLIENT_TOKEN_FAILED =
  "Could not start upload. Sign in again, then retry. If this persists, check BLOB_READ_WRITE_TOKEN in .env.local.";

const INVALID_BLOB_TOKEN =
  "Upload storage token is invalid. Set a valid BLOB_READ_WRITE_TOKEN from your Vercel Blob store and restart the dev server.";

function messageFromUnknown(error: unknown): string | null {
  if (error instanceof Error && error.message.trim()) {
    return error.message.trim();
  }

  if (typeof error === "object" && error !== null && "message" in error) {
    const message = (error as { message?: unknown }).message;
    if (typeof message === "string" && message.trim()) {
      return message.trim();
    }
  }

  return null;
}

export function getUploadErrorMessage(error: unknown): string {
  const raw = messageFromUnknown(error)?.toLowerCase() ?? "";

  if (
    raw.includes("failed to retrieve the client token") ||
    raw.includes("failed to  retrieve the client token")
  ) {
    return CLIENT_TOKEN_FAILED;
  }

  if (
    raw.includes("invalid `blob_read_write_token`") ||
    raw.includes("invalid `token`") ||
    raw.includes("upload storage token is invalid")
  ) {
    return INVALID_BLOB_TOKEN;
  }

  if (
    raw.includes("blob storage is not configured") ||
    raw.includes("not configured") ||
    raw.includes("503")
  ) {
    return BLOB_NOT_CONFIGURED;
  }

  if (raw.includes("unauthorized") || raw.includes("401")) {
    return SESSION_EXPIRED;
  }

  if (
    raw.includes("too large") ||
    raw.includes("file size") ||
    raw.includes("maximum size")
  ) {
    return FILE_TOO_LARGE;
  }

  if (
    raw.includes("content type") ||
    raw.includes("mime") ||
    raw.includes("unsupported file")
  ) {
    return UNSUPPORTED_TYPE;
  }

  const original = messageFromUnknown(error);
  if (original) {
    return original;
  }

  return GENERIC;
}
