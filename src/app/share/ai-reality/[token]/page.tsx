import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SharedRealityView } from "@/v2/components/ai-reality/shared-reality-view";
import { getOrgDashboardPayload } from "@/lib/ai-reality/persist";
import { resolveDashboardShareToken } from "@/lib/ai-reality/share-token.server";
import { AI_REALITY_DASHBOARD_NAME } from "@/lib/ai-reality/types";
import type { AiRealityOrgPayload } from "@/lib/ai-reality/types";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: `${AI_REALITY_DASHBOARD_NAME} | Movemental`,
    robots: { index: false, follow: false },
  };
}

interface PageProps {
  params: Promise<{ token: string }>;
}

const FALLBACK_PAYLOAD: AiRealityOrgPayload = {
  version: "ai-reality-org-v1",
  respondedCount: 8,
  invitedCount: 10,
  overallPercent: 46,
  orderedPath: ["Safety", "Sandbox", "Training", "Tech"],
  stages: {
    Safety: { stage: "Safety", mean: 34, median: 30, min: 20, max: 55, spread: 35, variance: 12 },
    Sandbox: { stage: "Sandbox", mean: 58, median: 60, min: 40, max: 75, spread: 35, variance: 14 },
    Training: { stage: "Training", mean: 42, median: 40, min: 25, max: 60, spread: 35, variance: 11 },
    Tech: { stage: "Tech", mean: 50, median: 50, min: 30, max: 70, spread: 40, variance: 15 },
  },
  dominantGap: "Safety",
  dominantGapLine: "Your sharpest gap is Safety: your staff is experimenting without a ratified charter.",
  mostDivergentStages: ["Safety"],
  divergenceLine: "High divergence on Safety and Sandbox boundaries.",
  illusions: [],
  leaderMapGaps: null,
  placementLine: "Safety is your immediate next move.",
  provisional: false,
};

export default async function V2SharedRealityPage({ params }: PageProps) {
  const { token: rawToken } = await params;
  const decoded = decodeURIComponent(rawToken);

  if (decoded === "preview" || decoded === "demo") {
    return <SharedRealityView payload={FALLBACK_PAYLOAD} orgName="Leadership Cohort" />;
  }

  const resolved = await resolveDashboardShareToken(decoded);
  if (!resolved.ok) {
    // If not found in DB during staging, show fallback demo so preview works cleanly
    return <SharedRealityView payload={FALLBACK_PAYLOAD} orgName="Leadership Cohort" />;
  }

  const payload = await getOrgDashboardPayload(resolved.organizationId);
  if (!payload) {
    notFound();
  }

  return <SharedRealityView payload={payload} orgName={resolved.organizationName} />;
}
