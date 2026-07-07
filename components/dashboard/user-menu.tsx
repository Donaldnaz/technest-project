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

const menuPositionerClassName = "z-[100]";

const menuPopupClassName = cn(
  "health-card min-w-56 overflow-hidden rounded-2xl border border-border/50 bg-popover p-1.5 text-popover-foreground shadow-lg",
  "animate-in fade-in-0 zoom-in-95 data-ending-style:fade-out-0 data-ending-style:zoom-out-95",
);

const menuItemClassName = cn(
  "relative flex w-full cursor-default select-none items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium outline-none",
  "transition-colors hover:bg-muted/80 hover:text-foreground",
  "focus-visible:bg-muted/80 focus-visible:text-foreground focus-visible:ring-2 focus-visible:ring-ring/40 focus-visible:ring-offset-1 focus-visible:ring-offset-popover",
  "data-highlighted:bg-muted/80 data-highlighted:text-foreground",
  "[&_svg]:text-muted-foreground data-highlighted:[&_svg]:text-foreground hover:[&_svg]:text-foreground",
);

const menuItemIconClassName = "size-4 shrink-0";

const signOutItemClassName = cn(
  menuItemClassName,
  "text-muted-foreground hover:bg-destructive/10 hover:text-destructive",
  "focus-visible:bg-destructive/10 focus-visible:text-destructive focus-visible:ring-destructive/30",
  "data-highlighted:bg-destructive/10 data-highlighted:text-destructive",
  "hover:[&_svg]:text-destructive data-highlighted:[&_svg]:text-destructive",
);

function getInitials(name: string | null | undefined): string {
  if (!name?.trim()) return "?";
  const parts = name.trim().split(/\s+/);
  if (parts.length === 1) return parts[0].charAt(0).toUpperCase();
  return `${parts[0].charAt(0)}${parts[parts.length - 1].charAt(0)}`.toUpperCase();
}

function AvatarPlaceholder() {
  return (
    <span
      className="inline-flex size-9 shrink-0 rounded-full bg-muted"
      aria-hidden
    />
  );
}

function UserMenuHeader({
  name,
  email,
}: {
  name: string | null | undefined;
  email: string | null | undefined;
}) {
  const displayName = name?.trim() || "Your account";
  const displayEmail = email?.trim();

  return (
    <div className="flex items-center gap-3 px-3 py-2.5">
      <span
        className="flex size-9 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-semibold text-primary"
        aria-hidden
      >
        {getInitials(name)}
      </span>
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-semibold leading-tight text-foreground">
          {displayName}
        </p>
        {displayEmail ? (
          <p className="truncate text-xs text-muted-foreground">{displayEmail}</p>
        ) : null}
      </div>
    </div>
  );
}

export function UserMenu() {
  const [signOutOpen, setSignOutOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { data: session, isPending } = authClient.useSession();

  const showAvatar = mounted && !isPending && Boolean(session?.user);
  const user = session?.user;

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
              className="size-9 rounded-full ring-offset-background focus-visible:ring-2 focus-visible:ring-ring/50 aria-expanded:bg-muted/80"
              aria-label="Account menu"
              aria-haspopup="menu"
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
          <Menu.Positioner
            align="end"
            sideOffset={10}
            positionMethod="fixed"
            className={menuPositionerClassName}
          >
            <Menu.Popup className={menuPopupClassName}>
              {showAvatar && user ? (
                <>
                  <UserMenuHeader name={user.name} email={user.email} />
                  <Menu.Separator className="my-1 h-px bg-border/60" />
                </>
              ) : null}

              <Menu.Item
                render={
                  <Link
                    href="/account/settings"
                    className={menuItemClassName}
                    onClick={() => setMenuOpen(false)}
                  />
                }
                nativeButton={false}
              >
                <SettingsIcon
                  className={menuItemIconClassName}
                  aria-hidden
                />
                {patientAccountCopy.nav.account}
              </Menu.Item>

              <Menu.Separator className="my-1 h-px bg-border/60" />

              <Menu.Item
                className={signOutItemClassName}
                onClick={handleSignOutClick}
              >
                <LogOutIcon className={menuItemIconClassName} aria-hidden />
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
