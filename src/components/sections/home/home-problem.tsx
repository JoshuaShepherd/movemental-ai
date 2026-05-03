import Image from "next/image";

import {
  Container,
  Display,
  Eyebrow,
  Prose,
  Reveal,
  Section,
} from "@/components/primitives";

import { IMG, homeProblemFragmentColumns, homeProblemIntro } from "./home-data";

/**
 * §2 · Problem — recognition + diagnosis (legible beat).
 *
 * Locked Display + column labels: `home-page-fragmentation-funnel-narrative.md` §2.1.
 * Artifact scatter = denser fragmentation vocabulary than hero dual-field.
 */
export function HomeProblem() {
  return (
    <Section id="problem" variant="section" spacing="lg">
      <Container>
        <div className="grid items-start gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] lg:gap-20">
          <Reveal>
            <Eyebrow className="mb-4">The root issue</Eyebrow>
            <Display size="md" as="h2" className="text-balance">
              The problem isn&apos;t content, tools, or AI. It&apos;s fragmentation.
            </Display>
            <Prose className="mt-8 max-w-xl text-base leading-relaxed text-muted-foreground">
              <p className="text-foreground">{homeProblemIntro}</p>
            </Prose>
            <div className="mt-10 grid gap-8 sm:grid-cols-2">
              {homeProblemFragmentColumns.map((col) => (
                <FragmentColumn key={col.label} label={col.label} items={col.items} />
              ))}
            </div>
            <Prose className="mt-10 max-w-xl">
              <p className="font-semibold text-foreground">When intelligence is fragmented:</p>
              <ul className="mt-3 space-y-1 text-muted-foreground">
                <li>· nothing compounds</li>
                <li>· formation breaks down</li>
                <li>· credibility weakens</li>
                <li>· AI becomes shallow</li>
              </ul>
            </Prose>
          </Reveal>
          <ArtifactScatter />
        </div>
      </Container>
    </Section>
  );
}

function FragmentColumn({
  label,
  items,
}: {
  label: string;
  items: readonly string[];
}) {
  return (
    <div>
      <p className="text-xs font-semibold uppercase tracking-eyebrow text-primary">{label}</p>
      <ul className="mt-3 space-y-2 text-base leading-relaxed text-muted-foreground">
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </div>
  );
}

function ArtifactScatter() {
  const tiles = [
    { src: IMG.book, x: "8%", y: "4%", rot: "-8deg", w: "34%", ar: "896/1200" },
    { src: IMG.module, x: "48%", y: "0%", rot: "4deg", w: "32%", ar: "928/1152" },
    { src: IMG.podcast, x: "72%", y: "30%", rot: "-6deg", w: "28%", ar: "1/1" },
    { src: IMG.coverPrinciples, x: "4%", y: "38%", rot: "6deg", w: "26%", ar: "896/1200" },
    { src: IMG.chat, x: "32%", y: "40%", rot: "-3deg", w: "28%", ar: "928/1152" },
    { src: IMG.email, x: "62%", y: "60%", rot: "8deg", w: "30%", ar: "1/1" },
    { src: IMG.hub, x: "10%", y: "70%", rot: "-5deg", w: "30%", ar: "1/1" },
    { src: IMG.sketch, x: "44%", y: "78%", rot: "3deg", w: "22%", ar: "1/1" },
  ] as const;

  return (
    <Reveal
      delay={120}
      stagger
      aria-hidden
      className="relative mx-auto aspect-4/5 w-full max-w-lg"
    >
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
          <Image src={t.src} alt="" fill sizes="16rem" className="object-cover" />
        </figure>
      ))}
    </Reveal>
  );
}
