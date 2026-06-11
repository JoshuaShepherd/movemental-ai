import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { AiRealityDashboard } from "@/components/ai-reality/dashboard";
import { getOrgDashboardPayload } from "@/lib/ai-reality/persist";
import { resolveDashboardShareToken } from "@/lib/ai-reality/share-token.server";
import { AI_REALITY_DASHBOARD_NAME } from "@/lib/ai-reality/types";

type PageProps = { params: Promise<{ token: string }> };

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: AI_REALITY_DASHBOARD_NAME,
    robots: { index: false, follow: false },
  };
}

/**
 * Shareable, read-only view of the AI Reality Dashboard via a fresh hashed
 * token — deliberately NOT the legacy mDNA assessment-share route. Resolves the
 * token to an org and renders the precomputed payload.
 */
export default async function SharedAiRealityDashboardPage({ params }: PageProps) {
  const { token: rawToken } = await params;
  const resolved = await resolveDashboardShareToken(decodeURIComponent(rawToken));
  if (!resolved.ok) {
    notFound();
  }

  const payload = await getOrgDashboardPayload(resolved.organizationId);
  if (!payload) {
    notFound();
  }

  return <AiRealityDashboard payload={payload} organizationName={resolved.organizationName} />;
}
