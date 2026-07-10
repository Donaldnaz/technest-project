"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useId,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { usePathname, useSearchParams } from "next/navigation";

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
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const tabsId = useId();
  const defaultTab = getInitialPatientTab(documentCount);

  const tabFromUrl = useMemo(
    () => resolvePatientTab(searchParams.get("tab"), documentCount),
    [documentCount, searchParams],
  );

  const serializedSearch = searchParams.toString();
  const [activeTab, setActiveTab] = useState(tabFromUrl);
  const [lastSerializedSearch, setLastSerializedSearch] =
    useState(serializedSearch);

  if (serializedSearch !== lastSerializedSearch) {
    setLastSerializedSearch(serializedSearch);
    setActiveTab(tabFromUrl);
  }

  useEffect(() => {
    const onPopState = () => {
      const params = new URLSearchParams(window.location.search);
      setActiveTab(resolvePatientTab(params.get("tab"), documentCount));
    };

    window.addEventListener("popstate", onPopState);
    return () => window.removeEventListener("popstate", onPopState);
  }, [documentCount]);

  const setTab = useCallback(
    (tab: PatientTab) => {
      if (pathname !== patientPath) return;

      setActiveTab(tab);

      const params = new URLSearchParams(window.location.search);
      if (tab === defaultTab) {
        params.delete("tab");
      } else {
        params.set("tab", tab);
      }
      const query = params.toString();
      const nextUrl = query ? `${patientPath}?${query}` : patientPath;
      window.history.replaceState(window.history.state, "", nextUrl);
    },
    [defaultTab, patientPath, pathname],
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
        <div className="sticky top-app-header z-20 border-b border-border/60 bg-background/95 backdrop-blur-md">
          <div className="tabs-scroll-fade pb-1">
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
                    className="inline-flex h-11 shrink-0 items-center gap-1.5 rounded-none px-2.5 py-2 text-sm data-active:bg-transparent max-sm:gap-1 max-sm:px-2 sm:gap-2 sm:px-4"
                  >
                    <span className="inline-flex items-center gap-1.5 max-sm:[&_svg]:size-3.5 sm:gap-2">
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
