import type { AuthViewClassNames } from "@neondatabase/auth-ui";

const inputClassName =
  "h-11 w-full rounded-xl border-input bg-background px-3.5 text-base shadow-none md:text-sm";

const buttonClassName = "h-11 rounded-xl text-base font-medium";

export const authViewClassNames: AuthViewClassNames = {
  base: "w-full max-w-none gap-0 border-0 bg-transparent p-0 shadow-none ring-0",
  header: "space-y-2 px-0 pb-6 pt-0 text-center",
  title: "font-heading text-2xl font-semibold tracking-tight md:text-[1.75rem]",
  description: "mx-auto max-w-sm text-sm leading-relaxed text-muted-foreground md:text-base",
  content: "gap-6 px-0",
  continueWith: "gap-3 py-1",
  separator: "bg-border/60",
  footer: "justify-center gap-1 border-0 px-0 pt-6 text-sm text-muted-foreground",
  footerLink:
    "h-auto px-0 font-medium text-primary no-underline hover:text-primary/80 hover:no-underline",
  form: {
    base: "gap-5",
    label: "text-sm font-medium text-foreground",
    input: inputClassName,
    primaryButton: `${buttonClassName} w-full bg-primary text-primary-foreground shadow-sm hover:bg-primary/90`,
    outlineButton: `${buttonClassName} w-full border-border/80 bg-background hover:bg-muted/50`,
    providerButton: `${buttonClassName} w-full border-border/80 bg-background hover:bg-muted/50`,
    button: `${buttonClassName} w-full`,
    error: "text-sm text-destructive",
    forgotPasswordLink: "text-sm font-medium text-primary hover:underline",
    icon: "size-5 shrink-0",
  },
};
