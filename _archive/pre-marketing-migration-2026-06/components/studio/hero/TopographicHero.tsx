"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Download } from "lucide-react";

import { Cite } from "@/components/citations";
import { Container } from "@/components/studio/Container";
import { Reveal } from "@/components/studio/Reveal";
import {
  SAFESTART_SEAT_CAP,
  SAFESTART_SEAT_COUNT,
} from "@/lib/safestart-seats";

type Stage = { num: string; title: string; active?: boolean };

const STAGES: readonly Stage[] = [
  { num: "01", title: "Safety", active: true },
  { num: "02", title: "Sandbox" },
  { num: "03", title: "Skills" },
  { num: "04", title: "Solutions" },
];

export function TopographicHero() {
  return (
    <section
      className="relative overflow-hidden bg-background pt-6 pb-12 sm:pt-8 sm:pb-14 md:pt-10 md:pb-16 lg:pt-12 lg:pb-20"
      aria-labelledby="hero-h1"
    >
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
            className="object-cover object-left opacity-[0.18] mix-blend-multiply dark:opacity-[0.13] dark:mix-blend-screen dark:invert"
          />
          <div className="absolute inset-0 bg-linear-to-r from-background via-background/80 to-background/40 dark:via-background/82 dark:to-background/38" />
        </div>
      </div>

      <Container className="relative z-10">
        <Reveal>
          <div className="max-w-4xl">
            <div className="mb-4 flex flex-col gap-1">
              <span className="text-[11px] font-medium uppercase tracking-[0.12em] text-muted-foreground">
                For organizational leaders
              </span>
              <span className="text-[13px] font-medium uppercase tracking-[0.10em] text-foreground">
                Nonprofits · Churches · Institutions
              </span>
            </div>

            <h1
              id="hero-h1"
              className="font-serif italic font-normal text-foreground leading-[1.05] tracking-[-0.02em] text-[clamp(2.75rem,7vw,5.5rem)]"
            >
              AI is already inside your organization
              <Cite claimId="nonprofit-92-adoption" />.
            </h1>

            <p className="mt-5 max-w-2xl text-[18px] leading-[1.55] text-foreground md:mt-6 md:text-[20px] md:leading-[1.5]">
              It&rsquo;s being used by people inside your organization right
              now — in drafts, in correspondence, in counsel given. Most
              leaders have not yet decided what is safe, valuable, or ethical
              for their work. The four-stage path below is how you decide, in
              writing, before you build anything else.
            </p>
          </div>

          {/* Compressed stage indicator — single row, Safety emphasised */}
          <div className="mt-10 border-t border-border pt-6 md:mt-12 md:pt-8">
            <ol
              aria-label="The Movemental Path — four stages, in order"
              className="grid grid-cols-2 gap-x-6 gap-y-4 md:grid-cols-4 md:gap-x-8"
            >
              {STAGES.map((stage, idx) => (
                <li
                  key={stage.num}
                  className="flex items-baseline gap-3 md:block"
                >
                  <div
                    className={[
                      "font-serif italic leading-none text-[1.5rem] md:text-[1.75rem] md:mb-2",
                      stage.active
                        ? "text-pathway-accent"
                        : "text-foreground/35",
                    ].join(" ")}
                  >
                    {stage.num}
                    <span aria-hidden>.</span>
                  </div>
                  <div className="flex flex-col gap-0.5">
                    <span
                      className={[
                        "text-[15px] md:text-base font-medium tracking-tight",
                        stage.active ? "text-foreground" : "text-muted-foreground",
                      ].join(" ")}
                    >
                      {stage.title}
                    </span>
                    {stage.active ? (
                      <span className="text-[10.5px] font-medium uppercase tracking-eyebrow text-pathway-accent">
                        Start here
                      </span>
                    ) : (
                      <span className="text-[10.5px] font-medium uppercase tracking-eyebrow text-muted-foreground/70">
                        Stage {idx + 1}
                      </span>
                    )}
                  </div>
                </li>
              ))}
            </ol>

            <p className="mt-6 text-[14px] text-muted-foreground">
              <Link
                href="/pathway"
                className="group inline-flex items-center gap-1.5 border-b border-foreground/30 pb-0.5 text-foreground transition-colors hover:border-foreground"
              >
                Start with Safety. The path is sequential.
                <ArrowRight
                  className="size-3.5 transition-transform duration-200 group-hover:translate-x-0.5"
                  aria-hidden
                />
              </Link>
            </p>
          </div>

          {/* Differentiated CTAs — paid commitment vs free download */}
          <div className="mt-10 flex flex-col gap-4 md:mt-12 md:flex-row md:items-end md:gap-6">
            <div className="flex flex-col items-start gap-1.5">
              <Link
                href="/contact?interest=safestart"
                className="btn-pill btn-pill--primary px-7 py-3.5"
                aria-label="Start SafeStart — the $1,000 facilitated engagement"
              >
                Start SafeStart
                <ArrowRight className="size-4" aria-hidden />
              </Link>
              <span className="text-[12px] font-medium uppercase tracking-eyebrow text-muted-foreground">
                $1,000 · two weeks · ratifiable Guidebook
              </span>
            </div>
            <div className="flex flex-col items-start gap-1.5">
              <Link
                href="/field-guides/safety"
                className="btn-pill btn-pill--ghost px-7 py-3.5"
              >
                <Download className="size-4" aria-hidden />
                Download the Field Guide
              </Link>
              <span className="text-[12px] font-medium uppercase tracking-eyebrow text-muted-foreground">
                Free · 40 pages · the full method
              </span>
            </div>
          </div>

          <p className="mt-8 text-[12px] font-medium uppercase tracking-eyebrow text-muted-foreground md:mt-10">
            {SAFESTART_SEAT_COUNT} of {SAFESTART_SEAT_CAP} leader seats
            committed. Network capped at {SAFESTART_SEAT_CAP}.
          </p>
        </Reveal>
      </Container>
    </section>
  );
}
