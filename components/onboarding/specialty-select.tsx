"use client";

import { useState } from "react";

import { selectClassName } from "@/components/ui/native-select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { patientOnboardingCopy } from "@/lib/copy/patient/onboarding";
import {
  HEALTHCARE_SPECIALTIES,
  OTHER_SPECIALTY,
} from "@/lib/constants/specialties";
import { cn } from "@/lib/utils";

function RequiredIndicator() {
  return (
    <>
      <span className="text-destructive" aria-hidden="true">
        *
      </span>
      <span className="sr-only"> (required)</span>
    </>
  );
}

type SpecialtySelectProps = {
  specialtyError?: string;
  customSpecialtyError?: string;
  defaultSpecialty?: string;
  defaultCustomSpecialty?: string;
  idPrefix?: string;
  inputClassName?: string;
  selectClassName?: string;
};

export function SpecialtySelect({
  specialtyError,
  customSpecialtyError,
  defaultSpecialty,
  defaultCustomSpecialty,
  idPrefix = "healthcare",
  inputClassName,
  selectClassName: selectClassNameOverride,
}: SpecialtySelectProps) {
  const copy = patientOnboardingCopy.fields.specialty;
  const specialtyId = `${idPrefix}Specialty`;
  const customId = `${idPrefix}CustomSpecialty`;
  const [selected, setSelected] = useState(
    defaultSpecialty &&
      HEALTHCARE_SPECIALTIES.includes(
        defaultSpecialty as (typeof HEALTHCARE_SPECIALTIES)[number],
      )
      ? defaultSpecialty
      : defaultSpecialty
        ? OTHER_SPECIALTY
        : "",
  );

  const showCustom =
    selected === OTHER_SPECIALTY ||
    (defaultCustomSpecialty != null && defaultCustomSpecialty !== "");

  return (
    <div className="grid gap-4">
      <div className="grid gap-2">
        <Label htmlFor={specialtyId}>
          {copy.label}
          <RequiredIndicator />
        </Label>
        <select
          id={specialtyId}
          name="healthcareSpecialty"
          className={cn(
            selectClassNameOverride ?? selectClassName,
            specialtyError && "border-destructive",
          )}
          value={selected}
          onChange={(event) => setSelected(event.target.value)}
          required
          aria-invalid={Boolean(specialtyError)}
        >
          <option value="">{copy.placeholder}</option>
          {HEALTHCARE_SPECIALTIES.map((specialty) => (
            <option key={specialty} value={specialty}>
              {specialty}
            </option>
          ))}
        </select>
        {specialtyError ? (
          <p id={`${specialtyId}-error`} className="text-sm text-destructive" role="alert">
            {specialtyError}
          </p>
        ) : null}
      </div>

      {(showCustom || selected === OTHER_SPECIALTY) && (
        <div className="grid gap-2">
          <Label htmlFor={customId}>
            {copy.other}
            <RequiredIndicator />
          </Label>
          <Input
            id={customId}
            name="customSpecialty"
            className={cn("rounded-xl", inputClassName)}
            defaultValue={
              defaultCustomSpecialty ??
              (defaultSpecialty &&
              !HEALTHCARE_SPECIALTIES.includes(
                defaultSpecialty as (typeof HEALTHCARE_SPECIALTIES)[number],
              )
                ? defaultSpecialty
                : undefined)
            }
            required
            aria-invalid={Boolean(customSpecialtyError)}
          />
          {customSpecialtyError && (
            <p className="text-sm text-destructive" role="alert">
              {customSpecialtyError}
            </p>
          )}
        </div>
      )}
    </div>
  );
}
