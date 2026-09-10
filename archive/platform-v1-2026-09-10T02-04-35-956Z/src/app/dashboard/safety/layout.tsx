import type { ReactNode } from "react";

import { requireSafetyDashboardSession } from "@/lib/dashboard/require-dashboard-session";

export default async function SafetyDashboardLayout({ children }: { children: ReactNode }) {
  await requireSafetyDashboardSession();
  return children;
}
