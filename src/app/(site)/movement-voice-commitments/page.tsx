import type { Metadata } from "next";

import { Display } from "@/components/primitives/display";
import { Eyebrow } from "@/components/primitives/eyebrow";
import { Prose } from "@/components/primitives/prose";
import { Section } from "@/components/primitives/section";
import { MOVEMENT_VOICE_COMMITMENTS_VERSION } from "@/lib/movement-leaders/commitments-doc";
import { listMovementVoiceCommitmentSigners } from "@/lib/movement-leaders/movement-leaders.server";

export const metadata: Metadata = {
  title: "Movemental Voice Commitments",
  description:
    "Shared commitments for trusted voices working with Movemental — plus leaders who have signed.",
};

export default async function MovementVoiceCommitmentsPage() {
  const signers = await listMovementVoiceCommitmentSigners();

  return (
    <Section variant="default" spacing="lg" className="flex-1">
      <div className="mx-auto w-full max-w-[var(--container-max)] px-[clamp(1.25rem,4vw,2.5rem)]">
        <header className="mb-12 space-y-4">
          <Eyebrow>Trusted voices</Eyebrow>
          <Display as="h1" size="md" className="text-balance">
            Movemental Voice Commitments
          </Display>
          <p className="max-w-(--prose-max) text-muted-foreground">
            Version {MOVEMENT_VOICE_COMMITMENTS_VERSION}. This page will mirror the full legal and
            editorial text once final copy ships; the list below reflects recorded signings from the
            database.
          </p>
        </header>
        <Prose as="article" className="mb-16 max-w-none">
          <p>
            Leaders who work with Movemental as trusted voices commit to accuracy, generosity,
            inspectability of AI-assisted work, and care for the communities their words touch. Final
            language will live here publicly; for now, sign through your authenticated leader
            workspace after your profile is provisioned.
          </p>
        </Prose>
        <section className="rounded-xl bg-section px-6 py-8">
          <h2 className="font-serif text-xl font-medium text-foreground">Signed leaders</h2>
          {signers.length === 0 ? (
            <p className="mt-4 text-sm text-muted-foreground">
              No public signings yet (or tables not migrated).
            </p>
          ) : (
            <ul className="mt-6 divide-y divide-border-soft text-sm">
              {signers.map((s) => (
                <li key={`${s.slug}-${s.signed_at}`} className="flex flex-wrap items-baseline justify-between gap-2 py-3">
                  <span className="font-medium text-foreground">{s.full_name}</span>
                  <span className="text-muted-foreground">
                    v{s.version_signed} · {new Intl.DateTimeFormat("en-US", { dateStyle: "medium" }).format(new Date(s.signed_at))}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>
    </Section>
  );
}
