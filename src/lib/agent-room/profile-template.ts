/**
 * Shared copy and helpers for Movement Voices leader profiles (Phase 5 template).
 * The authorship-break line is identical for every leader; connection adds scenius framing.
 */

/** One-line reason these profiles exist — from the authorship break in the talk. */
export function authorshipReason(leaderName: string): string {
  return `In an age when a reader can't tell whether anyone stands behind the words, this is where ${leaderName}'s real work stands, gathered and verifiable.`;
}

/** Scenius / Movement Voices tie-in appended to each leader's connection block. */
export function movementVoicesSceniusLine(leaderName: string): string {
  return `${leaderName} is part of the Movement Voices network, senior leaders whose work is linked, cited, and publicly vouched for, not isolated on separate sites.`;
}
