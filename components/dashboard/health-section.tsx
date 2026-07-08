import { cn } from "@/lib/utils";

type HealthSectionProps = {
  title: string;
  description?: string;
  children: React.ReactNode;
  className?: string;
  contentClassName?: string;
  id?: string;
};

export function HealthSection({
  title,
  description,
  children,
  className,
  contentClassName,
  id,
}: HealthSectionProps) {
  return (
    <section
      id={id}
      className={cn("health-card scroll-mt-6 rounded-3xl p-6 md:p-8", className)}
    >
      <div className="mb-6">
        <h2 className="font-heading text-xl font-semibold">{title}</h2>
        {description && (
          <p className="mt-1 text-sm text-muted-foreground">{description}</p>
        )}
      </div>
      <div className={contentClassName}>{children}</div>
    </section>
  );
}
