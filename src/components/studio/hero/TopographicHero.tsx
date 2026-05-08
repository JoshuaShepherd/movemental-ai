"use client";

import Image from "next/image";
import Link from "next/link";

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
      className="band-midnight relative overflow-hidden bg-[#0E1726] py-16 md:py-24 lg:py-32"
      aria-labelledby="hero-h1"
    >
      {/*
        Desktop-only terrain: absolute-positioned to the section so it can
        bleed off the right edge of the viewport. Sits behind the text
        (z-index defaults; the text wrapper raises itself with z-10).
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
            className="object-cover object-left opacity-40 mix-blend-screen"
          />
        </div>
      </div>

      <Container>
        <div className="relative z-10 max-w-2xl lg:max-w-[58%]">
          <Reveal>
            <p className="mb-6 text-[11px] font-medium uppercase tracking-[0.12em] text-[#F0EBE0]/60">
              For organizational leaders
            </p>

            <h1
              id="hero-h1"
              className="font-serif-display text-[clamp(2.5rem,5vw,4rem)] font-normal leading-[1.1] tracking-[-0.01em] text-[#F0EBE0]"
            >
              AI is already inside your organization.
            </h1>

            <p className="mt-6 font-serif-display text-[clamp(2.5rem,5vw,4rem)] font-normal leading-[1.1] tracking-[-0.01em] text-[#F0EBE0] lg:mt-8">
              We built a path to walk you through the organizational and
              technological challenges posed by AI.
            </p>

            <p className="mt-12 max-w-[640px] text-[17px] leading-[1.6] text-[#F0EBE0]/70 md:text-[18px]">
              Four stages, ordered to ensure a strong human foundation
              precedes any technological implementation. Safety first: the
              governance that answers the questions your people are asking.
              Sandbox: disciplined exploration of valuable AI use cases and
              ethical concerns, without the risks of publication and privacy
              issues. Skills: formation that produces leaders, not just
              users. Solutions: AI-integrated technological deployment built
              on the secure foundation.
            </p>

            <p className="mt-8 font-serif-display text-[18px] italic text-[#B8893A]/80 md:text-[20px]">
              Begin in two weeks for $2,500.
            </p>

            <div className="mt-10 flex flex-col gap-3 md:flex-row md:gap-4">
              <Link
                href="/pathway"
                className="inline-flex items-center justify-center rounded-full bg-[#F0EBE0] px-7 py-3.5 text-base font-medium text-[#0E1726] transition-transform duration-200 ease-out motion-safe:hover:-translate-y-0.5"
              >
                See the Path
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center rounded-full border border-[#F0EBE0]/30 px-7 py-3.5 text-base font-medium text-[#F0EBE0] transition-colors duration-200 ease-out hover:bg-[#F0EBE0]/5"
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
            <div className="relative mx-auto aspect-[16/10] w-full max-w-[560px] opacity-40">
              <Image
                src="/images/hero/hero-home.webp"
                alt=""
                fill
                sizes="(max-width: 1023px) 100vw, 0px"
                className="object-cover mix-blend-screen"
              />
            </div>
          </div>
        )}
      </Container>
    </section>
  );
}
