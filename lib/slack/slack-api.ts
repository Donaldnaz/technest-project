import "server-only";

type SlackUploadedFile = {
  id?: string;
  permalink?: string;
};

export type SlackApiResponse = {
  ok: boolean;
  error?: string;
  upload_url?: string;
  file_id?: string;
  files?: SlackUploadedFile[];
  file?: SlackUploadedFile;
};

function encodeSlackFormBody(body: Record<string, unknown>): string {
  const params = new URLSearchParams();

  for (const [key, value] of Object.entries(body)) {
    if (value === undefined || value === null) continue;

    if (typeof value === "object") {
      params.set(key, JSON.stringify(value));
      continue;
    }

    params.set(key, String(value));
  }

  return params.toString();
}

export async function callSlackApi(
  token: string,
  method: string,
  body: Record<string, unknown>,
): Promise<SlackApiResponse> {
  const response = await fetch(`https://slack.com/api/${method}`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: encodeSlackFormBody(body),
  });

  return (await response.json()) as SlackApiResponse;
}

export async function getSlackFilePermalink(
  token: string,
  fileId: string,
): Promise<string | undefined> {
  const result = await callSlackApi(token, "files.info", { file: fileId });
  if (!result.ok) return undefined;
  return result.file?.permalink;
}
