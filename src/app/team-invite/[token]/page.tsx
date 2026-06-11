import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { TeamAssessment } from "@/components/ai-reality/team-assessment";
import { resolveAiRealityInviteByToken } from "@/lib/ai-reality/invite.server";

type PageProps = { params: Promise<{ token: string }> };

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "AI reality check-in",
    robots: { index: false, follow: false },
  };
}

/**
 * Anonymous teammate entry — modeled on the readiness-invite pattern. Resolves
 * the hashed invite token to an org, then renders the assessment that submits
 * against the invite + organization.
 */
export default async function TeamInvitePage({ params }: PageProps) {
  const { token: rawToken } = await params;
  const decoded = decodeURIComponent(rawToken);
  const resolved = await resolveAiRealityInviteByToken(decoded);
  if (!resolved.ok) {
    notFound();
  }

  return <TeamAssessment token={decoded} organizationName={resolved.organizationName} />;
}
