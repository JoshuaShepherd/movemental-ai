import { scaleLinear } from "d3";

import type { EntityType, KnowledgeGraph, LeaderLayout, LayoutPoint } from "./types";

/**
 * Curated polar layout: semantic zones (not a force-directed hairball).
 * Uses d3-scale for even distribution along each zone’s arc — DOM rendering stays in React.
 */

type ZoneSpec = {
  id: string;
  label: string;
  types: ReadonlySet<EntityType>;
  /** Start angle (radians), east = 0, CCW positive */
  angle0: number;
  /** Angular width (radians) */
  angleSpan: number;
  /** Base radius as fraction of min(width,height) */
  radiusFrac: number;
};

const ZONES: ZoneSpec[] = [
  {
    id: "canonical",
    label: "Canonical sources",
    types: new Set(["book", "publication"]),
    angle0: -Math.PI * 0.85,
    angleSpan: Math.PI * 0.45,
    radiusFrac: 0.2,
  },
  {
    id: "surface",
    label: "Discoverability",
    types: new Set(["article", "video", "series"]),
    angle0: -Math.PI * 0.35,
    angleSpan: Math.PI * 0.55,
    radiusFrac: 0.3,
  },
  {
    id: "archive",
    label: "Media archive",
    types: new Set(["audio"]),
    angle0: Math.PI * 0.22,
    angleSpan: Math.PI * 0.38,
    radiusFrac: 0.26,
  },
  {
    id: "structure",
    label: "Synthesis & formation",
    types: new Set(["pathway", "course"]),
    angle0: Math.PI * 0.55,
    angleSpan: Math.PI * 0.42,
    radiusFrac: 0.36,
  },
  {
    id: "legibility",
    label: "Machine legibility",
    types: new Set(["transcript", "concept", "topic"]),
    angle0: Math.PI * 0.98,
    angleSpan: Math.PI * 0.5,
    radiusFrac: 0.42,
  },
  {
    id: "reach",
    label: "Reach",
    types: new Set(["translation", "language"]),
    angle0: -Math.PI * 0.05,
    angleSpan: Math.PI * 0.28,
    radiusFrac: 0.48,
  },
  {
    id: "interaction",
    label: "Interaction layer",
    types: new Set(["ai_layer"]),
    angle0: -Math.PI * 0.55,
    angleSpan: Math.PI * 0.22,
    radiusFrac: 0.55,
  },
];

function zoneForType(t: EntityType): ZoneSpec | undefined {
  return ZONES.find((z) => z.types.has(t));
}

export function layoutLeaderOrbit(
  graph: KnowledgeGraph,
  width: number,
  height: number,
): LeaderLayout {
  const positions = new Map<string, LayoutPoint>();
  const minSide = Math.min(width, height);
  const cx = width / 2;
  const cy = height / 2;

  const leader = graph.nodes.find((n) => n.type === "leader");
  if (leader) {
    positions.set(leader.id, { x: cx, y: cy, r: Math.max(14, minSide * 0.06) });
  }

  const byZone = new Map<string, typeof graph.nodes>();
  for (const z of ZONES) byZone.set(z.id, []);
  const overflow: typeof graph.nodes = [];
  for (const n of graph.nodes) {
    if (n.type === "leader") continue;
    const z = zoneForType(n.type);
    if (!z) {
      overflow.push(n);
      continue;
    }
    byZone.get(z.id)!.push(n);
  }

  for (const z of ZONES) {
    const nodes = byZone.get(z.id) ?? [];
    if (nodes.length === 0) continue;
    const angleScale = scaleLinear()
      .domain([0, Math.max(1, nodes.length - 1)])
      .range([z.angle0, z.angle0 + z.angleSpan]);
    const r = minSide * z.radiusFrac;
    nodes.forEach((n, i) => {
      const a = angleScale(i);
      positions.set(n.id, {
        x: cx + Math.cos(a) * r,
        y: cy + Math.sin(a) * r,
        r: Math.max(5, minSide * 0.018 * (1 + (n.weight ?? 0) * 0.15)),
      });
    });
  }

  if (overflow.length) {
    const r = minSide * 0.5;
    const angleScale = scaleLinear()
      .domain([0, Math.max(1, overflow.length - 1)])
      .range([-Math.PI * 0.1, Math.PI * 0.1]);
    overflow.forEach((n, i) => {
      const a = angleScale(i);
      positions.set(n.id, {
        x: cx + Math.cos(a) * r,
        y: cy + Math.sin(a) * r,
        r: Math.max(5, minSide * 0.016),
      });
    });
  }

  const zones = ZONES.map((z) => ({
    id: z.id,
    label: z.label,
    angleStart: z.angle0,
    angleEnd: z.angle0 + z.angleSpan,
  }));

  return { positions, zones };
}
