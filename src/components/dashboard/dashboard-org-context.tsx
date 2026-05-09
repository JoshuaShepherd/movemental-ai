"use client";

import * as React from "react";
import { useSearchParams } from "next/navigation";

export type DashboardOrgContextValue = {
  organizationSlug: string;
};

const DashboardOrgContext = React.createContext<DashboardOrgContextValue>({
  organizationSlug: "",
});

export function DashboardOrgProvider({
  initialSlug,
  children,
}: {
  initialSlug: string;
  children: React.ReactNode;
}) {
  const searchParams = useSearchParams();
  const organizationSlug = searchParams.get("org") ?? initialSlug;

  return (
    <DashboardOrgContext.Provider value={{ organizationSlug }}>
      {children}
    </DashboardOrgContext.Provider>
  );
}

export function useDashboardOrganizationSlug(): string {
  return React.useContext(DashboardOrgContext).organizationSlug;
}
