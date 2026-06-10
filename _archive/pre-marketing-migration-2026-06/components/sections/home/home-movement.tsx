import {
  ArrowLink,
  Container,
  Display,
  Eyebrow,
  Reveal,
  Section,
} from "@/components/primitives";

import { homeNarrativeBridges, platformEdges, platformNodes } from "./home-data";

/**
 * §10 · Movement — culmination (Midnight).
 */
export function HomeMovement() {
  return (
    <Section id="movement" variant="midnight" spacing="lg">
      <Container>
        <Reveal className="mx-auto max-w-3xl text-center">
          <Eyebrow className="mb-4 text-inverse-foreground/60">Movement</Eyebrow>
          <Display size="md" as="h2" className="text-balance text-inverse-foreground">
            And eventually, it becomes a movement.
          </Display>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-inverse-foreground/70">
            {homeNarrativeBridges.multiplicationToMovement}
          </p>
          <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-inverse-foreground/75">
            This is the terminal stage the prior bands implied: when systems connect, leaders
            amplify each other, organizations align, churches multiply, and institutions
            collaborate inside a field—not a pile of disconnected launches.
          </p>
        </Reveal>

        <Reveal delay={160}>
          <PlatformNetwork />
        </Reveal>

        <div className="mt-12 flex justify-center">
          <ArrowLink
            href="/fragmentation#stage-movement"
            size="md"
            className="text-inverse-foreground"
          >
            Watch this grow
          </ArrowLink>
        </div>
      </Container>
    </Section>
  );
}

function PlatformNetwork() {
  const byId = new Map(platformNodes.map((n) => [n.id, n] as const));
  return (
    <div className="mx-auto mt-16 aspect-[16/10] w-full max-w-4xl">
      <svg
        viewBox="0 0 100 100"
        className="h-full w-full"
        preserveAspectRatio="xMidYMid meet"
        role="img"
        aria-label="Network of leader platforms, connected by mutual reference."
      >
        {platformEdges.map(([a, b]) => {
          const from = byId.get(a);
          const to = byId.get(b);
          if (!from || !to) return null;
          return (
            <line
              key={`${a}-${b}`}
              x1={from.cx}
              y1={from.cy}
              x2={to.cx}
              y2={to.cy}
              stroke="var(--inverse-foreground)"
              strokeOpacity={0.28}
              strokeWidth={0.25}
              strokeDasharray="1.5 1.5"
            />
          );
        })}
        {platformNodes.map((n) => {
          const isPrimary = n.id === "hirsch";
          return (
            <g key={n.id}>
              <circle
                cx={n.cx}
                cy={n.cy}
                r={isPrimary ? 8 : 6}
                fill="var(--inverse-surface)"
                stroke="var(--primary)"
                strokeWidth={isPrimary ? 0.9 : 0.55}
              />
              <text
                x={n.cx}
                y={n.cy - 1}
                textAnchor="middle"
                fontSize={2.1}
                fontWeight={600}
                fill="var(--inverse-foreground)"
              >
                {n.leader}
              </text>
              <text
                x={n.cx}
                y={n.cy + 2.2}
                textAnchor="middle"
                fontSize={1.7}
                fill="var(--inverse-foreground)"
                opacity={0.6}
              >
                {n.platform}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}
