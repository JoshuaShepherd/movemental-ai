/**
 * Agent Room — client-side stream contract.
 *
 * Mirrors the engine's `StreamChunk` union in `movemental-ai-agents`
 * (`src/lib/ai/types.ts`), including the `ui_render` variant that drives the
 * room "screen". Keep this in sync with the engine by contract — the repos do
 * not share a package. Per-chunk Zod validation drops malformed chunks rather
 * than throwing, so a single bad frame never breaks the stream.
 *
 * This is protocol only (no React, no visual styling). The room shell, render
 * components, stream hook, and proxy route are built separately once the
 * prototype design is in place (Ink Band tokens).
 */
import { z } from "zod";

/**
 * Closed set of components the agent may render to the screen — the honesty rail.
 *
 * INT-01 (Decision A): mirrors the engine `ComponentId` (`ai/types.ts`) exactly.
 * The first 13 are the Ink Band `ScreenId` set (`acts.ts`); the last 3 are
 * engine-extra (no Ink Band screen). `screen-map.ts` is the ComponentId ↔
 * ScreenId SSOT — keep all three (this list, the engine enum, `screen-map`) in
 * lockstep; a mismatch fails compile in `screen-map.ts`.
 */
export const COMPONENT_IDS = [
  // Ink Band screen set (1:1 with `ScreenId`)
  "home",
  "beat",
  "readback",
  "safety",
  "confirm",
  "path",
  "founders",
  "leader",
  "about",
  "contact",
  "pricing",
  "faq",
  "capture",
  "safetyFlow",
  // Engine-extra (no Ink Band screen; rendered directly by the client)
  "network",
  "audience",
  "handoff_human",
] as const;

export const componentIdSchema = z.enum(COMPONENT_IDS);
export type ComponentId = (typeof COMPONENT_IDS)[number];

export const progressPhaseSchema = z.enum([
  "initializing",
  "context",
  "thinking",
  "tool_call",
  "generating",
  "complete",
]);

const usageSchema = z.object({
  inputTokens: z.number(),
  outputTokens: z.number(),
  cacheReadTokens: z.number().optional(),
});

export const streamChunkSchema = z.discriminatedUnion("type", [
  z.object({ type: z.literal("text_delta"), delta: z.string() }),
  z.object({ type: z.literal("tool_call"), id: z.string(), name: z.string(), input: z.unknown() }),
  z.object({ type: z.literal("tool_result"), id: z.string(), output: z.unknown() }),
  z.object({
    type: z.literal("agent_handoff"),
    from: z.string(),
    to: z.string(),
    reason: z.string(),
  }),
  z.object({
    type: z.literal("ui_render"),
    surface: z.literal("screen"),
    component: componentIdSchema,
    // Validated against the per-component prop schema by the renderer, not here.
    props: z.unknown(),
    replace: z.boolean().optional(),
  }),
  // INT-04: a hand-ink gesture over a target selector on the active screen.
  // Mirrors the engine `ink_gesture` chunk; the client draws via `drawGesture`,
  // a missing/stale `target` is a safe no-op.
  z.object({
    type: z.literal("ink_gesture"),
    kind: z.enum(["underline", "circle", "arrow"]),
    target: z.string(),
  }),
  // INT-05: tappable suggestion chips — the agent's `suggest` act. Each chip's
  // `value` is sent back as the next user turn when tapped (chips route to the
  // agent, never a local scene). Mirrors the engine `suggest` chunk; the engine
  // `suggest_chips` tool caps the count — the client just validates shape.
  z.object({
    type: z.literal("suggest"),
    chips: z
      .array(
        z.object({
          label: z.string(),
          lead: z.boolean().optional(),
          value: z.string(),
        }),
      )
      .min(1),
  }),
  z.object({
    type: z.literal("done"),
    usage: usageSchema,
    anthropicRawContent: z.unknown().optional(),
  }),
  z.object({
    type: z.literal("progress"),
    phase: progressPhaseSchema,
    message: z.string().optional(),
    toolName: z.string().optional(),
    status: z.string().optional(),
  }),
  z.object({ type: z.literal("error"), message: z.string() }),
]);

export type StreamChunk = z.infer<typeof streamChunkSchema>;
export type UiRenderChunk = Extract<StreamChunk, { type: "ui_render" }>;

/** Parse a single SSE `data:` payload into a validated chunk, or null if malformed. */
export function parseStreamChunk(data: string): StreamChunk | null {
  let json: unknown;
  try {
    json = JSON.parse(data);
  } catch {
    return null;
  }
  const result = streamChunkSchema.safeParse(json);
  return result.success ? result.data : null;
}

/**
 * Incremental SSE parser. Accepts the running buffer, returns the validated
 * chunks completed in it plus the unparsed tail (a partial event) to prepend to
 * the next read. Mirrors the visual-editor `agent-sse-parse` behavior: handles
 * multi-line `data:` events and silently drops malformed chunks.
 */
export function parseSSEBuffer(buffer: string): { chunks: StreamChunk[]; remaining: string } {
  const chunks: StreamChunk[] = [];
  const events = buffer.split("\n\n");
  const remaining = events.pop() ?? "";
  for (const event of events) {
    const dataLines = event
      .split("\n")
      .filter((line) => line.startsWith("data:"))
      .map((line) => line.slice(5).trimStart());
    if (dataLines.length === 0) continue;
    const payload = dataLines.join("\n");
    if (payload === "[DONE]") continue;
    const chunk = parseStreamChunk(payload);
    if (chunk) chunks.push(chunk);
  }
  return { chunks, remaining };
}
