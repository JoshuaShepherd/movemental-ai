import { APPROACH_PROMPTS } from "../data/approaches";
import type { ApproachPromptFields, GenColumn, Palette, Template, TypePair } from "../types";

function promptBody(title: string, ref: string, p: ApproachPromptFields): string {
  return (
    `# ${title}\n\n${ref}` +
    (p.pal ? `**Aesthetic / palette.** ${p.pal}\n\n` : "") +
    (p.ty ? `**Type.** ${p.ty}\n\n` : "") +
    (p.lay ? `**Layout.** ${p.lay}\n\n` : "") +
    (p.sig ? `**Signature.** ${p.sig}\n\n` : "") +
    (p.mo ? `**Motion.** ${p.mo}\n\n` : "") +
    "Build a [PAGE TYPE] in this style — replace the bracket with the screen you need (hero, about, article, pricing, contact)."
  );
}

export function buildTemplatePrompt(t: Template): string {
  const ref = `**Reference.** ${t.nm} — ${t.url} (${t.tag})\n\nEmulate this site's visual language. If you can, paste a screenshot of it as a reference too.\n\n`;
  return promptBody(`Stitch prompt — in the style of ${t.nm}`, ref, APPROACH_PROMPTS[t.ap] ?? {});
}

export function buildPaletteText(p: Pick<Palette, "nm" | "c">): string {
  const roles = ["background", "surface", "muted text", "ink / text", "accent"];
  const lines = p.c.map((c, i) => `- ${c} — ${roles[i] ?? `colour ${i + 1}`}`).join("\n");
  return (
    `# Palette — ${p.nm}\n\n${p.c.join("  ")}\n\n${lines}\n\n` +
    `Use this exact palette: background ${p.c[0]}, primary text ${p.c[3]}, one accent ${p.c[4]}; ${p.c[1]} and ${p.c[2]} for surfaces and muted text.`
  );
}

export function buildTypePrompt(p: TypePair): string {
  return (
    `# Stitch prompt — Typography: ${p.nm}\n\n` +
    `**Pairing.** Headings in ${p.hn}; body in ${p.bn}. (${p.vibe})\n\n` +
    `**Usage.** Use ${p.hn} for the headline, section headings, and pull quotes; use ${p.bn} for body copy, decks, captions, and UI. Set body at a comfortable reading size (16–19px) with line-height 1.6–1.75; reserve ${p.hn} for the loud moments so the contrast stays legible.\n\n` +
    "Apply this type system to a [PAGE TYPE] — replace the bracket with the screen you need."
  );
}

export function buildGenText(cols: GenColumn[], genFamily: string): string {
  const hexes = cols.map((c) => c.hex.toUpperCase());
  const rl: Record<string, string> = {
    bg: "background",
    surface: "surface",
    muted: "muted text",
    ink: "ink / text",
    accent: "accent",
  };
  const lines = cols.map((c) => `- ${c.hex.toUpperCase()} — ${rl[c.role] ?? c.role}`).join("\n");
  const byRole = (r: string) => {
    const f = cols.find((c) => c.role === r);
    return (f ? f.hex : hexes[0]).toUpperCase();
  };
  return (
    `# Palette — generated (${genFamily})\n\n${hexes.join("  ")}\n\n${lines}\n\n` +
    `Use this exact palette: background ${byRole("bg")}, primary text ${byRole("ink")}, one accent ${byRole("accent")}; ${byRole("surface")} and ${byRole("muted")} for surfaces and muted text.`
  );
}
