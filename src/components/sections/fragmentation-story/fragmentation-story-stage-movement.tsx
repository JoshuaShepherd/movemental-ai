"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useId, useLayoutEffect, useMemo, useRef, useState } from "react";

import { Container } from "@/components/primitives/container";
import { Section } from "@/components/primitives/section";
import { cn } from "@/lib/utils";

import {
  type AudienceId,
  getMovementCopy,
  getMovementNetwork,
  type MovementNetwork,
  type MovementNodeResolved,
} from "./fragmentation-story-content";

type Props = {
  audience: AudienceId;
  nodeCount: number;
  onNodeCountChange: (n: number) => void;
};

function polarToCartesian(r: number, theta: number): { x: number; y: number } {
  const rad = (theta * Math.PI) / 180;
  return {
    x: 50 + r * 45 * Math.cos(rad),
    y: 50 + r * 45 * Math.sin(rad),
  };
}

type NodeView = MovementNodeResolved & { cx: number; cy: number };

function buildView(net: MovementNetwork): {
  nodes: NodeView[];
  edges: Array<{ from: NodeView; to: NodeView; key: string }>;
} {
  const nodes: NodeView[] = net.nodes.map((n) => {
    const { x, y } = polarToCartesian(n.r, n.theta);
    return { ...n, cx: x, cy: y };
  });
  const byId = new Map(nodes.map((n) => [n.id, n] as const));
  const edges = net.edges
    .map(([a, b]) => {
      const from = byId.get(a);
      const to = byId.get(b);
      if (!from || !to) return null;
      return { from, to, key: `${a}->${b}` };
    })
    .filter((e): e is { from: NodeView; to: NodeView; key: string } => e !== null);
  return { nodes, edges };
}

/**
 * Deterministic pseudo-"density" from node id — stand-in for the informational
 * intelligence carried by each platform. Renders as concentric inner rings so
 * denser nodes visibly carry more corpus, per the Movement band's promise.
 */
function densityFor(id: string): number {
  let h = 0;
  for (let i = 0; i < id.length; i++) h = (h * 31 + id.charCodeAt(i)) | 0;
  return (Math.abs(h) % 100) / 100; // 0..1
}

function NodeDisc({
  node,
  showLabel,
}: {
  node: NodeView;
  showLabel: boolean;
}) {
  const radius =
    node.kind === "primary" ? 3.6 : node.kind === "seed" ? 2.2 : 1.55;
  const fill =
    node.kind === "primary"
      ? "var(--primary)"
      : node.kind === "seed"
      ? "var(--card)"
      : "var(--card)";
  const stroke =
    node.kind === "expansion"
      ? "color-mix(in srgb, var(--primary) 55%, transparent)"
      : "var(--primary)";
  const density = densityFor(node.id);
  const ringCount = node.kind === "primary" ? 2 : node.kind === "seed" ? 1 : 0;
  return (
    <g data-node-id={node.id} data-movement-node>
      {/* Relational halo on primary nodes */}
      {node.kind === "primary" && (
        <circle
          cx={node.cx}
          cy={node.cy}
          r={radius + 1.4}
          fill="none"
          stroke="var(--primary)"
          strokeOpacity={0.25}
          strokeWidth={0.6}
        />
      )}
      <circle
        cx={node.cx}
        cy={node.cy}
        r={radius}
        fill={fill}
        stroke={stroke}
        strokeWidth={node.kind === "expansion" ? 0.4 : 0.7}
      />
      {/* Informational density — concentric inner arcs scale with corpus carried */}
      {Array.from({ length: ringCount }, (_, i) => {
        const ratio = (i + 1) / (ringCount + 1);
        const r = radius * ratio;
        const opacity = 0.35 + density * 0.45;
        return (
          <circle
            key={i}
            cx={node.cx}
            cy={node.cy}
            r={r}
            fill="none"
            stroke={node.kind === "primary" ? "var(--card)" : "var(--primary)"}
            strokeOpacity={opacity}
            strokeWidth={0.25}
          />
        );
      })}
      {/* Primary center dot — small luminous point, reads as a bright core */}
      {node.kind === "primary" && (
        <circle
          cx={node.cx}
          cy={node.cy}
          r={radius * 0.28}
          fill="color-mix(in srgb, white 70%, var(--primary))"
          opacity={0.9}
        />
      )}
      {showLabel && node.name && (
        <g transform={`translate(${node.cx} ${node.cy + radius + 3})`}>
          <text
            textAnchor="middle"
            fontSize={2.2}
            fontWeight={600}
            fill="var(--inverse-foreground)"
            className="select-none"
          >
            {node.name}
          </text>
          {node.role && (
            <text
              textAnchor="middle"
              y={2.6}
              fontSize={1.7}
              fill="color-mix(in srgb, var(--inverse-foreground) 60%, transparent)"
              className="select-none"
            >
              {node.role}
            </text>
          )}
        </g>
      )}
    </g>
  );
}

function Legend({ nodes }: { nodes: NodeView[] }) {
  const shown = nodes.filter((n) => n.kind === "primary" || n.kind === "seed");
  if (shown.length === 0) return null;
  return (
    <ul className="mx-auto mt-6 flex max-w-3xl flex-wrap justify-center gap-x-4 gap-y-2">
      {shown.map((n) => (
        <li
          key={n.id}
          className="flex items-center gap-2 text-xs text-inverse-foreground/80"
        >
          <span
            className={cn(
              "inline-block size-2.5 rounded-full",
              n.kind === "primary"
                ? "bg-primary"
                : "border-2 border-primary bg-inverse-foreground/10"
            )}
            aria-hidden
          />
          <span className="font-medium text-inverse-foreground">{n.name}</span>
          {n.role && <span className="text-inverse-foreground/55">· {n.role}</span>}
        </li>
      ))}
    </ul>
  );
}

export function FragmentationStoryStageMovement({
  audience,
  nodeCount,
  onNodeCountChange,
}: Props) {
  const copy = getMovementCopy(audience);
  const [localCount, setLocalCount] = useState(nodeCount);
  const dialId = useId();
  const rafRef = useRef<number | null>(null);
  const sectionRef = useRef<HTMLElement | null>(null);
  const introPlayedRef = useRef(false);
  const introTlRef = useRef<ReturnType<typeof gsap.timeline> | null>(null);

  // Keep local in sync when parent updates (e.g. on audience change URL sync)
  useEffect(() => {
    setLocalCount(nodeCount);
  }, [nodeCount]);

  useEffect(() => {
    introPlayedRef.current = false;
  }, [audience]);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section || typeof window === "undefined") return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const narrow = window.matchMedia("(max-width: 63.999rem)").matches;
    if (reduced || narrow) return;

    gsap.registerPlugin(ScrollTrigger);

    const st = ScrollTrigger.create({
      trigger: section,
      start: "top 72%",
      once: true,
      onEnter: () => {
        if (introPlayedRef.current) return;
        introPlayedRef.current = true;

        const lines = section.querySelectorAll<SVGLineElement>("[data-movement-edge]");
        lines.forEach((ln) => {
          const len = ln.getTotalLength?.() ?? 20;
          ln.style.strokeDasharray = `${len}`;
          ln.style.strokeDashoffset = `${len}`;
        });
        const nodes = section.querySelectorAll<SVGGElement>("[data-movement-node]");
        gsap.set(nodes, { scale: 0, transformOrigin: "50% 50%" });

        const tl = gsap.timeline({ defaults: { ease: "power2.out" } });
        introTlRef.current = tl;
        tl.to(lines, { strokeDashoffset: 0, stagger: 0.02, duration: 0.55 }, 0);
        tl.to(nodes, { scale: 1, stagger: 0.012, duration: 0.42 }, 0.08);
      },
    });

    return () => {
      st.kill();
      introTlRef.current?.kill();
      introTlRef.current = null;
    };
  }, [audience]);

  // Debounce parent updates
  useEffect(() => {
    if (localCount === nodeCount) return;
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(() => {
      onNodeCountChange(localCount);
    });
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [localCount, nodeCount, onNodeCountChange]);

  const net = useMemo(
    () => getMovementNetwork(audience, localCount),
    [audience, localCount]
  );
  const view = useMemo(() => buildView(net), [net]);
  const showSeedLabels = localCount <= 25;

  return (
    <Section ref={sectionRef} id="stage-movement" variant="midnight" spacing="lg">
      <Container>
        <header className="mx-auto mb-10 max-w-2xl text-center">
          <p className="mb-4 text-xs font-medium uppercase tracking-eyebrow text-inverse-foreground/60">
            {copy.eyebrow}
          </p>
          <h2 className="text-balance text-3xl font-semibold tracking-tight text-inverse-foreground sm:text-4xl">
            {copy.title}
          </h2>
          <p className="mt-4 text-base leading-relaxed text-inverse-foreground/75">
            {copy.lede}
          </p>
        </header>

        <div className="relative mx-auto aspect-square w-full max-w-3xl">
          <svg
            viewBox="0 0 100 100"
            className="h-full w-full"
            role="img"
            aria-label={`Movement network — ${localCount} platforms`}
          >
            <defs>
              <radialGradient id={`${dialId}-glow`} cx="50%" cy="50%" r="50%">
                <stop
                  offset="0%"
                  stopColor="var(--primary)"
                  stopOpacity={0.12}
                />
                <stop offset="70%" stopColor="var(--primary)" stopOpacity={0} />
              </radialGradient>
            </defs>
            <rect x={0} y={0} width={100} height={100} fill={`url(#${dialId}-glow)`} />

            {view.edges.map((e) => {
              const isPrimaryLink =
                e.from.kind === "primary" || e.to.kind === "primary";
              const isInterPrimary =
                e.from.kind === "primary" && e.to.kind === "primary";
              const width = isInterPrimary ? 0.55 : isPrimaryLink ? 0.35 : 0.22;
              const opacity = isInterPrimary ? 62 : isPrimaryLink ? 48 : 32;
              return (
                <line
                  key={e.key}
                  data-movement-edge
                  x1={e.from.cx}
                  y1={e.from.cy}
                  x2={e.to.cx}
                  y2={e.to.cy}
                  stroke={`color-mix(in srgb, var(--primary) ${opacity}%, transparent)`}
                  strokeWidth={width}
                  strokeLinecap="round"
                  strokeDasharray={
                    e.from.kind === "primary" || e.to.kind === "primary"
                      ? "0"
                      : "1.5 2"
                  }
                />
              );
            })}
            {view.nodes.map((n) => (
              <NodeDisc
                key={n.id}
                node={n}
                showLabel={
                  showSeedLabels && (n.kind === "primary" || n.kind === "seed")
                }
              />
            ))}
          </svg>
          <span className="pointer-events-none absolute bottom-2 right-3 text-xs font-medium uppercase tracking-eyebrow text-inverse-foreground/45">
            {localCount} / 100 platforms
          </span>
        </div>

        {!showSeedLabels && <Legend nodes={view.nodes} />}

        <div className="mx-auto mt-10 max-w-xl">
          <label
            htmlFor={dialId}
            className="mb-2 block text-xs font-medium uppercase tracking-eyebrow text-inverse-foreground/60"
          >
            Scale the network
          </label>
          <div className="flex items-center gap-4">
            <input
              id={dialId}
              type="range"
              min={0}
              max={100}
              step={1}
              value={localCount}
              onPointerDown={() => {
                introTlRef.current?.progress(1);
                introTlRef.current?.kill();
                introTlRef.current = null;
              }}
              onChange={(e) => setLocalCount(Number(e.target.value))}
              aria-valuemin={0}
              aria-valuemax={100}
              aria-valuenow={localCount}
              className="h-1.5 flex-1 appearance-none rounded-full bg-inverse-foreground/15 accent-primary"
            />
            <span className="min-w-[3ch] text-right text-sm font-semibold tabular-nums text-inverse-foreground">
              {localCount}
            </span>
          </div>
          <div className="mt-2 flex justify-between text-xs font-medium uppercase tracking-eyebrow text-inverse-foreground/45">
            <span>Seeds</span>
            <span>25</span>
            <span>50</span>
            <span>Full field</span>
          </div>
          <p className="mt-3 text-center text-xs leading-relaxed text-inverse-foreground/50">
            Share this view: the page URL updates as you drag—bookmark or paste for a colleague.
          </p>
        </div>

        <div className="mx-auto mt-12 grid max-w-3xl gap-4 sm:grid-cols-3">
          {copy.captions.map((c) => (
            <div
              key={c.t}
              className="rounded-[var(--radius-md)] bg-inverse-foreground/5 p-5 text-left"
            >
              <p className="text-sm font-semibold text-inverse-foreground">{c.t}</p>
              <p className="mt-2 text-sm leading-relaxed text-inverse-foreground/75">
                {c.b}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </Section>
  );
}
