import { NextResponse } from "next/server";

import { getSignedDocumentUrl } from "@/lib/blob/access";
import { getDocumentById } from "@/lib/db/queries/documents";
import { getOptionalSession } from "@/lib/auth/session";

export async function GET(
  _request: Request,
  context: { params: Promise<{ id: string }> },
) {
  const session = await getOptionalSession();
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await context.params;
  const document = await getDocumentById(session.user.id, id);

  if (!document) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  return NextResponse.json({
    url: getSignedDocumentUrl(document.blobUrl),
    fileName: document.fileName,
    mimeType: document.mimeType,
  });
}
