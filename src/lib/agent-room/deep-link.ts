import { LEADERS } from "@/lib/agent-room/data/leaders";
import { parseWaysInAudience, type WaysInAudience } from "@/lib/agent-room/ways-in-doors";

export type AgentDeepLink =
  | { kind: "leader"; index: number }
  | { kind: "ask"; text: string; audience: WaysInAudience | null }
  | null;

/**
 * Read one-shot deep-link params from `/agent?leader=N` or
 * `/agent?ask=…&from=<segment>`. The optional `from` carries the audience segment
 * a document surface handed off from, so the concierge opens route-aware.
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
  const next = `${url.pathname}${url.search}${url.hash}`;
  window.history.replaceState({}, "", next);
}
