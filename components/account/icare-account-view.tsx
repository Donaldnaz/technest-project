"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Lock, UserRound } from "lucide-react";

import { AccountReadonlyProfile } from "@/components/account/account-readonly-profile";
import { ChangePasswordSettings } from "@/components/account/change-password-settings";
import { patientAccountCopy } from "@/lib/copy/patient/account";
import { focusRingClassName } from "@/lib/landing/nav-link-styles";
import { cn } from "@/lib/utils";

type ICareAccountViewProps = {
  path: string;
};

const navItems = [
  {
    path: "settings",
    label: patientAccountCopy.nav.account,
    icon: UserRound,
  },
  {
    path: "security",
    label: patientAccountCopy.nav.password,
    icon: Lock,
  },
] as const;

export function ICareAccountView({ path }: ICareAccountViewProps) {
  const pathname = usePathname();
  const activePath = path || pathname.split("/").pop() || "settings";

  return (
    <div className="grid gap-6 lg:grid-cols-[14rem_1fr] lg:gap-8">
      <nav
        aria-label={patientAccountCopy.nav.label}
        className="health-card flex gap-2 overflow-x-auto rounded-3xl p-2 shadow-sm lg:flex-col lg:gap-1 lg:self-start lg:p-3"
      >
        {navItems.map((item) => {
          const isActive = activePath === item.path;
          const Icon = item.icon;

          return (
            <Link
              key={item.path}
              href={`/account/${item.path}`}
              aria-current={isActive ? "page" : undefined}
              className={cn(
                "inline-flex min-w-[8.5rem] shrink-0 items-center gap-2.5 rounded-2xl px-4 py-3 text-sm font-medium transition-colors lg:min-w-0",
                focusRingClassName,
                isActive
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "text-muted-foreground hover:bg-muted/50 hover:text-foreground",
              )}
            >
              <Icon className="size-4 shrink-0" aria-hidden />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <section className="health-card min-w-0 rounded-3xl p-6 shadow-sm md:p-8">
        {activePath === "security" ? (
          <ChangePasswordSettings />
        ) : (
          <AccountReadonlyProfile />
        )}
      </section>
    </div>
  );
}
