"use client";

import Link from "next/link";

import { Container } from "@/components/studio/Container";
import { Reveal } from "@/components/studio/Reveal";
import { audienceContactHref, type AudienceKind } from "@/components/studio/segment/audience-contact";
import { ToolkitOpenButton } from "@/components/toolkit/ToolkitOpenButton";

const AUDIENCE_LABEL: Record<AudienceKind, string> = {
  churches: "churches",
  nonprofits: "nonprofits",
  institutions: "institutions",
};

const AUDIENCE_BODY: Record<AudienceKind, string> = {
  churches:
    "Most churches who walk the Movemental path begin with Safety. Two weeks of facilitated work produces the seven artifacts your board, staff, and elders need to govern AI before any tools get deployed. The cost is $1,000.",
  nonprofits:
    "Most nonprofits who walk the Movemental path begin with Safety. Two weeks of facilitated work produces the seven artifacts your board needs to govern AI as part of fiduciary responsibility. The cost is $1,000.",
  institutions:
    "Most institutions who walk the Movemental path begin with Safety. Two weeks of facilitated work produces the seven artifacts your board, accreditation context, and faculty governance require. The cost is $1,000.",
};

const STAGE_LINKS: readonly { label: string; href: string }[] = [
  { label: "Safety", href: "/pathway/safety" },
  { label: "Sandbox", href: "/pathway/sandbox" },
  { label: "Skills", href: "/pathway/skills" },
  { label: "Solutions", href: "/pathway/solutions" },
  { label: "Pricing", href: "/pricing" },
];

export function AudienceClosingCta({ audience }: { audience: AudienceKind }) {
  const contactHref = audienceContactHref(audience);
  const audienceLabel = AUDIENCE_LABEL[audience];

  return (
    <section
      className="band-midnight relative overflow-hidden"
      aria-labelledby="audience-closing-cta-title"
      id="closing-cta"
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-80"
        style={{
          background:
            "radial-gradient(ellipse at center, var(--inverse-surface) 0%, color-mix(in oklab, var(--inverse-surface) 75%, var(--foreground)) 100%)",
        }}
        aria-hidden
      />
      <Container className="relative z-10 text-center">
        <Reveal>
          <span className="section-eyebrow mb-6 block text-inverse-foreground/80">Where to begin</span>

          <h2
            id="audience-closing-cta-title"
            className="display mx-auto mb-6 max-w-3xl text-inverse-foreground"
          >
            Most {audienceLabel} <em>begin with Safety.</em>
          </h2>
          <p className="lede mx-auto mb-6 max-w-2xl text-inverse-foreground/80">
            {AUDIENCE_BODY[audience]}
          </p>
          <p className="mx-auto mb-10 max-w-2xl text-base italic leading-relaxed text-inverse-foreground/70">
            Or download the free toolkit and start with the self-assessment. No commitment. Sixteen pages. Read it
            in an evening.
          </p>

          <div className="mb-10 flex flex-wrap items-center justify-center gap-4 md:gap-6">
            <ToolkitOpenButton source={`audience-${audience}`} variant="midnight-primary">
              Download the free Safety toolkit
            </ToolkitOpenButton>
            <Link href={contactHref} className="btn-pill btn-pill--ghost">
              Start a conversation
            </Link>
          </div>

          <nav
            aria-label="Pathway and pricing"
            className="flex flex-wrap items-center justify-center gap-x-3 gap-y-2 text-sm text-inverse-foreground/70"
          >
            {STAGE_LINKS.map((s, i) => (
              <span key={s.href} className="inline-flex items-center gap-x-3">
                {i > 0 ? (
                  <span className="text-inverse-border" aria-hidden>
                    ·
                  </span>
                ) : null}
                <Link
                  href={s.href}
                  className="underline decoration-inverse-border decoration-1 underline-offset-4 transition-colors hover:text-inverse-foreground"
                >
                  {s.label}
                </Link>
              </span>
            ))}
          </nav>
        </Reveal>
      </Container>
    </section>
  );
}
