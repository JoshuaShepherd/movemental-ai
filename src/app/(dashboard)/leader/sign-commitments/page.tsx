import type { Metadata } from "next";
import Link from "next/link";

import { Display } from "@/components/primitives/display";
import { Eyebrow } from "@/components/primitives/eyebrow";
import { Prose } from "@/components/primitives/prose";
import { Section } from "@/components/primitives/section";
import { MOVEMENT_VOICE_COMMITMENTS_VERSION } from "@/lib/movement-leaders/commitments-doc";
import {
  getMovementLeaderByEmail,
  hasSignedVoiceCommitments,
} from "@/lib/movement-leaders/movement-leaders.server";
import { createClient } from "@/lib/supabase/server";

import { SignCommitmentsForm } from "./sign-commitments-form";

export const metadata: Metadata = {
  title: "Sign commitments",
};

export default async function SignCommitmentsPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const leader = await getMovementLeaderByEmail(user?.email ?? null);
  const signed = leader ? await hasSignedVoiceCommitments(leader.id) : false;

  return (
    <div className="space-y-10">
      <header className="space-y-3">
        <Eyebrow>Movemental Voice Commitments</Eyebrow>
        <Display as="h1" size="sm" className="text-balance">
          Sign the commitments
        </Display>
        <p className="max-w-(--prose-max) text-muted-foreground">
          This records your agreement alongside the public document at{" "}
          <Link href="/movement-voice-commitments" className="text-foreground underline">
            /movement-voice-commitments
          </Link>
          . Version <span className="text-foreground">{MOVEMENT_VOICE_COMMITMENTS_VERSION}</span>.
        </p>
      </header>
      <Section variant="section" spacing="sm" className="rounded-xl">
        {signed ? (
          <Prose>
            <p>
              Your signature for version {MOVEMENT_VOICE_COMMITMENTS_VERSION} is already on file.
              Thank you.
            </p>
          </Prose>
        ) : (
          <SignCommitmentsForm />
        )}
      </Section>
    </div>
  );
}
