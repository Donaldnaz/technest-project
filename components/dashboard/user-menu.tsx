"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { LogOutIcon, SettingsIcon } from "lucide-react";
import { Menu } from "@base-ui/react/menu";
import { UserAvatar } from "@neondatabase/auth-ui";

import { SignOutConfirmDialog } from "@/components/auth/sign-out-confirm-dialog";
import { authClient } from "@/lib/auth/client";
import { patientAccountCopy } from "@/lib/copy/patient/account";
import { patientAuthCopy } from "@/lib/copy/patient/auth";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const menuItemClassName = cn(
  "relative flex w-full cursor-default select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none",
  "transition-colors hover:bg-accent hover:text-accent-foreground",
  "focus-visible:bg-accent focus-visible:text-accent-foreground",
  "data-highlighted:bg-accent data-highlighted:text-accent-foreground",
);

function AvatarPlaceholder() {
  return (
    <span
      className="inline-flex size-9 shrink-0 rounded-full bg-muted"
      aria-hidden
    />
  );
}

export function UserMenu() {
  const [signOutOpen, setSignOutOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { data: session, isPending } = authClient.useSession();

  const showAvatar = mounted && !isPending && Boolean(session?.user);

  useEffect(() => {
    setMounted(true);
  }, []);

  function handleSignOutClick() {
    setMenuOpen(false);
    setSignOutOpen(true);
  }

  return (
    <>
      <Menu.Root open={menuOpen} onOpenChange={setMenuOpen}>
        <Menu.Trigger
          render={
            <Button
              variant="ghost"
              size="icon"
              className="size-fit rounded-full"
              aria-label="Account menu"
            />
          }
        >
          {showAvatar ? (
            <UserAvatar
              isPending={false}
              user={session!.user}
              className="size-9"
            />
          ) : (
            <AvatarPlaceholder />
          )}
        </Menu.Trigger>

        <Menu.Portal>
          <Menu.Positioner align="end" sideOffset={8}>
            <Menu.Popup
              className={cn(
                "z-50 min-w-44 overflow-hidden rounded-xl border border-border/60 bg-popover p-1 text-popover-foreground shadow-lg",
                "animate-in fade-in-0 zoom-in-95 data-ending-style:fade-out-0 data-ending-style:zoom-out-95",
              )}
            >
              <Menu.Item
                render={
                  <Link
                    href="/account/settings"
                    className={menuItemClassName}
                  />
                }
                nativeButton={false}
              >
                <SettingsIcon className="size-4" aria-hidden />
                {patientAccountCopy.nav.account}
              </Menu.Item>

              <Menu.Separator className="my-1 h-px bg-border" />

              <Menu.Item
                className={menuItemClassName}
                onClick={handleSignOutClick}
              >
                <LogOutIcon className="size-4" aria-hidden />
                {patientAuthCopy.signOut.label}
              </Menu.Item>
            </Menu.Popup>
          </Menu.Positioner>
        </Menu.Portal>
      </Menu.Root>

      <SignOutConfirmDialog
        open={signOutOpen}
        onOpenChange={setSignOutOpen}
      />
    </>
  );
}
