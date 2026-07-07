import { notFound } from "next/navigation";
import type { Metadata } from "next";

import { PatientWorkspace } from "@/components/dashboard/patient-workspace";
import { requireSession } from "@/lib/auth/session";
import {
  countDocumentsForPatient,
  listDocumentsForPatient,
} from "@/lib/db/queries/documents";
import { getPatientById } from "@/lib/db/queries/patients";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const session = await requireSession();
  const userId = session.user.id;
  const patient = await getPatientById(userId, id);

  if (!patient) {
    return { title: "Profile not found" };
  }

  return {
    title: `${patient.firstName} ${patient.lastName}`,
  };
}

export default async function PatientDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const session = await requireSession();
  const userId = session.user.id;
  const patient = await getPatientById(userId, id);

  if (!patient) {
    notFound();
  }

  const [documents, documentCount] = await Promise.all([
    listDocumentsForPatient(userId, id),
    countDocumentsForPatient(userId, id),
  ]);

  return (
    <PatientWorkspace
      patient={patient}
      documents={documents}
      documentCount={documentCount}
      userName={session.user.name}
    />
  );
}
