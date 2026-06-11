import { LEADERS } from "@/lib/agent-room/data/leaders";

export type AgentDeepLink =
  | { kind: "leader"; index: number }
  | { kind: "ask"; text: string }
  | null;

/** Read one-shot deep-link params from `/agent?leader=N` or `/agent?ask=…`. */
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
  if (ask) return { kind: "ask", text: ask };

  return null;
}

/** Strip consumed query params without a full navigation. */
export function clearAgentDeepLinkParams(): void {
  if (typeof window === "undefined") return;
  const url = new URL(window.location.href);
  url.searchParams.delete("leader");
  url.searchParams.delete("ask");
  const next = `${url.pathname}${url.search}${url.hash}`;
  window.history.replaceState({}, "", next);
}
