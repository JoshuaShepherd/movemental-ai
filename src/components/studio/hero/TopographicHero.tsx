"use client";

import Image from "next/image";
import Link from "next/link";

import { Cite } from "@/components/citations";
import { Container } from "@/components/studio/Container";
import { Reveal } from "@/components/studio/Reveal";

interface TopographicHeroProps {
  /**
   * When true, the terrain image is hidden on mobile (<lg) entirely.
   * Defaults to false — mobile shows the terrain as an ambient close below
   * the CTAs.
   */
  hideImageOnMobile?: boolean;
}

export function TopographicHero({ hideImageOnMobile = false }: TopographicHeroProps) {
  return (
    <section
      data-variant="midnight"
      className="band-midnight relative overflow-hidden bg-inverse-surface py-16 md:py-24 lg:py-32"
      aria-labelledby="hero-h1"
    >
      {/*
        Desktop-only terrain: absolute-positioned to the section so it can
        bleed off the right edge of the viewport. Treated as ambient texture —
        very low opacity, with a left-to-right wash that pulls it back into
        the inverse-surface so text stays the focal point.
      */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 right-0 hidden w-[58vw] max-w-[960px] lg:block xl:w-[52vw]"
      >
        <div className="relative h-full w-full">
          <Image
            src="/images/hero/hero-home.webp"
            alt=""
            fill
            priority
            sizes="(max-width: 1023px) 0px, 58vw"
            className="object-cover object-left opacity-[0.12] mix-blend-luminosity"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-inverse-surface via-inverse-surface/85 to-inverse-surface/55" />
        </div>
      </div>

      <Container>
        <div className="relative z-10 max-w-2xl lg:max-w-[58%]">
          <Reveal>
            <p className="mb-6 text-[11px] font-medium uppercase tracking-[0.12em] text-inverse-muted">
              For organizational leaders
            </p>

            <h1
              id="hero-h1"
              className="font-serif-display text-[clamp(2.5rem,5vw,4rem)] font-normal leading-[1.1] tracking-[-0.01em] text-inverse-foreground"
            >
              AI is already inside your organization.
            </h1>

            <p className="mt-6 font-serif-display text-[clamp(2.5rem,5vw,4rem)] font-normal leading-[1.1] tracking-[-0.01em] text-inverse-foreground lg:mt-8">
              We built a path to walk you through the organizational and
              technological challenges posed by AI.
            </p>

            <p className="mt-12 max-w-[640px] text-[17px] leading-[1.6] text-inverse-muted md:text-[18px]">
              Four stages, ordered to ensure a strong human foundation
              precedes any technological implementation
              <Cite claimId="mckinsey-workflow-redesign" />. Safety first:
              the governance that answers the questions your people are
              asking. Sandbox: disciplined exploration of valuable AI use
              cases and ethical concerns, without the risks of publication
              and privacy issues. Skills: formation that produces leaders,
              not just users. Solutions: AI-integrated technological
              deployment built on the secure foundation.
            </p>

            <div className="mt-10 flex flex-col gap-3 md:flex-row md:gap-4">
              <Link
                href="/pathway"
                className="inline-flex items-center justify-center rounded-full bg-inverse-foreground px-7 py-3.5 text-base font-medium text-inverse-surface transition-transform duration-200 ease-out motion-safe:hover:-translate-y-0.5"
              >
                See the Path
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center rounded-full border border-inverse-border px-7 py-3.5 text-base font-medium text-inverse-foreground transition-colors duration-200 ease-out hover:bg-inverse-foreground/5"
              >
                Start a Conversation
              </Link>
            </div>
          </Reveal>
        </div>

        {/*
          Mobile-only terrain: in-flow ambient close below the CTAs.
          Hidden when the consumer opts in via `hideImageOnMobile`.
        */}
        {!hideImageOnMobile && (
          <div
            aria-hidden="true"
            className="relative z-10 mt-12 lg:hidden"
          >
            <div className="relative mx-auto aspect-[16/10] w-full max-w-[560px] opacity-[0.18]">
              <Image
                src="/images/hero/hero-home.webp"
                alt=""
                fill
                sizes="(max-width: 1023px) 100vw, 0px"
                className="object-cover mix-blend-luminosity"
              />
            </div>
          </div>
        )}
      </Container>
    </section>
  );
}
