const inputClassName =
  "h-11 w-full rounded-xl border-input bg-background px-3.5 text-base shadow-none md:text-sm";

const buttonClassName = "h-11 rounded-xl text-base font-medium";

export const accountViewClassNames = {
  base: "w-full gap-6 md:gap-8",
  cards: "gap-4",
  sidebar: {
    base: "gap-1",
    button:
      "rounded-xl text-muted-foreground hover:bg-muted/50 hover:text-foreground",
    buttonActive:
      "rounded-xl bg-primary/10 font-semibold text-primary hover:bg-primary/10 hover:text-primary",
  },
  drawer: {
    menuItem: "rounded-xl",
  },
  card: {
    base: "rounded-2xl border border-border/60 bg-card shadow-sm",
    header: "border-b border-border/60 px-5 py-4 md:px-6",
    title: "font-heading text-base font-semibold",
    description: "text-sm text-muted-foreground",
    content: "gap-4 px-5 py-4 md:px-6 md:py-5",
    footer: "border-t border-border/60 px-5 py-4 md:px-6",
    input: inputClassName,
    button: buttonClassName,
    primaryButton: `${buttonClassName} bg-primary text-primary-foreground hover:bg-primary/90`,
    outlineButton: `${buttonClassName} border-border/80 bg-background hover:bg-muted/50`,
    destructiveButton: `${buttonClassName} bg-destructive text-white hover:bg-destructive/90`,
    label: "text-sm font-medium text-foreground",
    error: "text-sm text-destructive",
  },
};
