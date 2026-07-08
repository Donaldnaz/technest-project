import "server-only";

import { get } from "@vercel/blob";

export type PrivateBlobPayload = {
  buffer: Buffer;
  contentType: string | undefined;
};

export async function fetchPrivateBlob(
  blobUrl: string,
): Promise<PrivateBlobPayload | null> {
  const blobResult = await get(blobUrl, { access: "private" });

  if (!blobResult || blobResult.statusCode !== 200 || !blobResult.stream) {
    return null;
  }

  const buffer = Buffer.from(
    await new Response(blobResult.stream).arrayBuffer(),
  );

  return {
    buffer,
    contentType: blobResult.blob?.contentType,
  };
}
