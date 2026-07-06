"use client";

import { useEffect, useId, useState } from "react";
import { Menu, X } from "lucide-react";

import {
  LandingNavLink,
} from "@/components/landing/landing-nav-link";
import { LinkButton } from "@/components/ui/link-button";
import { primaryNavLinks } from "@/lib/landing/navigation";
import { landingNavLinkClassName } from "@/lib/landing/nav-link-styles";
import { cn } from "@/lib/utils";

export function LandingMobileMenu({
  dashboardHref,
}: {
  dashboardHref?: string;
}) {
  const [open, setOpen] = useState(false);
  const panelId = useId();

  useEffect(() => {
    if (!open) return;

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }

    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [open]);

  function close() {
    setOpen(false);
  }

  return (
    <div className="md:hidden">
      <button
        type="button"
        className="inline-flex size-10 cursor-pointer items-center justify-center rounded-xl text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
        aria-expanded={open}
        aria-controls={panelId}
        aria-label={open ? "Close menu" : "Open menu"}
        onClick={() => setOpen((value) => !value)}
      >
        {open ? <X className="size-5" /> : <Menu className="size-5" />}
      </button>

      {open && (
        <>
          <button
            type="button"
            className="fixed inset-0 z-40 bg-background/60 backdrop-blur-sm"
            aria-label="Close menu overlay"
            onClick={close}
          />
          <nav
            id={panelId}
            className="fixed inset-x-0 top-16 z-50 border-b border-border/50 bg-background/95 px-4 py-4 shadow-lg backdrop-blur-xl"
            aria-label="Mobile"
          >
            <ul className="space-y-1">
              {primaryNavLinks.map((link) => (
                <li key={link.href}>
                  <LandingNavLink
                    href={link.href}
                    label={link.label}
                    className={cn(landingNavLinkClassName(), "block px-3 py-2")}
                    onNavigate={close}
                  />
                </li>
              ))}
            </ul>
            <div className="mt-4 flex flex-col gap-2 border-t border-border/50 pt-4">
              {dashboardHref ? (
                <LinkButton
                  href={dashboardHref}
                  size="lg"
                  className="w-full rounded-2xl"
                  onClick={close}
                >
                  Dashboard
                </LinkButton>
              ) : (
                <>
                  <LinkButton
                    href="/auth/sign-in"
                    variant="outline"
                    className="w-full rounded-2xl"
                    onClick={close}
                  >
                    Sign in
                  </LinkButton>
                  <LinkButton
                    href="/auth/sign-up"
                    size="lg"
                    className="w-full rounded-2xl"
                    onClick={close}
                  >
                    Get started
                  </LinkButton>
                </>
              )}
            </div>
          </nav>
        </>
      )}
    </div>
  );
}
