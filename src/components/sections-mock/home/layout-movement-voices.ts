import {
  forceCenter,
  forceCollide,
  forceLink,
  forceManyBody,
  forceSimulation,
} from "d3";
import type { SimulationNodeDatum } from "d3";

import type { VoiceGraphVoice, VoiceThemeAnchor } from "./voices-graph-data";

const AVATAR = 72;
const THEME_W = 104;
const THEME_H = 36;

export type LayoutKind = "voice" | "theme";

export type VoiceLayoutNode = SimulationNodeDatum & {
  id: string;
  kind: LayoutKind;
  voice?: VoiceGraphVoice;
  label?: string;
};

/** Half-extent from node center for collision / top-left conversion */
export function nodeHalfExtent(n: VoiceLayoutNode): { w: number; h: number } {
  if (n.kind === "voice") return { w: AVATAR / 2, h: AVATAR / 2 };
  return { w: THEME_W / 2, h: THEME_H / 2 };
}

/**
 * Fixed-tick force layout in logical coordinates; callers scale to the React Flow viewport.
 */
export function layoutMovementVoices(
  voices: readonly VoiceGraphVoice[],
  themes: readonly VoiceThemeAnchor[],
  links: readonly { source: string; target: string }[],
  width: number,
  height: number,
  reducedMotion: boolean,
): Map<string, { x: number; y: number }> {
  const w = Math.max(width, 320);
  const h = Math.max(height, 280);
  const cx = w / 2;
  const cy = h / 2;

  const voiceNodes: VoiceLayoutNode[] = voices.map((voice, i) => {
    const golden = Math.PI * (3 - Math.sqrt(5));
    const t = i * golden;
    const r = 0.35 * Math.min(w, h) * Math.sqrt((i + 1) / voices.length);
    const j = (i % 5) - 2;
    return {
      id: voice.id,
      kind: "voice",
      voice,
      x: cx + Math.cos(t) * r + j * 2.5,
      y: cy + Math.sin(t) * r + ((i * 3) % 5) - 2,
    };
  });

  const themeNodes: VoiceLayoutNode[] = themes.map((theme, i) => {
    const a = (i / themes.length) * Math.PI * 2 - Math.PI / 2;
    const r = 0.12 * Math.min(w, h);
    return {
      id: theme.id,
      kind: "theme",
      label: theme.label,
      x: cx + Math.cos(a) * r,
      y: cy + Math.sin(a) * r,
    };
  });

  const nodes = [...voiceNodes, ...themeNodes];

  const linkData = links.map((l) => ({ ...l }));
  const sim = forceSimulation(nodes)
    .force(
      "link",
      forceLink<VoiceLayoutNode, { source: string; target: string }>(linkData)
        .id((d) => d.id)
        .distance(96)
        .strength(0.55),
    )
    .force("charge", forceManyBody<VoiceLayoutNode>().strength(-220))
    .force("center", forceCenter(cx, cy))
    .force(
      "collide",
      forceCollide<VoiceLayoutNode>().radius((d) => {
        const { w: hw, h: hh } = nodeHalfExtent(d);
        return Math.hypot(hw, hh) + 8;
      }),
    );

  const ticks = reducedMotion ? 80 : 220;
  sim.alpha(1).restart();
  for (let i = 0; i < ticks; i++) sim.tick();
  sim.stop();

  const out = new Map<string, { x: number; y: number }>();
  for (const n of nodes) {
    if (n.x != null && n.y != null) {
      out.set(n.id, { x: n.x, y: n.y });
    }
  }
  return out;
}

export const VOICE_AVATAR_PX = AVATAR;
export const THEME_NODE_W = THEME_W;
export const THEME_NODE_H = THEME_H;
