"use client";

import Image from "next/image";
import type { ReactNode } from "react";

import { Container } from "@/components/studio/Container";
import { Reveal } from "@/components/studio/Reveal";

interface LightTextureHeroProps {
  /** Small uppercase kicker above the title (e.g. "For churches"). */
  eyebrow?: string;
  /** Display headline. ReactNode so consumers can mark <em> italics inline. */
  title: ReactNode;
  /** Optional supporting copy under the title. ReactNode for multi-paragraph blocks. */
  subhead?: ReactNode;
  /** Optional content rendered after the subhead — typically CTAs or entry cards. */
  children?: ReactNode;
  /** When true, the terrain texture is hidden entirely on mobile (<lg). */
  hideImageOnMobile?: boolean;
  /** Override the texture asset. Defaults to the home topography. */
  textureSrc?: string;
  /** DOM id for the heading; used by `aria-labelledby` on the section. */
  headingId?: string;
}

/**
 * Light-default companion to TopographicHero. Uses the same terrain image as
 * a low-opacity texture on the right edge — `filter: invert()` flips the
 * source to dark linework, `mix-blend-multiply` lets it gently darken the
 * cream surface, and a left-to-right wash keeps the text column clean.
 *
 * Reserve TopographicHero (midnight) for the home entrance and closing CTAs;
 * use this for audience landings so the system keeps a tonal arc instead of
 * three back-to-back midnight bands.
 */
export function LightTextureHero({
  eyebrow,
  title,
  subhead,
  children,
  hideImageOnMobile = false,
  textureSrc = "/images/hero/hero-home.webp",
  headingId = "hero-h1",
}: LightTextureHeroProps) {
  return (
    <section
      className="band-default relative overflow-hidden bg-background py-16 md:py-24 lg:py-32"
      aria-labelledby={headingId}
    >
      {/*
        Desktop-only terrain: absolute-positioned to the section so it can
        bleed off the right edge. Inverted + multiplied + heavily washed so the
        topography reads as ambient texture, never as a picture.
      */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 right-0 hidden w-[58vw] max-w-[960px] lg:block xl:w-[52vw]"
      >
        <div className="relative h-full w-full">
          <Image
            src={textureSrc}
            alt=""
            fill
            priority
            sizes="(max-width: 1023px) 0px, 58vw"
            style={{ filter: "invert(1)" }}
            className="object-cover object-left opacity-[0.16] mix-blend-multiply"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/85 to-background/35" />
        </div>
      </div>

      <Container>
        <div className="relative z-10 max-w-2xl lg:max-w-[58%]">
          <Reveal>
            {eyebrow ? (
              <p className="mb-6 text-[11px] font-medium uppercase tracking-[0.12em] text-muted-foreground">
                {eyebrow}
              </p>
            ) : null}

            <h1
              id={headingId}
              className="font-serif-display text-[clamp(2.5rem,5vw,4rem)] font-normal leading-[1.1] tracking-[-0.01em] text-foreground"
            >
              {title}
            </h1>

            {subhead ? (
              <div className="mt-8 max-w-[640px] space-y-5 text-[17px] leading-[1.6] text-muted-foreground md:text-[18px] lg:mt-10">
                {subhead}
              </div>
            ) : null}

            {children ? <div className="mt-10 md:mt-12">{children}</div> : null}
          </Reveal>
        </div>

        {/*
          Mobile-only terrain: in-flow ambient close below the body content.
        */}
        {!hideImageOnMobile ? (
          <div
            aria-hidden="true"
            className="relative z-10 mt-12 lg:hidden"
          >
            <div className="relative mx-auto aspect-[16/10] w-full max-w-[560px]">
              <Image
                src={textureSrc}
                alt=""
                fill
                sizes="(max-width: 1023px) 100vw, 0px"
                style={{ filter: "invert(1)" }}
                className="object-cover opacity-[0.18] mix-blend-multiply"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-background via-background/40 to-background/80" />
            </div>
          </div>
        ) : null}
      </Container>
    </section>
  );
}
