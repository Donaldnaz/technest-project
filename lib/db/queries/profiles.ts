import "server-only";

import { eq } from "drizzle-orm";

import { db } from "@/lib/db";
import { userProfiles, type UserProfile } from "@/lib/db/schema";

export async function getProfileByUserId(
  userId: string,
): Promise<UserProfile | null> {
  const [row] = await db
    .select()
    .from(userProfiles)
    .where(eq(userProfiles.userId, userId))
    .limit(1);

  return row ?? null;
}

export async function upsertProfile(
  userId: string,
  data: Pick<UserProfile, "firstName" | "lastName"> & {
    email?: string | null;
    role?: UserProfile["role"];
  },
): Promise<void> {
  await db
    .insert(userProfiles)
    .values({
      userId,
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email ?? null,
      role: data.role ?? "patient_account",
    })
    .onConflictDoUpdate({
      target: userProfiles.userId,
      set: {
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email ?? null,
        role: data.role ?? undefined,
        updatedAt: new Date(),
      },
    });
}

export async function completeOnboarding(userId: string): Promise<void> {
  await db
    .update(userProfiles)
    .set({ onboardingCompletedAt: new Date() })
    .where(eq(userProfiles.userId, userId));
}

export async function setUserRole(
  userId: string,
  role: UserProfile["role"],
): Promise<void> {
  await db
    .update(userProfiles)
    .set({ role, updatedAt: new Date() })
    .where(eq(userProfiles.userId, userId));
}

export async function syncProfileEmail(
  userId: string,
  email: string,
): Promise<void> {
  await db
    .update(userProfiles)
    .set({ email: email.toLowerCase().trim(), updatedAt: new Date() })
    .where(eq(userProfiles.userId, userId));
}
