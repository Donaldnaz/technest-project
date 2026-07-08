"use client";

import { useEffect, useId, useState } from "react";
import { Menu, X } from "lucide-react";

import {
  LandingMobileNavLinks,
} from "@/components/landing/landing-nav-links";
import { LinkButton } from "@/components/ui/link-button";
import { authClient } from "@/lib/auth/client";

export function LandingMobileMenu() {
  const [open, setOpen] = useState(false);
  const panelId = useId();
  const { data: session } = authClient.useSession();
  const dashboardHref = session?.user ? "/dashboard" : undefined;

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
    <div className="lg:hidden">
      <button
        type="button"
        className="inline-flex size-11 cursor-pointer items-center justify-center rounded-xl text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
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
            className="fixed inset-x-0 top-[var(--site-header-height,3.5rem)] z-50 max-h-[calc(100dvh-var(--site-header-height,3.5rem))] overflow-y-auto border-b border-border/50 bg-background/95 px-4 py-4 shadow-lg backdrop-blur-xl"
            aria-label="Mobile"
          >
            <ul className="space-y-1">
              <LandingMobileNavLinks onNavigate={close} />
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
