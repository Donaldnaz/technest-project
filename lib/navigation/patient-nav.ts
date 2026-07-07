import { profilePath } from "@/lib/routes/profile";

export const PATIENT_TABS = [
  "overview",
  "documents",
  "upload",
  "share",
  "timeline",
] as const;

export type PatientTab = (typeof PATIENT_TABS)[number];

export function patientRecordsHref(profileId: string): string {
  return profilePath(profileId);
}

export function patientTabHref(profileId: string, tab: PatientTab): string {
  return `${profilePath(profileId)}?tab=${tab}`;
}

export function getInitialPatientTab(documentCount: number): PatientTab {
  return documentCount === 0 ? "upload" : "overview";
}

export function resolvePatientTab(
  tabParam: string | null,
  documentCount: number,
): PatientTab {
  if (tabParam && PATIENT_TABS.includes(tabParam as PatientTab)) {
    return tabParam as PatientTab;
  }
  return getInitialPatientTab(documentCount);
}

export function isPatientRoute(pathname: string, profileId?: string): boolean {
  if (!profileId) return false;
  return pathname.startsWith(`/dashboard/patients/${profileId}`);
}

export function isPatientRecordsNavActive(
  pathname: string,
  profileId: string | undefined,
): boolean {
  return isPatientRoute(pathname, profileId);
}

export function isDashboardHomeActive(pathname: string): boolean {
  return pathname === "/dashboard";
}
