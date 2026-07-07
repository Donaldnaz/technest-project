"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { VariantProps } from "class-variance-authority";

import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { getHashId, LANDING_HOME } from "@/lib/landing/navigation";
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
  const pathname = usePathname();
  const classes = cn(buttonVariants({ variant, size, className }));
  const hashId = getHashId(href);

  if (hashId) {
    const hashHref = `#${hashId}`;

    if (pathname === LANDING_HOME) {
      return (
        <a
          href={hashHref}
          className={classes}
          onClick={(event) => {
            event.preventDefault();
            scrollToHash(hashHref);
            onClick?.(event as unknown as React.MouseEvent<HTMLAnchorElement>);
          }}
          {...(props as React.AnchorHTMLAttributes<HTMLAnchorElement>)}
        />
      );
    }

    return (
      <Link
        href={href}
        scroll={false}
        className={classes}
        onClick={onClick}
        {...props}
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
