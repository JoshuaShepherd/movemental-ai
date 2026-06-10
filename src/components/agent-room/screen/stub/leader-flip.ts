/**
 * One-shot band→hero FLIP rect (prototype `pendingFlip` in `js/runner.js`).
 *
 * The home portrait band captures the tapped face's `.ph` rect at click time;
 * the leader screen consumes it once on mount to morph its hero photo from the
 * band position to its final spot. A module-scoped single value matches the
 * prototype's lifecycle (set on click, taken on the next render, never reused) —
 * scene transitions are serial, so there is never more than one in flight.
 */
let pendingFlip: DOMRect | null = null;

/** Stash the tapped portrait's rect (call before navigating to the leader). */
export function setPendingFlip(rect: DOMRect | null): void {
  pendingFlip = rect;
}

/** Read and clear the pending rect (returns null if none / already consumed). */
export function takePendingFlip(): DOMRect | null {
  const rect = pendingFlip;
  pendingFlip = null;
  return rect;
}
