import { selectClassName } from "@/components/ui/native-select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  CALIFORNIA_CITY_SUGGESTIONS,
  CALIFORNIA_HEALTH_QUARTERS,
  DEFAULT_COUNTRY,
  DEFAULT_STATE,
} from "@/lib/constants/california-locations";
import { patientOnboardingCopy } from "@/lib/copy/patient/onboarding";
import { cn } from "@/lib/utils";

type LocationFieldsProps = {
  errors?: Partial<
    Record<
      | "healthcareLocation"
      | "city"
      | "healthQuarter",
      string
    >
  >;
  defaults?: Partial<{
    healthcareLocation: string;
    city: string;
    healthQuarter: string;
  }>;
  idPrefix?: string;
  inputClassName?: string;
  selectClassName?: string;
};

export function LocationFields({
  errors,
  defaults,
  idPrefix = "location",
  inputClassName,
  selectClassName: selectClassNameOverride,
}: LocationFieldsProps) {
  const locationId = `${idPrefix}HealthcareLocation`;
  const cityId = `${idPrefix}City`;
  const quarterId = `${idPrefix}HealthQuarter`;

  return (
    <fieldset className="grid gap-4">
      <legend className="font-heading text-xl font-semibold">
        {patientOnboardingCopy.fields.location.sectionTitle}
      </legend>
      <p className="text-sm text-muted-foreground">
        {patientOnboardingCopy.fields.location.sectionDescription}
      </p>

      <div className="mt-2 grid gap-4">
      <div className="grid gap-2">
        <Label htmlFor={locationId}>{patientOnboardingCopy.fields.location.site}</Label>
        <Input
          id={locationId}
          name="healthcareLocation"
          className={cn("rounded-xl", inputClassName)}
          placeholder={patientOnboardingCopy.fields.location.sitePlaceholder}
          defaultValue={defaults?.healthcareLocation}
          aria-invalid={Boolean(errors?.healthcareLocation)}
        />
        {errors?.healthcareLocation && (
          <p className="text-sm text-destructive" role="alert">
            {errors.healthcareLocation}
          </p>
        )}
      </div>

      <div className="grid gap-2">
        <Label htmlFor={cityId}>{patientOnboardingCopy.fields.location.city}</Label>
        <Input
          id={cityId}
          name="city"
          className={cn("rounded-xl", inputClassName)}
          list={`${idPrefix}-city-suggestions`}
          placeholder={patientOnboardingCopy.fields.location.cityPlaceholder}
          defaultValue={defaults?.city}
          aria-invalid={Boolean(errors?.city)}
        />
        <datalist id={`${idPrefix}-city-suggestions`}>
          {CALIFORNIA_CITY_SUGGESTIONS.map((city) => (
            <option key={city} value={city} />
          ))}
        </datalist>
        {errors?.city && (
          <p className="text-sm text-destructive" role="alert">
            {errors.city}
          </p>
        )}
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="grid gap-2">
          <Label htmlFor={`${idPrefix}State`}>{patientOnboardingCopy.fields.location.state}</Label>
          <Input
            id={`${idPrefix}State`}
            name="state"
            className={cn("rounded-xl bg-muted/40", inputClassName)}
            value={DEFAULT_STATE}
            readOnly
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor={`${idPrefix}Country`}>{patientOnboardingCopy.fields.location.country}</Label>
          <Input
            id={`${idPrefix}Country`}
            name="country"
            className={cn("rounded-xl bg-muted/40", inputClassName)}
            value={DEFAULT_COUNTRY}
            readOnly
          />
        </div>
      </div>

      <div className="grid gap-2">
        <Label htmlFor={quarterId}>{patientOnboardingCopy.fields.location.region}</Label>
        <select
          id={quarterId}
          name="healthQuarter"
          className={cn(
            selectClassNameOverride ?? selectClassName,
            errors?.healthQuarter && "border-destructive",
          )}
          defaultValue={defaults?.healthQuarter ?? ""}
          aria-invalid={Boolean(errors?.healthQuarter)}
        >
          <option value="" disabled>
            {patientOnboardingCopy.fields.location.regionPlaceholder}
          </option>
          {CALIFORNIA_HEALTH_QUARTERS.map((quarter) => (
            <option key={quarter} value={quarter}>
              {quarter}
            </option>
          ))}
        </select>
        {errors?.healthQuarter && (
          <p className="text-sm text-destructive" role="alert">
            {errors.healthQuarter}
          </p>
        )}
      </div>
      </div>
    </fieldset>
  );
}
