"use client";

import Link from "next/link";
import { FlaskConical, GraduationCap, Rocket, ShieldCheck } from "lucide-react";

import { Cite } from "@/components/citations";
import { Container } from "@/components/studio/Container";
import { Reveal } from "@/components/studio/Reveal";

const TOPO_PATTERN =
  "url(\"data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z' fill='%237e786f' fill-opacity='0.07' fill-rule='evenodd'/%3E%3C/svg%3E\")";

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
      className="relative overflow-hidden bg-background pt-28 pb-20 md:pt-36 md:pb-28 lg:pt-44 lg:pb-32"
      aria-labelledby="hero-h1"
      style={{ backgroundImage: TOPO_PATTERN }}
    >
      <Container>
        <Reveal>
          <div className="max-w-4xl">
            <div className="mb-6 flex flex-col gap-1">
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

            <p className="mt-8 max-w-2xl text-[18px] leading-[1.6] text-foreground md:text-[20px] md:leading-[1.55]">
              We built a path to walk you through the adaptive leadership
              challenges posed by AI — four stages, ordered so a strong human
              foundation precedes any technological implementation
              <Cite claimId="mckinsey-workflow-redesign" />.
            </p>
          </div>

          <div className="mt-20 grid grid-cols-1 gap-10 border-t border-border pt-14 md:mt-24 md:grid-cols-2 md:gap-x-10 md:gap-y-12 lg:grid-cols-4 lg:gap-x-12">
            {STAGES.map(({ icon: Icon, label, title, body }) => (
              <div key={label} className="flex flex-col">
                <Icon
                  aria-hidden="true"
                  strokeWidth={1.25}
                  className="mb-6 h-7 w-7 text-muted-foreground"
                />
                <div className="mb-3 text-[11px] font-medium uppercase tracking-[0.14em] text-muted-foreground">
                  {label}
                </div>
                <h3 className="mb-3 font-serif italic font-normal text-foreground text-[1.5rem] leading-[1.15] tracking-[-0.01em]">
                  {title}
                </h3>
                <p className="text-[14.5px] leading-[1.6] text-muted-foreground">
                  {body}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-14 flex flex-col gap-3 md:flex-row md:gap-4">
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
