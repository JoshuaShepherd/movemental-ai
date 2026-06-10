/**
 * Agent Room — browser → room proxy request contract.
 *
 * The room is a PUBLIC surface: there is no authenticated user. The browser
 * sends only the message, the session id, a stable anonymous id, and the local
 * history; the proxy injects the pinned tenant + service auth before forwarding
 * to the engine (`movemental-ai-agents`). Tenant and the service secret are
 * NEVER set by the client.
 */
import { z } from "zod";

export const agentRoomClientBodySchema = z.object({
  message: z.string().min(1).max(8_000),
  /** Stable per-conversation id (client-persisted) so the engine threads the turn. */
  sessionId: z.string().min(1).max(200).optional(),
  /** Stable per-browser anonymous id for trace continuity; proxy generates one if absent. */
  anonId: z.string().min(1).max(200).optional(),
  /** Override the host slug (defaults to room-host). */
  agentSlug: z.string().min(1).max(120).optional(),
  /** Local conversation history replayed to the engine (it has no DB session for anon users). */
  history: z
    .array(
      z.object({
        role: z.enum(["user", "assistant"]),
        content: z.string().max(8_000),
      }),
    )
    .max(60)
    .optional(),
  /** Room phase (INT-10). `"discuss"` activates the engine's phase-aware prompt
   *  block. Defaults to `"guide"` on the engine when omitted. */
  phase: z.enum(["guide", "discuss"]).optional(),
});

export type AgentRoomClientBody = z.infer<typeof agentRoomClientBodySchema>;
