/**
 * Committed leader seats — single source of truth for the "[N] of 100 leader
 * seats committed" scarcity line used on /about-safestart (and, when added,
 * the home page). Derived from the published roster so the count cannot drift.
 *
 * To update the count, publish a new voice in `committed-voices.ts`; this
 * module recomputes automatically.
 */

import { COMMITTED_VOICES } from "./committed-voices";

export const COMMITTED_SEATS_TOTAL = 100 as const;

export const COMMITTED_SEATS_COUNT = COMMITTED_VOICES.length;

/** "N of 100 leader seats committed. Network capped at 100." */
export function getCommittedSeatsLine(): string {
  return `${COMMITTED_SEATS_COUNT} of ${COMMITTED_SEATS_TOTAL} leader seats committed. Network capped at ${COMMITTED_SEATS_TOTAL}.`;
}
