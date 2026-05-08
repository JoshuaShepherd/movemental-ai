import {
  CENTER_NODE_ID,
  MOVEMENT_VOICES,
  type VoiceGraphVoice,
} from "./voices-graph-data";

const AVATAR = 72;
const CENTER = 92;

/**
 * Hub-and-ring layout: the Movemental center node pinned at the middle, all
 * voices arranged on a circle around it at equal angular spacing. The radius
 * scales with the smaller viewport dimension so the ring stays inside the
 * canvas at every breakpoint.
 *
 * This is deterministic — no force simulation — so the constellation looks
 * the same every render.
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
  out.set(CENTER_NODE_ID, { x: cx, y: cy });

  if (voices.length === 0) return out;

  const radius = Math.min(w, h) * 0.36;
  const startAngle = -Math.PI / 2;

  voices.forEach((v, i) => {
    const angle = startAngle + (i / voices.length) * Math.PI * 2;
    out.set(v.id, {
      x: cx + Math.cos(angle) * radius,
      y: cy + Math.sin(angle) * radius,
    });
  });

  return out;
}

export const VOICE_AVATAR_PX = AVATAR;
export const CENTER_NODE_PX = CENTER;

void MOVEMENT_VOICES;
