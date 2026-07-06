type DashboardPageHeaderProps = {
  title: string;
  description?: string;
  actions?: React.ReactNode;
};

export function DashboardPageHeader({
  title,
  description,
  actions,
}: DashboardPageHeaderProps) {
  return (
    <header className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
      <div className="max-w-2xl space-y-2">
        <h1 className="font-heading text-3xl font-semibold tracking-tight md:text-4xl">
          {title}
        </h1>
        {description && (
          <p className="text-base leading-relaxed text-muted-foreground">
            {description}
          </p>
        )}
      </div>
      {actions && (
        <div className="shrink-0 self-start sm:self-center">{actions}</div>
      )}
    </header>
  );
}
