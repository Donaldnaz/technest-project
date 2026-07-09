import { cn } from "@/lib/utils";

type SplitPaneLayoutProps = {
  viewer: React.ReactNode;
  form: React.ReactNode;
  className?: string;
};

export function SplitPaneLayout({
  viewer,
  form,
  className,
}: SplitPaneLayoutProps) {
  return (
    <section
      className={cn(
        "clinical-card grid min-h-[20rem] max-lg:min-h-0 grid-cols-1 gap-3 overflow-hidden md:grid-cols-2 md:items-start",
        className,
      )}
    >
      <div className="flex min-h-[12rem] flex-col overflow-hidden border-b border-border max-md:max-h-[50dvh] md:max-h-[min(32rem,60dvh)] md:min-h-[28rem] md:self-start md:border-b-0 md:border-r">
        {viewer}
      </div>
      <div className="flex flex-col p-4 md:p-5">{form}</div>
    </section>
  );
}
