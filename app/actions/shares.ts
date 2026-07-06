"use server";

import { revalidatePath } from "next/cache";

import type { ActionResult } from "@/lib/actions/types";
import { requireUserId } from "@/lib/auth/session";
import {
  countDocumentsForPatient,
  createCareShare,
} from "@/lib/db/queries/documents";
import { getPatientById } from "@/lib/db/queries/patients";
import { toActionError } from "@/lib/errors";
import { notifyCareShareRequest } from "@/lib/slack/notify-care-share";
import { shareWithProviderSchema } from "@/lib/validations/document";

export async function sharePatientWithProvider(
  input: unknown,
): Promise<ActionResult<{ shareId: string }>> {
  try {
    const userId = await requireUserId();
    const data = shareWithProviderSchema.parse(input);
    const patient = await getPatientById(userId, data.patientId);

    if (!patient) {
      return { success: false, error: "Patient not found." };
    }

    const shareId = await createCareShare(userId, data);
    const documentCount = await countDocumentsForPatient(
      userId,
      data.patientId,
    );

    await notifyCareShareRequest({
      shareId,
      patientId: data.patientId,
      patientFirstName: patient.firstName,
      patientLastName: patient.lastName,
      providerEmail: data.providerEmail,
      documentCount,
      message: data.message,
    });

    revalidatePath(`/dashboard/patients/${data.patientId}`);

    return {
      success: true,
      data: { shareId },
    };
  } catch (error) {
    return toActionError(error);
  }
}
