import { cn } from "@/lib/utils";

type SplitPaneLayoutProps = {
  viewer: React.ReactNode;
  form: React.ReactNode;
  className?: string;
};

/**
 * Stacks on phones/tablets (form first). Side-by-side from lg (1024px).
 */
export function SplitPaneLayout({
  viewer,
  form,
  className,
}: SplitPaneLayoutProps) {
  return (
    <section
      className={cn(
        "clinical-card grid min-h-[20rem] max-lg:min-h-0 grid-cols-1 gap-3 overflow-hidden lg:grid-cols-2 lg:items-start",
        className,
      )}
    >
      <div className="order-2 flex min-h-[12rem] flex-col overflow-hidden border-t border-border max-lg:max-h-[50dvh] lg:order-1 lg:max-h-[min(32rem,60dvh)] lg:min-h-[28rem] lg:self-start lg:border-t-0 lg:border-r">
        {viewer}
      </div>
      <div className="order-1 flex flex-col p-4 lg:order-2 lg:p-5">{form}</div>
    </section>
  );
}
