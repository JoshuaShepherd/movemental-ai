/**
 * Agent Room — single conversation thread (conversation choreography SSOT §8).
 * Replaces the split between Guide `guideMessages` and Discuss `transcript`.
 */

export type ThreadAffordanceKind = "back_to_sheet";

export type ThreadTurn =
  | {
      role: "user";
      content: string;
    }
  | {
      role: "assistant";
      content: string;
      /** Assistant turn still receiving stream deltas. */
      streaming?: boolean;
      /** In-thread styling hint only (long turns) — never routes content. */
      passage?: boolean;
    }
  | {
      role: "affordance";
      content: string;
      affordanceKind: ThreadAffordanceKind;
      /** Screen behind the scrim — collapse reveals this sheet. */
      screenId: string;
    };

function isPersistableTurn(t: ThreadTurn): boolean {
  return t.role !== "affordance";
}

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

/** Drop in-flight assistant prose when a tool round supersedes streamed preamble. */
export function discardStreamingAssistant(thread: ThreadTurn[]): ThreadTurn[] {
  const last = thread[thread.length - 1];
  if (last?.role === "assistant" && last.streaming) {
    return thread.slice(0, -1);
  }
  return thread;
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

export function appendBackToSheetAffordance(
  thread: ThreadTurn[],
  screenId: string,
  screenName: string,
): ThreadTurn[] {
  const label = `↩ Back to ${screenName}`;
  const last = thread[thread.length - 1];
  if (
    last?.role === "affordance" &&
    last.affordanceKind === "back_to_sheet" &&
    last.screenId === screenId
  ) {
    return thread;
  }
  return [
    ...thread,
    {
      role: "affordance",
      content: label,
      affordanceKind: "back_to_sheet",
      screenId,
    },
  ];
}

/** Affordance turns are ephemeral — not restored from session storage. */
export function threadForPersistence(thread: ThreadTurn[]): ThreadTurn[] {
  return thread.filter(isPersistableTurn);
}
