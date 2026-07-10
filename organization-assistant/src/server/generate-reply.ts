import { contactEmail } from "../copy";
import { generateTextWithGeminiFallback } from "../gemini/gemini-fallback";
import { isGeminiConfigured } from "../env";
import { ORGANIZATION_KNOWLEDGE } from "../knowledge";
import type { AssistantMessage } from "../types";

const SYSTEM_PROMPT = `You are the iCare organization assistant — a direct, helpful guide on the patient upload portal.

Answer questions about iCare and how the platform works. Use ONLY the reference below. If something is not covered, say you do not have that information and suggest contacting ${contactEmail}.

Response format (always follow):
1. Start with ONE sentence that directly answers the question.
2. Add a short bullet or numbered list for steps or key details (max 4 items).
3. End with ONE optional line only when useful: a portal path (/dashboard, /account/settings) or ${contactEmail}.

Length limits:
- Simple questions: 80–120 words max.
- How-to questions: 150 words max.
- Do not write long paragraphs.

Style rules:
- Plain language, friendly but efficient.
- No filler ("Great question", "I'd be happy to help", repeating the question).
- Do not restate the full mission unless the user asks "What is iCare?"
- Match the tone and brevity of the "Common questions" examples in the reference.

Safety rules:
- Never provide medical advice, diagnosis, or treatment recommendations.
- Never claim to access the user's medical records or account data.
- For upload or account issues, point to My records, Upload records, or Settings → Password.
- If asked about features not in the reference, say they are not documented on the website.

## Website reference
${ORGANIZATION_KNOWLEDGE}`;

function getAssistantFailureReply(error: unknown): string {
  const message = error instanceof Error ? error.message : String(error);
  const normalized = message.toLowerCase();

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
