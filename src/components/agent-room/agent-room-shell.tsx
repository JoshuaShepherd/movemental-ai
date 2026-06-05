"use client";

import { useSyncExternalStore } from "react";

import { AgentRoom } from "./agent-room";
import { AgentRoomFallback } from "./agent-room-fallback";

const noopSubscribe = () => () => {};
/** False during SSR + first render, true once hydrated — no setState-in-effect. */
function useHydrated(): boolean {
  return useSyncExternalStore(
    noopSubscribe,
    () => true,
    () => false,
  );
}

/**
 * Boots the room. The static fallback is server-rendered into the initial HTML
 * (crawlable, no-JS legible); once JS hydrates, the live room takes over. If JS
 * never runs, the fallback document remains — we never bet the front door on JS.
 */
export function AgentRoomShell() {
  const hydrated = useHydrated();
  return hydrated ? <AgentRoom /> : <AgentRoomFallback />;
}
