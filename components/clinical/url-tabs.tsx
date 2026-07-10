"use client";

import { useCallback, useMemo, type ReactNode } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";

export type UrlTabDefinition = {
  value: string;
  label: ReactNode;
  content: ReactNode;
  badge?: number;
};

type UrlTabsProps = {
  tabs: UrlTabDefinition[];
  defaultTab: string;
  paramName?: string;
  className?: string;
  listClassName?: string;
  /** Keep ?tab= in the URL even for the default tab (avoids nav/state drift). */
  keepTabInUrl?: boolean;
};

export function UrlTabs({
  tabs,
  defaultTab,
  paramName = "tab",
  className,
  listClassName,
  keepTabInUrl = false,
}: UrlTabsProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const allowedValues = useMemo(
    () => new Set(tabs.map((tab) => tab.value)),
    [tabs],
  );

  const rawTab = searchParams.get(paramName);
  const activeTab =
    rawTab && allowedValues.has(rawTab) ? rawTab : defaultTab;

  const setTab = useCallback(
    (value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      if (!keepTabInUrl && value === defaultTab) {
        params.delete(paramName);
      } else {
        params.set(paramName, value);
      }
      const query = params.toString();
      router.replace(query ? `${pathname}?${query}` : pathname, {
        scroll: false,
      });
    },
    [defaultTab, keepTabInUrl, paramName, pathname, router, searchParams],
  );

  return (
    <Tabs
      value={activeTab}
      onValueChange={setTab}
      className={cn("w-full", className)}
    >
      <div className="sticky top-app-header z-20 border-b border-border/60 bg-background/95 backdrop-blur-md">
        <div className="tabs-scroll-fade pb-1">
          <TabsList
            variant="line"
            className={cn(
              "h-auto min-h-11 w-full min-w-max justify-start gap-1 bg-transparent p-0",
              listClassName,
            )}
          >
            {tabs.map((tab) => (
              <TabsTrigger
                key={tab.value}
                value={tab.value}
                className="inline-flex h-11 shrink-0 items-center gap-1.5 rounded-none px-2.5 py-2 text-sm data-active:bg-transparent max-sm:gap-1 max-sm:px-2 sm:gap-2 sm:px-4"
              >
                <span className="inline-flex items-center gap-2">
                  {tab.label}
                  {tab.badge !== undefined && tab.badge > 0 ? (
                    <span className="rounded-full bg-muted px-1.5 py-0.5 text-[10px] font-semibold tabular-nums text-muted-foreground">
                      {tab.badge}
                    </span>
                  ) : null}
                </span>
              </TabsTrigger>
            ))}
          </TabsList>
        </div>
      </div>
      {tabs.map((tab) => (
        <TabsContent
          key={tab.value}
          value={tab.value}
          className="mt-5 focus-visible:outline-none data-hidden:hidden"
        >
          {tab.content}
        </TabsContent>
      ))}
    </Tabs>
  );
}
