import { DARK_RAMP, FAMILIES, FAM_ORDER, LIGHT_RAMP, ROLE_ORDER } from "../data/color-families";
import type { ColorFamilyId, GenColumn } from "../types";
import { hsl2hex, pick, pickS, rand } from "./color-math";

export function genSlot(
  f: (typeof FAMILIES)[ColorFamilyId],
  r: (typeof LIGHT_RAMP)[keyof typeof LIGHT_RAMP],
): string {
  let h = r.hue === "accent" ? pick(f.accent) : pick(f.base);
  h = (h + rand(-6, 6) + 360) % 360;
  const sr = pickS(f, r.S);
  return hsl2hex(h, rand(sr[0], sr[1]), rand(r.L[0], r.L[1]));
}

export function curFamily(genFamily: ColorFamilyId | "any") {
  return genFamily === "any" ? FAMILIES[pick(FAM_ORDER)]! : FAMILIES[genFamily];
}

export function generatePalette(genFamily: ColorFamilyId | "any", existing: GenColumn[]): GenColumn[] {
  const f = curFamily(genFamily);
  const ramp = f.dark ? DARK_RAMP : LIGHT_RAMP;

  if (!existing.length) {
    return ROLE_ORDER.map((role) => ({
      hex: genSlot(f, ramp[role]),
      locked: false,
      role,
    }));
  }

  return existing.map((it) =>
    it.locked ? it : { hex: genSlot(f, ramp[it.role]), locked: false, role: it.role },
  );
}
