"use client";

import Image from "next/image";
import {
  memo,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  useSyncExternalStore,
} from "react";
import {
  ReactFlow,
  type Edge,
  type Node,
  type NodeProps,
  type ReactFlowInstance,
} from "@xyflow/react";

import { Button } from "@/components/ui/button";

import {
  CENTER_NODE_PX,
  VOICE_AVATAR_PX,
} from "./layout-movement-voices";
import {
  MovementVoicesFlowEdge,
  type MovementVoicesFlowEdgeData,
} from "./movement-voices-flow-edge";
import { settleNetworkPositions } from "./settle-movement-voices";
import {
  AUDIENCE_SEGMENTS,
  AUDIENCE_SEGMENT_LABEL,
  CREDENTIAL_STRENGTH_LABEL,
  getVoiceAudienceCredentials,
  voiceMatchesAudienceFilters,
  type AudienceCredentialStrength,
  type AudienceSegment,
  type VoiceAudienceCredentials,
} from "./voice-audience-credentials";
import {
  CENTER_NODE_ID,
  MOVEMENT_VOICES,
  MOVEMENTAL_CENTER,
  TOTAL_REVEAL_STEPS,
  type VoiceGraphVoice,
} from "./voices-graph-data";

type VoiceFlowData = {
  voice: VoiceGraphVoice;
  revealed: boolean;
  credentials: VoiceAudienceCredentials | undefined;
  audienceDimmed: boolean;
};
type CenterFlowData = { revealed: boolean };

/* ------------------------------------------------------------------ NODES */

function segmentStrengthOpacity(
  strength: AudienceCredentialStrength | undefined,
): number {
  switch (strength) {
    case "strong":
      return 1;
    case "moderate":
      return 0.78;
    case "light":
      return 0.48;
    case "none":
      return 0.18;
    default:
      return 0.12;
  }
}

function segmentDotClass(seg: AudienceSegment): string {
  switch (seg) {
    case "churches":
      return "bg-primary";
    case "nonprofits":
      return "bg-pathway-accent";
    case "institutions":
      return "bg-status-go";
    default:
      return "bg-muted-foreground";
  }
}

const VoiceAvatarNode = memo(function VoiceAvatarNode({
  data,
}: NodeProps<Node<VoiceFlowData>>) {
  const v = data.voice;
  const creds = data.credentials;
  return (
    <div
      className="flex w-[72px] flex-col items-center gap-1 touch-manipulation"
      style={{
        opacity: data.revealed ? (data.audienceDimmed ? 0.38 : 1) : 0,
        transform: data.revealed ? "scale(1)" : "scale(0.4)",
        transition:
          "opacity 360ms cubic-bezier(0.22, 0.61, 0.36, 1), transform 360ms cubic-bezier(0.22, 0.61, 0.36, 1)",
        willChange: "opacity, transform",
      }}
    >
      <div className="relative h-[72px] w-[72px] shrink-0 overflow-hidden rounded-full bg-muted ring-1 ring-border shadow-ambient">
        <Image
          src={v.imageSrc}
          alt=""
          width={144}
          height={144}
          className="h-full w-full object-cover"
          sizes="72px"
          priority={false}
          aria-hidden
        />
      </div>
      <div
        className="flex gap-1"
        aria-hidden
        title="Audience credential depth: churches · nonprofits · institutions"
      >
        {AUDIENCE_SEGMENTS.map((seg) => (
          <span
            key={seg}
            className={`h-1.5 w-1.5 shrink-0 rounded-full ${segmentDotClass(seg)}`}
            style={{
              opacity: creds?.researchPending
                ? 0.2
                : segmentStrengthOpacity(creds?.segments[seg]),
            }}
          />
        ))}
      </div>
    </div>
  );
});

/**
 * Square Movemental brand node — distinctly different from the circular
 * voice avatars, anchoring the network as the platform hub.
 */
const CenterBrandNode = memo(function CenterBrandNode({
  data,
}: NodeProps<Node<CenterFlowData>>) {
  return (
    <div
      className="flex flex-col items-center justify-center gap-1.5 rounded-md bg-foreground text-inverse-foreground shadow-ambient ring-2 ring-foreground/90"
      style={{
        width: CENTER_NODE_PX,
        height: CENTER_NODE_PX,
        opacity: data.revealed ? 1 : 0,
        transform: data.revealed ? "scale(1)" : "scale(0.5)",
        transition:
          "opacity 420ms cubic-bezier(0.22, 0.61, 0.36, 1), transform 420ms cubic-bezier(0.22, 0.61, 0.36, 1)",
        willChange: "opacity, transform",
      }}
      aria-label="Movemental"
    >
      <svg
        viewBox="0 0 24 24"
        className="h-5 w-5"
        aria-hidden
      >
        <circle cx="12" cy="12" r="3.4" fill="currentColor" />
        <circle
          cx="12"
          cy="12"
          r="7.5"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.4"
          opacity="0.65"
        />
        <circle
          cx="12"
          cy="12"
          r="10.5"
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
          opacity="0.35"
        />
      </svg>
      <span className="text-[9px] font-semibold uppercase tracking-eyebrow leading-none">
        Movemental
      </span>
    </div>
  );
});

const nodeTypes = {
  voice: VoiceAvatarNode,
  center: CenterBrandNode,
};

const edgeTypes = {
  movementVoicesFlow: MovementVoicesFlowEdge,
};

function readGraphDimensions(rect: Pick<DOMRectReadOnly, "width" | "height">): {
  w: number;
  h: number;
} {
  return {
    w: Math.max(320, rect.width),
    h: Math.max(360, rect.height),
  };
}

/* ----------------------------------------------------------- ENVIRONMENT */

function subscribeReducedMotion(onChange: () => void): () => void {
  const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
  mq.addEventListener("change", onChange);
  return () => mq.removeEventListener("change", onChange);
}

function snapshotReducedMotion(): boolean {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/* ---------------------------------------------------------------- LAYOUT */

function flowNodesFromLayout(
  positions: Map<string, { x: number; y: number }>,
  revealStep: number,
  activeAudienceSegments: ReadonlySet<AudienceSegment>,
): Node[] {
  const out: Node[] = [];

  // Center first so it renders behind the voice nodes if they overlap on
  // small viewports during the layout pass.
  const cp = positions.get(CENTER_NODE_ID);
  if (cp) {
    out.push({
      id: CENTER_NODE_ID,
      type: "center",
      position: { x: cp.x - CENTER_NODE_PX / 2, y: cp.y - CENTER_NODE_PX / 2 },
      data: { revealed: revealStep >= 1 } satisfies CenterFlowData,
      width: CENTER_NODE_PX,
      height: CENTER_NODE_PX,
      draggable: false,
      selectable: false,
    });
  }

  for (const v of MOVEMENT_VOICES) {
    const p = positions.get(v.id);
    if (!p) continue;
    // Voices reveal at step = 1 + appearOrder so the center always lands
    // first (revealStep === 1) before any voice (revealStep === 2..N).
    const revealed = revealStep >= 1 + v.appearOrder;
    const credentials = getVoiceAudienceCredentials(v.id);
    const audienceDimmed =
      activeAudienceSegments.size > 0 &&
      !voiceMatchesAudienceFilters(credentials, activeAudienceSegments);
    out.push({
      id: v.id,
      type: "voice",
      position: { x: p.x - VOICE_AVATAR_PX / 2, y: p.y - VOICE_AVATAR_PX / 2 },
      data: {
        voice: v,
        revealed,
        credentials,
        audienceDimmed,
      } satisfies VoiceFlowData,
      width: VOICE_AVATAR_PX,
      height: VOICE_AVATAR_PX + 12,
      draggable: false,
      selectable: false,
    });
  }

  return out;
}

/* ----------------------------------------------------------------- EDGES */

interface EdgeRecipe {
  id: string;
  source: string;
  target: string;
  touchesCenter: boolean;
  /**
   * Highest of the two endpoints' reveal indices — the edge becomes visible
   * only after both endpoints have appeared.
   */
  revealAt: number;
}

/** Reveal index for any node id (center = 1, voice = 1 + appearOrder). */
function revealIndexFor(id: string): number {
  if (id === CENTER_NODE_ID) return 1;
  const v = MOVEMENT_VOICES.find((mv) => mv.id === id);
  return v ? 1 + v.appearOrder : Number.POSITIVE_INFINITY;
}

const ALL_NODE_IDS: readonly string[] = [
  CENTER_NODE_ID,
  ...MOVEMENT_VOICES.map((v) => v.id),
];

/**
 * All-channel mesh — every node connects to every other node. Edges that
 * touch the Movemental center read brighter so the hub is unmistakable.
 */
const EDGE_RECIPES: readonly EdgeRecipe[] = (() => {
  const out: EdgeRecipe[] = [];
  for (let i = 0; i < ALL_NODE_IDS.length; i++) {
    for (let j = i + 1; j < ALL_NODE_IDS.length; j++) {
      const a = ALL_NODE_IDS[i];
      const b = ALL_NODE_IDS[j];
      out.push({
        id: `mv-${a}-${b}`,
        source: a,
        target: b,
        touchesCenter: a === CENTER_NODE_ID || b === CENTER_NODE_ID,
        revealAt: Math.max(revealIndexFor(a), revealIndexFor(b)),
      });
    }
  }
  return out;
})();

function buildEdges(revealStep: number, prefersReducedMotion: boolean): Edge[] {
  const fullyRevealed = revealStep >= TOTAL_REVEAL_STEPS;
  const animateFlow = fullyRevealed && !prefersReducedMotion;

  return EDGE_RECIPES.map((r) => {
    const visible = revealStep >= r.revealAt;
    const baseOpacity = r.touchesCenter ? 0.5 : 0.36;
    const data: MovementVoicesFlowEdgeData = {
      animateFlow,
      baseOpacity,
      strokeWidth: r.touchesCenter ? 1.28 : 0.95,
      visible,
    };
    return {
      id: r.id,
      source: r.source,
      target: r.target,
      type: "movementVoicesFlow",
      data,
      interactionWidth: 0,
    } satisfies Edge;
  });
}

/* --------------------------------------------------------------- COMPONENT */

const STAGGER_MS = 380;

interface MovementVoicesNetworkProps {
  ariaLabel: string;
}

export function MovementVoicesNetwork({ ariaLabel }: MovementVoicesNetworkProps) {
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const rfRef = useRef<ReactFlowInstance | null>(null);
  const [dims, setDims] = useState<{ w: number; h: number } | null>(null);
  const reducedMotion = useSyncExternalStore(
    subscribeReducedMotion,
    snapshotReducedMotion,
    () => false,
  );
  const [hoverVoice, setHoverVoice] = useState<VoiceGraphVoice | null>(null);
  const [activeAudienceSegments, setActiveAudienceSegments] = useState<
    ReadonlySet<AudienceSegment>
  >(() => new Set());
  const [revealStep, setRevealStep] = useState(0);

  const toggleAudienceSegment = useCallback((seg: AudienceSegment) => {
    setActiveAudienceSegments((prev) => {
      const next = new Set(prev);
      if (next.has(seg)) next.delete(seg);
      else next.add(seg);
      return next;
    });
  }, []);

  const clearAudienceFilters = useCallback(() => {
    setActiveAudienceSegments(new Set());
  }, []);

  /* Resize observer ----------------------------------------------------- */

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const initial = el.getBoundingClientRect();
    setDims(readGraphDimensions(initial));

    const ro = new ResizeObserver((entries) => {
      const r = entries[0]?.contentRect;
      if (!r) return;
      const { w, h } = readGraphDimensions(r);
      setDims((prev) =>
        prev && Math.abs(prev.w - w) < 1 && Math.abs(prev.h - h) < 1
          ? prev
          : { w, h },
      );
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  /**
   * Reduced-motion users see the network fully revealed every render — we
   * derive the visible step instead of fast-forwarding state in an effect,
   * which keeps render output deterministic and avoids cascading renders.
   */
  const effectiveRevealStep = reducedMotion ? TOTAL_REVEAL_STEPS : revealStep;

  /* Stagger reveal — kicks off when the section scrolls into view -------- */

  useEffect(() => {
    if (reducedMotion) return;
    const el = wrapRef.current;
    if (!el) return;

    let started = false;
    let intervalId: ReturnType<typeof setInterval> | undefined;
    let timeoutId: ReturnType<typeof setTimeout> | undefined;

    const start = () => {
      if (started) return;
      started = true;
      timeoutId = setTimeout(() => setRevealStep(1), 80);
      intervalId = setInterval(() => {
        setRevealStep((prev) => {
          const next = prev + 1;
          if (next >= TOTAL_REVEAL_STEPS && intervalId) {
            clearInterval(intervalId);
          }
          return Math.min(next, TOTAL_REVEAL_STEPS);
        });
      }, STAGGER_MS);
    };

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            start();
            io.disconnect();
            break;
          }
        }
      },
      { threshold: 0.25 },
    );
    io.observe(el);

    return () => {
      io.disconnect();
      if (intervalId) clearInterval(intervalId);
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [reducedMotion]);

  /* Layout + react flow data ------------------------------------------- */

  const positions = useMemo(
    () =>
      dims
        ? settleNetworkPositions(dims.w, dims.h)
        : new Map<string, { x: number; y: number }>(),
    [dims],
  );

  const nodes = useMemo(
    () =>
      flowNodesFromLayout(
        positions,
        effectiveRevealStep,
        activeAudienceSegments,
      ),
    [positions, effectiveRevealStep, activeAudienceSegments],
  );

  const edges = useMemo(
    () => buildEdges(effectiveRevealStep, reducedMotion),
    [effectiveRevealStep, reducedMotion],
  );

  const onInit = useCallback((inst: ReactFlowInstance) => {
    rfRef.current = inst;
    inst.fitView({ padding: 0.1, duration: 0 });
  }, []);

  // Refit on dimension changes and when nodes first populate.
  useEffect(() => {
    const inst = rfRef.current;
    if (!inst || !dims || nodes.length === 0) return;
    const id = requestAnimationFrame(() => {
      inst.fitView({
        padding: 0.1,
        duration: reducedMotion ? 0 : 240,
      });
    });
    return () => cancelAnimationFrame(id);
  }, [dims, nodes.length, reducedMotion]);

  /* Hover detail -------------------------------------------------------- */

  const onNodeEnter = useCallback((_: React.MouseEvent, n: Node) => {
    if (n.type === "voice" && n.data && "voice" in n.data) {
      setHoverVoice((n.data as VoiceFlowData).voice);
    }
  }, []);

  const onNodeLeave = useCallback(() => {
    setHoverVoice(null);
  }, []);

  /* Manual replay (Reset view also restarts the reveal) ----------------- */

  const onReset = useCallback(() => {
    rfRef.current?.fitView({
      padding: 0.1,
      duration: reducedMotion ? 0 : 280,
    });
    if (!reducedMotion) {
      setRevealStep(0);
      setTimeout(() => setRevealStep(1), 120);
    }
  }, [reducedMotion]);

  // After a manual reset, advance the stagger one step at a time.
  // Reduced-motion users see everything revealed via `effectiveRevealStep`,
  // so this effect intentionally no-ops for them.
  useEffect(() => {
    if (reducedMotion) return;
    if (revealStep === 0 || revealStep >= TOTAL_REVEAL_STEPS) return;
    const t = setTimeout(() => {
      setRevealStep((prev) => Math.min(prev + 1, TOTAL_REVEAL_STEPS));
    }, STAGGER_MS);
    return () => clearTimeout(t);
  }, [revealStep, reducedMotion]);

  return (
    <div>
      <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
        <p className="text-xs font-medium uppercase tracking-eyebrow text-muted-foreground">
          Movement Voices
        </p>
        <div className="flex flex-wrap items-center gap-2">
          <Button
            type="button"
            size="sm"
            variant="outline"
            className="text-xs"
            onClick={onReset}
          >
            Reset view
          </Button>
          <p className="max-w-sm text-xs text-muted-foreground md:text-right">
            An all-channel network of trusted voices around Movemental — drag
            to pan, scroll or pinch to zoom, hover a portrait for detail.
          </p>
        </div>
      </div>

      <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:items-center sm:gap-3">
        <p className="text-[10px] font-medium uppercase tracking-eyebrow text-muted-foreground">
          Audience relevance
        </p>
        <div className="flex flex-wrap gap-2">
          {AUDIENCE_SEGMENTS.map((seg) => {
            const on = activeAudienceSegments.has(seg);
            return (
              <Button
                key={seg}
                type="button"
                size="sm"
                variant={on ? "default" : "outline"}
                className="h-8 text-xs"
                aria-pressed={on}
                onClick={() => toggleAudienceSegment(seg)}
              >
                {AUDIENCE_SEGMENT_LABEL[seg]}
              </Button>
            );
          })}
          <Button
            type="button"
            size="sm"
            variant="ghost"
            className="h-8 text-xs text-muted-foreground"
            disabled={activeAudienceSegments.size === 0}
            onClick={clearAudienceFilters}
          >
            Clear filters
          </Button>
        </div>
        <p className="max-w-xl text-[11px] leading-snug text-muted-foreground">
          Filters emphasize voices with moderate-or-strong documented depth for
          churches, nonprofits, or institutions — how Movemental frames buyer
          contexts on the home audience fold.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,260px)] lg:items-start">
        <div>
          <div
            ref={wrapRef}
            className="relative w-full overflow-hidden rounded-4xl"
            style={{ height: "clamp(380px, 62vw, 640px)" }}
          >
            <div
              className="h-full w-full"
              role="img"
              aria-label={ariaLabel}
            >
              <ReactFlow
                className="h-full w-full"
                nodes={nodes}
                edges={edges}
                nodeTypes={nodeTypes}
                edgeTypes={edgeTypes}
                onInit={onInit}
                onNodeMouseEnter={onNodeEnter}
                onNodeMouseLeave={onNodeLeave}
                nodesDraggable={false}
                nodesConnectable={false}
                elementsSelectable={false}
                panOnDrag
                zoomOnScroll
                zoomOnPinch
                minZoom={0.4}
                maxZoom={1.65}
                proOptions={{ hideAttribution: true }}
                style={{ background: "transparent" }}
              />
            </div>
          </div>
        </div>

        <aside
          className="rounded-xl bg-section/70 p-4 lg:min-h-[200px]"
          aria-live="polite"
        >
          {hoverVoice ? (
            <div className="space-y-3">
              <p className="text-[10px] font-medium uppercase tracking-eyebrow text-muted-foreground">
                Voice
              </p>
              <p className="text-base font-semibold leading-snug text-foreground">
                {hoverVoice.name}
              </p>
              <p className="text-sm leading-relaxed text-muted-foreground">
                {hoverVoice.title}
              </p>
              {(() => {
                const row = getVoiceAudienceCredentials(hoverVoice.id);
                if (row?.researchPending) {
                  return (
                    <p className="border-t border-border pt-3 text-xs leading-relaxed text-muted-foreground">
                      Audience-specific EEAT credentials are not mapped for this
                      profile yet — product leadership role without a movement
                      leader research dossier in-repo.
                    </p>
                  );
                }
                if (!row) return null;
                return (
                  <div className="border-t border-border pt-3 space-y-2">
                    <p className="text-[10px] font-medium uppercase tracking-eyebrow text-muted-foreground">
                      Audience credentials
                    </p>
                    <ul className="space-y-2 text-xs leading-relaxed">
                      {AUDIENCE_SEGMENTS.map((seg) => {
                        const st = row.segments[seg];
                        const summary = row.summaryBySegment?.[seg];
                        if (!st) return null;
                        return (
                          <li key={seg}>
                            <span className="font-medium text-foreground">
                              {AUDIENCE_SEGMENT_LABEL[seg]}
                            </span>
                            <span className="text-muted-foreground">
                              {" "}
                              · {CREDENTIAL_STRENGTH_LABEL[st]}
                            </span>
                            {summary ? (
                              <span className="mt-0.5 block text-muted-foreground">
                                {summary}
                              </span>
                            ) : null}
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                );
              })()}
            </div>
          ) : (
            <p className="text-sm leading-relaxed text-muted-foreground">
              These are the voices whose work and judgment shape how Movemental
              thinks. Their participation is what makes this category different
              from generic AI for nonprofits. Hover a portrait for detail.
            </p>
          )}
        </aside>
      </div>

      <ul className="sr-only">
        <li>{MOVEMENTAL_CENTER.label} (center node)</li>
        {[...MOVEMENT_VOICES]
          .sort((a, b) => a.appearOrder - b.appearOrder)
          .map((v) => (
            <li key={v.id}>
              {v.name}: {v.title}
            </li>
          ))}
      </ul>
    </div>
  );
}
