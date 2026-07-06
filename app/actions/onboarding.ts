"use server";

import { revalidatePath, revalidateTag } from "next/cache";

import type { ActionResult } from "@/lib/actions/types";
import { requireUserId, requireSession } from "@/lib/auth/session";
import { isOnboardingComplete } from "@/lib/auth/onboarding";
import { insertPatient } from "@/lib/db/queries/patients";
import {
  completeOnboarding as markOnboardingComplete,
  upsertProfile,
} from "@/lib/db/queries/profiles";
import { toActionError } from "@/lib/errors";
import {
  parseOnboardingFormData,
  resolveSpecialtyValue,
} from "@/lib/validations/onboarding";

export async function completeOnboarding(
  _prev: ActionResult<{ redirectTo: string }> | undefined,
  formData: FormData,
): Promise<ActionResult<{ redirectTo: string }>> {
  try {
    const userId = await requireUserId();
    const session = await requireSession();

    if (await isOnboardingComplete(userId)) {
      return { success: true, data: { redirectTo: "/dashboard" } };
    }

    const data = parseOnboardingFormData(formData);
    const specialty = resolveSpecialtyValue(data);

    await upsertProfile(userId, {
      firstName: data.accountFirstName,
      lastName: data.accountLastName,
      email: session.user.email ?? null,
    });

    const patientId = await insertPatient(userId, {
      firstName: data.patientFirstName,
      lastName: data.patientLastName,
      dateOfBirth: data.dateOfBirth ?? null,
      medicalRecordNumber: data.medicalRecordNumber ?? null,
      relationship: data.relationship,
      healthcareSpecialty: specialty,
      healthcareLocation: data.healthcareLocation,
      city: data.city,
      state: data.state,
      country: data.country,
      healthQuarter: data.healthQuarter,
      additionalNotes: data.additionalNotes ?? null,
    });

    await markOnboardingComplete(userId);

    revalidateTag("patients", "max");
    revalidatePath("/dashboard");
    revalidatePath("/dashboard/patients");

    return {
      success: true,
      data: { redirectTo: `/dashboard/patients/${patientId}` },
    };
  } catch (error) {
    return toActionError(error);
  }
}
