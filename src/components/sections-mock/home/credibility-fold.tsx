import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { SectionHead } from "@/components/sections-mock/primitives";

import { VoiceCarousel, type CarouselVoice } from "./voices-carousel";

interface Founder {
  name: string;
  title: string;
  initials: string;
  portrait: string;
}

// TODO(founders): Brad Brisco and Joshua Shepherd portraits are from one shoot;
// Alan Hirsch's is from a different source with different lighting and crop
// conventions. Replace all three with a single unified shoot when scheduled.
const FOUNDERS: readonly Founder[] = [
  {
    name: "Brad Brisco",
    title: "CEO & Co-founder",
    initials: "BB",
    portrait: "/images/voices/brad-brisco.webp",
  },
  {
    name: "Alan Hirsch",
    title: "Chief Missiologist & Co-founder",
    initials: "AH",
    portrait: "/images/voices/alan-hirsch.webp",
  },
  {
    name: "Joshua Shepherd",
    title: "CTO & Founder",
    initials: "JS",
    portrait: "/images/voices/josh-shepherd.webp",
  },
];

const VOICES: readonly CarouselVoice[] = [
  {
    name: "Alan Hirsch",
    title: "Founder, 100Movements & Forge Mission Training Network",
    initials: "AH",
    imageSrc: "/images/voices/alan-hirsch.webp",
  },
  {
    name: "Dr. Liz Rios",
    title: "Founder, Passion2Plant · Director, Púlpito Fellows",
    initials: "LR",
    imageSrc: "/images/voices/liz-rios.webp",
  },
  {
    name: "Dr. Rowland Smith",
    title:
      "National Director, Forge America · Founder, The Pando Collective",
    initials: "RS",
    imageSrc: "/images/voices/rowland-smith.webp",
  },
  {
    name: "Dr. JR Woodward",
    title: "National Director, V3 Church Planting Movement",
    initials: "JW",
    imageSrc: "/images/voices/jr-woodward.webp",
  },
  {
    name: "Lucas Pulley",
    title: "Movements Director, Underground Network",
    initials: "LP",
    imageSrc: "/images/voices/lucas-pulley.webp",
  },
  {
    name: "Tim Catchim",
    title: "APE practitioner · Co-author, The Permanent Revolution",
    initials: "TC",
    imageSrc: "/images/voices/tim-catchim.webp",
  },
  {
    name: "Rob Wegner",
    title: "Founding Leader, Kansas City Underground",
    initials: "RW",
    imageSrc: "/images/voices/rob-wegner.webp",
  },
];

export function CredibilityFold() {
  return (
    <section
      className="band-default"
      id="about"
      aria-labelledby="credibility-heading"
    >
      <div className="container">
        <SectionHead
          eyebrow="Credibility"
          display={
            <>
              Built with and shaped by <em>movement leaders.</em>
            </>
          }
          displayId="credibility-heading"
          lede="Movemental is a growing conversation among leaders navigating AI, formation, and mission in real time."
        />

        <p className="mt-6 max-w-(--prose-max) text-sm leading-relaxed text-muted-foreground md:text-base">
          Credibility in an AI-saturated world is increasingly relational.
        </p>

        <div className="mt-14 md:mt-16">
          <p className="text-xs font-medium uppercase tracking-eyebrow text-muted-foreground">
            Founders
          </p>
          <ul className="mt-5 grid gap-x-10 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
            {FOUNDERS.map((founder) => (
              <li
                key={founder.name}
                className="flex items-start gap-4"
              >
                <div className="relative aspect-4/5 w-24 shrink-0 overflow-hidden rounded-lg bg-muted shadow-sm ring-1 ring-border/60 sm:w-28">
                  <Image
                    src={founder.portrait}
                    alt={`Portrait of ${founder.name}`}
                    width={960}
                    height={1200}
                    className="h-full w-full object-cover"
                    sizes="112px"
                  />
                  <span
                    aria-hidden
                    className="pointer-events-none absolute left-2 top-2 inline-flex h-7 w-7 items-center justify-center rounded-full bg-background/90 text-[10px] font-semibold tracking-tight text-foreground shadow-sm backdrop-blur-sm"
                  >
                    {founder.initials}
                  </span>
                </div>
                <div className="flex min-w-0 flex-col gap-1 pt-1">
                  <h3 className="text-base font-semibold tracking-tight text-foreground">
                    {founder.name}
                  </h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {founder.title}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-16 border-t border-border pt-12 md:mt-20 md:pt-16">
          <VoiceCarousel
            voices={VOICES}
            ariaLabel="Movement Voices — leaders shaping the conversation"
          />
        </div>

        <Link
          href="/voices"
          className="group mt-12 inline-flex items-center gap-2 text-xs font-medium uppercase tracking-eyebrow text-foreground transition-opacity hover:opacity-80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:ring-offset-4 focus-visible:ring-offset-background md:mt-16"
        >
          See all voices
          <ArrowUpRight
            className="size-4 shrink-0 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
            aria-hidden
          />
        </Link>
      </div>
    </section>
  );
}
