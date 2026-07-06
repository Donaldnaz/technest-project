import "server-only";

import { generateText } from "ai";
import { google } from "@ai-sdk/google";

import { ORGANIZATION_KNOWLEDGE } from "@/lib/ai/organization-knowledge";
import { contactEmail } from "@/lib/landing/navigation";

export type AssistantMessage = {
  role: "user" | "assistant";
  content: string;
};

const SYSTEM_PROMPT = `You are the iCare organization assistant — a warm, concise helper on the patient upload portal.

Answer questions about iCare as an organization and how the platform works. Use ONLY the reference below from the iCare website. If something is not covered, say you do not have that information and suggest contacting ${contactEmail}.

Rules:
- Be friendly, plain-language, and brief (2–4 short paragraphs max unless listing steps).
- Never provide medical advice, diagnosis, or treatment recommendations.
- Never claim to access the user's medical records or account data.
- For upload or account issues, point users to the relevant part of the portal (My records, Upload records, Settings → Password).
- If asked about features not in the reference, say they are not documented on the website.

## Website reference
${ORGANIZATION_KNOWLEDGE}`;

export async function generateOrganizationAssistantReply(
  messages: AssistantMessage[],
): Promise<string> {
  if (!process.env.GEMINI_API_KEY) {
    return `The iCare assistant is not available right now. Please try again later or contact ${contactEmail} for help.`;
  }

  const { text } = await generateText({
    model: google("gemini-2.0-flash"),
    system: SYSTEM_PROMPT,
    messages: messages.map((message) => ({
      role: message.role,
      content: message.content,
    })),
  });

  return text.trim() || "I could not generate a response. Please try again.";
}
