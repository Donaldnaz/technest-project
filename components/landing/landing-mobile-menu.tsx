"use client";

import { useEffect, useId, useRef, useState } from "react";
import { Menu, X } from "lucide-react";

import { LandingMobileNavLinks } from "@/components/landing/landing-nav-links";
import { LinkButton } from "@/components/ui/link-button";
import { focusRingClassName } from "@/lib/landing/nav-link-styles";
import type { PublicNavState } from "@/lib/navigation/public-nav-state";
import { cn } from "@/lib/utils";

const FOCUSABLE_SELECTOR =
  'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])';

export function LandingMobileMenu({ navState }: { navState: PublicNavState }) {
  const [open, setOpen] = useState(false);
  const panelId = useId();
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLElement>(null);
  const wasOpenRef = useRef(false);

  useEffect(() => {
    const main = document.getElementById("main-content");
    if (!main) return;

    if (open) {
      main.setAttribute("inert", "");
    } else {
      main.removeAttribute("inert");
    }

    return () => {
      main.removeAttribute("inert");
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpen(false);
        return;
      }

      if (event.key !== "Tab" || !panelRef.current) return;

      const focusable = Array.from(
        panelRef.current.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR),
      ).filter((element) => !element.hasAttribute("disabled"));

      if (focusable.length === 0) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }

    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";

    const firstLink = panelRef.current?.querySelector<HTMLElement>(
      FOCUSABLE_SELECTOR,
    );
    firstLink?.focus();

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    if (wasOpenRef.current && !open) {
      menuButtonRef.current?.focus();
    }
    wasOpenRef.current = open;
  }, [open]);

  function close() {
    setOpen(false);
  }

  const { dashboardHref } = navState;

  return (
    <div className="lg:hidden">
      <button
        ref={menuButtonRef}
        type="button"
        className={cn(
          "inline-flex size-9 cursor-pointer items-center justify-center rounded-xl text-muted-foreground transition-colors hover:bg-muted hover:text-foreground",
          focusRingClassName,
        )}
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
            ref={panelRef}
            id={panelId}
            role="dialog"
            aria-modal="true"
            className="fixed inset-x-0 top-16 z-50 max-h-[calc(100dvh-4rem)] overflow-y-auto border-b border-border/50 bg-background/95 px-6 py-6 shadow-lg backdrop-blur-xl"
            aria-label="Primary"
          >
            <ul className="space-y-1">
              <LandingMobileNavLinks onNavigate={close} />
            </ul>

            <div className="mt-6 flex flex-col gap-3 border-t border-border/50 pt-6">
              {dashboardHref ? (
                <LinkButton
                  href={dashboardHref}
                  size="lg"
                  className="w-full rounded-xl"
                  onClick={close}
                >
                  Dashboard
                </LinkButton>
              ) : (
                <>
                  <LinkButton
                    href="/auth/sign-in"
                    variant="outline"
                    size="lg"
                    className="w-full rounded-xl"
                    onClick={close}
                  >
                    Sign in
                  </LinkButton>
                  <LinkButton
                    href="/auth/sign-up"
                    size="lg"
                    className="w-full rounded-xl"
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
