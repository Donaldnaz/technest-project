import { NextResponse } from "next/server";

import { getOptionalSession } from "@/lib/auth/session";
import { agentDebugLog } from "@/lib/debug/agent-log";
import { requestDocumentSummaryGeneration } from "@/lib/documents/generate-summary";

export async function POST(
  _request: Request,
  context: { params: Promise<{ id: string }> },
) {
  try {
    const session = await getOptionalSession();
    // #region agent log
    agentDebugLog({
      hypothesisId: "B",
      location: "generate-summary/route.ts:POST",
      message: "generate-summary route entry",
      data: { hasUser: Boolean(session?.user?.id) },
      runId: "post-fix",
    });
    // #endregion

    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await context.params;
    const result = await requestDocumentSummaryGeneration(session.user.id, id);

    // #region agent log
    agentDebugLog({
      hypothesisId: "C",
      location: "generate-summary/route.ts:result",
      message: "generate-summary route result",
      data: {
        documentId: id,
        ok: result.ok,
        status: result.ok ? 200 : result.status,
        error: result.ok ? null : result.error,
      },
      runId: "post-fix",
    });
    // #endregion

    if (!result.ok) {
      return NextResponse.json({ error: result.error }, { status: result.status });
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    // #region agent log
    agentDebugLog({
      hypothesisId: "E",
      location: "generate-summary/route.ts:catch",
      message: "generate-summary route threw",
      data: {
        error: error instanceof Error ? error.message : String(error),
      },
      runId: "post-fix",
    });
    // #endregion
    return NextResponse.json(
      { error: "Could not start summary generation." },
      { status: 500 },
    );
  }
}
