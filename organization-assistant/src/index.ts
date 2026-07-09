export { OrganizationAssistant } from "./client/OrganizationAssistant";
export type { OrganizationAssistantProps } from "./client/OrganizationAssistant";

export { askOrganizationAssistant } from "./server/action";
export { generateOrganizationAssistantReply } from "./server/generate-reply";

export {
  ORGANIZATION_KNOWLEDGE,
  ASSISTANT_SUGGESTED_QUESTIONS,
} from "./knowledge";
export { assistantCopy, contactEmail, contactPhone } from "./copy";
export type { ActionResult, AssistantMessage } from "./types";
