/**
 * Contextual status lines for the expanded conversation drawer while the agent
 * is working — short, honest, Caveat-voiced copy tied to real stream signals.
 */
export const THINKING_STATUS = {
  readingQuestion: "Reading your question…",
  initializing: "Getting oriented…",
  context: "Reading where we are…",
  thinking: "Thinking…",
  generating: "Writing…",
  working: "Working on it…",
  handoff: "Composing the read-back…",
} as const;

export type ThinkingStatusKey = keyof typeof THINKING_STATUS;

/** Default when thinking with no finer-grained signal yet. */
export const DEFAULT_THINKING_STATUS = THINKING_STATUS.thinking;

/** Shown when the turn ends with ui_render but no assistant prose. */
export const TOOL_ONLY_ASSISTANT_FALLBACK =
  "I've updated the sheet above — take a look.";

export type ProgressPhase =
  | "initializing"
  | "context"
  | "thinking"
  | "tool_call"
  | "generating"
  | "complete";

const PHASE_STATUS: Partial<Record<ProgressPhase, string>> = {
  initializing: THINKING_STATUS.initializing,
  context: THINKING_STATUS.context,
  thinking: THINKING_STATUS.thinking,
  generating: THINKING_STATUS.generating,
  tool_call: THINKING_STATUS.working,
};

/**
 * Resolve a human-facing status line from an engine `progress` chunk.
 * Prefers the engine's own `message` when present (most truthful).
 */
export function resolveProgressStatus(
  chunk: { phase: ProgressPhase; message?: string; status?: string },
  hasAssistantText: boolean,
): string | null {
  if (hasAssistantText) return null;
  const engineMessage = chunk.message?.trim();
  if (engineMessage) return engineMessage;
  if (chunk.phase === "complete") return null;
  return PHASE_STATUS[chunk.phase] ?? null;
}
