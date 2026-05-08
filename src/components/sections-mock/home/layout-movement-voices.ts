import { CENTER_VOICE_ID, type VoiceGraphVoice } from "./voices-graph-data";

const AVATAR = 72;

/**
 * Hub-and-ring layout: center voice (Alan Hirsch) pinned at the middle, all
 * other voices arranged on a circle around him at equal angular spacing. The
 * radius scales with the smaller viewport dimension so the ring stays inside
 * the canvas at every breakpoint.
 *
 * This is deterministic — no force simulation — so the constellation looks
 * the same every render. Reduced-motion preferences don't matter for layout.
 */
export function layoutMovementVoices(
  voices: readonly VoiceGraphVoice[],
  width: number,
  height: number,
): Map<string, { x: number; y: number }> {
  const w = Math.max(width, 320);
  const h = Math.max(height, 280);
  const cx = w / 2;
  const cy = h / 2;

  const out = new Map<string, { x: number; y: number }>();

  const center = voices.find((v) => v.id === CENTER_VOICE_ID);
  if (center) {
    out.set(center.id, { x: cx, y: cy });
  }

  const ring = voices.filter((v) => v.id !== CENTER_VOICE_ID);
  if (ring.length === 0) return out;

  // Reserve room for the avatar diameter plus a small breathing margin so the
  // outer voices never crop against the canvas edge.
  const radius = Math.min(w, h) * 0.36;
  const startAngle = -Math.PI / 2; // first voice sits directly above center

  ring.forEach((v, i) => {
    const angle = startAngle + (i / ring.length) * Math.PI * 2;
    out.set(v.id, {
      x: cx + Math.cos(angle) * radius,
      y: cy + Math.sin(angle) * radius,
    });
  });

  return out;
}

export const VOICE_AVATAR_PX = AVATAR;
