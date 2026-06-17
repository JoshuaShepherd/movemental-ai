/**
 * Agent Room — single conversation thread (conversation choreography SSOT §8).
 * Replaces the split between Guide `guideMessages` and Discuss `transcript`.
 */

export type ThreadTurn = {
  role: "user" | "assistant";
  content: string;
  /** Assistant turn still receiving stream deltas. */
  streaming?: boolean;
  /** In-thread styling hint only (long turns) — never routes content. */
  passage?: boolean;
};

export function appendUserTurn(thread: ThreadTurn[], content: string): ThreadTurn[] {
  return [...thread, { role: "user", content }];
}

export function updateStreamingAssistant(thread: ThreadTurn[], content: string): ThreadTurn[] {
  const last = thread[thread.length - 1];
  if (last?.role === "assistant" && last.streaming) {
    return [...thread.slice(0, -1), { ...last, content }];
  }
  return [...thread, { role: "assistant", content, streaming: true }];
}

export function finalizeAssistantTurn(
  thread: ThreadTurn[],
  content: string,
  passageThreshold: number,
): ThreadTurn[] {
  const passage = content.length > passageThreshold;
  const last = thread[thread.length - 1];
  if (last?.role === "assistant" && last.streaming) {
    return [...thread.slice(0, -1), { role: "assistant", content, passage }];
  }
  if (last?.role === "assistant" && last.content === content) {
    return [...thread.slice(0, -1), { ...last, streaming: undefined, passage }];
  }
  return [...thread, { role: "assistant", content, passage }];
}
