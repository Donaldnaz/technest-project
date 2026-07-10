/**
 * Public client + shared exports for @icare/organization-assistant.
 *
 * Server action / reply generation: import from
 * `@icare/organization-assistant/server` (do not pull into client bundles).
 */
export { OrganizationAssistant } from "./client/OrganizationAssistant";
export type { OrganizationAssistantProps } from "./client/OrganizationAssistant";

export {
  ORGANIZATION_KNOWLEDGE,
  ASSISTANT_SUGGESTED_QUESTIONS,
} from "./knowledge";
export { assistantCopy, contactEmail, contactPhone } from "./copy";
export type { ActionResult, AssistantMessage } from "./types";
