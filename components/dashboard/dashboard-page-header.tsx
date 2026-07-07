type DashboardPageHeaderProps = {
  title: string;
  description?: string;
  actions?: React.ReactNode;
  breadcrumbs?: React.ReactNode;
};

export function DashboardPageHeader({
  title,
  description,
  actions,
  breadcrumbs,
}: DashboardPageHeaderProps) {
  return (
    <header className="space-y-3">
      {breadcrumbs}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="max-w-2xl space-y-1">
          <h1 className="font-heading text-2xl font-semibold tracking-tight">
            {title}
          </h1>
          {description && (
            <p className="text-sm leading-relaxed text-muted-foreground">
              {description}
            </p>
          )}
        </div>
        {actions && (
          <div className="shrink-0 self-start sm:self-center">{actions}</div>
        )}
      </div>
    </header>
  );
}
