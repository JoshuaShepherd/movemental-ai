import { LEADERS } from "@/lib/agent-room/data/leaders";
import type { ScreenId } from "@/lib/agent-room/acts";
import { parseWaysInAudience, type WaysInAudience } from "@/lib/agent-room/ways-in-doors";

/** Shareable in-room destinations mapped to stub scene keys. */
export const SHAREABLE_SCENE_DEEP_LINKS: Partial<Record<ScreenId, string>> = {
  pricing: "cost",
  faq: "toFaq",
  path: "toPath",
  safety: "toSafety",
  about: "whatIs",
  contact: "talkToUs",
};

const SHAREABLE_SCREEN_IDS = new Set(Object.keys(SHAREABLE_SCENE_DEEP_LINKS));

export type AgentDeepLink =
  | { kind: "leader"; index: number }
  | { kind: "ask"; text: string; audience: WaysInAudience | null }
  | { kind: "scene"; screenId: ScreenId; sceneKey: string }
  | null;

/**
 * Read one-shot deep-link params from `/agent?leader=N`,
 * `/agent?ask=…&from=<segment>`, or `/agent?scene=<screenId>`.
 */
export function readAgentDeepLink(): AgentDeepLink {
  if (typeof window === "undefined") return null;
  const params = new URLSearchParams(window.location.search);

  const leaderRaw = params.get("leader");
  if (leaderRaw !== null) {
    const index = Number.parseInt(leaderRaw, 10);
    if (!Number.isNaN(index) && index >= 0 && index < LEADERS.length) {
      return { kind: "leader", index };
    }
  }

  const sceneRaw = params.get("scene")?.trim();
  if (sceneRaw && SHAREABLE_SCREEN_IDS.has(sceneRaw)) {
    const screenId = sceneRaw as ScreenId;
    const sceneKey = SHAREABLE_SCENE_DEEP_LINKS[screenId];
    if (sceneKey) {
      return { kind: "scene", screenId, sceneKey };
    }
  }

  const ask = params.get("ask")?.trim();
  if (ask) return { kind: "ask", text: ask, audience: parseWaysInAudience(params.get("from")) };

  return null;
}

/** Strip consumed query params without a full navigation. */
export function clearAgentDeepLinkParams(): void {
  if (typeof window === "undefined") return;
  const url = new URL(window.location.href);
  url.searchParams.delete("leader");
  url.searchParams.delete("ask");
  url.searchParams.delete("from");
  url.searchParams.delete("scene");
  const next = `${url.pathname}${url.search}${url.hash}`;
  window.history.replaceState({}, "", next);
}
