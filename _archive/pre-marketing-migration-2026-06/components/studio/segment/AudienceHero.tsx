"use client";

import Link from "next/link";

import { BtnPill } from "@/components/sections-mock/primitives";
import { Container } from "@/components/studio/Container";
import { Reveal } from "@/components/studio/Reveal";

import { audienceContactHref, type AudienceKind } from "./audience-contact";

export type { AudienceKind } from "./audience-contact";

export function AudienceHero({ audience }: { audience: AudienceKind }) {
  const contactHref = audienceContactHref(audience);

  if (audience === "churches") {
    return (
      <section className="border-b border-border py-16 md:py-24" id="hero" aria-labelledby="audience-hero-h1">
        <Container>
          <Reveal>
            <div className="max-w-4xl">
              <h1
                id="audience-hero-h1"
                className="mb-10 font-serif-display text-6xl leading-[0.95] tracking-tight text-foreground md:text-7xl lg:text-[5.5rem]"
              >
                Movemental for <em className="italic text-muted-foreground">Churches.</em>
              </h1>
              <p className="max-w-3xl text-xl font-light leading-relaxed text-muted-foreground md:text-2xl">
                Movemental guides churches through a four-stage path for wise AI adoption.
              </p>
              <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:items-center">
                <BtnPill href={contactHref} variant="primary">
                  Start a conversation
                </BtnPill>
                <Link
                  href="/pricing"
                  className="text-sm font-medium text-muted-foreground underline decoration-border decoration-1 underline-offset-4 transition-colors hover:text-foreground hover:decoration-foreground"
                >
                  View packages and pricing
                </Link>
              </div>
            </div>
          </Reveal>
        </Container>
      </section>
    );
  }

  if (audience === "nonprofits") {
    return (
      <section className="border-b border-border py-16 md:py-24" id="hero" aria-labelledby="audience-hero-h1">
        <Container>
          <Reveal>
            <div className="mx-auto flex max-w-4xl flex-col gap-8 md:gap-12">
              <h1
                id="audience-hero-h1"
                className="font-serif-display text-5xl font-normal leading-[1.05] tracking-tight text-foreground md:text-7xl"
              >
                Movemental for <span className="italic text-primary">Nonprofits.</span>
              </h1>
              <div className="flex max-w-[600px] flex-col gap-6 border-l border-border pl-6 md:pl-8">
                <p className="font-sans text-xl font-medium leading-snug text-foreground md:text-2xl">
                  Your mission is not generic. Your AI response shouldn&apos;t be either.
                </p>
                <p className="text-base leading-relaxed text-muted-foreground md:text-lg">
                  Movemental guides mission-driven nonprofits through a four-stage path for adopting AI without compromising donor trust,
                  beneficiary safety, or mission integrity.
                </p>
                <div className="flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:items-center">
                  <BtnPill href={contactHref} variant="primary">
                    Start a conversation
                  </BtnPill>
                  <Link
                    href="/pricing"
                    className="text-sm font-medium text-muted-foreground underline decoration-border decoration-1 underline-offset-4 transition-colors hover:text-foreground hover:decoration-foreground"
                  >
                    View packages and pricing
                  </Link>
                </div>
              </div>
            </div>
          </Reveal>
        </Container>
      </section>
    );
  }

  return (
    <section className="border-b border-border py-16 md:py-24" id="hero" aria-labelledby="audience-hero-h1">
      <Container>
        <Reveal>
          <div className="mx-auto max-w-4xl">
            <span className="mb-6 block text-[10px] font-semibold uppercase tracking-[0.25em] text-muted-foreground">For institutions</span>
            <h1
              id="audience-hero-h1"
              className="mb-8 font-serif-display text-5xl leading-tight tracking-tight text-foreground md:text-6xl lg:text-7xl"
            >
              Your institution is being asked to lead on AI — <em className="italic text-muted-foreground">internally</em> and{" "}
              <em className="italic text-muted-foreground">externally</em>.
            </h1>
            <p className="text-xl leading-relaxed text-muted-foreground md:text-2xl">
              Seminaries, training networks, and denominational bodies answer the AI question twice: for governance on campus, and for the
              leaders you form. Movemental sequences Safety, Sandbox, Skills, and Solutions so both layers stay coherent.
            </p>
            <p className="mt-8 border-l-2 border-primary pl-6 text-[1.0625rem] font-medium leading-relaxed text-foreground">
              Step 1 is the human work. We won&apos;t build solutions on top of an institution that hasn&apos;t done it — ours or yours.
            </p>
            <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:items-center">
              <BtnPill href={contactHref} variant="primary">
                Start a conversation
              </BtnPill>
              <Link
                href="/pricing"
                className="text-sm font-medium text-muted-foreground underline decoration-border decoration-1 underline-offset-4 transition-colors hover:text-foreground hover:decoration-foreground"
              >
                View packages and pricing
              </Link>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
