import {
  forceCollide,
  forceLink,
  forceManyBody,
  forceSimulation,
  forceX,
  forceY,
  type SimulationLinkDatum,
  type SimulationNodeDatum,
} from "d3";

import { CENTER_NODE_PX, VOICE_AVATAR_PX } from "./layout-movement-voices";
import { CENTER_NODE_ID, MOVEMENT_VOICES } from "./voices-graph-data";

interface SimNode extends SimulationNodeDatum {
  id: string;
}

interface SimLink extends SimulationLinkDatum<SimNode> {
  distance: number;
  touchesCenter: boolean;
}

const PADDING = Math.max(VOICE_AVATAR_PX, CENTER_NODE_PX) / 2 + 18;

/** Mulberry32 — small seeded PRNG so the layout is identical on every load. */
function makeRandom(seed: number): () => number {
  let s = seed >>> 0;
  return () => {
    s = (s + 0x6d2b79f5) | 0;
    let t = s;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/**
 * IDs of every node the force simulation knows about — the Movemental center
 * plus every voice. Order matters for stable seeding.
 */
const NODE_IDS: readonly string[] = [
  CENTER_NODE_ID,
  ...MOVEMENT_VOICES.map((v) => v.id),
];

function seedNodes(width: number, height: number): SimNode[] {
  const cx = width / 2;
  const cy = height / 2;
  const minDim = Math.min(width, height);
  const maxDim = Math.max(width, height);

  return NODE_IDS.map((id, i) => {
    if (id === CENTER_NODE_ID) {
      // Pin Movemental dead center so the network reads as hub-and-mesh.
      return { id, x: cx, y: cy, fx: cx, fy: cy };
    }
    // Golden-angle spiral seed — irregular starting positions; mild elliptical
    // stretch + per-index bias breaks radial symmetry after the sim settles.
    const angle = i * 2.3999632 + 0.31;
    const radius = minDim * (0.2 + ((i * 13) % 17) / 90);
    const biasX = ((i * 47) % 23) / 22 - 0.5;
    const biasY = ((i * 31) % 19) / 18 - 0.5;
    const stretch = maxDim / minDim;
    const ex = stretch > 1.12 ? 1.05 + biasX * 0.09 : 1 + biasX * 0.06;
    const ey = stretch > 1.12 ? 1 + biasY * 0.06 : 1.05 + biasY * 0.09;
    return {
      id,
      x: cx + Math.cos(angle) * radius * ex,
      y: cy + Math.sin(angle) * radius * ey,
    } satisfies SimNode;
  });
}

function buildLinks(width: number, height: number): SimLink[] {
  const minDim = Math.min(width, height);
  const baseDist = minDim * 0.38;
  const out: SimLink[] = [];

  for (let i = 0; i < NODE_IDS.length; i++) {
    for (let j = i + 1; j < NODE_IDS.length; j++) {
      const a = NODE_IDS[i];
      const b = NODE_IDS[j];
      const touchesCenter = a === CENTER_NODE_ID || b === CENTER_NODE_ID;
      const jitter = (((i + 1) * 17 + (j + 1) * 11) % 27) - 13;
      const distance = touchesCenter ? baseDist * 0.92 : baseDist * 1.38 + jitter;
      out.push({ source: a, target: b, distance, touchesCenter });
    }
  }
  return out;
}

/**
 * Force-directed all-channel network, settled synchronously so the result is
 * a static, organic-looking layout (no live tick drift). Determinism comes
 * from a seeded PRNG plus deterministic seed positions, so the network looks
 * the same every render at a given size.
 */
export function settleNetworkPositions(
  width: number,
  height: number,
): Map<string, { x: number; y: number }> {
  const cx = width / 2;
  const cy = height / 2;
  const minDim = Math.min(width, height);
  const nodes = seedNodes(width, height);
  const links = buildLinks(width, height);

  // Per-node charge variance so the all-channel mesh doesn't settle into a
  // regular polygon around the hub.
  const chargeFor = (n: SimNode) => {
    if (n.id === CENTER_NODE_ID) return -760;
    const idx = NODE_IDS.indexOf(n.id);
    return -340 - ((idx * 53) % 181);
  };

  const sim = forceSimulation<SimNode>(nodes)
    .randomSource(makeRandom(0x9e3779b1))
    .force(
      "charge",
      forceManyBody<SimNode>().strength(chargeFor).distanceMax(minDim * 0.95),
    )
    .force(
      "collide",
      forceCollide<SimNode>(VOICE_AVATAR_PX * 0.94).iterations(4),
    )
    .force(
      "link",
      forceLink<SimNode, SimLink>(links)
        .id((d) => d.id)
        .distance((l) => l.distance)
        .strength((l) => (l.touchesCenter ? 0.08 : 0.035)),
    )
    .force("x", forceX<SimNode>(cx).strength(0.035))
    .force("y", forceY<SimNode>(cy).strength(0.035))
    .alpha(1)
    .alphaDecay(0.035)
    .alphaMin(0.01)
    .stop();

  for (let i = 0; i < 520; i++) {
    sim.tick();
    if (sim.alpha() < sim.alphaMin()) break;
  }

  const out = new Map<string, { x: number; y: number }>();
  for (const n of nodes) {
    const x = Math.max(PADDING, Math.min(width - PADDING, n.x ?? cx));
    const y = Math.max(PADDING, Math.min(height - PADDING, n.y ?? cy));
    out.set(n.id, { x, y });
  }
  return out;
}
