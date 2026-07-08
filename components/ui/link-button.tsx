"use client";

import Link from "next/link";
import type { VariantProps } from "class-variance-authority";

import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { scrollToHash } from "@/lib/landing/scroll-to-hash";

type LinkButtonProps = React.ComponentProps<typeof Link> &
  VariantProps<typeof buttonVariants> & {
    href: string;
  };

export function LinkButton({
  className,
  variant,
  size,
  href,
  onClick,
  ...props
}: LinkButtonProps) {
  const classes = cn(buttonVariants({ variant, size, className }));

  if (href.startsWith("#")) {
    return (
      <a
        href={href}
        className={classes}
        onClick={(event) => {
          event.preventDefault();
          scrollToHash(href);
          onClick?.(event as unknown as React.MouseEvent<HTMLAnchorElement>);
        }}
        {...(props as React.AnchorHTMLAttributes<HTMLAnchorElement>)}
      />
    );
  }

  if (href.startsWith("mailto:")) {
    return (
      <a
        href={href}
        className={classes}
        onClick={onClick as React.MouseEventHandler<HTMLAnchorElement>}
        {...(props as React.AnchorHTMLAttributes<HTMLAnchorElement>)}
      />
    );
  }

  return (
    <Link
      href={href}
      className={classes}
      onClick={onClick}
      {...props}
    />
  );
}
