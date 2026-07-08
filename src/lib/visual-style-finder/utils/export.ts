import { IMAGES } from "../data/images";
import { PALETTES } from "../data/palettes";
import { TEMPLATES } from "../data/templates";
import { TYPE_PAIRS } from "../data/typography";
import type { SelectionState } from "../types";
import { computeLeaning } from "./leaning";

const RESULTS_CSS = `:root{--paper:#FBFAF6;--ink:#1A1A1A;--muted:#5C5651;--border:#E5DFD2;--blue:#22409B}
*{box-sizing:border-box;margin:0;padding:0}
body{background:var(--paper);color:var(--ink);font-family:'Inter',Arial,sans-serif;line-height:1.5;padding:clamp(20px,5vw,54px);max-width:940px;margin:0 auto}
header{border-bottom:1px solid var(--border);padding-bottom:16px;margin-bottom:22px}
.k{font-family:'IBM Plex Mono',monospace;font-size:.64rem;letter-spacing:.2em;text-transform:uppercase;color:var(--blue)}
h1{font-family:'Playfair Display',Georgia,serif;font-weight:600;font-size:clamp(1.6rem,4vw,2.3rem);margin:.3rem 0}
.date{font-family:'IBM Plex Mono',monospace;font-size:.7rem;color:var(--muted)}
.lean{font-family:'Playfair Display',Georgia,serif;font-style:italic;font-size:1.05rem;color:var(--muted);margin-top:.5rem}
.lean b{color:var(--blue);font-style:normal;font-weight:600}
section{margin:22px 0}
h2{font-family:'Playfair Display',Georgia,serif;font-weight:600;font-size:1.15rem;border-bottom:1px solid var(--border);padding-bottom:.3rem;margin-bottom:.8rem}
.tgrid{display:grid;grid-template-columns:repeat(auto-fill,minmax(250px,1fr));gap:10px}
.tcard{border:1px solid var(--border);border-radius:5px;padding:12px;background:#FFFDF7}
.tnm{font-family:'IBM Plex Mono',monospace;font-size:.58rem;letter-spacing:.08em;text-transform:uppercase;color:var(--muted)}
.tsamp{font-size:1.7rem;line-height:1.1;margin:.35rem 0 .3rem}
.tbody{font-size:.85rem;color:#2b2824}
.links{list-style:none}.links li{padding:.25rem 0;font-size:.9rem}.links a{color:var(--blue);text-decoration:none}
.igrid{display:grid;grid-template-columns:repeat(auto-fill,minmax(150px,1fr));gap:8px}
.igrid img{width:100%;height:150px;object-fit:cover;border-radius:4px;border:1px solid var(--border)}
.prow{display:flex;align-items:center;gap:12px;margin-bottom:8px}
.prow .sw{display:flex;width:200px;height:40px;border-radius:4px;overflow:hidden;border:1px solid var(--border);flex:0 0 auto}
.prow .sw i{flex:1}
.prow .pmeta b{font-family:'Playfair Display',Georgia,serif;font-weight:600;font-size:.95rem;display:block}
.prow .pmeta span{font-family:'IBM Plex Mono',monospace;font-size:.62rem;color:var(--muted)}
footer{margin-top:30px;border-top:1px solid var(--border);padding-top:12px;font-family:'IBM Plex Mono',monospace;font-size:.58rem;letter-spacing:.06em;color:var(--muted)}`;

const FONT_LINKS = [
  "https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;1,400&family=Inter:wght@400;500;600&family=IBM+Plex+Mono:wght@400;500&display=swap",
]
  .map((href) => `<link rel="stylesheet" href="${href}">`)
  .join("");

function filterSelections(sel: SelectionState) {
  return {
    typs: TYPE_PAIRS.filter((p) => sel.type.has(p.id)),
    tpls: TEMPLATES.filter((t) => sel.templates.has(t.id)),
    imgs: IMAGES.filter((im) => sel.images.has(im.id)),
    pals: PALETTES.filter((p) => sel.palettes.has(p.id)),
    gens: sel.generated,
    top: computeLeaning(sel),
  };
}

export function buildSummaryText(sel: SelectionState): string {
  const { typs, tpls, imgs, pals, gens, top } = filterSelections(sel);
  const imgNums = imgs.map((im) => String(im.n).padStart(2, "0"));

  let s = "VISUAL STYLE FINDER — SELECTIONS\n\n";
  s += `Leaning: ${top.length ? top.join(", ") : "—"}\n\n`;
  s += `Typography (${typs.length}):\n${typs.length ? typs.map((p) => `  • ${p.nm} — headings ${p.hn}, body ${p.bn}`).join("\n") : "  —"}\n\n`;
  s += `Templates & sites (${tpls.length}):\n${tpls.length ? tpls.map((t) => `  • ${t.nm} — ${t.url}`).join("\n") : "  —"}\n\n`;
  s += `Images (${imgNums.length}): ${imgNums.length ? imgNums.join(", ") : "—"}\n\n`;
  s += `Palettes (${pals.length}):\n${pals.length ? pals.map((p) => `  • ${p.nm} — ${p.c.join(" ")}`).join("\n") : "  —"}\n\n`;
  s += `Generated palettes (${gens.length}):\n${gens.length ? gens.map((p) => `  • ${p.nm} — ${p.c.map((x) => x.toUpperCase()).join(" ")}`).join("\n") : "  —"}\n`;
  return s;
}

export function buildResultsHtml(sel: SelectionState, origin: string): string {
  const { typs, tpls, imgs, pals, gens, top } = filterSelections(sel);
  const date = new Date().toLocaleDateString(undefined, { year: "numeric", month: "long", day: "numeric" });

  const palRow = (p: { nm: string; c: string[] }, up: boolean) => {
    const c = p.c.map((x) => (up ? x.toUpperCase() : x));
    return `<div class="prow"><div class="sw">${c.map((x) => `<i style="background:${x}"></i>`).join("")}</div><div class="pmeta"><b>${p.nm}</b><span>${c.join("  ")}</span></div></div>`;
  };

  let b = `<header><div class="k">Visual style results</div><h1>What they're drawn to</h1><div class="date">${date}</div>`;
  if (top.length) b += `<p class="lean">Leaning: <b>${top.join("</b>, <b>")}</b>.</p>`;
  b += "</header>";

  if (typs.length) {
    b += `<section><h2>Typography</h2><div class="tgrid">${typs
      .map(
        (p) =>
          `<div class="tcard"><div class="tnm">${p.nm}</div><div class="tsamp" style="font-family:${p.head}">Ag &middot; ${p.hn}</div><div class="tbody" style="font-family:${p.body}">${p.bn} — The quick brown fox jumps over the lazy dog.</div></div>`,
      )
      .join("")}</div></section>`;
  }
  if (tpls.length) {
    b += `<section><h2>Templates &amp; sites</h2><ul class="links">${tpls.map((t) => `<li><a href="${t.url}">${t.nm}</a> — <span>${t.tag}</span></li>`).join("")}</ul></section>`;
  }
  if (imgs.length) {
    b += `<section><h2>Images (${imgs.length})</h2><div class="igrid">${imgs.map((im) => `<img src="${origin}${im.src}" alt="">`).join("")}</div></section>`;
  }
  if (pals.length) b += `<section><h2>Palettes</h2>${pals.map((p) => palRow(p, false)).join("")}</section>`;
  if (gens.length) b += `<section><h2>Generated palettes</h2>${gens.map((p) => palRow(p, true)).join("")}</section>`;
  if (!typs.length && !tpls.length && !imgs.length && !pals.length && !gens.length) {
    b += `<section><p class="lean">No selections were made.</p></section>`;
  }
  b += `<footer>Made with the Movemental Visual Style Finder · ${date}</footer>`;

  return `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>Visual style results</title>${FONT_LINKS}<style>${RESULTS_CSS}</style></head><body>${b}</body></html>`;
}

export function buildMailtoHref(sel: SelectionState): string {
  const d = new Date().toISOString().slice(0, 10);
  let body = `${buildSummaryText(sel)}\n\n(Visual results sheet attached: style-results-${d}.html)`;
  if (body.length > 1800) body = `${body.slice(0, 1750)}\n… full detail is in the attached sheet.`;
  return `mailto:josh@movemental.ai?subject=${encodeURIComponent("Visual style results")}&body=${encodeURIComponent(body)}`;
}
