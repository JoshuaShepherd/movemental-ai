import Image from "next/image";
import Link from "next/link";

import {
  Container,
  Display,
  Eyebrow,
  Reveal,
  Section,
} from "@/components/primitives";

import { IMG, homeNarrativeBridges } from "./home-data";

/**
 * §4 · Turn — relief / possibility after Midnight consequence.
 *
 * `variant="default"` lifts tonal weight before the system answer band.
 */
export function HomeTurn() {
  return (
    <Section id="turn" variant="default" spacing="lg">
      <Container>
        <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] lg:gap-20">
          <Reveal>
            <Eyebrow className="mb-4">The turn</Eyebrow>
            <Display size="md" as="h2" className="text-balance">
              What if all of this became one system?
            </Display>
            <p className="mt-10 max-w-xl text-lg leading-relaxed text-muted-foreground">
              You don&apos;t need more content.
            </p>
            <p className="mt-3 max-w-xl text-lg font-semibold leading-relaxed text-foreground">
              You need your intelligence to exist as a coherent whole.
            </p>
            <p className="mt-8 max-w-xl text-sm font-medium leading-relaxed text-muted-foreground">
              {homeNarrativeBridges.turnToSystem}{" "}
              <Link href="#system" className="text-primary underline-offset-4 hover:underline">
                See the six stages
              </Link>
              .
            </p>
          </Reveal>
          <ConvergeVisual />
        </div>
      </Container>
    </Section>
  );
}

/**
 * Fragments converging. Six tiles positioned mid-converge — the
 * "after" shape is implied by their trajectory, not a completed
 * integration (that's §6).
 */
function ConvergeVisual() {
  const tiles = [
    { src: IMG.book, x: "10%", y: "6%", rot: "-2deg", w: "28%", ar: "896/1200" },
    { src: IMG.module, x: "62%", y: "2%", rot: "2deg", w: "26%", ar: "928/1152" },
    { src: IMG.hub, x: "34%", y: "34%", rot: "0deg", w: "32%", ar: "1/1" },
    { src: IMG.chat, x: "2%", y: "52%", rot: "-3deg", w: "26%", ar: "928/1152" },
    { src: IMG.email, x: "70%", y: "54%", rot: "3deg", w: "26%", ar: "1/1" },
    { src: IMG.podcast, x: "38%", y: "74%", rot: "-1deg", w: "24%", ar: "1/1" },
  ] as const;

  return (
    <Reveal
      delay={120}
      aria-hidden
      className="relative mx-auto aspect-4/5 w-full max-w-lg"
    >
      <svg
        className="pointer-events-none absolute inset-0 h-full w-full text-muted-foreground/25"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
      >
        <line x1="24" y1="18" x2="50" y2="50" stroke="currentColor" strokeWidth="0.3" strokeDasharray="2 2" />
        <line x1="76" y1="14" x2="50" y2="50" stroke="currentColor" strokeWidth="0.3" strokeDasharray="2 2" />
        <line x1="16" y1="66" x2="50" y2="50" stroke="currentColor" strokeWidth="0.3" strokeDasharray="2 2" />
        <line x1="82" y1="68" x2="50" y2="50" stroke="currentColor" strokeWidth="0.3" strokeDasharray="2 2" />
        <line x1="52" y1="86" x2="50" y2="50" stroke="currentColor" strokeWidth="0.3" strokeDasharray="2 2" />
      </svg>
      {tiles.map((t) => (
        <figure
          key={t.src}
          className="absolute overflow-hidden rounded-(--radius-md) bg-card shadow-ambient"
          style={{
            left: t.x,
            top: t.y,
            width: t.w,
            aspectRatio: t.ar,
            transform: `rotate(${t.rot})`,
          }}
        >
          <Image src={t.src} alt="" fill sizes="14rem" className="object-cover" />
        </figure>
      ))}
    </Reveal>
  );
}
