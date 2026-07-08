"use client";

import Link from "next/link";
import { useActionState, useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { useRouter } from "next/navigation";
import {
  HeartPulse,
  MapPin,
  ShieldCheck,
  UserRound,
  type LucideIcon,
} from "lucide-react";

import { completeOnboarding } from "@/app/actions/onboarding";
import { LocationFields } from "@/components/onboarding/location-fields";
import { SpecialtySelect } from "@/components/onboarding/specialty-select";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { initialActionState } from "@/lib/actions/types";
import {
  onboardingFieldLabels,
  onboardingFieldSectionMap,
  onboardingSectionIds,
  patientOnboardingCopy,
} from "@/lib/copy/patient/onboarding";
import { focusRingClassName } from "@/lib/landing/nav-link-styles";
import { cn } from "@/lib/utils";

type OnboardingFormProps = {
  defaultAccountFirstName?: string;
  defaultAccountLastName?: string;
};

const inputClassName = "h-11 rounded-xl";
const selectClassName =
  "h-11 w-full min-w-0 rounded-xl border border-input bg-transparent px-3 py-2 text-base transition-colors outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 md:text-sm dark:bg-input/30";

type SectionCardProps = {
  id: string;
  step: string;
  icon: LucideIcon;
  title: string;
  description: string;
  children: ReactNode;
};

function SectionCard({
  id,
  step,
  icon: Icon,
  title,
  description,
  children,
}: SectionCardProps) {
  return (
    <section
      id={id}
      className="health-card scroll-mt-32 overflow-hidden rounded-3xl"
      aria-labelledby={`${id}-title`}
    >
      <div className="border-b border-border/50 bg-muted/15 px-6 py-5 md:px-8 md:py-6">
        <div className="flex items-start gap-4">
          <div
            className="flex size-11 shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-primary ring-1 ring-primary/10"
            aria-hidden
          >
            <Icon className="size-5" />
          </div>
          <div className="min-w-0 flex-1 pt-0.5">
            <p className="text-[0.6875rem] font-semibold uppercase tracking-[0.14em] text-primary">
              Step {step}
            </p>
            <h2
              id={`${id}-title`}
              className="mt-1 font-heading text-xl font-semibold tracking-tight md:text-[1.375rem]"
            >
              {title}
            </h2>
            <p className="mt-1.5 max-w-prose text-sm leading-relaxed text-muted-foreground">
              {description}
            </p>
          </div>
        </div>
      </div>
      <div className="px-6 py-6 md:px-8 md:py-7">{children}</div>
    </section>
  );
}

function FormSubsection({
  title,
  description,
  children,
  className,
}: {
  title?: string;
  description?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("grid gap-5", className)}>
      {title ? (
        <div className="space-y-1">
          <h3 className="text-sm font-semibold text-foreground">{title}</h3>
          {description ? (
            <p className="text-sm leading-relaxed text-muted-foreground">
              {description}
            </p>
          ) : null}
        </div>
      ) : null}
      {children}
    </div>
  );
}

function RequiredMark() {
  return (
    <span className="text-destructive" aria-hidden>
      {" "}
      *
    </span>
  );
}

function OptionalBadge() {
  return (
    <span className="ml-2 text-xs font-normal text-muted-foreground">
      ({patientOnboardingCopy.form.optional})
    </span>
  );
}

function FieldGroup({
  label,
  htmlFor,
  hint,
  hintId,
  error,
  errorId,
  required = false,
  optional = false,
  children,
}: {
  label: string;
  htmlFor: string;
  hint?: string;
  hintId?: string;
  error?: string;
  errorId?: string;
  required?: boolean;
  optional?: boolean;
  children: ReactNode;
}) {
  return (
    <div className="grid gap-2">
      <Label htmlFor={htmlFor}>
        {label}
        {required ? <RequiredMark /> : null}
        {optional ? <OptionalBadge /> : null}
      </Label>
      {children}
      {hint ? (
        <p id={hintId} className="text-xs leading-relaxed text-muted-foreground">
          {hint}
        </p>
      ) : null}
      {error ? (
        <p id={errorId} className="text-sm text-destructive" role="alert">
          {error}
        </p>
      ) : null}
    </div>
  );
}

function FormDivider() {
  return <div className="h-px bg-border/50" aria-hidden />;
}

function ErrorSummary({
  errors,
}: {
  errors: Record<string, string[] | undefined>;
}) {
  const items = useMemo(() => {
    return Object.entries(errors).flatMap(([field, messages]) => {
      const message = messages?.[0];
      if (!message) return [];
      const sectionId = onboardingFieldSectionMap[field];
      const label = onboardingFieldLabels[field] ?? field;
      return [{ field, message, sectionId, label }];
    });
  }, [errors]);

  if (items.length === 0) return null;

  return (
    <div
      role="alert"
      aria-labelledby="onboarding-error-summary-title"
      className="rounded-2xl border border-destructive/30 bg-destructive/5 px-5 py-4"
    >
      <p
        id="onboarding-error-summary-title"
        className="text-sm font-semibold text-destructive"
      >
        {patientOnboardingCopy.form.errorSummaryTitle}
      </p>
      <ul className="mt-3 space-y-2">
        {items.map((item) => (
          <li key={item.field} className="text-sm">
            <a
              href={item.sectionId ? `#${item.sectionId}` : undefined}
              className="text-destructive underline-offset-4 hover:underline"
            >
              <span className="font-medium">{item.label}:</span> {item.message}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function OnboardingForm({
  defaultAccountFirstName = "",
  defaultAccountLastName = "",
}: OnboardingFormProps) {
  const router = useRouter();
  const copy = patientOnboardingCopy;
  const errorSummaryRef = useRef<HTMLDivElement>(null);
  const [state, formAction, pending] = useActionState(
    completeOnboarding,
    initialActionState,
  );
  const [relationship, setRelationship] = useState<"self" | "other">("self");
  const [accountFirstName, setAccountFirstName] = useState(
    defaultAccountFirstName,
  );
  const [accountLastName, setAccountLastName] = useState(
    defaultAccountLastName,
  );
  const [consentAccuracy, setConsentAccuracy] = useState(false);
  const [consentAuthorization, setConsentAuthorization] = useState(false);

  const today = new Date().toISOString().split("T")[0];

  useEffect(() => {
    if (state.success === true && state.data.redirectTo) {
      router.push(state.data.redirectTo);
    }
  }, [state, router]);

  const serverErrors = state.success === false ? state.fieldErrors : undefined;
  const serverMessage = state.success === false ? state.error : "";

  useEffect(() => {
    if (!serverErrors || Object.keys(serverErrors).length === 0) return;

    errorSummaryRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
    errorSummaryRef.current?.focus();
  }, [serverErrors]);

  return (
    <form
      action={formAction}
      className="section-stack pb-32 md:pb-12"
      noValidate
    >
      <p className="text-sm text-muted-foreground">{copy.form.requiredLegend}</p>

      {serverErrors ? (
        <div ref={errorSummaryRef} tabIndex={-1} className="outline-none">
          <ErrorSummary errors={serverErrors} />
        </div>
      ) : null}

      <div aria-live="polite" aria-atomic="true" className="sr-only">
        {pending ? copy.submitting : ""}
      </div>

      <SectionCard
        id={onboardingSectionIds.account}
        step={copy.sections.account.step}
        icon={UserRound}
        title={copy.sections.account.title}
        description={copy.sections.account.description}
      >
        <fieldset className="grid gap-5 sm:grid-cols-2">
          <legend className="sr-only">{copy.sections.account.title}</legend>
          <FieldGroup
            label={copy.fields.firstName}
            htmlFor="accountFirstName"
            required
            error={serverErrors?.accountFirstName?.[0]}
            errorId="accountFirstName-error"
          >
            <Input
              id="accountFirstName"
              name="accountFirstName"
              autoComplete="given-name"
              required
              className={inputClassName}
              value={accountFirstName}
              onChange={(event) => setAccountFirstName(event.target.value)}
              aria-invalid={Boolean(serverErrors?.accountFirstName?.[0])}
              aria-errormessage={
                serverErrors?.accountFirstName?.[0]
                  ? "accountFirstName-error"
                  : undefined
              }
            />
          </FieldGroup>

          <FieldGroup
            label={copy.fields.lastName}
            htmlFor="accountLastName"
            required
            error={serverErrors?.accountLastName?.[0]}
            errorId="accountLastName-error"
          >
            <Input
              id="accountLastName"
              name="accountLastName"
              autoComplete="family-name"
              required
              className={inputClassName}
              value={accountLastName}
              onChange={(event) => setAccountLastName(event.target.value)}
              aria-invalid={Boolean(serverErrors?.accountLastName?.[0])}
              aria-errormessage={
                serverErrors?.accountLastName?.[0]
                  ? "accountLastName-error"
                  : undefined
              }
            />
          </FieldGroup>
        </fieldset>
      </SectionCard>

      <SectionCard
        id={onboardingSectionIds.profile}
        step={copy.sections.profile.step}
        icon={HeartPulse}
        title={copy.sections.profile.title}
        description={copy.sections.profile.description}
      >
        <div className="grid gap-8">
          <FormSubsection
            title={copy.sections.relationship.title}
            description={copy.sections.relationship.description}
          >
            <div
              className="grid gap-3 sm:grid-cols-2"
              role="radiogroup"
              aria-label={copy.sections.relationship.aria}
              aria-required="true"
            >
              {(
                [
                  {
                    value: "self" as const,
                    label: copy.sections.relationship.self,
                    hint: copy.sections.relationship.selfHint,
                  },
                  {
                    value: "other" as const,
                    label: copy.sections.relationship.other,
                    hint: copy.sections.relationship.otherHint,
                  },
                ] as const
              ).map((option) => {
                const selected = relationship === option.value;
                return (
                  <label
                    key={option.value}
                    className={cn(
                      "flex min-h-[5.5rem] cursor-pointer flex-col justify-between gap-3 rounded-2xl border p-4 motion-safe:transition-all",
                      focusRingClassName,
                      selected
                        ? "border-primary/40 bg-primary/5 shadow-sm ring-1 ring-primary/20"
                        : "border-border/60 bg-background hover:border-border hover:bg-muted/20",
                    )}
                  >
                    <input
                      type="radio"
                      name="relationship"
                      value={option.value}
                      className="sr-only"
                      checked={selected}
                      required
                      onChange={() => setRelationship(option.value)}
                    />
                    <div className="space-y-1">
                      <span className="block text-sm font-semibold">
                        {option.label}
                      </span>
                      <span className="block text-xs leading-relaxed text-muted-foreground">
                        {option.hint}
                      </span>
                    </div>
                    <span
                      className={cn(
                        "flex size-5 shrink-0 items-center justify-center self-end rounded-full border-2 motion-safe:transition-colors",
                        selected
                          ? "border-primary bg-primary"
                          : "border-border/70 bg-background",
                      )}
                      aria-hidden
                    >
                      {selected ? (
                        <span className="size-2 rounded-full bg-primary-foreground" />
                      ) : null}
                    </span>
                  </label>
                );
              })}
            </div>
          </FormSubsection>

          <FormDivider />

          <FormSubsection title={copy.sections.profile.patientDetails}>
            <div className="grid gap-5 sm:grid-cols-2">
              <FieldGroup
                label={copy.fields.firstName}
                htmlFor="patientFirstName"
                required
                error={serverErrors?.patientFirstName?.[0]}
                errorId="patientFirstName-error"
              >
                <Input
                  id="patientFirstName"
                  name="patientFirstName"
                  autoComplete="given-name"
                  required
                  className={inputClassName}
                  defaultValue={
                    relationship === "self" ? accountFirstName : undefined
                  }
                  key={`patient-first-${relationship}-${accountFirstName}`}
                  aria-invalid={Boolean(serverErrors?.patientFirstName?.[0])}
                  aria-errormessage={
                    serverErrors?.patientFirstName?.[0]
                      ? "patientFirstName-error"
                      : undefined
                  }
                />
              </FieldGroup>

              <FieldGroup
                label={copy.fields.lastName}
                htmlFor="patientLastName"
                required
                error={serverErrors?.patientLastName?.[0]}
                errorId="patientLastName-error"
              >
                <Input
                  id="patientLastName"
                  name="patientLastName"
                  autoComplete="family-name"
                  required
                  className={inputClassName}
                  defaultValue={
                    relationship === "self" ? accountLastName : undefined
                  }
                  key={`patient-last-${relationship}-${accountLastName}`}
                  aria-invalid={Boolean(serverErrors?.patientLastName?.[0])}
                  aria-errormessage={
                    serverErrors?.patientLastName?.[0]
                      ? "patientLastName-error"
                      : undefined
                  }
                />
              </FieldGroup>

              <FieldGroup
                label={copy.fields.dateOfBirth}
                htmlFor="dateOfBirth"
                required
                hint={copy.fields.dateOfBirthHint}
                hintId="dob-hint"
                error={serverErrors?.dateOfBirth?.[0]}
                errorId="dateOfBirth-error"
              >
                <Input
                  id="dateOfBirth"
                  name="dateOfBirth"
                  type="date"
                  max={today}
                  required
                  className={inputClassName}
                  aria-describedby="dob-hint"
                  aria-invalid={Boolean(serverErrors?.dateOfBirth?.[0])}
                  aria-errormessage={
                    serverErrors?.dateOfBirth?.[0]
                      ? "dateOfBirth-error"
                      : undefined
                  }
                />
              </FieldGroup>

              <FieldGroup
                label={copy.fields.mrn}
                htmlFor="medicalRecordNumber"
                required
                hint={copy.fields.mrnHint}
                hintId="mrn-hint"
                error={serverErrors?.medicalRecordNumber?.[0]}
                errorId="medicalRecordNumber-error"
              >
                <Input
                  id="medicalRecordNumber"
                  name="medicalRecordNumber"
                  autoComplete="off"
                  inputMode="text"
                  required
                  className={inputClassName}
                  aria-describedby="mrn-hint"
                  aria-invalid={Boolean(serverErrors?.medicalRecordNumber?.[0])}
                  aria-errormessage={
                    serverErrors?.medicalRecordNumber?.[0]
                      ? "medicalRecordNumber-error"
                      : undefined
                  }
                />
              </FieldGroup>
            </div>
          </FormSubsection>

          <FormDivider />

          <FormSubsection title={copy.sections.profile.careDetails}>
            <div className="grid gap-5">
              <SpecialtySelect
                idPrefix="onboarding"
                inputClassName={inputClassName}
                selectClassName={selectClassName}
                specialtyError={serverErrors?.healthcareSpecialty?.[0]}
                customSpecialtyError={serverErrors?.customSpecialty?.[0]}
              />

              <FieldGroup
                label={copy.fields.notes}
                htmlFor="additionalNotes"
                optional
                error={serverErrors?.additionalNotes?.[0]}
                errorId="additionalNotes-error"
              >
                <textarea
                  id="additionalNotes"
                  name="additionalNotes"
                  rows={4}
                  className="min-h-28 w-full rounded-xl border border-input bg-transparent px-3 py-2.5 text-base leading-relaxed transition-colors outline-none placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 md:text-sm dark:bg-input/30"
                  placeholder={copy.fields.notesPlaceholder}
                  aria-invalid={Boolean(serverErrors?.additionalNotes?.[0])}
                  aria-errormessage={
                    serverErrors?.additionalNotes?.[0]
                      ? "additionalNotes-error"
                      : undefined
                  }
                />
              </FieldGroup>
            </div>
          </FormSubsection>
        </div>
      </SectionCard>

      <SectionCard
        id={onboardingSectionIds.location}
        step={copy.sections.location.step}
        icon={MapPin}
        title={copy.sections.location.title}
        description={copy.sections.location.description}
      >
        <LocationFields
          idPrefix="onboarding"
          inputClassName={inputClassName}
          selectClassName={selectClassName}
          errors={{
            healthcareLocation: serverErrors?.healthcareLocation?.[0],
            city: serverErrors?.city?.[0],
            state: serverErrors?.state?.[0],
            country: serverErrors?.country?.[0],
            healthQuarter: serverErrors?.healthQuarter?.[0],
          }}
        />
      </SectionCard>

      <SectionCard
        id={onboardingSectionIds.consent}
        step={copy.sections.consent.step}
        icon={ShieldCheck}
        title={copy.sections.consent.title}
        description={copy.sections.consent.description}
      >
        <fieldset className="grid gap-4">
          <legend className="sr-only">{copy.sections.consent.title}</legend>

          <label
            className={cn(
              "flex cursor-pointer items-start gap-3 rounded-2xl border p-4 motion-safe:transition-colors",
              consentAccuracy
                ? "border-primary/30 bg-primary/5"
                : "border-border/60 bg-background hover:bg-muted/20",
            )}
          >
            <input
              type="checkbox"
              name="consentAccuracy"
              checked={consentAccuracy}
              onChange={(event) => setConsentAccuracy(event.target.checked)}
              aria-invalid={Boolean(serverErrors?.consentAccuracy?.[0])}
              className="mt-0.5 size-4 shrink-0 rounded border border-input accent-primary"
            />
            <span className="text-sm leading-relaxed">
              {copy.consent.accuracy}
              <RequiredMark />
            </span>
          </label>
          {serverErrors?.consentAccuracy?.[0] ? (
            <p className="text-sm text-destructive" role="alert">
              {serverErrors.consentAccuracy[0]}
            </p>
          ) : null}

          <label
            className={cn(
              "flex cursor-pointer items-start gap-3 rounded-2xl border p-4 motion-safe:transition-colors",
              consentAuthorization
                ? "border-primary/30 bg-primary/5"
                : "border-border/60 bg-background hover:bg-muted/20",
            )}
          >
            <input
              type="checkbox"
              name="consentAuthorization"
              checked={consentAuthorization}
              onChange={(event) =>
                setConsentAuthorization(event.target.checked)
              }
              aria-invalid={Boolean(serverErrors?.consentAuthorization?.[0])}
              className="mt-0.5 size-4 shrink-0 rounded border border-input accent-primary"
            />
            <span className="text-sm leading-relaxed">
              {copy.consent.authorization}
              <RequiredMark />
            </span>
          </label>
          {serverErrors?.consentAuthorization?.[0] ? (
            <p className="text-sm text-destructive" role="alert">
              {serverErrors.consentAuthorization[0]}
            </p>
          ) : null}

          <div className="rounded-xl bg-muted/25 px-4 py-3 text-xs leading-relaxed text-muted-foreground">
            <p>{copy.consent.privacyNote}</p>
            <Link
              href="/legal/privacy"
              className="mt-2 inline-flex font-medium text-primary underline-offset-4 hover:underline"
            >
              {copy.consent.privacyLink}
            </Link>
          </div>
        </fieldset>
      </SectionCard>

      {serverMessage ? (
        <p
          className="rounded-xl border border-destructive/30 bg-destructive/5 px-4 py-3 text-sm text-destructive"
          role="alert"
        >
          {serverMessage}
        </p>
      ) : null}

      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-border/60 bg-background/95 backdrop-blur-md md:static md:border-0 md:bg-transparent md:backdrop-blur-none">
        <div className="mx-auto flex max-w-3xl justify-stretch px-4 py-4 pb-safe md:justify-end md:px-6 md:py-0">
          <Button
            type="submit"
            disabled={pending}
            size="lg"
            aria-busy={pending}
            className="h-12 w-full rounded-2xl px-8 md:min-w-52 md:w-auto"
          >
            {pending ? copy.submitting : copy.submit}
          </Button>
        </div>
      </div>
    </form>
  );
}
