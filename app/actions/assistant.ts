"use server";

import { z } from "zod";

import type { ActionResult } from "@/lib/actions/types";
import {
  generateOrganizationAssistantReply,
  type AssistantMessage,
} from "@/lib/ai/organization-assistant";
import { requireUserId } from "@/lib/auth/session";
import { toActionError } from "@/lib/errors";

const messageSchema = z.object({
  role: z.enum(["user", "assistant"]),
  content: z.string().trim().min(1).max(2000),
});

const askAssistantSchema = z.object({
  messages: z.array(messageSchema).min(1).max(20),
});

async function generateAssistantReplyFromInput(
  input: unknown,
): Promise<ActionResult<{ reply: string }>> {
  const { messages } = askAssistantSchema.parse(input);

  const lastMessage = messages.at(-1);
  if (!lastMessage || lastMessage.role !== "user") {
    return { success: false, error: "Send a message to get a reply." };
  }

  const reply = await generateOrganizationAssistantReply(
    messages as AssistantMessage[],
  );

  return { success: true, data: { reply } };
}

export async function askOrganizationAssistant(
  input: unknown,
): Promise<ActionResult<{ reply: string }>> {
  try {
    await requireUserId();
    return await generateAssistantReplyFromInput(input);
  } catch (error) {
    return toActionError(error);
  }
}

export async function askPublicOrganizationAssistant(
  input: unknown,
): Promise<ActionResult<{ reply: string }>> {
  try {
    return await generateAssistantReplyFromInput(input);
  } catch (error) {
    return toActionError(error);
  }
}
