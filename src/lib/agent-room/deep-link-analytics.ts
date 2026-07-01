/** Client-side hook for agent-room deep-link analytics (PostHog-ready). */
export function trackAgentDeepLink(
  kind: "leader" | "ask" | "scene",
  detail: Record<string, string | number>,
): void {
  if (typeof window === "undefined") return;
  window.dispatchEvent(
    new CustomEvent("movemental:agent-deep-link", {
      detail: { kind, ...detail },
    }),
  );
}
