"use client";

import { PALETTES } from "@/lib/visual-style-finder/data/palettes";
import type { ColorMode, ColorFamilyId, GenColumn, GeneratedPalette } from "@/lib/visual-style-finder/types";
import { buildPaletteText } from "@/lib/visual-style-finder/utils/prompts";
import { cn } from "@/lib/utils";

import { rawCopyText } from "./clipboard";
import { PaletteGenerator } from "./palette-generator";
import { SelectableTile } from "./selectable-tile";
import { StepLead } from "./step-lead";
import { stepKey } from "@/lib/visual-style-finder/constants";

type ColorsStepProps = {
  selected: Set<string>;
  colorMode: ColorMode;
  genFamily: ColorFamilyId | "any";
  gen: GenColumn[];
  generated: GeneratedPalette[];
  onColorModeChange: (mode: ColorMode) => void;
  onGenFamilyChange: (family: ColorFamilyId | "any") => void;
  onGenChange: (gen: GenColumn[]) => void;
  onToggle: (id: string) => void;
  onSaveGenerated: () => void;
  onCopied: (label: string) => void;
};

export function ColorsStep({
  selected,
  colorMode,
  genFamily,
  gen,
  generated,
  onColorModeChange,
  onGenFamilyChange,
  onGenChange,
  onToggle,
  onSaveGenerated,
  onCopied,
}: ColorsStepProps) {
  const copyPalette = async (id: string) => {
    const p = PALETTES.find((x) => x.id === id);
    if (!p) return;
    try {
      await rawCopyText(buildPaletteText(p));
      onCopied("Palette copied");
    } catch {
      onCopied("Copy failed");
    }
  };

  return (
    <div>
      <StepLead
        kicker={stepKey("colors")}
        title="Colour you could live in."
        description="Two ways to land on colour — start from a ready-made palette, or roll your own. Do either, or both; everything you keep flows to your results."
      />

      <div className="mb-4 flex gap-2">
        {(
          [
            { k: "curated" as const, t: "Curated palettes", d: "20 ready-made, on-brand" },
            { k: "generate" as const, t: "Generate your own", d: "Roll infinite palettes" },
          ] as const
        ).map((m) => (
          <button
            key={m.k}
            type="button"
            onClick={() => onColorModeChange(m.k)}
            className={cn(
              "flex-1 rounded-md border px-3 py-2.5 text-left transition-colors",
              colorMode === m.k
                ? "border-[var(--color-ink-band-blue)] bg-[var(--color-ink-band-surface)]"
                : "border-[var(--color-ink-band-border)] bg-[var(--color-ink-band-bg)] hover:bg-[var(--color-ink-band-surface)]",
            )}
          >
            <span className="block text-[0.85rem] font-semibold">{m.t}</span>
            <span className="block text-[0.72rem] text-muted-foreground">{m.d}</span>
          </button>
        ))}
      </div>

      {colorMode === "curated" ? (
        <div className="columns-1 gap-2.5 sm:columns-2 xl:columns-3">
          {PALETTES.map((pl) => (
            <SelectableTile
              key={pl.id}
              selected={selected.has(pl.id)}
              onToggle={() => onToggle(pl.id)}
              onCopy={() => void copyPalette(pl.id)}
              copyLabel="Copy palette"
              ariaLabel={`${pl.nm} palette`}
            >
              <div className="flex h-10">
                {pl.c.map((c) => (
                  <span key={c} className="flex-1" style={{ background: c }} />
                ))}
              </div>
              <div className="border-t border-[var(--color-ink-band-border)] px-2.5 py-2">
                <div className="font-serif text-[0.92rem] font-semibold">{pl.nm}</div>
                <div className="mt-0.5 font-mono text-[0.58rem] tracking-wide text-muted-foreground">{pl.c.join("  ")}</div>
              </div>
            </SelectableTile>
          ))}
        </div>
      ) : (
        <PaletteGenerator
          genFamily={genFamily}
          gen={gen}
          savedCount={generated.length}
          onFamilyChange={onGenFamilyChange}
          onGenChange={onGenChange}
          onSave={onSaveGenerated}
          onCopied={onCopied}
        />
      )}
    </div>
  );
}
