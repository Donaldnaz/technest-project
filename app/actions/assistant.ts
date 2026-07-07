"use server";

import { z } from "zod";

import type { ActionResult } from "@/lib/actions/types";
import {
  generateOrganizationAssistantReply,
  type AssistantMessage,
} from "@/lib/ai/organization-assistant";
import { toActionError } from "@/lib/errors";

const messageSchema = z.object({
  role: z.enum(["user", "assistant"]),
  content: z.string().trim().min(1).max(2000),
});

const askAssistantSchema = z.object({
  messages: z.array(messageSchema).min(1).max(20),
});

export async function askOrganizationAssistant(
  input: unknown,
): Promise<ActionResult<{ reply: string }>> {
  try {
    const { messages } = askAssistantSchema.parse(input);

    const lastMessage = messages.at(-1);
    if (!lastMessage || lastMessage.role !== "user") {
      return { success: false, error: "Send a message to get a reply." };
    }

    const reply = await generateOrganizationAssistantReply(
      messages as AssistantMessage[],
    );

    return { success: true, data: { reply } };
  } catch (error) {
    return toActionError(error);
  }
}
