"use client";

import type { ReactNode } from "react";

import { Container } from "@/components/studio/Container";
import { Reveal } from "@/components/studio/Reveal";

import type { AudienceKind } from "./audience-contact";

const COPY: Record<AudienceKind, { eyebrow: string; body: ReactNode }> = {
  churches: {
    eyebrow: "Why the order matters for churches",
    body: (
      <>
        For churches, the order matters more than the menu. <em>Safety</em> first because the questions your staff and elders are asking
        deserve answers before tools get deployed. <em>Sandbox</em> second because exploration without discipline produces sermon-prep
        shortcuts you will regret. <em>Skills</em> third because formation produces leaders who can teach a congregation, not just users who
        can prompt a chatbot. <em>Solutions</em> last because deployment built on the foundation you have ratified is the only kind that
        holds.
      </>
    ),
  },
  nonprofits: {
    eyebrow: "Why the order matters for nonprofits",
    body: (
      <>
        For nonprofits, the order matters more than the menu. <em>Safety</em> first because your board&apos;s fiduciary expectations and
        your donors&apos; trust are not optional. <em>Sandbox</em> second because individual staff exploration without governance is exactly
        the pattern that produces the adoption-and-capability gap the sector is documenting. <em>Skills</em> third because formation
        produces leaders, not just users. <em>Solutions</em> last because deployment built on a foundation works and deployment without a
        foundation breaks.
      </>
    ),
  },
  institutions: {
    eyebrow: "Why the order matters for institutions",
    body: (
      <>
        For institutions, the order matters more than the menu. <em>Safety</em> first because your board&apos;s fiduciary expectations are
        not optional and your accreditation context is non-negotiable. <em>Sandbox</em> second because institutional risk tolerance does not
        allow individual staff exploration without governance. <em>Skills</em> third because your faculty and staff need formation, not
        training. <em>Solutions</em> last because deployment without a foundation is what produces the failures you have watched at peer
        institutions.
      </>
    ),
  },
};

export function AudiencePathBridge({ audience }: { audience: AudienceKind }) {
  const { eyebrow, body } = COPY[audience];
  return (
    <section id="path-bridge" aria-labelledby="path-bridge-heading" className="band-default py-20 md:py-24">
      <Container>
        <Reveal>
          <div className="mx-auto max-w-[760px]">
            <span className="section-eyebrow mb-4 block text-muted-foreground">{eyebrow}</span>
            <h2 id="path-bridge-heading" className="mb-6 font-serif-display text-2xl leading-tight tracking-tight text-foreground md:text-3xl">
              The order is the work.
            </h2>
            <p className="text-base leading-relaxed text-muted-foreground md:text-lg">{body}</p>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
