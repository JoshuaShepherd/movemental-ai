import { CharterDashboardShell } from "@/components/safety-dashboard/charter-dashboard-shell";
import type { CharterDashboardPayload } from "@/lib/services/safety/charter-dashboard";

interface DashboardShellViewProps {
  payload: CharterDashboardPayload;
  userEmail?: string | null;
}

/**
 * Staging view for Movemental Charter Dashboard.
 * Matches design specification in Movemental Dashboard.dc.html (D1-D5).
 */
export function DashboardShellView({ payload, userEmail }: DashboardShellViewProps) {
  return <CharterDashboardShell payload={payload} userEmail={userEmail} />;
}
