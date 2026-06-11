import type { Metadata } from "next";
import { redirect } from "next/navigation";

import { SsssIntegrityDiagnostic } from "@/components/assessment/ssss-integrity-diagnostic";
import { AI_REALITY_INSTRUMENT_NAME } from "@/lib/ai-reality/types";
import { getOptionalAuthUser } from "@/lib/supabase/server";

export const metadata: Metadata = {
  title: AI_REALITY_INSTRUMENT_NAME,
  robots: { index: false, follow: false },
};

/**
 * The deeper, scored instrument — authenticated leaders only. Anonymous visitors
 * are sent to the passwordless front door first so their result ties to identity.
 */
export default async function AgentAssessmentPage() {
  const { user } = await getOptionalAuthUser();
  if (!user) {
    redirect("/assess");
  }

  return (
    <main className="mx-auto w-full max-w-2xl px-4 py-12 md:py-16">
      <SsssIntegrityDiagnostic />
    </main>
  );
}
