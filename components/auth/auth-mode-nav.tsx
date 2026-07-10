"use client";

import Link from "next/link";

import { patientAuthCopy } from "@/lib/copy/patient/auth";
import { cn } from "@/lib/utils";

type AuthMode = "sign-in" | "sign-up";

const modes: { path: AuthMode; label: string }[] = [
  { path: "sign-in", label: patientAuthCopy.nav.signIn },
  { path: "sign-up", label: patientAuthCopy.nav.signUp },
];

type AuthModeNavProps = {
  activePath: AuthMode;
};

export function AuthModeNav({ activePath }: AuthModeNavProps) {
  return (
    <nav aria-label="Sign in or sign up" className="w-full">
      <div className="inline-flex w-full rounded-lg bg-muted p-1">
        {modes.map((mode) => {
          const isActive = activePath === mode.path;

          return (
            <Link
              key={mode.path}
              href={`/auth/${mode.path}`}
              aria-current={isActive ? "page" : undefined}
              className={cn(
                "flex min-h-11 flex-1 items-center justify-center rounded-md px-3 py-2.5 text-center text-sm font-medium transition-all",
                isActive
                  ? "bg-background text-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground",
              )}
            >
              {mode.label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
