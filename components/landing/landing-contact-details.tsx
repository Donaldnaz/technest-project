import { Clock, Mail, MapPin, Phone } from "lucide-react";

import {
  contactEmail,
  contactPhone,
  headquartersAddress,
  headquartersAddressLines,
} from "@/lib/landing/navigation";
import { focusRingClassName } from "@/lib/landing/nav-link-styles";
import { cn } from "@/lib/utils";

const contactTelHref = `tel:${contactPhone.replace(/[^\d+]/g, "")}`;

type ContactFieldProps = {
  icon: typeof Phone;
  label: string;
  children: React.ReactNode;
};

function ContactField({ icon: Icon, label, children }: ContactFieldProps) {
  return (
    <div className="flex gap-4">
      <div className="flex size-11 shrink-0 items-center justify-center rounded-2xl bg-primary/12 text-primary">
        <Icon className="size-5" aria-hidden />
      </div>
      <div className="min-w-0 pt-0.5">
        <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
          {label}
        </p>
        <div className="mt-1 text-sm leading-relaxed text-foreground">
          {children}
        </div>
      </div>
    </div>
  );
}

type LandingContactDetailsProps = {
  title?: string;
  description?: string;
  phoneLabel: string;
  emailLabel: string;
  addressLabel: string;
  hoursLabel?: string;
  hours: string;
  responseNote?: string;
  className?: string;
};

export function LandingContactDetails({
  title,
  description,
  phoneLabel,
  emailLabel,
  addressLabel,
  hoursLabel = "Hours",
  hours,
  responseNote,
  className,
}: LandingContactDetailsProps) {
  const linkClassName = cn(
    "font-medium text-foreground transition-colors hover:text-primary",
    focusRingClassName,
    "rounded-sm",
  );

  return (
    <aside
      className={cn(
        "health-card relative overflow-hidden rounded-3xl p-6 md:p-8",
        className,
      )}
    >
      <div
        className="pointer-events-none absolute -right-8 -top-8 size-32 rounded-full bg-lavender-100/50 blur-2xl dark:bg-lavender-950/25"
        aria-hidden
      />

      <div className="relative space-y-6">
        {title || description ? (
          <div className="space-y-2">
            {title ? (
              <h3 className="font-heading text-xl font-semibold tracking-tight md:text-2xl">
                {title}
              </h3>
            ) : null}
            {description ? (
              <p className="text-sm leading-relaxed text-muted-foreground md:text-base">
                {description}
              </p>
            ) : null}
          </div>
        ) : null}

        <div
          className={cn(
            "space-y-5",
            (title || description) && "border-t border-border/50 pt-6",
          )}
        >
          <ContactField icon={Phone} label={phoneLabel}>
            <a href={contactTelHref} className={linkClassName}>
              {contactPhone}
            </a>
          </ContactField>

          <ContactField icon={Mail} label={emailLabel}>
            <a href={`mailto:${contactEmail}`} className={linkClassName}>
              {contactEmail}
            </a>
          </ContactField>

          <ContactField icon={MapPin} label={addressLabel}>
            <address className="not-italic">
              <span className="block font-medium">{headquartersAddress.name}</span>
              {headquartersAddressLines.map((line) => (
                <span key={line} className="block text-muted-foreground">
                  {line}
                </span>
              ))}
            </address>
          </ContactField>

          <ContactField icon={Clock} label={hoursLabel}>
            <p>{hours}</p>
          </ContactField>
        </div>

        {responseNote ? (
          <p className="border-t border-border/50 pt-4 text-xs leading-relaxed text-muted-foreground">
            {responseNote}
          </p>
        ) : null}
      </div>
    </aside>
  );
}
