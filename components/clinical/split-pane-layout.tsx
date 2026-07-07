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
        "clinical-card grid min-h-[32rem] grid-cols-1 gap-3 overflow-hidden lg:grid-cols-2",
        className,
      )}
    >
      <div className="flex min-h-[16rem] flex-col border-b border-border lg:min-h-0 lg:border-b-0 lg:border-r">
        {viewer}
      </div>
      <div className="flex flex-col p-4 md:p-5">{form}</div>
    </section>
  );
}
