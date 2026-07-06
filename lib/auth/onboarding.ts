import "server-only";

import { getProfileByUserId } from "@/lib/db/queries/profiles";

export async function isOnboardingComplete(userId: string): Promise<boolean> {
  const profile = await getProfileByUserId(userId);
  return profile?.onboardingCompletedAt != null;
}
