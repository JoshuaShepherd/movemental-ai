"""Regenerates src/components/mv/brand/rosette-*.ts: the Movemental rosette as one hypotrochoid
line in a 100 x 100 box (centre 50,50, radius 46). Run: python3 scripts/brand/rosette.py"""
import math
from math import gcd
from pathlib import Path

OUT = Path(__file__).resolve().parents[2] / "src/components/mv/brand"
HEADER = '''/**
 * Generated geometry for the Movemental rosette: one continuous hypotrochoid line in a 100 x 100
 * box, centered at (50, 50), radius 46. Source: the Brand boards on the Movemental canvas
 * (docs/handoff/brand-nav/README.md). Regenerate with scripts/brand/rosette.py; do not hand-edit.
 */
'''


def path(R, r, d, steps, rad=46, prec=1):
    n = r // gcd(R, r)
    T = 2 * math.pi * n
    pts = [((R - r) * math.cos(T * i / steps) + d * math.cos((R - r) / r * T * i / steps),
            (R - r) * math.sin(T * i / steps) - d * math.sin((R - r) / r * T * i / steps)) for i in range(steps + 1)]
    m = max(math.hypot(x, y) for x, y in pts)
    s, a = rad / m, math.radians(-90)
    out, last = [], None
    for i, (x, y) in enumerate(pts):
        seg = f"{(x*math.cos(a)-y*math.sin(a))*s+50:.{prec}f} {(x*math.sin(a)+y*math.cos(a))*s+50:.{prec}f}"
        if seg != last:
            out.append(("M" if i == 0 else "L") + seg)
            last = seg
    return "".join(out)


(OUT / "rosette-display.ts").write_text(
    HEADER + f'\n/** Display rosette: 24 loops around an open centre (hypotrochoid 24, 17, 11). */\n'
    f'export const ROSETTE_DISPLAY =\n  "{path(24, 17, 11, 1700)}";\n')
(OUT / "rosette-mark.ts").write_text(
    HEADER + f'\n/** Mark rosette for the navbar and lockups: 16 loops (hypotrochoid 16, 9, 13). */\n'
    f'export const ROSETTE_MARK =\n  "{path(16, 9, 13, 900)}";\n\n'
    f'/** Small rosette below 20 px and for the favicon: 12 loops (hypotrochoid 12, 7, 10). */\n'
    f'export const ROSETTE_SMALL =\n  "{path(12, 7, 10, 480)}";\n')
