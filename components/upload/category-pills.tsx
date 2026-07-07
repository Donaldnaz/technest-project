"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

import type { DocumentCategory } from "@/lib/constants/document-categories";
import { PATIENT_CATEGORY_PILLS } from "@/lib/copy/patient/library";
import { cn } from "@/lib/utils";

const PRIMARY_CATEGORIES: DocumentCategory[] = [
  "lab_results",
  "imaging",
  "prescriptions",
  "other",
];

const MORE_CATEGORIES: DocumentCategory[] = ["visit_notes", "insurance"];

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
  const isMoreSelected = MORE_CATEGORIES.some((item) => item === value);

  return (
    <div className={cn("flex w-full flex-wrap gap-2", compact && "gap-1.5")}>
      {PRIMARY_CATEGORIES.map((category) => {
        const pill = PATIENT_CATEGORY_PILLS[category];
        const selected = value === category;
        return (
          <button
            key={category}
            type="button"
            disabled={disabled}
            onClick={() => onChange(category)}
            className={cn(
              "upload-interactive inline-flex min-h-9 flex-1 items-center justify-center gap-1.5 rounded-full border px-3 py-2 text-xs font-medium transition-all duration-200 sm:flex-none sm:justify-start",
              compact && "min-h-8 px-2.5 py-1 text-[11px]",
              selected
                ? "border-sage-400 bg-sage-100 text-sage-900 shadow-sm dark:border-sage-700 dark:bg-sage-950/50 dark:text-sage-100"
                : "border-border/70 bg-background/80 text-muted-foreground hover:border-sage-300 hover:text-foreground",
            )}
          >
            <span aria-hidden>{pill.emoji}</span>
            {pill.label}
          </button>
        );
      })}

      <div className="relative w-full sm:w-auto">
        <button
          type="button"
          disabled={disabled}
          onClick={() => setShowMore((open) => !open)}
          className={cn(
            "upload-interactive inline-flex min-h-9 w-full items-center justify-center gap-1 rounded-full border px-3 py-2 text-xs font-medium transition-all duration-200 sm:w-auto sm:justify-start",
            compact && "min-h-8 px-2.5 py-1 text-[11px]",
            isMoreSelected
              ? "border-sage-400 bg-sage-100/80 text-sage-900 dark:border-sage-700 dark:text-sage-100"
              : "border-border/70 bg-background/80 text-muted-foreground hover:border-sage-300 hover:text-foreground",
          )}
        >
          More
          <ChevronDown className="size-3.5" aria-hidden />
        </button>

        {showMore && (
          <div className="absolute left-0 z-20 mt-2 min-w-[10rem] rounded-2xl border border-border/70 bg-card p-1.5 shadow-lg">
            {MORE_CATEGORIES.map((category) => {
              const pill = PATIENT_CATEGORY_PILLS[category];
              return (
                <button
                  key={category}
                  type="button"
                  disabled={disabled}
                  onClick={() => {
                    onChange(category);
                    setShowMore(false);
                  }}
                  className={cn(
                    "upload-interactive flex w-full rounded-xl px-3 py-2 text-left text-xs font-medium transition-colors hover:bg-muted",
                    value === category &&
                      "bg-sage-100 text-sage-900 dark:bg-sage-950/50 dark:text-sage-100",
                  )}
                >
                  {pill.label}
                </button>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
