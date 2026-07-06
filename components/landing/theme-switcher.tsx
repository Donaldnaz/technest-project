"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

import { cn } from "@/lib/utils";

export function ThemeSwitcher({ className }: { className?: string }) {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const active = mounted ? (resolvedTheme ?? theme) : "light";

  return (
    <div
      className={cn(
        "inline-flex rounded-2xl border border-border/60 bg-card/80 p-1 shadow-sm backdrop-blur-sm",
        className,
      )}
      role="group"
      aria-label="Choose appearance"
    >
      <button
        type="button"
        onClick={() => setTheme("light")}
        disabled={!mounted}
        className={cn(
          "inline-flex min-h-9 cursor-pointer items-center gap-1.5 rounded-xl px-3 py-1.5 text-xs font-medium transition-all",
          active === "light"
            ? "bg-primary text-primary-foreground shadow-sm"
            : "text-muted-foreground hover:text-foreground",
        )}
        aria-pressed={active === "light"}
      >
        <Sun className="size-3.5" aria-hidden />
        Light
      </button>
      <button
        type="button"
        onClick={() => setTheme("dark")}
        disabled={!mounted}
        className={cn(
          "inline-flex min-h-9 cursor-pointer items-center gap-1.5 rounded-xl px-3 py-1.5 text-xs font-medium transition-all",
          active === "dark"
            ? "bg-primary text-primary-foreground shadow-sm"
            : "text-muted-foreground hover:text-foreground",
        )}
        aria-pressed={active === "dark"}
      >
        <Moon className="size-3.5" aria-hidden />
        Dark
      </button>
    </div>
  );
}
