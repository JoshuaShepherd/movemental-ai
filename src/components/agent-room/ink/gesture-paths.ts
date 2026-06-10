/**
 * Hand-drawn gesture geometry — pure SVG path builders ported from
 * `movemental-agentic-front-end/js/ink.js` (`underline`, `circle`, `arrowTo`).
 *
 * Kept side-effect-free (rect in → path `d` string out) so the math is testable
 * without a DOM and the rAF/append plumbing stays in `use-ink-gestures`. The
 * `jit()` wobble uses `Math.random` to match the prototype's organic look; pass
 * a custom `rng` for deterministic tests.
 */

/** An element's box relative to the `#screen` stage (prototype `localRect`). */
export interface LocalRect {
  x: number;
  y: number;
  w: number;
  h: number;
  cx: number;
  cy: number;
}

type Rng = () => number;

/** Symmetric jitter in [-n/2, n/2], like the prototype's `jit(n)`. */
function jit(n: number, rng: Rng): number {
  return (rng() - 0.5) * n;
}

/** A wavy underline just below the element's baseline box. */
export function underlinePath(r: LocalRect, rng: Rng = Math.random): string {
  const y = r.y + r.h + 3;
  const x0 = r.x - 7;
  const x1 = r.x + r.w + 11;
  const steps = 20;
  let d = `M ${x0.toFixed(1)} ${(y + jit(1.6, rng)).toFixed(1)}`;
  for (let i = 1; i <= steps; i++) {
    const x = x0 + (x1 - x0) * (i / steps);
    const yy = y + Math.sin((i / steps) * Math.PI) * -1.4 + jit(1.6, rng);
    d += ` L ${x.toFixed(1)} ${yy.toFixed(1)}`;
  }
  d += ` L ${(x1 + 5).toFixed(1)} ${(y - 2.5).toFixed(1)}`;
  return d;
}

/** A rough open ellipse circling the element (over-rotates past 360°). */
export function circlePath(r: LocalRect, rng: Rng = Math.random): string {
  const cx = r.cx;
  const cy = r.cy;
  const rx = r.w / 2 + 13;
  const ry = r.h / 2 + 10;
  const steps = 50;
  const a0 = -118;
  const a1 = 292;
  let d = "";
  for (let i = 0; i <= steps; i++) {
    const a = ((a0 + (a1 - a0) * (i / steps)) * Math.PI) / 180;
    const px = cx + (rx + jit(2.2, rng)) * Math.cos(a);
    const py = cy + (ry + jit(2.2, rng)) * Math.sin(a);
    d += `${i === 0 ? "M " : "L "}${px.toFixed(1)} ${py.toFixed(1)} `;
  }
  return d;
}

/** A curved arrow pointing up at the element — shaft (bezier) + two-stroke head. */
export function arrowPaths(r: LocalRect, screenH: number): { shaft: string; head: string } {
  const ex = r.cx;
  const ey = r.y - 9;
  const sx = r.cx - 26;
  const sy = Math.min(screenH - 14, r.y + r.h + 70);
  const c1x = r.cx - 44;
  const c1y = (sy + ey) / 2 + 6;
  const c2x = r.cx + 14;
  const c2y = ey + 58;
  const shaft =
    `M ${sx.toFixed(1)} ${sy.toFixed(1)} ` +
    `C ${c1x.toFixed(1)} ${c1y.toFixed(1)} ${c2x.toFixed(1)} ${c2y.toFixed(1)} ${ex.toFixed(1)} ${ey.toFixed(1)}`;
  const ang = Math.atan2(ey - c2y, ex - c2x);
  const hl = 15;
  const a1 = ang + Math.PI * 0.83;
  const a2 = ang - Math.PI * 0.83;
  const head =
    `M ${(ex + hl * Math.cos(a1)).toFixed(1)} ${(ey + hl * Math.sin(a1)).toFixed(1)} ` +
    `L ${ex.toFixed(1)} ${ey.toFixed(1)} ` +
    `L ${(ex + hl * Math.cos(a2)).toFixed(1)} ${(ey + hl * Math.sin(a2)).toFixed(1)}`;
  return { shaft, head };
}
