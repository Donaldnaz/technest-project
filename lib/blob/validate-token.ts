/**
 * Validates that a Vercel Blob read-write token has the expected shape.
 * Token format: vercel_blob_rw_<storeId>_<secret>
 */
export function isBlobTokenConfigured(token: string | undefined): boolean {
  if (!token?.trim()) return false;

  const parts = token.trim().split("_");
  return (
    parts.length >= 5 &&
    parts[0] === "vercel" &&
    parts[1] === "blob" &&
    parts[2] === "rw" &&
    parts[3].length > 0
  );
}

export function getBlobTokenErrorMessage(): string {
  return "Upload storage token is invalid. Set a valid BLOB_READ_WRITE_TOKEN from your Vercel Blob store (starts with vercel_blob_rw_) and restart the dev server.";
}
