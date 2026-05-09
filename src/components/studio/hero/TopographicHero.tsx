"use client";

import Image from "next/image";
import Link from "next/link";
import { FlaskConical, GraduationCap, Rocket, ShieldCheck } from "lucide-react";

import { Cite } from "@/components/citations";
import { Container } from "@/components/studio/Container";
import { Reveal } from "@/components/studio/Reveal";

const STAGES = [
  {
    icon: ShieldCheck,
    label: "Stage 1",
    title: "Safety first",
    body: "The governance that answers the questions your people are asking.",
  },
  {
    icon: FlaskConical,
    label: "Stage 2",
    title: "Sandbox",
    body: "Disciplined exploration of valuable AI use cases and ethical concerns, without the risks of publication and privacy issues.",
  },
  {
    icon: GraduationCap,
    label: "Stage 3",
    title: "Skills",
    body: "Formation that produces leaders, not just users.",
  },
  {
    icon: Rocket,
    label: "Stage 4",
    title: "Solutions",
    body: "AI-integrated technological deployment built on the secure foundation.",
  },
] as const;

export function TopographicHero() {
  return (
    <section
      className="relative overflow-hidden bg-background pt-6 pb-12 sm:pt-8 sm:pb-14 md:pt-10 md:pb-16 lg:pt-12 lg:pb-20"
      aria-labelledby="hero-h1"
    >
      {/*
        Desktop terrain — absolute-positioned to the right edge, very low
        opacity, washed back into paper with a left-to-right gradient so the
        headline + stage row stay the focal point.

        Light: multiply gently keys linework into `--background`.
        Dark: invert + screen so light topo art reads instead of vanishing under multiply.
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
              AI is already inside your organization.
            </h1>

            <p className="mt-5 max-w-2xl text-[18px] leading-[1.55] text-foreground md:mt-6 md:text-[20px] md:leading-[1.5]">
              We built a path to walk you through the adaptive leadership
              challenges posed by AI — four stages, ordered so a strong human
              foundation precedes any technological implementation
              <Cite claimId="mckinsey-workflow-redesign" />.
            </p>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-6 border-t border-border pt-8 md:mt-12 md:grid-cols-2 md:gap-x-8 md:gap-y-8 md:pt-10 lg:grid-cols-4 lg:gap-x-10 lg:gap-y-8">
            {STAGES.map(({ icon: Icon, label, title, body }) => (
              <div key={label} className="flex flex-col">
                <Icon
                  aria-hidden="true"
                  strokeWidth={1.25}
                  className="mb-4 h-7 w-7 text-muted-foreground"
                />
                <div className="mb-2 text-[11px] font-medium uppercase tracking-[0.14em] text-muted-foreground">
                  {label}
                </div>
                <h3 className="mb-2 font-serif italic font-normal text-foreground text-[1.375rem] leading-[1.15] tracking-[-0.01em] md:text-[1.5rem]">
                  {title}
                </h3>
                <p className="text-[14px] leading-[1.55] text-muted-foreground md:text-[14.5px]">
                  {body}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-8 flex flex-col gap-3 md:mt-10 md:flex-row md:gap-4">
            <Link
              href="/pathway"
              className="inline-flex items-center justify-center rounded-full bg-primary px-8 py-3.5 text-base font-medium text-primary-foreground transition-transform duration-200 ease-out motion-safe:hover:-translate-y-0.5"
            >
              See the Path
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded-full border border-border px-8 py-3.5 text-base font-medium text-foreground transition-colors duration-200 ease-out hover:bg-section"
            >
              Start a Conversation
            </Link>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
