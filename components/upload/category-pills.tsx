"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

import type { DocumentCategory } from "@/lib/constants/document-categories";
import { cn } from "@/lib/utils";

const PRIMARY_CATEGORIES: Array<{
  value: DocumentCategory;
  label: string;
  emoji: string;
}> = [
  { value: "lab_results", label: "Lab Results", emoji: "📋" },
  { value: "imaging", label: "Imaging", emoji: "🩻" },
  { value: "prescriptions", label: "Prescription", emoji: "💊" },
  { value: "other", label: "General", emoji: "📝" },
];

const MORE_CATEGORIES: Array<{
  value: DocumentCategory;
  label: string;
}> = [
  { value: "visit_notes", label: "Visit notes" },
  { value: "insurance", label: "Insurance" },
];

type CategoryPillsProps = {
  value: DocumentCategory;
  onChange: (category: DocumentCategory) => void;
  disabled?: boolean;
  compact?: boolean;
};

export function CategoryPills({
  value,
  onChange,
  disabled = false,
  compact = false,
}: CategoryPillsProps) {
  const [showMore, setShowMore] = useState(false);
  const isMoreSelected = MORE_CATEGORIES.some((item) => item.value === value);

  return (
    <div className={cn("flex w-full flex-wrap gap-2", compact && "gap-1.5")}>
      {PRIMARY_CATEGORIES.map((category) => {
        const selected = value === category.value;
        return (
          <button
            key={category.value}
            type="button"
            disabled={disabled}
            onClick={() => onChange(category.value)}
            className={cn(
              "upload-interactive inline-flex min-h-11 w-full items-center justify-center gap-1.5 rounded-full border px-3 py-2 text-xs font-medium transition-all duration-200 max-xs:w-full sm:w-auto sm:flex-none sm:justify-start",
              compact && "min-h-11 px-2.5 py-2 text-xs max-sm:min-h-11",
              selected
                ? "border-sage-400 bg-sage-100 text-sage-900 shadow-sm dark:border-sage-700 dark:bg-sage-950/50 dark:text-sage-100"
                : "border-border/70 bg-background/80 text-muted-foreground hover:border-sage-300 hover:text-foreground",
            )}
          >
            <span aria-hidden>{category.emoji}</span>
            {category.label}
          </button>
        );
      })}

      <div className="relative w-full sm:w-auto">
        <button
          type="button"
          disabled={disabled}
          onClick={() => setShowMore((open) => !open)}
          className={cn(
            "upload-interactive inline-flex min-h-11 w-full items-center justify-center gap-1 rounded-full border px-3 py-2 text-xs font-medium transition-all duration-200 sm:w-auto sm:justify-start",
            compact && "min-h-11 px-2.5 py-2 text-xs",
            isMoreSelected
              ? "border-sage-400 bg-sage-100/80 text-sage-900 dark:border-sage-700 dark:text-sage-100"
              : "border-border/70 bg-background/80 text-muted-foreground hover:border-sage-300 hover:text-foreground",
          )}
        >
          More
          <ChevronDown className="size-3.5" aria-hidden />
        </button>

        {showMore && (
          <div className="absolute left-0 z-20 mt-2 max-h-[50dvh] min-w-[10rem] overflow-y-auto rounded-2xl border border-border/70 bg-card p-1.5 shadow-lg">
            {MORE_CATEGORIES.map((category) => (
              <button
                key={category.value}
                type="button"
                disabled={disabled}
                onClick={() => {
                  onChange(category.value);
                  setShowMore(false);
                }}
                className={cn(
                  "upload-interactive flex min-h-11 w-full items-center rounded-xl px-3 py-2.5 text-left text-xs font-medium transition-colors hover:bg-muted",
                  value === category.value &&
                    "bg-sage-100 text-sage-900 dark:bg-sage-950/50 dark:text-sage-100",
                )}
              >
                {category.label}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
