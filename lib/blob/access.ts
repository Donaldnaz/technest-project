import "server-only";

import { getDownloadUrl } from "@vercel/blob";

export function getSignedDocumentUrl(blobUrl: string): string {
  return getDownloadUrl(blobUrl);
}
