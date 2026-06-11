import type { Metadata } from "next";

import { CharterDashboardShell } from "@/components/safety-dashboard/charter-dashboard-shell";
import { requireSafetyDashboardSession } from "@/lib/dashboard/require-dashboard-session";
import { loadCharterDashboardForOrg } from "@/lib/services/safety/charter-dashboard";

export const metadata: Metadata = {
  title: "Safety · Charter Dashboard",
  robots: { index: false, follow: false },
};

export default async function SafetyDashboardPage() {
  const session = await requireSafetyDashboardSession();
  const result = await loadCharterDashboardForOrg(session.organizationId);

  if (!result.success) {
    return (
      <main className="mx-auto max-w-xl px-4 py-16">
        <p className="text-muted-foreground">Could not load charter data. Try again or contact support.</p>
      </main>
    );
  }

  return (
    <CharterDashboardShell payload={result.data} userEmail={session.user.email ?? null} />
  );
}
