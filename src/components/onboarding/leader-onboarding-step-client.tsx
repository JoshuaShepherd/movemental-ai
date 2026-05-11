"use client";

import Link from "next/link";
import * as React from "react";
import ReactMarkdown from "react-markdown";

import { LeaderOnboardingShell } from "@/components/onboarding/leader-onboarding-shell";
import { Prose } from "@/components/primitives/prose";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  approveLeaderPublicPage,
  assertLeaderSignedVoiceCommitments,
  endorseReflectedUnderstanding,
  persistLeaderBio,
  persistLeaderPersonalPiece,
  persistLeaderPhotoUrl,
  publishLeaderPublicPage,
} from "@/app/(dashboard)/dashboard/onboarding/_actions/leader-onboarding-actions";
import type { LeaderOnboardingStep } from "@/lib/onboarding/leader-onboarding";
import { nextLeaderOnboardingHref } from "@/lib/onboarding/leader-onboarding";
import type { MovementLeaderRow } from "@/lib/movement-leaders/movement-leaders.server";

function afterHref(step: LeaderOnboardingStep): string {
  return nextLeaderOnboardingHref(step) ?? "/leader";
}

export function LeaderOnboardingStepClient({
  step,
  leader,
}: {
  step: LeaderOnboardingStep;
  leader: MovementLeaderRow;
}) {
  const ru =
    typeof leader.movement_leader_data?.reflected_understanding === "string"
      ? leader.movement_leader_data.reflected_understanding.trim()
      : "";

  switch (step) {
    case "confirm-bio":
      return <ConfirmBioStep leader={leader} />;
    case "upload-headshot":
      return <UploadHeadshotStep leader={leader} />;
    case "personal-piece":
      return <PersonalPieceStep leader={leader} />;
    case "review-reflected-understanding":
      return <ReflectStep markdown={ru} />;
    case "sign-commitments":
      return <SignCommitmentsStep />;
    case "review-public-page":
      return <ReviewPublicPageStep />;
    case "publish":
      return <PublishStep leader={leader} />;
    default:
      return null;
  }
}

function ConfirmBioStep({ leader }: { leader: MovementLeaderRow }) {
  const [bioShort, setBioShort] = React.useState(leader.bio_short ?? "");
  const [bioLong, setBioLong] = React.useState(leader.bio_long ?? "");
  const before = React.useCallback(async () => {
    const res = await persistLeaderBio({ bioShort, bioLong });
    return res.ok ? { ok: true as const } : { ok: false as const, message: res.message };
  }, [bioShort, bioLong]);
  return (
    <LeaderOnboardingShell
      title="Confirm your bio"
      description="Short and long bios power your public leader page and internal references. Edit them here."
      estimatedMinutes={10}
      afterCompleteHref={afterHref("confirm-bio")}
      beforeMarkComplete={before}
    >
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="bio-short">Short bio</Label>
          <Textarea id="bio-short" rows={3} value={bioShort} onChange={(e) => setBioShort(e.target.value)} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="bio-long">Long bio</Label>
          <Textarea id="bio-long" rows={8} value={bioLong} onChange={(e) => setBioLong(e.target.value)} />
        </div>
      </div>
    </LeaderOnboardingShell>
  );
}

function UploadHeadshotStep({ leader }: { leader: MovementLeaderRow }) {
  const [photoUrl, setPhotoUrl] = React.useState(leader.photo_url ?? "");
  const before = React.useCallback(async () => {
    const res = await persistLeaderPhotoUrl({ photoUrl });
    return res.ok ? { ok: true as const } : { ok: false as const, message: res.message };
  }, [photoUrl]);
  return (
    <LeaderOnboardingShell
      title="Headshot"
      description="Paste a public URL for your headshot (for example from Supabase Storage). Your team can swap in an upload flow later."
      estimatedMinutes={5}
      afterCompleteHref={afterHref("upload-headshot")}
      beforeMarkComplete={before}
    >
      <div className="space-y-2">
        <Label htmlFor="photo">Photo URL</Label>
        <Input id="photo" type="url" value={photoUrl} onChange={(e) => setPhotoUrl(e.target.value)} placeholder="https://…" />
      </div>
    </LeaderOnboardingShell>
  );
}

function PersonalPieceStep({ leader }: { leader: MovementLeaderRow }) {
  const [text, setText] = React.useState(leader.personal_piece ?? "");
  const before = React.useCallback(async () => {
    const res = await persistLeaderPersonalPiece({ personalPiece: text });
    return res.ok ? { ok: true as const } : { ok: false as const, message: res.message };
  }, [text]);
  return (
    <LeaderOnboardingShell
      title="Personal voice piece"
      description="A brief introduction in your own voice (~300 words). This anchors how Movemental represents you."
      estimatedMinutes={20}
      afterCompleteHref={afterHref("personal-piece")}
      beforeMarkComplete={before}
    >
      <Textarea rows={14} value={text} onChange={(e) => setText(e.target.value)} className="font-normal" />
    </LeaderOnboardingShell>
  );
}

function ReflectStep({ markdown }: { markdown: string }) {
  const before = React.useCallback(async () => {
    if (!markdown) {
      return { ok: true as const };
    }
    const res = await endorseReflectedUnderstanding();
    return res.ok ? { ok: true as const } : { ok: false as const, message: res.message };
  }, [markdown]);
  return (
    <LeaderOnboardingShell
      title="Reflected understanding"
      description="Read the generated essay. When it matches your intent, continue — we record your endorsement when a draft is present."
      estimatedMinutes={15}
      afterCompleteHref={afterHref("review-reflected-understanding")}
      beforeMarkComplete={before}
    >
      {markdown ? (
        <Prose as="article" className="rounded-xl bg-section px-4 py-5">
          <ReactMarkdown>{markdown}</ReactMarkdown>
        </Prose>
      ) : (
        <p className="text-sm text-muted-foreground">
          Your reflected-understanding draft is not loaded yet. You can continue — we will prompt you to endorse once
          Movemental publishes the essay into your profile.
        </p>
      )}
    </LeaderOnboardingShell>
  );
}

function SignCommitmentsStep() {
  const before = React.useCallback(async () => {
    const res = await assertLeaderSignedVoiceCommitments();
    return res.ok ? { ok: true as const } : { ok: false as const, message: res.message };
  }, []);
  return (
    <LeaderOnboardingShell
      title="Sign Movemental Voice Commitments"
      description="Review the commitments document and sign on the dedicated page, then return here to continue."
      estimatedMinutes={10}
      afterCompleteHref={afterHref("sign-commitments")}
      beforeMarkComplete={before}
    >
      <p className="text-sm text-muted-foreground">
        Open{" "}
        <Link href="/leader/sign-commitments" className="text-foreground underline">
          Sign commitments
        </Link>{" "}
        in another tab if you need to complete the signing flow.
      </p>
    </LeaderOnboardingShell>
  );
}

function ReviewPublicPageStep() {
  const before = React.useCallback(async () => {
    const res = await approveLeaderPublicPage();
    return res.ok ? { ok: true as const } : { ok: false as const, message: res.message };
  }, []);
  return (
    <LeaderOnboardingShell
      title="Review your public page"
      description="Preview how you appear publicly, then approve when you are ready for publishing."
      estimatedMinutes={10}
      afterCompleteHref={afterHref("review-public-page")}
      beforeMarkComplete={before}
    >
      <p className="text-sm text-muted-foreground">
        Preview at{" "}
        <Link href="/leader/public-page" className="text-foreground underline">
          Public page preview
        </Link>
        .
      </p>
    </LeaderOnboardingShell>
  );
}

function PublishStep({ leader }: { leader: MovementLeaderRow }) {
  const published = Boolean(leader.public_page_published_at);
  const before = React.useCallback(async () => {
    if (published) return { ok: true as const };
    const res = await publishLeaderPublicPage();
    return res.ok ? { ok: true as const } : { ok: false as const, message: res.message };
  }, [published]);
  return (
    <LeaderOnboardingShell
      title="Publish"
      description="Publishing makes your public leader page live for visitors who have the link."
      estimatedMinutes={5}
      afterCompleteHref="/leader"
      beforeMarkComplete={before}
    >
      {published ? (
        <p className="text-sm text-muted-foreground">Your page is already published. Continue to return to your workspace.</p>
      ) : (
        <p className="text-sm text-muted-foreground">
          When you continue, we set your public publish timestamp and take you to your leader home.
        </p>
      )}
    </LeaderOnboardingShell>
  );
}
