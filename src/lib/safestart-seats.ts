/**
 * SafeStart seat scarcity anchor.
 *
 * Rendered as "{count} of {cap} leader seats committed" beneath the
 * hero and bottom-CTA action rows. Surfaces the 100-leader network cap
 * so the offer reads as scarce without shouting.
 *
 * TODO(seats): wire `SAFESTART_SEAT_COUNT` to a live source — either a
 * Supabase `safestart_commitments` table or a manual editorial constant
 * updated from the admin. The COMMITTED_VOICES roster is not the right
 * source — it tracks Scenius voices, not paying SafeStart leaders.
 */

export const SAFESTART_SEAT_COUNT = 17 as const;
export const SAFESTART_SEAT_CAP = 100 as const;
