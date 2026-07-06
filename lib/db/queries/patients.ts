import "server-only";

import { and, desc, eq } from "drizzle-orm";

import { db } from "@/lib/db";
import { patients, type NewPatient, type Patient } from "@/lib/db/schema";

export async function listPatients(userId: string): Promise<Patient[]> {
  return db
    .select()
    .from(patients)
    .where(eq(patients.userId, userId))
    .orderBy(desc(patients.createdAt));
}

export async function getPatientById(
  userId: string,
  patientId: string,
): Promise<Patient | null> {
  const [row] = await db
    .select()
    .from(patients)
    .where(and(eq(patients.id, patientId), eq(patients.userId, userId)))
    .limit(1);

  return row ?? null;
}

export async function insertPatient(
  userId: string,
  data: Omit<NewPatient, "id" | "userId" | "createdAt" | "updatedAt">,
): Promise<string> {
  const [row] = await db
    .insert(patients)
    .values({ ...data, userId })
    .returning({ id: patients.id });

  return row.id;
}

export async function listRecentPatients(
  userId: string,
  limit = 5,
): Promise<Patient[]> {
  return db
    .select()
    .from(patients)
    .where(eq(patients.userId, userId))
    .orderBy(desc(patients.createdAt))
    .limit(limit);
}
