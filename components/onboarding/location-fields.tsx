"use client";

import { useMemo, useState } from "react";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { patientOnboardingCopy } from "@/lib/copy/patient/onboarding";
import {
  SUPPORTED_COUNTRIES,
  getCareRegions,
  getCitySuggestions,
  getSubdivisionLabel,
  getSubdivisions,
  type SupportedCountry,
} from "@/lib/constants/north-america-locations";
import { cn } from "@/lib/utils";

type LocationFieldsProps = {
  errors?: Partial<
    Record<
      | "healthcareLocation"
      | "city"
      | "state"
      | "country"
      | "healthQuarter",
      string
    >
  >;
  defaults?: Partial<{
    healthcareLocation: string;
    city: string;
    state: string;
    country: SupportedCountry;
    healthQuarter: string;
  }>;
  idPrefix?: string;
  inputClassName?: string;
  selectClassName?: string;
};

function RequiredMark() {
  return (
    <span className="text-destructive" aria-hidden>
      {" "}
      *
    </span>
  );
}

export function LocationFields({
  errors,
  defaults,
  idPrefix = "location",
  inputClassName,
  selectClassName,
}: LocationFieldsProps) {
  const copy = patientOnboardingCopy.fields.location;
  const [country, setCountry] = useState<SupportedCountry>(
    defaults?.country ?? "United States",
  );
  const [subdivision, setSubdivision] = useState(defaults?.state ?? "");

  const locationId = `${idPrefix}HealthcareLocation`;
  const cityId = `${idPrefix}City`;
  const countryId = `${idPrefix}Country`;
  const stateId = `${idPrefix}State`;
  const regionId = `${idPrefix}HealthQuarter`;
  const regionHintId = `${idPrefix}-region-hint`;

  const subdivisions = useMemo(() => getSubdivisions(country), [country]);
  const careRegions = useMemo(() => getCareRegions(country), [country]);
  const citySuggestions = useMemo(
    () => getCitySuggestions(country, subdivision),
    [country, subdivision],
  );
  const subdivisionLabel = getSubdivisionLabel(country);

  function handleCountryChange(nextCountry: SupportedCountry) {
    setCountry(nextCountry);
    setSubdivision("");
  }

  return (
    <div className="grid gap-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <div className="grid gap-2">
          <Label htmlFor={countryId}>
            {copy.country}
            <RequiredMark />
          </Label>
          <select
            id={countryId}
            name="country"
            required
            autoComplete="country-name"
            className={cn(
              selectClassName,
              errors?.country && "border-destructive",
            )}
            value={country}
            onChange={(event) =>
              handleCountryChange(event.target.value as SupportedCountry)
            }
            aria-invalid={Boolean(errors?.country)}
            aria-errormessage={
              errors?.country ? `${countryId}-error` : undefined
            }
          >
            <option value="">{copy.countryPlaceholder}</option>
            {SUPPORTED_COUNTRIES.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
          {errors?.country ? (
            <p id={`${countryId}-error`} className="text-sm text-destructive" role="alert">
              {errors.country}
            </p>
          ) : null}
        </div>

        <div className="grid gap-2">
          <Label htmlFor={stateId}>
            {subdivisionLabel}
            <RequiredMark />
          </Label>
          <select
            id={stateId}
            name="state"
            required
            autoComplete="address-level1"
            className={cn(
              selectClassName,
              errors?.state && "border-destructive",
            )}
            value={subdivision}
            onChange={(event) => setSubdivision(event.target.value)}
            aria-invalid={Boolean(errors?.state)}
            aria-errormessage={
              errors?.state ? `${stateId}-error` : undefined
            }
          >
            <option value="">{copy.subdivisionPlaceholder}</option>
            {subdivisions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
          {errors?.state ? (
            <p id={`${stateId}-error`} className="text-sm text-destructive" role="alert">
              {errors.state}
            </p>
          ) : null}
        </div>
      </div>

      <div className="grid gap-2">
        <Label htmlFor={locationId}>
          {copy.site}
          <RequiredMark />
        </Label>
        <Input
          id={locationId}
          name="healthcareLocation"
          required
          autoComplete="organization"
          className={cn(inputClassName)}
          placeholder={copy.sitePlaceholder}
          defaultValue={defaults?.healthcareLocation}
          aria-invalid={Boolean(errors?.healthcareLocation)}
          aria-errormessage={
            errors?.healthcareLocation ? `${locationId}-error` : undefined
          }
        />
        {errors?.healthcareLocation ? (
          <p id={`${locationId}-error`} className="text-sm text-destructive" role="alert">
            {errors.healthcareLocation}
          </p>
        ) : null}
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div className="grid gap-2">
          <Label htmlFor={cityId}>
            {copy.city}
            <RequiredMark />
          </Label>
          <Input
            id={cityId}
            name="city"
            required
            autoComplete="address-level2"
            className={cn(inputClassName)}
            list={`${idPrefix}-city-suggestions`}
            placeholder={copy.cityPlaceholder}
            defaultValue={defaults?.city}
            aria-invalid={Boolean(errors?.city)}
            aria-errormessage={errors?.city ? `${cityId}-error` : undefined}
          />
          {citySuggestions.length > 0 ? (
            <datalist id={`${idPrefix}-city-suggestions`}>
              {citySuggestions.map((city) => (
                <option key={city} value={city} />
              ))}
            </datalist>
          ) : null}
          {errors?.city ? (
            <p id={`${cityId}-error`} className="text-sm text-destructive" role="alert">
              {errors.city}
            </p>
          ) : null}
        </div>

        <div className="grid gap-2">
          <Label htmlFor={regionId}>
            {copy.region}
            <RequiredMark />
          </Label>
          <select
            id={regionId}
            name="healthQuarter"
            key={`${country}-region`}
            required
            className={cn(
              selectClassName,
              errors?.healthQuarter && "border-destructive",
            )}
            defaultValue={defaults?.healthQuarter ?? ""}
            aria-describedby={regionHintId}
            aria-invalid={Boolean(errors?.healthQuarter)}
            aria-errormessage={
              errors?.healthQuarter ? `${regionId}-error` : undefined
            }
          >
            <option value="">{copy.regionPlaceholder}</option>
            {careRegions.map((region) => (
              <option key={region} value={region}>
                {region}
              </option>
            ))}
          </select>
          <p id={regionHintId} className="text-xs leading-relaxed text-muted-foreground">
            {copy.regionHint}
          </p>
          {errors?.healthQuarter ? (
            <p id={`${regionId}-error`} className="text-sm text-destructive" role="alert">
              {errors.healthQuarter}
            </p>
          ) : null}
        </div>
      </div>
    </div>
  );
}
