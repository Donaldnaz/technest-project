import { handleUpload } from "@vercel/blob/client";
import { NextResponse } from "next/server";
import { ZodError } from "zod";

import { requireUserId } from "@/lib/auth/session";
import {
  getBlobTokenErrorMessage,
  isBlobTokenConfigured,
} from "@/lib/blob/validate-token";
import {
  ALLOWED_MIME_TYPES,
  MAX_UPLOAD_BYTES,
  normalizeMimeType,
} from "@/lib/constants/upload";
import { finalizeDocumentUpload } from "@/lib/documents/finalize-upload";
import { getPatientById } from "@/lib/db/queries/patients";
import { env } from "@/lib/env";
import { NotFoundError, UnauthorizedError } from "@/lib/errors";
import { notifyDocumentUploadSlack } from "@/lib/slack/post-upload-notifications";
import {
  uploadClientPayloadSchema,
  uploadTokenPayloadSchema,
} from "@/lib/validations/document";

function getBlobToken() {
  return env.BLOB_READ_WRITE_TOKEN?.trim();
}

export async function GET(): Promise<NextResponse> {
  const token = getBlobToken();

  if (!token) {
    return NextResponse.json({ configured: false, valid: false }, { status: 503 });
  }

  const valid = isBlobTokenConfigured(token);

  if (!valid) {
    return NextResponse.json(
      { configured: true, valid: false, error: getBlobTokenErrorMessage() },
      { status: 503 },
    );
  }

  return NextResponse.json({ configured: true, valid: true });
}

export async function POST(request: Request): Promise<NextResponse> {
  const blobToken = getBlobToken();

  if (!blobToken) {
    return NextResponse.json(
      { error: "Blob storage is not configured." },
      { status: 503 },
    );
  }

  if (!isBlobTokenConfigured(blobToken)) {
    return NextResponse.json(
      { error: getBlobTokenErrorMessage() },
      { status: 503 },
    );
  }

  let body: Parameters<typeof handleUpload>[0]["body"];

  try {
    body = (await request.json()) as Parameters<typeof handleUpload>[0]["body"];
  } catch {
    return NextResponse.json(
      { error: "Invalid upload request body." },
      { status: 400 },
    );
  }

  try {
    const result = await handleUpload({
      request,
      body,
      token: blobToken,
      onBeforeGenerateToken: async (pathname, clientPayload) => {
        const userId = await requireUserId();
        const parsed = uploadClientPayloadSchema.parse(
          JSON.parse(clientPayload ?? "{}"),
        );

        const patient = await getPatientById(userId, parsed.patientId);
        if (!patient) {
          throw new NotFoundError();
        }

        if (!pathname.startsWith(`patients/${parsed.patientId}/`)) {
          throw new Error("Invalid upload path.");
        }

        const mimeType = normalizeMimeType(parsed.mimeType);
        if (!mimeType) {
          throw new Error("Unsupported file type.");
        }

        return {
          allowedContentTypes: [...ALLOWED_MIME_TYPES],
          maximumSizeInBytes: MAX_UPLOAD_BYTES,
          addRandomSuffix: false,
          access: "private" as const,
          tokenPayload: JSON.stringify({
            userId,
            patientId: parsed.patientId,
            fileName: parsed.fileName,
            mimeType,
            category: parsed.category,
          }),
        };
      },
      onUploadCompleted: async ({ blob, tokenPayload }) => {
        const payload = uploadTokenPayloadSchema.parse(
          JSON.parse(tokenPayload ?? "{}"),
        );

        const { documentId, created } = await finalizeDocumentUpload({
          userId: payload.userId,
          patientId: payload.patientId,
          blobUrl: blob.url,
          blobPathname: blob.pathname,
          fileName: payload.fileName,
          mimeType: payload.mimeType,
          category: payload.category,
        });

        await notifyDocumentUploadSlack({
          userId: payload.userId,
          patientId: payload.patientId,
          documentId,
          fileName: payload.fileName,
          category: payload.category,
          mimeType: payload.mimeType,
          blobUrl: blob.url,
          created,
        });
      },
    });

    return NextResponse.json(result);
  } catch (error) {
    if (error instanceof UnauthorizedError) {
      return NextResponse.json({ error: error.message }, { status: 401 });
    }

    if (error instanceof NotFoundError) {
      return NextResponse.json({ error: error.message }, { status: 404 });
    }

    if (error instanceof ZodError) {
      return NextResponse.json(
        { error: "Invalid upload metadata. Check file type and patient." },
        { status: 400 },
      );
    }

    if (error instanceof Error) {
      const message = error.message;

      if (message.includes("BLOB_READ_WRITE_TOKEN") || message.includes("Invalid `token`")) {
        return NextResponse.json(
          { error: getBlobTokenErrorMessage() },
          { status: 503 },
        );
      }

      return NextResponse.json({ error: message }, { status: 400 });
    }

    return NextResponse.json(
      { error: "Upload could not be processed." },
      { status: 400 },
    );
  }
}
