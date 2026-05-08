"use client";

import { useEffect, useRef, useState } from "react";
import {
  forceCenter,
  forceCollide,
  forceLink,
  forceManyBody,
  forceSimulation,
  type SimulationLinkDatum,
  type SimulationNodeDatum,
} from "d3";

import { VOICE_AVATAR_PX } from "./layout-movement-voices";
import { CENTER_VOICE_ID, MOVEMENT_VOICES } from "./voices-graph-data";

interface SimNode extends SimulationNodeDatum {
  id: string;
}

interface SimLink extends SimulationLinkDatum<SimNode> {
  distance: number;
  touchesCenter: boolean;
}

export interface VoicePosition {
  x: number;
  y: number;
}

const PADDING = VOICE_AVATAR_PX / 2 + 6;

function seedPositions(width: number, height: number): SimNode[] {
  const cx = width / 2;
  const cy = height / 2;
  const minDim = Math.min(width, height);

  return MOVEMENT_VOICES.map((v, i) => {
    if (v.id === CENTER_VOICE_ID) {
      return { id: v.id, x: cx, y: cy, fx: cx, fy: cy };
    }
    const stagger = ((i * 1.371) % 1) - 0.5;
    const angle =
      ((i - 1) / Math.max(MOVEMENT_VOICES.length - 1, 1)) * Math.PI * 2 + stagger;
    const radius = minDim * (0.24 + ((i * 7) % 13) / 100);
    return {
      id: v.id,
      x: cx + Math.cos(angle) * radius,
      y: cy + Math.sin(angle) * radius,
    } satisfies SimNode;
  });
}

function buildLinks(width: number, height: number): SimLink[] {
  const minDim = Math.min(width, height);
  const baseDist = minDim * 0.34;
  const out: SimLink[] = [];

  for (let i = 0; i < MOVEMENT_VOICES.length; i++) {
    for (let j = i + 1; j < MOVEMENT_VOICES.length; j++) {
      const a = MOVEMENT_VOICES[i].id;
      const b = MOVEMENT_VOICES[j].id;
      const touchesCenter = a === CENTER_VOICE_ID || b === CENTER_VOICE_ID;
      const jitter = (((i + 1) * 17 + (j + 1) * 11) % 27) - 13;
      const distance = touchesCenter ? baseDist * 0.72 : baseDist * 1.12 + jitter;
      out.push({ source: a, target: b, distance, touchesCenter });
    }
  }
  return out;
}

function clamp(x: number, lo: number, hi: number): number {
  return Math.max(lo, Math.min(hi, x));
}

function initialPositions(width: number, height: number): Map<string, VoicePosition> {
  const cx = width / 2;
  const cy = height / 2;
  const m = new Map<string, VoicePosition>();
  for (const n of seedPositions(width, height)) {
    m.set(n.id, { x: n.x ?? cx, y: n.y ?? cy });
  }
  return m;
}

export function useMovementVoicesSimulation(
  width: number,
  height: number,
  reducedMotion: boolean,
): Map<string, VoicePosition> {
  const [positions, setPositions] = useState<Map<string, VoicePosition>>(
    () => initialPositions(width, height),
  );
  const rafRef = useRef<number | null>(null);
  const pendingRef = useRef<Map<string, VoicePosition> | null>(null);

  useEffect(() => {
    const cx = width / 2;
    const cy = height / 2;

    const nodes = seedPositions(width, height);
    const links = buildLinks(width, height);

    // Vary charge per node so K_n's natural symmetry is broken — without this
    // the simulation tends to settle into a regular polygon around the hub.
    const chargeFor = (n: SimNode) => {
      if (n.id === CENTER_VOICE_ID) return -420;
      const idx = MOVEMENT_VOICES.findIndex((v) => v.id === n.id);
      // Deterministic per-node variance in [-360, -200].
      return -200 - ((idx * 53) % 161);
    };

    // Strengthen a few "affinity" pairs (adjacent in the source list) so the
    // network forms loose clusters rather than a uniform mesh.
    const affinityIndex = (id: string) =>
      MOVEMENT_VOICES.findIndex((v) => v.id === id);

    const sim = forceSimulation<SimNode>(nodes)
      .force(
        "charge",
        forceManyBody<SimNode>()
          .strength(chargeFor)
          .distanceMax(Math.min(width, height) * 0.95),
      )
      .force(
        "collide",
        forceCollide<SimNode>(VOICE_AVATAR_PX * 0.72).iterations(2),
      )
      .force("center", forceCenter(cx, cy).strength(0.05))
      .force(
        "link",
        forceLink<SimNode, SimLink>(links)
          .id((d) => d.id)
          .distance((l) => l.distance)
          .strength((l) => {
            if (l.touchesCenter) return 0.22;
            const aId = typeof l.source === "object" ? l.source.id : l.source;
            const bId = typeof l.target === "object" ? l.target.id : l.target;
            const gap = Math.abs(affinityIndex(aId as string) - affinityIndex(bId as string));
            // Adjacent voices in the source list pull each other slightly more
            // — gives the layout loose clusters.
            return gap === 1 ? 0.08 : gap === 2 ? 0.05 : 0.025;
          }),
      )
      .alpha(1)
      .alphaDecay(reducedMotion ? 0.1 : 0.02)
      .alphaTarget(reducedMotion ? 0 : 0.05)
      .velocityDecay(0.42);

    const flush = () => {
      const next = new Map<string, VoicePosition>();
      for (const n of nodes) {
        const x = clamp(n.x ?? cx, PADDING, width - PADDING);
        const y = clamp(n.y ?? cy, PADDING, height - PADDING);
        next.set(n.id, { x, y });
      }
      setPositions(next);
    };

    if (reducedMotion) {
      sim.tick(220);
      flush();
      sim.stop();
      return () => sim.stop();
    }

    sim.on("tick", () => {
      const next = new Map<string, VoicePosition>();
      for (const n of nodes) {
        const x = clamp(n.x ?? cx, PADDING, width - PADDING);
        const y = clamp(n.y ?? cy, PADDING, height - PADDING);
        next.set(n.id, { x, y });
      }
      pendingRef.current = next;
      if (rafRef.current == null) {
        rafRef.current = requestAnimationFrame(() => {
          rafRef.current = null;
          if (pendingRef.current) {
            setPositions(pendingRef.current);
            pendingRef.current = null;
          }
        });
      }
    });

    return () => {
      sim.stop();
      if (rafRef.current != null) cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    };
  }, [width, height, reducedMotion]);

  return positions;
}
