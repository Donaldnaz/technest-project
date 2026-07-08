"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { AccountReadonlyProfile } from "@/components/account/account-readonly-profile";
import { ChangePasswordSettings } from "@/components/account/change-password-settings";
import { cn } from "@/lib/utils";

type ICareAccountViewProps = {
  path: string;
};

const navItems = [
  { path: "settings", label: "Account" },
  { path: "security", label: "Password" },
] as const;

export function ICareAccountView({ path }: ICareAccountViewProps) {
  const pathname = usePathname();
  const activePath = path || pathname.split("/").pop() || "settings";

  return (
    <div className="flex w-full flex-col gap-6 md:flex-row md:gap-8">
      <nav
        aria-label="Account settings"
        className="flex gap-2 md:w-44 md:flex-col md:gap-1 lg:w-52"
      >
        {navItems.map((item) => {
          const isActive = activePath === item.path;
          return (
            <Link
              key={item.path}
              href={`/account/${item.path}`}
              className={cn(
                "rounded-xl px-4 py-2.5 text-sm font-medium transition-colors",
                isActive
                  ? "bg-primary/10 text-primary"
                  : "text-muted-foreground hover:bg-muted/50 hover:text-foreground",
              )}
            >
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="min-w-0 flex-1">
        {activePath === "security" ? (
          <ChangePasswordSettings />
        ) : (
          <AccountReadonlyProfile />
        )}
      </div>
    </div>
  );
}
