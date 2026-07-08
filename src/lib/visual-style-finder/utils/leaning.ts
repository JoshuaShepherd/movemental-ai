import { APPROACH_TAGS } from "../data/approaches";
import { PALETTES } from "../data/palettes";
import { TEMPLATES } from "../data/templates";
import { TYPE_PAIRS } from "../data/typography";
import type { PaletteMood, SelectionState } from "../types";

const MOOD_WORD: Record<PaletteMood, string> = {
  warm: "warm",
  earthy: "earthy",
  muted: "muted",
  dark: "dramatic",
  bold: "bold",
  painterly: "painterly",
  ink: "editorial",
};

export function computeLeaning(sel: SelectionState): string[] {
  const count: Record<string, number> = {};

  sel.type.forEach((id) => {
    const p = TYPE_PAIRS.find((x) => x.id === id);
    p?.tags?.forEach((t) => {
      count[t] = (count[t] ?? 0) + 1;
    });
  });

  sel.templates.forEach((id) => {
    const t = TEMPLATES.find((x) => x.id === id);
    if (t) {
      (APPROACH_TAGS[t.ap] ?? []).forEach((tag) => {
        count[tag] = (count[tag] ?? 0) + 1;
      });
    }
  });

  sel.palettes.forEach((id) => {
    const p = PALETTES.find((x) => x.id === id);
    if (p) {
      const w = MOOD_WORD[p.mood];
      count[w] = (count[w] ?? 0) + 1;
    }
  });

  return Object.entries(count)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3)
    .map(([k]) => k);
}
