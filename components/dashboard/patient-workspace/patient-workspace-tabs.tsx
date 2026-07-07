"use client";

import {
  createContext,
  useCallback,
  useContext,
  useId,
  useMemo,
  type ReactNode,
} from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { patientDashboardCopy } from "@/lib/copy/patient/dashboard";
import {
  getInitialPatientTab,
  type PatientTab,
  resolvePatientTab,
} from "@/lib/navigation/patient-nav";

type PatientWorkspaceTabsContextValue = {
  setTab: (tab: PatientTab) => void;
  activeTab: PatientTab;
};

const PatientWorkspaceTabsContext =
  createContext<PatientWorkspaceTabsContextValue | null>(null);

export function usePatientWorkspaceTab() {
  const context = useContext(PatientWorkspaceTabsContext);
  if (!context) {
    throw new Error("usePatientWorkspaceTab must be used within PatientWorkspaceTabs");
  }
  return context;
}

export type PatientWorkspaceTabDefinition = {
  value: PatientTab;
  label: ReactNode;
  /** Plain-text label for screen readers when `label` includes icons */
  ariaLabel: string;
  content: ReactNode;
  badge?: number;
};

type PatientWorkspaceTabsProps = {
  patientPath: string;
  documentCount: number;
  tabs: PatientWorkspaceTabDefinition[];
  children?: ReactNode;
};

export function PatientWorkspaceTabs({
  patientPath,
  documentCount,
  tabs,
  children,
}: PatientWorkspaceTabsProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const tabsId = useId();
  const defaultTab = getInitialPatientTab(documentCount);

  const activeTab = useMemo(
    () => resolvePatientTab(searchParams.get("tab"), documentCount),
    [documentCount, searchParams],
  );

  const setTab = useCallback(
    (tab: PatientTab) => {
      if (pathname !== patientPath) return;

      const params = new URLSearchParams(searchParams.toString());
      if (tab === defaultTab) {
        params.delete("tab");
      } else {
        params.set("tab", tab);
      }
      const query = params.toString();
      router.replace(query ? `${patientPath}?${query}` : patientPath, {
        scroll: false,
      });
    },
    [defaultTab, patientPath, pathname, router, searchParams],
  );

  const contextValue = useMemo(
    () => ({
      activeTab,
      setTab,
    }),
    [activeTab, setTab],
  );

  return (
    <PatientWorkspaceTabsContext.Provider value={contextValue}>
      {children ? <div className="mb-5">{children}</div> : null}
      <Tabs
        value={activeTab}
        onValueChange={(value) => setTab(value as PatientTab)}
        className="w-full"
        aria-label={patientDashboardCopy.patient.workspaceTitle}
      >
        <div className="sticky top-16 z-20 -mx-4 border-b border-border/60 bg-background/95 px-4 backdrop-blur-md md:-mx-8 md:px-8">
          <div className="overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            <TabsList
              variant="line"
              aria-label="Profile sections"
              className="h-auto min-h-11 w-full min-w-max justify-start gap-1 bg-transparent p-0"
            >
              {tabs.map((tab) => {
                const triggerId = `${tabsId}-trigger-${tab.value}`;
                const panelId = `${tabsId}-panel-${tab.value}`;

                return (
                  <TabsTrigger
                    key={tab.value}
                    id={triggerId}
                    value={tab.value}
                    aria-controls={panelId}
                    aria-label={tab.ariaLabel}
                    className="inline-flex h-10 shrink-0 items-center gap-2 rounded-none px-3 py-2 data-active:bg-transparent sm:px-4"
                  >
                    <span className="inline-flex items-center gap-2">
                      {tab.label}
                      {tab.badge !== undefined && tab.badge > 0 ? (
                        <span
                          className="rounded-full bg-muted px-1.5 py-0.5 text-[10px] font-semibold tabular-nums text-muted-foreground"
                          aria-hidden
                        >
                          {tab.badge}
                        </span>
                      ) : null}
                    </span>
                  </TabsTrigger>
                );
              })}
            </TabsList>
          </div>
        </div>
        {tabs.map((tab) => {
          const triggerId = `${tabsId}-trigger-${tab.value}`;
          const panelId = `${tabsId}-panel-${tab.value}`;

          return (
            <TabsContent
              key={tab.value}
              id={panelId}
              value={tab.value}
              aria-labelledby={triggerId}
              tabIndex={0}
              className="mt-5 focus-visible:outline-none data-hidden:hidden"
            >
              {tab.content}
            </TabsContent>
          );
        })}
      </Tabs>
    </PatientWorkspaceTabsContext.Provider>
  );
}
