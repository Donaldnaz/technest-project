import { cn } from "@/lib/utils";

type HealthSectionProps = {
  title: string;
  description?: string;
  children: React.ReactNode;
  className?: string;
  contentClassName?: string;
  id?: string;
  variant?: "health" | "clinical";
};

export function HealthSection({
  title,
  description,
  children,
  className,
  contentClassName,
  id,
  variant = "clinical",
}: HealthSectionProps) {
  const isClinical = variant === "clinical";

  return (
    <section
      id={id}
      className={cn(
        isClinical
          ? "clinical-card scroll-mt-6 p-4 md:p-5"
          : "health-card scroll-mt-6 rounded-3xl p-6 md:p-8",
        className,
      )}
    >
      <div className="mb-4">
        <h2
          className={cn(
            "font-heading font-semibold",
            isClinical ? "text-lg" : "text-xl",
          )}
        >
          {title}
        </h2>
        {description && (
          <p className="mt-1 text-sm text-muted-foreground">{description}</p>
        )}
      </div>
      <div className={contentClassName}>{children}</div>
    </section>
  );
}
