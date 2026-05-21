"use client";

import Link from "next/link";
import {
  BookOpen,
  ClipboardList,
  ScrollText,
  Shield,
  Siren,
  type LucideIcon,
} from "lucide-react";

import FiveLayerRead from "@/components/safety/_new/FiveLayerRead";
import { TwoPathsTable } from "@/components/safety/_new/TwoPathsTable";
import { FieldGuideAuthorBios } from "@/components/pathway/field-guide-author-bios";
import { FieldGuideSeriesMast } from "@/components/pathway/field-guide-series-mast";
import { PathwayStageRail } from "@/components/pathway/pathway-stage-rail";
import { PathwayVoiceFallback } from "@/components/pathway/pathway-voice-fallback";
import { Reveal } from "@/components/studio/Reveal";
import { cn } from "@/lib/utils";

const MAX = "mx-auto w-full max-w-[var(--container-max)] px-6 sm:px-8 lg:px-12";
const SECTION = "py-16 md:py-24 lg:py-28";

/**
 * The canonical five layers — Field Guide taxonomy.
 *
 * Care Boundaries belongs to Layer 04 Rules (not Layer 03 Context).
 * Named Refusals is a first-class Layer 02 artifact alongside the AUP.
 * Vendor & Tool Inventory + Data Classification sit at Layer 03 Context.
 */
const LAYERS: ReadonlyArray<{
  n: string;
  layer: string;
  icon: LucideIcon;
  definition: string;
  documents: ReadonlyArray<string>;
}> = [
  {
    n: "01",
    layer: "Statement",
    icon: ScrollText,
    definition: "What we believe about AI in relation to our mission.",
    documents: ["AI Use Charter"],
  },
  {
    n: "02",
    layer: "Policy",
    icon: Shield,
    definition: "What we will do, and what we refuse to do, operationally.",
    documents: ["Acceptable Use Policy", "Named Refusals"],
  },
  {
    n: "03",
    layer: "Context",
    icon: ClipboardList,
    definition: "What is actually true in our environment right now.",
    documents: ["Vendor & Tool Inventory", "Data Classification"],
  },
  {
    n: "04",
    layer: "Rules",
    icon: BookOpen,
    definition: "What governs AI use in specific domains.",
    documents: [
      "Data Handling Rules",
      "Disclosure & Attribution",
      "Care Boundaries",
    ],
  },
  {
    n: "05",
    layer: "Response Plans",
    icon: Siren,
    definition: "What we do when something goes wrong.",
    documents: ["Incident Response Plan"],
  },
];

const AUDIENCES: ReadonlyArray<{
  href: string;
  title: string;
  body: string;
}> = [
  {
    href: "/churches",
    title: "Churches",
    body: "For executive pastors and elder teams navigating AI in pastoral work, communications, and ministry without losing what makes the church a church.",
  },
  {
    href: "/nonprofits",
    title: "Nonprofits",
    body: "For executive directors and boards facing AI as a fiduciary responsibility — donor trust, beneficiary protection, regulatory exposure — not just an operational question.",
  },
  {
    href: "/institutions",
    title: "Institutions",
    body: "For seminary presidents, denominational executives, and training networks managing AI across faculty, students, and accreditation simultaneously.",
  },
];

export function SafetyNewPage() {
  return (
    <div className="pathway-safety-new">
      <PathwayStageRail variant="safety" />
      <FieldGuideSeriesMast active="vol-01" />

      {/* 1. Hero band */}
      <section
        className={cn(SECTION, "bg-background")}
        id="hero"
        aria-labelledby="safety-new-hero-title"
      >
        <Reveal>
          <div className={cn(MAX, "max-w-4xl")}>
            <p className="mb-8 text-[0.62rem] font-semibold uppercase tracking-eyebrow text-muted-foreground">
              For Churches{" "}
              <span className="text-muted-foreground/55">·</span> For Nonprofits{" "}
              <span className="text-muted-foreground/55">·</span> For Institutions
            </p>
            <h1
              id="safety-new-hero-title"
              className="mb-8 font-serif-display text-[clamp(2.25rem,6.5vw,4.25rem)] italic leading-[0.95] tracking-tight text-foreground"
            >
              AI is being used inside your organization. Most leaders{" "}
              <span className="font-serif-display italic">have not yet decided</span>{" "}
              what is safe.
            </h1>
            <p className="mb-10 max-w-2xl text-lg leading-relaxed text-muted-foreground md:text-xl">
              The Safety stage is where your organization produces its AI
              Organizational Guidebook — five layers, ratified by the work. The free
              field guide walks you through. SafeStart is the two-week facilitated
              version.
            </p>
            <div className="flex flex-wrap items-center gap-5">
              <Link
                href="/field-guides/safety-new"
                className="btn-pill btn-pill--primary"
              >
                Get the Field Guide
              </Link>
              <Link
                href="/contact?interest=safestart"
                className="text-[0.7rem] font-semibold uppercase tracking-eyebrow text-foreground underline decoration-1 underline-offset-4 transition-colors hover:text-pathway-accent"
              >
                Talk about SafeStart →
              </Link>
            </div>
          </div>
        </Reveal>
      </section>

      {/* 2. Five-Layer Read diagnostic — component provides its own container */}
      <section
        id="five-layer-read"
        aria-label="Five-Layer Read diagnostic"
        className="bg-background"
      >
        <FiveLayerRead />
      </section>

      {/* 3. Architecture of Safety — five-layer explainer */}
      <section
        className={cn(SECTION, "bg-section")}
        aria-labelledby="architecture-title"
      >
        <Reveal>
          <div className={MAX}>
            <div className="mb-16 max-w-3xl">
              <p className="mb-4 text-[0.62rem] font-semibold uppercase tracking-eyebrow text-muted-foreground">
                The Architecture of Safety
              </p>
              <h2
                id="architecture-title"
                className="mb-8 font-serif-display text-4xl italic leading-tight tracking-tight text-foreground md:text-5xl"
              >
                Safety produces a five-layer Guidebook.{" "}
                <span className="block md:inline">
                  Each layer does a different kind of work. Skip any of them and the
                  others cannot hold.
                </span>
              </h2>
              <p className="max-w-2xl text-lg leading-relaxed text-muted-foreground">
                The layers depend on the one above. A Statement gives the Policy
                under it a reason to hold. A Policy gives the Context under it
                something to measure against. Context gives the Rules under it real
                ground. Rules give Response Plans the shape they need to be useful.
                Read them in order and the Guidebook coheres; skip the order and the
                rest floats.
              </p>
            </div>
            <ol className="grid grid-cols-1 border-t border-l border-border/40 sm:grid-cols-2 lg:grid-cols-5">
              {LAYERS.map((layer) => {
                const Icon = layer.icon;
                return (
                  <li
                    key={layer.layer}
                    className="flex min-h-[300px] flex-col justify-between border-r border-b border-border/40 bg-background p-8 md:p-10"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <span className="font-serif-display text-3xl italic text-pathway-accent">
                        {layer.n}
                      </span>
                      <Icon
                        className="h-5 w-5 text-muted-foreground/70"
                        aria-hidden
                      />
                    </div>
                    <div className="mt-8">
                      <h3 className="mb-3 font-serif-display text-2xl italic leading-tight tracking-tight text-foreground">
                        {layer.layer}
                      </h3>
                      <p className="mb-6 text-sm leading-relaxed text-muted-foreground">
                        {layer.definition}
                      </p>
                      <ul className="space-y-1.5">
                        {layer.documents.map((doc) => (
                          <li
                            key={doc}
                            className="text-[0.7rem] font-semibold uppercase tracking-eyebrow text-foreground"
                          >
                            + {doc}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </li>
                );
              })}
            </ol>
          </div>
        </Reveal>
      </section>

      {/* 4. Two paths into Safety */}
      <section
        className={cn(SECTION, "bg-background")}
        aria-labelledby="two-paths-title"
      >
        <Reveal>
          <div className={MAX}>
            <div className="mb-12 max-w-3xl">
              <p className="mb-4 text-[0.62rem] font-semibold uppercase tracking-eyebrow text-muted-foreground">
                Your Two Paths
              </p>
              <h2
                id="two-paths-title"
                className="mb-6 font-serif-display text-4xl italic leading-tight tracking-tight text-foreground md:text-5xl"
              >
                Two paths. Same Guidebook.
              </h2>
              <p className="max-w-2xl text-lg leading-relaxed text-muted-foreground">
                There are two paths to a complete AI Organizational Guidebook. Both
                produce the same five layers and the same ratifiable documents. The
                difference is who guides you through the work.
              </p>
            </div>
            <TwoPathsTable />
          </div>
        </Reveal>
      </section>

      {/* 5. SafeStart section (anchored) */}
      <section
        className={cn(SECTION, "bg-surface-highest")}
        id="safestart"
        aria-labelledby="safestart-title"
      >
        <Reveal>
          <div className={MAX}>
            <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-20">
              <div className="lg:col-span-7">
                <p className="mb-4 text-[0.62rem] font-semibold uppercase tracking-eyebrow text-pathway-accent">
                  Facilitated Path
                </p>
                <h2
                  id="safestart-title"
                  className="mb-6 font-serif-display text-4xl italic leading-tight tracking-tight text-foreground md:text-5xl"
                >
                  SafeStart: $1,000, two weeks, ratified Guidebook.
                </h2>
                <p className="max-w-2xl text-lg leading-relaxed text-muted-foreground">
                  SafeStart is the facilitated version of Safety. Movemental drafts
                  your AI Organizational Guidebook inside a private organizational
                  dashboard against your specific context. Your team reviews,
                  revises, and ratifies each artifact. You walk out with the same
                  five-layer Guidebook as SafeGuide, plus a print-quality PDF and
                  the rollout supports that turn ratification into adoption.
                </p>
                <div className="mt-10">
                  <Link
                    href="/contact?interest=safestart"
                    className="btn-pill btn-pill--primary"
                  >
                    Start a conversation
                  </Link>
                </div>
              </div>

              <aside className="border border-border/40 bg-background p-10 md:p-12 lg:col-span-5">
                <p className="mb-6 text-[0.62rem] font-semibold uppercase tracking-eyebrow text-muted-foreground">
                  What SafeStart actually delivers
                </p>
                <ul className="space-y-5">
                  {[
                    "Publishable internal documentation platform — your private organizational dashboard.",
                    "Print-quality PDF of the ratified Guidebook.",
                    "Supports and messaging for each Guidebook area — rollout to staff, board, and constituents.",
                    "Integration with the rest of the Movemental Path — Sandbox, Skills, Solutions.",
                  ].map((item) => (
                    <li
                      key={item}
                      className="grid grid-cols-[1.25rem_1fr] items-baseline gap-3 text-sm leading-relaxed text-foreground"
                    >
                      <span aria-hidden className="text-pathway-accent">
                        +
                      </span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <p className="mt-8 text-xs italic leading-relaxed text-muted-foreground">
                  Two weeks. $1,000 fixed. One follow-up call within 30 days.
                </p>
              </aside>
            </div>
          </div>
        </Reveal>
      </section>

      {/* 6. Audiences trio — church / nonprofit / institution
           Replicated inline because AudienceFold is home-page-scoped copy. */}
      <section
        className={cn(SECTION, "bg-background")}
        aria-labelledby="audiences-title"
      >
        <Reveal>
          <div className={MAX}>
            <div className="mb-16 max-w-3xl">
              <p className="mb-4 text-[0.62rem] font-semibold uppercase tracking-eyebrow text-muted-foreground">
                Who Safety serves
              </p>
              <h2
                id="audiences-title"
                className="font-serif-display text-4xl italic leading-tight tracking-tight text-foreground md:text-5xl"
              >
                Three audiences, one Guidebook.
              </h2>
              <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
                Churches, nonprofits, and theological institutions face different
                stakes — pastoral, fiduciary, accreditational — but the underlying
                Guidebook is the same. The path adapts to your situation.
              </p>
            </div>
            <div className="grid grid-cols-1 gap-x-10 gap-y-12 md:grid-cols-3">
              {AUDIENCES.map((card) => (
                <Link
                  key={card.href}
                  href={card.href}
                  className="group flex flex-col gap-5 p-2 -m-2 transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground focus-visible:ring-offset-4 focus-visible:ring-offset-background"
                >
                  <h3 className="font-serif-display text-3xl italic leading-tight tracking-tight text-foreground md:text-4xl">
                    {card.title}
                  </h3>
                  <p className="text-[1.0625rem] leading-relaxed text-muted-foreground">
                    {card.body}
                  </p>
                  <span className="mt-auto flex items-center gap-3 pt-4 text-xs font-medium uppercase tracking-eyebrow text-foreground">
                    Find out more
                    <span
                      aria-hidden
                      className="transition-transform duration-200 group-hover:translate-x-1"
                    >
                      →
                    </span>
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </Reveal>
      </section>

      {/* 7. Credibility / founders — replicated inline (Movement Voices + Authors) */}
      <section
        className={cn(SECTION, "bg-section")}
        aria-labelledby="credibility-title"
      >
        <Reveal>
          <div className={MAX}>
            <div className="mb-16 flex flex-col justify-between gap-6 md:flex-row md:items-end">
              <div className="max-w-2xl">
                <p className="mb-4 text-[0.62rem] font-semibold uppercase tracking-eyebrow text-muted-foreground">
                  Movement Voices
                </p>
                <h2
                  id="credibility-title"
                  className="font-serif-display text-4xl italic leading-tight tracking-tight text-foreground md:text-5xl"
                >
                  The methodology is shaped with leaders whose work and credibility
                  predate AI.
                </h2>
              </div>
              <Link
                href="/voices"
                className="self-start border-b border-foreground pb-1 text-[0.7rem] font-semibold uppercase tracking-eyebrow text-foreground transition-colors hover:border-pathway-accent hover:text-pathway-accent md:self-end"
              >
                See all Movement Leaders →
              </Link>
            </div>
            <div className="grid grid-cols-1 gap-10 md:grid-cols-3 md:gap-12">
              <PathwayVoiceFallback
                initials="LR"
                name="Rev. Dr. Liz Rios"
                role="Founder, Passion2Plant · Director, Púlpito Fellows"
              >
                Latina theologian and church planter. Brings a mujerista lens to
                questions of language, voice, and what mission-driven organizations
                owe the people they serve.
              </PathwayVoiceFallback>
              <PathwayVoiceFallback
                initials="JW"
                name="JR Woodward"
                role="National Director, V3 · Author, The Scandal of Leadership"
              >
                Church planting strategist with three decades in the field. His
                Manchester PhD on the misuse of leadership power shapes how Movement
                Voices think about authority and AI.
              </PathwayVoiceFallback>
              <PathwayVoiceFallback
                initials="RS"
                name="L. Rowland Smith"
                role="National Director, Forge America · Founder, Pando Collective"
              >
                Veteran missional practitioner based in the Colorado Front Range.
                Brings curatorial judgment and decades of micro-church practice to
                questions of what mission-driven organizations should and should not
                put their name on.
              </PathwayVoiceFallback>
            </div>

            <FieldGuideAuthorBios className="mt-20" />
          </div>
        </Reveal>
      </section>

      {/* 8. Midnight CTA band */}
      <section
        className="band-midnight relative overflow-hidden"
        aria-labelledby="safety-new-closing-title"
      >
        <div className={cn(MAX, "relative z-10 py-6 text-center")}>
          <Reveal>
            <p className="mb-8 text-[0.62rem] font-semibold uppercase tracking-eyebrow text-pathway-accent">
              Begin Safety
            </p>
            <h2
              id="safety-new-closing-title"
              className="mx-auto mb-12 max-w-3xl font-serif-display text-4xl italic leading-[0.95] tracking-tight text-inverse-foreground md:text-5xl lg:text-6xl"
            >
              Start with Safety. The path takes care of the order.
            </h2>
            <div className="flex flex-col items-stretch justify-center gap-4 sm:flex-row sm:gap-5">
              <Link
                href="/field-guides/safety-new"
                className="btn-pill btn-pill--primary"
              >
                Get the Field Guide
              </Link>
              <Link
                href="/contact?interest=safestart"
                className="btn-pill btn-pill--ghost"
              >
                Talk about SafeStart
              </Link>
              <Link
                href="/pathway"
                className="inline-flex items-center justify-center px-6 py-4 text-[0.7rem] font-semibold uppercase tracking-eyebrow text-inverse-foreground/80 underline decoration-pathway-accent/60 underline-offset-4 transition-colors hover:text-inverse-foreground"
              >
                See the full Path →
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}

export default SafetyNewPage;
