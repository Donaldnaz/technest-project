import mammoth from "mammoth";

import { DOCX_MIME_TYPE } from "./constants";

export async function buildDocumentContent(
  buffer: Buffer,
  mimeType: string,
  fileName: string,
): Promise<
  | { type: "file"; data: Buffer; mediaType: string }
  | { type: "text"; text: string }
> {
  if (mimeType === DOCX_MIME_TYPE) {
    const result = await mammoth.extractRawText({ buffer });
    return {
      type: "text",
      text: `Document file name: "${fileName}"\n\n${result.value}`,
    };
  }

  const mediaType =
    mimeType === "application/pdf" ? "application/pdf" : mimeType;

  return { type: "file", data: buffer, mediaType };
}
