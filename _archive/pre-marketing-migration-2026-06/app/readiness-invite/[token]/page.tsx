import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ReadinessIntakeWizard } from "@/components/sandboxlive/readiness-intake-wizard";
import {
  hashReadinessInviteToken,
  resolveReadinessInviteBySecretToken,
} from "@/lib/sandboxlive/readiness-invite.server";

type PageProps = { params: Promise<{ token: string }> };

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Staff readiness check-in",
    robots: { index: false, follow: false },
  };
}

export default async function ReadinessInvitePage({ params }: PageProps) {
  const { token: rawToken } = await params;
  const decoded = decodeURIComponent(rawToken);
  const resolved = await resolveReadinessInviteBySecretToken(decoded);
  if (!resolved.ok) {
    notFound();
  }

  const draftKey = hashReadinessInviteToken(decoded).slice(0, 24);

  return (
    <ReadinessIntakeWizard
      orgSlug={resolved.organizationSlug}
      orgQuery=""
      organizationName={resolved.organizationName}
      existingSubmission={null}
      inviteMode={{ token: decoded, draftKey }}
    />
  );
}
