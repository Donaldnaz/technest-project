"use client";

import { OrganizationAssistant as PackageAssistant } from "@icare/organization-assistant/client";
import { toast } from "sonner";

import { askOrganizationAssistant } from "@/app/actions/assistant";

type OrganizationAssistantHostProps = {
  /** Raise FAB above dashboard mobile bottom nav. */
  clearBottomNav?: boolean;
};

/**
 * App shell for the standalone @icare/organization-assistant package.
 * Wires the package server action and Sonner toasts into the host app.
 */
export function OrganizationAssistant({
  clearBottomNav = false,
}: OrganizationAssistantHostProps = {}) {
  return (
    <PackageAssistant
      askAssistant={askOrganizationAssistant}
      onError={(message) => toast.error(message)}
      clearBottomNav={clearBottomNav}
    />
  );
}
