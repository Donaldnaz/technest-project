"use client";

import { useActionState, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { completeOnboarding } from "@/app/actions/onboarding";
import { LocationFields } from "@/components/onboarding/location-fields";
import { SpecialtySelect } from "@/components/onboarding/specialty-select";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { initialActionState } from "@/lib/actions/types";
import { patientOnboardingCopy } from "@/lib/copy/patient/onboarding";
import { cn } from "@/lib/utils";

type OnboardingFormProps = {
  defaultAccountFirstName?: string;
  defaultAccountLastName?: string;
};

export function OnboardingForm({
  defaultAccountFirstName = "",
  defaultAccountLastName = "",
}: OnboardingFormProps) {
  const router = useRouter();
  const [state, formAction, pending] = useActionState(
    completeOnboarding,
    initialActionState,
  );
  const [relationship, setRelationship] = useState<"self" | "other">("self");

  useEffect(() => {
    if (state.success === true && state.data.redirectTo) {
      router.push(state.data.redirectTo);
    }
  }, [state, router]);
  const [accountFirstName, setAccountFirstName] = useState(
    defaultAccountFirstName,
  );
  const [accountLastName, setAccountLastName] = useState(
    defaultAccountLastName,
  );

  const serverErrors = state.success === false ? state.fieldErrors : undefined;
  const serverMessage = state.success === false ? state.error : "";

  return (
    <form action={formAction} className="grid gap-10">
      <section className="health-card rounded-3xl p-6 md:p-8">
        <h2 className="font-heading text-xl font-semibold">
          {patientOnboardingCopy.sections.account.title}
        </h2>
        <p className="mt-1 text-sm text-muted-foreground">
          {patientOnboardingCopy.sections.account.description}
        </p>

        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <div className="grid gap-2">
            <Label htmlFor="accountFirstName">{patientOnboardingCopy.fields.firstName}</Label>
            <Input
              id="accountFirstName"
              name="accountFirstName"
              autoComplete="given-name"
              className="rounded-xl"
              value={accountFirstName}
              onChange={(event) => setAccountFirstName(event.target.value)}
              aria-invalid={Boolean(serverErrors?.accountFirstName?.[0])}
            />
            {serverErrors?.accountFirstName?.[0] && (
              <p className="text-sm text-destructive" role="alert">
                {serverErrors.accountFirstName[0]}
              </p>
            )}
          </div>

          <div className="grid gap-2">
            <Label htmlFor="accountLastName">{patientOnboardingCopy.fields.lastName}</Label>
            <Input
              id="accountLastName"
              name="accountLastName"
              autoComplete="family-name"
              className="rounded-xl"
              value={accountLastName}
              onChange={(event) => setAccountLastName(event.target.value)}
              aria-invalid={Boolean(serverErrors?.accountLastName?.[0])}
            />
            {serverErrors?.accountLastName?.[0] && (
              <p className="text-sm text-destructive" role="alert">
                {serverErrors.accountLastName[0]}
              </p>
            )}
          </div>
        </div>
      </section>

      <section className="health-card rounded-3xl p-6 md:p-8">
        <h2 className="font-heading text-xl font-semibold">
          {patientOnboardingCopy.sections.profile.title}
        </h2>
        <p className="mt-1 text-sm text-muted-foreground">
          {patientOnboardingCopy.sections.profile.description}
        </p>

        <div className="mt-6 grid gap-6">
          <div className="grid gap-2">
            <span className="text-sm font-medium">
              {patientOnboardingCopy.sections.relationship.title}
            </span>
            <p className="text-xs text-muted-foreground">
              {patientOnboardingCopy.sections.relationship.description}
            </p>
            <div
              className="inline-flex rounded-2xl border border-border/60 bg-muted/40 p-1"
              role="group"
              aria-label={patientOnboardingCopy.sections.relationship.aria}
            >
              {(
                [
                  { value: "self", label: patientOnboardingCopy.sections.relationship.self },
                  { value: "other", label: patientOnboardingCopy.sections.relationship.other },
                ] as const
              ).map((option) => (
                <label
                  key={option.value}
                  className={cn(
                    "min-h-10 cursor-pointer rounded-xl px-4 py-2 text-sm font-medium transition-all",
                    relationship === option.value
                      ? "bg-primary text-primary-foreground shadow-sm"
                      : "text-muted-foreground hover:text-foreground",
                  )}
                >
                  <input
                    type="radio"
                    name="relationship"
                    value={option.value}
                    className="sr-only"
                    checked={relationship === option.value}
                    onChange={() => setRelationship(option.value)}
                  />
                  {option.label}
                </label>
              ))}
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="grid gap-2">
              <Label htmlFor="patientFirstName">{patientOnboardingCopy.fields.firstName}</Label>
              <Input
                id="patientFirstName"
                name="patientFirstName"
                autoComplete="given-name"
                className="rounded-xl"
                defaultValue={
                  relationship === "self" ? accountFirstName : undefined
                }
                key={`patient-first-${relationship}-${accountFirstName}`}
                aria-invalid={Boolean(serverErrors?.patientFirstName?.[0])}
              />
              {serverErrors?.patientFirstName?.[0] && (
                <p className="text-sm text-destructive" role="alert">
                  {serverErrors.patientFirstName[0]}
                </p>
              )}
            </div>

            <div className="grid gap-2">
              <Label htmlFor="patientLastName">{patientOnboardingCopy.fields.lastName}</Label>
              <Input
                id="patientLastName"
                name="patientLastName"
                autoComplete="family-name"
                className="rounded-xl"
                defaultValue={
                  relationship === "self" ? accountLastName : undefined
                }
                key={`patient-last-${relationship}-${accountLastName}`}
                aria-invalid={Boolean(serverErrors?.patientLastName?.[0])}
              />
              {serverErrors?.patientLastName?.[0] && (
                <p className="text-sm text-destructive" role="alert">
                  {serverErrors.patientLastName[0]}
                </p>
              )}
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="grid gap-2">
              <Label htmlFor="dateOfBirth">{patientOnboardingCopy.fields.dateOfBirth}</Label>
              <Input
                id="dateOfBirth"
                name="dateOfBirth"
                type="date"
                className="rounded-xl"
                aria-invalid={Boolean(serverErrors?.dateOfBirth?.[0])}
              />
              {serverErrors?.dateOfBirth?.[0] && (
                <p className="text-sm text-destructive" role="alert">
                  {serverErrors.dateOfBirth[0]}
                </p>
              )}
            </div>

            <div className="grid gap-2">
              <Label htmlFor="medicalRecordNumber">
                {patientOnboardingCopy.fields.mrn}
              </Label>
              <Input
                id="medicalRecordNumber"
                name="medicalRecordNumber"
                autoComplete="off"
                className="rounded-xl"
                aria-invalid={Boolean(
                  serverErrors?.medicalRecordNumber?.[0],
                )}
              />
              <p className="text-xs text-muted-foreground">
                {patientOnboardingCopy.fields.mrnHint}
              </p>
              {serverErrors?.medicalRecordNumber?.[0] && (
                <p className="text-sm text-destructive" role="alert">
                  {serverErrors.medicalRecordNumber[0]}
                </p>
              )}
            </div>
          </div>

          <SpecialtySelect
            idPrefix="onboarding"
            specialtyError={serverErrors?.healthcareSpecialty?.[0]}
            customSpecialtyError={serverErrors?.customSpecialty?.[0]}
          />

          <LocationFields
            idPrefix="onboarding"
            errors={{
              healthcareLocation: serverErrors?.healthcareLocation?.[0],
              city: serverErrors?.city?.[0],
              healthQuarter: serverErrors?.healthQuarter?.[0],
            }}
          />

          <div className="grid gap-2">
            <Label htmlFor="additionalNotes">{patientOnboardingCopy.fields.notes}</Label>
            <textarea
              id="additionalNotes"
              name="additionalNotes"
              rows={4}
              className="w-full rounded-xl border border-input bg-transparent px-3 py-2 text-base transition-colors outline-none placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 md:text-sm dark:bg-input/30"
              placeholder={patientOnboardingCopy.fields.notesPlaceholder}
            />
            {serverErrors?.additionalNotes?.[0] && (
              <p className="text-sm text-destructive" role="alert">
                {serverErrors.additionalNotes[0]}
              </p>
            )}
          </div>
        </div>
      </section>

      {serverMessage && (
        <p className="text-sm text-destructive" role="alert">
          {serverMessage}
        </p>
      )}

      <Button
        type="submit"
        disabled={pending}
        size="lg"
        className="rounded-2xl px-8"
      >
        {pending ? patientOnboardingCopy.submitting : patientOnboardingCopy.submit}
      </Button>
    </form>
  );
}
