import { redirect } from "next/navigation";

import { requireUserId } from "@/lib/auth/session";
import { listRecentPatients } from "@/lib/db/queries/patients";

export const dynamic = "force-dynamic";

export default async function PatientsPage() {
  const userId = await requireUserId();
  const [profile] = await listRecentPatients(userId, 1);

  if (profile) {
    redirect(`/dashboard/patients/${profile.id}`);
  }

  redirect("/dashboard");
}
