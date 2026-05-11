"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { ExternalLink, X } from "lucide-react";

import {
  recipeFunctionLabel,
  recipeSensitivityLabel,
  type RecipeDataSensitivity,
  type RecipeFunction,
  type SandboxLiveRecipe,
} from "@/lib/sandboxlive/recipe-catalog";
import { cn } from "@/lib/utils";

type FunctionFilter = "all" | RecipeFunction;
type SensitivityFilter = "all" | RecipeDataSensitivity;

const FUNCTION_FILTERS: { value: FunctionFilter; label: string }[] = [
  { value: "all", label: "All functions" },
  { value: "writing", label: "Writing" },
  { value: "research", label: "Research" },
  { value: "analysis", label: "Analysis" },
  { value: "planning", label: "Planning" },
  { value: "communication", label: "Communication" },
  { value: "operations", label: "Operations" },
];

const SENSITIVITY_FILTERS: { value: SensitivityFilter; label: string }[] = [
  { value: "all", label: "All sensitivities" },
  { value: "public", label: "Public" },
  { value: "internal", label: "Internal" },
  { value: "confidential", label: "Confidential" },
];

export function RecipeLibrary({
  recipes,
}: {
  recipes: readonly SandboxLiveRecipe[];
}) {
  const [functionFilter, setFunctionFilter] = useState<FunctionFilter>("all");
  const [sensitivityFilter, setSensitivityFilter] =
    useState<SensitivityFilter>("all");
  const [selectedSlug, setSelectedSlug] = useState<string | null>(null);

  const filtered = useMemo(
    () =>
      recipes.filter((r) => {
        if (functionFilter !== "all" && r.function !== functionFilter) return false;
        if (sensitivityFilter !== "all" && r.dataSensitivity !== sensitivityFilter)
          return false;
        return true;
      }),
    [recipes, functionFilter, sensitivityFilter],
  );

  const selected = selectedSlug
    ? recipes.find((r) => r.slug === selectedSlug) ?? null
    : null;

  return (
    <div className="flex flex-col gap-8">
      {/* Filters */}
      <div className="flex flex-wrap items-center gap-3 border-b border-border-soft pb-4">
        <FilterSelect
          label="Function"
          value={functionFilter}
          onChange={(v) => setFunctionFilter(v as FunctionFilter)}
          options={FUNCTION_FILTERS}
        />
        <FilterSelect
          label="Sensitivity"
          value={sensitivityFilter}
          onChange={(v) => setSensitivityFilter(v as SensitivityFilter)}
          options={SENSITIVITY_FILTERS}
        />
        <span className="ml-auto text-[12px] text-muted-foreground">
          {filtered.length} of {recipes.length} recipes
        </span>
      </div>

      {/* Grid */}
      {filtered.length === 0 ? (
        <p className="border border-border-soft bg-card p-8 text-[14px] text-muted-foreground">
          No recipes match those filters. Try widening the function or sensitivity.
        </p>
      ) : (
        <ul className="grid grid-cols-1 gap-px bg-border-soft md:grid-cols-2 lg:grid-cols-3">
          {filtered.map((r) => (
            <li key={r.slug} className="bg-card">
              <button
                type="button"
                onClick={() => setSelectedSlug(r.slug)}
                className="flex h-full w-full flex-col items-start gap-0 text-left transition-colors hover:bg-section"
              >
                {r.thumbnailPath ? (
                  <div className="relative aspect-[16/9] w-full overflow-hidden bg-section">
                    <Image
                      src={r.thumbnailPath}
                      alt=""
                      fill
                      sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                      className="object-cover"
                    />
                  </div>
                ) : null}
                <div className="flex flex-1 flex-col items-start gap-4 p-6">
                  <div className="flex w-full items-baseline justify-between gap-3">
                    <span className="text-[10px] font-medium uppercase tracking-[0.1em] text-pathway-accent">
                      {recipeFunctionLabel(r.function)}
                    </span>
                    <span className="text-[10px] text-muted-foreground">
                      {r.workingTimeMinutes} min
                    </span>
                  </div>
                  <h3 className="text-[15px] font-medium leading-tight text-foreground">
                    {r.title}
                  </h3>
                  <p
                    className="text-[13px] leading-relaxed text-muted-foreground"
                    dangerouslySetInnerHTML={{ __html: r.description }}
                  />
                  <span
                    className={cn(
                      "mt-auto text-[10px] font-medium uppercase tracking-[0.1em]",
                      r.dataSensitivity === "public" && "text-[color:var(--color-status-go)]",
                      r.dataSensitivity === "internal" && "text-muted-foreground",
                      r.dataSensitivity === "confidential" && "text-[color:var(--destructive)]",
                    )}
                  >
                    {recipeSensitivityLabel(r.dataSensitivity)} data
                  </span>
                </div>
              </button>
            </li>
          ))}
        </ul>
      )}

      {/* Drawer */}
      {selected ? (
        <RecipeDrawer recipe={selected} onClose={() => setSelectedSlug(null)} />
      ) : null}
    </div>
  );
}

function FilterSelect({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: { value: string; label: string }[];
}) {
  return (
    <label className="flex items-center gap-2 text-[11px] uppercase tracking-[0.1em] text-muted-foreground">
      <span>{label}</span>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="border border-border-soft bg-card px-3 py-1.5 text-[12px] font-normal normal-case tracking-normal text-foreground outline-none focus:border-foreground"
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </label>
  );
}

function RecipeDrawer({
  recipe,
  onClose,
}: {
  recipe: SandboxLiveRecipe;
  onClose: () => void;
}) {
  return (
    <div
      className="fixed inset-0 z-40 flex justify-end bg-foreground/40"
      onClick={onClose}
      aria-modal="true"
      role="dialog"
    >
      <aside
        className="flex h-full w-full max-w-[540px] flex-col overflow-y-auto bg-card text-foreground shadow-ambient"
        onClick={(e) => e.stopPropagation()}
      >
        <header className="flex items-start justify-between gap-4 border-b border-border-soft px-8 py-6">
          <div className="flex flex-col gap-2">
            <span className="text-[10px] font-medium uppercase tracking-[0.1em] text-pathway-accent">
              {recipeFunctionLabel(recipe.function)} · {recipe.workingTimeMinutes} min
            </span>
            <h2 className="font-serif text-[24px] italic leading-tight text-foreground">
              {recipe.title}
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close recipe"
            className="shrink-0 rounded-none p-1 text-muted-foreground transition-colors hover:bg-section hover:text-foreground"
          >
            <X className="size-5" aria-hidden />
          </button>
        </header>

        <div className="flex flex-col gap-8 px-8 py-8">
          {recipe.videoUrl ? (
            <div className="aspect-video w-full bg-section">
              <iframe
                src={recipe.videoUrl}
                title={recipe.title}
                className="h-full w-full border-0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          ) : null}

          <section className="flex flex-col gap-3">
            <h3 className="text-[11px] font-medium uppercase tracking-[0.1em] text-muted-foreground">
              Recipe
            </h3>
            <p className="text-[15px] leading-relaxed text-foreground">
              {recipe.recipeDocument}
            </p>
          </section>

          {recipe.transcriptExcerpt ? (
            <section className="flex flex-col gap-3">
              <h3 className="text-[11px] font-medium uppercase tracking-[0.1em] text-muted-foreground">
                From the working transcript
              </h3>
              <p className="border-l-2 border-pathway-accent pl-4 font-serif text-[16px] italic leading-relaxed text-foreground">
                {recipe.transcriptExcerpt}
              </p>
            </section>
          ) : null}

          <section className="flex flex-col gap-2 border-t border-border-soft pt-6">
            <span className="text-[10px] font-medium uppercase tracking-[0.1em] text-muted-foreground">
              Data sensitivity
            </span>
            <span className="text-[14px] text-foreground">
              {recipeSensitivityLabel(recipe.dataSensitivity)}
            </span>
          </section>

          {recipe.stitchReferencePath ? (
            <section className="flex flex-col gap-2 border-t border-border-soft pt-6">
              <span className="text-[10px] font-medium uppercase tracking-[0.1em] text-muted-foreground">
                Visual reference
              </span>
              <a
                href={recipe.stitchReferencePath}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-[14px] text-foreground underline decoration-pathway-accent/60 underline-offset-4 transition-colors hover:text-pathway-accent"
              >
                Open the authored layout
                <ExternalLink className="size-3.5" aria-hidden />
              </a>
            </section>
          ) : null}
        </div>
      </aside>
    </div>
  );
}
