import "server-only";

import { isGeminiConfigured } from "@/lib/ai/google-model";
import { generateTextWithGeminiFallback } from "@/lib/ai/gemini-fallback";
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

function getAssistantFailureReply(error: unknown): string {
  const message = error instanceof Error ? error.message : String(error);
  const normalized = message.toLowerCase();

  if (
    normalized.includes("high demand") ||
    normalized.includes("unavailable") ||
    normalized.includes("503")
  ) {
    return "The assistant is busy right now. Please wait a moment and try again.";
  }

  if (
    normalized.includes("prepayment credits") ||
    normalized.includes("quota") ||
    normalized.includes("resource_exhausted") ||
    normalized.includes("rate limit")
  ) {
    return `The iCare assistant is temporarily unavailable because our AI service limit was reached. Please try again later or contact ${contactEmail} for help.`;
  }

  if (
    normalized.includes("api key") ||
    normalized.includes("api_key") ||
    normalized.includes("permission denied")
  ) {
    return `The iCare assistant is not available right now. Please try again later or contact ${contactEmail} for help.`;
  }

  return `Something went wrong while generating a reply. Please try again or contact ${contactEmail} for help.`;
}

export async function generateOrganizationAssistantReply(
  messages: AssistantMessage[],
): Promise<string> {
  if (!isGeminiConfigured()) {
    return `The iCare assistant is not available right now. Please try again later or contact ${contactEmail} for help.`;
  }

  try {
    const { text } = await generateTextWithGeminiFallback({
      system: SYSTEM_PROMPT,
      messages: messages.map((message) => ({
        role: message.role,
        content: message.content,
      })),
    });

    return text.trim() || "I could not generate a response. Please try again.";
  } catch (error) {
    return getAssistantFailureReply(error);
  }
}
