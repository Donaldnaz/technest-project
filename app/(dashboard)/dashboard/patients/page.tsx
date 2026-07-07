import { redirect } from "next/navigation";

import { requireUserId } from "@/lib/auth/session";
import { listRecentPatients } from "@/lib/db/queries/patients";
import { patientRecordsHref } from "@/lib/navigation/patient-nav";

export const dynamic = "force-dynamic";

export default async function PatientsPage() {
  const userId = await requireUserId();
  const [profile] = await listRecentPatients(userId, 1);

  if (profile) {
    redirect(patientRecordsHref(profile.id));
  }

  redirect("/dashboard");
}
