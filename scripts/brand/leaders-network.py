"""Regenerates src/components/mv/data/leaders-network.ts: the home page's Movemental Leaders network.

Layout: an organic cluster of every leader in src/components/mv/leaders/leaders.ts, in a 760 x 500
field, kept clear of the centered title (top) and the centered statement (bottom). Each leader is
paired with one Resolution statement (QUOTES). Run: python3 scripts/brand/leaders-network.py
Source: the Home-Headline-C board on the Movemental canvas (docs/handoff/home-headline/).
"""
import json, math, random, re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
src = (ROOT / "src/components/mv/leaders/leaders.ts").read_text()
rows = re.findall(r'L\("([^"]+)", "([^"]+)", (null|"[^"]*")', src)
BLOBS = {slug: "" for slug, _, _ in rows}

QUOTES = {
 "alan-hirsch": "We should resist sounding, deciding and serving like everyone else.",
 "brian-sanders": "We shouldn’t walk this alone.",
 "danielle-strickland": "We should help voices unlike ours, and still unseen, become easier to find.",
 "liz-rios": "We should learn from people whose wisdom predates AI.",
 "rowland-smith": "We should keep the moments of care human.",
 "neil-cole": "We should keep a place to experiment where being wrong is survivable.",
 "dave-ferguson": "We should find others beyond our walls who are walking it too.",
 "jr-woodward": "We should form our own views before we ask AI for one.",
 "michael-cooper": "We should keep learning as if we just arrived.",
 "brad-brisco": "We should reach past the relationships we already have.",
 "hugh-halter": "We should name the work that is made of presence, and keep it human.",
 "meghan-good": "We should notice when we’re becoming dependent, and step back.",
 "deb-hirsch": "We should never put what someone told us in confidence into an AI tool.",
 "josh-shepherd": "We should say plainly how AI is used here, including by our leaders.",
 "kate-coleman": "We should decide what AI may touch before it touches anything that matters.",
 "dhati-lewis": "We should let roles change and help people grow into new work.",
 "rob-wegner": "We should make time for everyone here to try new things with AI.",
 "lucas-pulley": "We should tolerate the mess that experimenting brings.",
 "peyton-jones": "We should share what didn’t work as readily as what did.",
 "roy-moran": "We should use AI as a thinking partner, not an answer machine.",
 "jeremy-chambers": "We should give the time AI saves back to people, to creation and to play.",
 "daniel-bravo": "We should name what’s true now and expect to name it again.",
 "david-docusen": "We should know what AI already tells people about us.",
 "andrew-jones": "We should make ethical decisions as we go, without waiting for certainty.",
 "bree-mills": "We shouldn’t assume saved time has to be filled with more output.",
 "tiffany-smith": "We should say when AI substantially shaped something presented as ours.",
}
assert len(QUOTES) == 26 and len(set(QUOTES.values())) == 26


def build(old_lead):
    old = {p["name"]: p["cred"] for p in old_lead}
    rnd = random.Random(11)
    W, H = 760, 500
    cx, cy = W / 2, H / 2
    def inside(x, y):  # a soft, slightly irregular cloud
        ang = math.atan2(y - cy, x - cx)
        r = 1 + 0.12 * math.sin(3 * ang + 0.7) + 0.07 * math.sin(5 * ang + 2.1)
        return ((x - cx) / 330) ** 2 + ((y - cy) / 215) ** 2 <= r * r
    def bad(x, y):  # keep the title (top left) and the quote (bottom left) clear
        return (150 < x < 610 and y > 315) or (195 < x < 565 and y < 100)
    pts, tries = [], 0
    while len(pts) < 26:
        tries += 1
        if tries > 40000:
            pts, tries = [], 0
        x, y = rnd.uniform(30, W - 30), rnd.uniform(30, H - 30)
        if not inside(x, y) or bad(x, y) or any(math.hypot(x - a, y - b) < 70 for a, b in pts):
            continue
        pts.append((x, y))
    for _ in range(60):
        nxt = []
        for i, (x, y) in enumerate(pts):
            fx = fy = 0
            for j, (a, b) in enumerate(pts):
                if i == j: continue
                d = math.hypot(x - a, y - b) + 1e-6
                if d < 105:
                    f = (105 - d) / 105
                    fx += (x - a) / d * f * 3; fy += (y - b) / d * f * 3
            nx, ny = x + fx, y + fy
            if not inside(nx, ny) or bad(nx, ny): nx, ny = x, y
            nxt.append((nx, ny))
        pts = nxt
    edges = set()
    for i, (x, y) in enumerate(pts):
        near = sorted(range(26), key=lambda j: math.hypot(x - pts[j][0], y - pts[j][1]))[1:3]
        for j in near:
            edges.add((min(i, j), max(i, j)))
    edges = sorted(edges)
    lead = []
    for (slug, name, cred), (x, y) in zip(rows, pts):
        c = json.loads(cred) if cred != "null" else None
        c = c or old.get(name) or "Movement leader"
        lead.append({"name": name, "cred": c, "src": "/_blob/" + BLOBS[slug], "x": round(x, 1), "y": round(y, 1), "slug": slug})
    # SVG: stars, edges, pulses
    stars = "".join(f'<circle cx="{rnd.uniform(0,W):.1f}" cy="{rnd.uniform(0,H):.1f}" r="0.8" style="fill: rgba(255,255,255,.18)"></circle>' for _ in range(90))
    def curve(a, b, k):
        (x1, y1), (x2, y2) = pts[a], pts[b]
        mx, my = (x1 + x2) / 2, (y1 + y2) / 2
        dx, dy = x2 - x1, y2 - y1
        off = 0.12 * (1 if k % 2 else -1)
        return f"M {x1:.1f} {y1:.1f} Q {mx - dy*off:.1f} {my + dx*off:.1f} {x2:.1f} {y2:.1f}"
    lines = "".join(f'<path vector-effect="non-scaling-stroke" d="{curve(a,b,k)}" style="fill: none; stroke: #ffffff; stroke-width: 0.7; transition: opacity 1.2s ease, stroke 1.2s ease; {{{{ ev.e{k} }}}}"></path>' for k, (a, b) in enumerate(edges))
    pulses = "".join(f'<path vector-effect="non-scaling-stroke" d="{curve(a,b,k)}" class="pulse-line" style="fill: none; stroke: #c9d2ff; stroke-width: 1.4; stroke-linecap: round; animation-duration: {3.4 + (k % 7) * 0.1:.1f}s; animation-delay: -{(k * 0.37) % 3:.1f}s; transition: opacity 1.2s ease; {{{{ pv.e{k} }}}}"></path>' for k, (a, b) in enumerate(edges))
    svg = f'<svg viewBox="0 0 760 500" aria-hidden="true" style="position: absolute; inset: 0; width: 100%; height: 100%; display: block">{stars}{lines}{pulses}</svg>'
    return lead, [list(e) for e in edges], svg




lead, edges, _svg = build([])
missing = [p["slug"] for p in lead if p["slug"] not in QUOTES]
assert not missing, missing
rnd = random.Random(3)
pts = {p["slug"]: (p["x"], p["y"]) for p in lead}
order = [p["slug"] for p in lead]
def curve(a, b, k):
    (x1, y1), (x2, y2) = pts[order[a]], pts[order[b]]
    mx, my = (x1 + x2) / 2, (y1 + y2) / 2
    dx, dy = x2 - x1, y2 - y1
    off = 0.12 * (1 if k % 2 else -1)
    return f"M {x1:.1f} {y1:.1f} Q {mx - dy*off:.1f} {my + dx*off:.1f} {x2:.1f} {y2:.1f}"
out = {
    "nodes": [{"slug": p["slug"], "x": p["x"], "y": p["y"], "quote": QUOTES[p["slug"]]} for p in lead],
    "edges": edges,
    "paths": [curve(a, b, k) for k, (a, b) in enumerate(edges)],
    "pulses": [[round(3.4 + (k % 7) * 0.1, 1), -round((k * 0.37) % 3, 1)] for k in range(len(edges))],
    "stars": [[round(rnd.uniform(0, 760), 1), round(rnd.uniform(0, 500), 1)] for _ in range(70)],
}
ts = (
    "/**\n * Generated by scripts/brand/leaders-network.py; do not hand-edit. The Movemental Leaders\n"
    " * network on the home page: one node per leader in leaders.ts, laid out in a 760 x 500 field,\n"
    " * each paired with one Resolution statement shown as theirs when they are featured.\n */\n\n"
    "export interface LeaderNetworkNode {\n  slug: string;\n  x: number;\n  y: number;\n  quote: string;\n}\n\n"
    "export const LN_FIELD = { w: 760, h: 500 } as const;\n\n"
    f"export const LN_NODES: readonly LeaderNetworkNode[] = {json.dumps(out['nodes'], ensure_ascii=False, indent=2)};\n\n"
    f"export const LN_EDGES: readonly (readonly [number, number])[] = {json.dumps(out['edges'])};\n\n"
    f"export const LN_PATHS: readonly string[] = {json.dumps(out['paths'], indent=2)};\n\n"
    f"/** [duration, delay] in seconds for each edge's pulse. */\nexport const LN_PULSES: readonly (readonly [number, number])[] = {json.dumps(out['pulses'])};\n\n"
    f"export const LN_STARS: readonly (readonly [number, number])[] = {json.dumps(out['stars'])};\n"
)
(ROOT / "src/components/mv/data/leaders-network.ts").write_text(ts)
print(len(out["nodes"]), "nodes,", len(edges), "edges")
