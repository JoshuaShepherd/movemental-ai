import type { Metadata } from "next";

import { DashboardShellView } from "@/v2/components/dashboard/dashboard-shell-view";
import { requireSafetyDashboardSession } from "@/lib/dashboard/require-dashboard-session";
import { loadCharterDashboardForOrg } from "@/lib/services/safety/charter-dashboard";

export const metadata: Metadata = {
  title: "Safety · Charter Dashboard | Movemental",
  robots: { index: false, follow: false },
};

export default async function V2SafetyDashboardPage() {
  const session = await requireSafetyDashboardSession();
  const result = await loadCharterDashboardForOrg(session.organizationId);

  if (!result.success) {
    return (
      <main
        style={{
          maxWidth: "36rem",
          margin: "0 auto",
          padding: "4rem 1.5rem",
        }}
      >
        <p style={{ color: "var(--color-ink-band-ink-muted)" }}>
          Could not load charter data. Try again or contact support.
        </p>
      </main>
    );
  }

  return (
    <DashboardShellView payload={result.data} userEmail={session.user.email ?? null} />
  );
}
