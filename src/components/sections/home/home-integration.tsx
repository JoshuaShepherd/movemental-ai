import Image from "next/image";

import {
  Container,
  Display,
  Eyebrow,
  Reveal,
  Section,
} from "@/components/primitives";
import { cn } from "@/lib/utils";

import { IMG, homeNarrativeBridges, integrationLayers } from "./home-data";

/**
 * §6 · Integration — stage band 02 (confidence / verbs).
 */
export function HomeIntegration() {
  return (
    <Section id="integration" variant="default" spacing="lg">
      <Container>
        <Reveal className="mx-auto max-w-3xl text-center">
          <Eyebrow className="mb-4">Integration</Eyebrow>
          <Display size="md" as="h2" className="text-balance">
            One system for everything you know and everyone you serve.
          </Display>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-muted-foreground">
            {homeNarrativeBridges.systemToIntegration}
          </p>
        </Reveal>

        <Reveal delay={160}>
          <IntegrationVisual />
        </Reveal>

        <div className="mx-auto mt-12 grid max-w-4xl gap-6 sm:grid-cols-2">
          {integrationLayers.map((layer) => (
            <div key={layer.id} className="rounded-(--radius-md) bg-card p-6 shadow-ambient">
              <p className="text-xs font-semibold uppercase tracking-eyebrow text-primary">
                {layer.label}
              </p>
              <ul className="mt-4 space-y-2 text-sm leading-relaxed text-muted-foreground">
                {layer.items.map((item) => (
                  <li key={item}>· {item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Container>
    </Section>
  );
}

function IntegrationVisual() {
  const infoNodes = [
    { src: IMG.book, top: "4%", left: "6%", w: "22%", ar: "896/1200" },
    { src: IMG.module, top: "10%", left: "34%", w: "20%", ar: "928/1152" },
    { src: IMG.podcast, top: "56%", left: "6%", w: "18%", ar: "1/1" },
    { src: IMG.hub, top: "48%", left: "32%", w: "22%", ar: "1/1" },
  ] as const;

  const relNodes: ReadonlyArray<{
    label: string;
    top: string;
    left: string;
    group?: boolean;
  }> = [
    { label: "A.H.", top: "14%", left: "64%" },
    { label: "B.B.", top: "30%", left: "86%" },
    { label: "J.R.W.", top: "58%", left: "70%" },
    { label: "+5", top: "74%", left: "88%", group: true },
  ];

  return (
    <div className="relative mx-auto mt-16 aspect-video w-full max-w-5xl">
      <svg
        className="pointer-events-none absolute inset-0 h-full w-full text-muted-foreground/30"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        aria-hidden
      >
        <line x1="27" y1="18" x2="42" y2="40" stroke="currentColor" strokeWidth="0.3" />
        <line x1="42" y1="40" x2="18" y2="62" stroke="currentColor" strokeWidth="0.3" />
        <line x1="70" y1="20" x2="82" y2="34" stroke="currentColor" strokeWidth="0.3" />
        <line x1="82" y1="34" x2="74" y2="62" stroke="currentColor" strokeWidth="0.3" />
        <line
          x1="42"
          y1="48"
          x2="72"
          y2="40"
          stroke="currentColor"
          strokeWidth="0.4"
          strokeDasharray="2 1.5"
        />
        <text x="50" y="30" fontSize="3" textAnchor="middle" fill="currentColor">
          one intelligence
        </text>
      </svg>
      {infoNodes.map((n) => (
        <figure
          key={n.src}
          className="absolute overflow-hidden rounded-(--radius-md) bg-card shadow-ambient"
          style={{ top: n.top, left: n.left, width: n.w, aspectRatio: n.ar }}
        >
          <Image src={n.src} alt="" fill sizes="10rem" className="object-cover" />
        </figure>
      ))}
      {relNodes.map((n) => (
        <div
          key={n.label}
          className={cn(
            "absolute grid size-12 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full text-xs font-semibold shadow-ambient",
            n.group ? "bg-primary text-primary-foreground" : "bg-card text-foreground"
          )}
          style={{ top: n.top, left: n.left }}
        >
          {n.label}
        </div>
      ))}
      <div className="pointer-events-none absolute bottom-3 left-1/2 -translate-x-1/2 rounded-full bg-inverse-surface px-4 py-1.5 text-[0.65rem] font-semibold uppercase tracking-eyebrow text-inverse-foreground">
        Informational &middot; Relational
      </div>
    </div>
  );
}
