import type { Metadata } from "next";

import { AgentRoomShell } from "@/components/agent-room/agent-room-shell";

export const metadata: Metadata = {
  title: "Movemental, where your organization stands with AI",
  description:
    "AI is already inside your organization. Movemental is a focused guide for one thing: seeing where your organization actually stands with AI, and what to do next. Built with a network of trusted movement leaders.",
  alternates: {
    canonical: "/agent",
  },
};

/**
 * The Agent Room — a single full-screen surface hosted by an agent. Marketing
 * chrome is hidden for this route (proxy.ts injects `x-movemental-shell: room`);
 * the room manages its own 100dvh layout.
 */
export default function AgentRoomPage() {
  return <AgentRoomShell />;
}
