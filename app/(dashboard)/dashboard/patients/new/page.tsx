import { redirect } from "next/navigation";

export default function NewPatientPage() {
  redirect("/dashboard/patients");
}
