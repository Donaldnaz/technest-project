import { cn } from "@/lib/utils";

type SiteContainerProps = {
  children: React.ReactNode;
  className?: string;
  as?: "div" | "section" | "main" | "header" | "footer";
  size?: "default" | "wide";
};

export function SiteContainer({
  children,
  className,
  as: Tag = "div",
  size = "default",
}: SiteContainerProps) {
  return (
    <Tag
      className={cn(
        "mx-auto w-full px-4 md:px-6",
        size === "wide" ? "max-w-7xl" : "max-w-6xl",
        className,
      )}
    >
      {children}
    </Tag>
  );
}
