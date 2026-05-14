import { cn } from "@/lib/utils";

/**
 * TranslationMultiplier — visualizes that translation doesn't just
 * add a language, it multiplies the entire system into a new market.
 *
 * The visual: a set of concentric rings showing the system layers,
 * then duplicated rings for each language — communicating that the
 * whole stack gets replicated, not just the text.
 */

export interface TranslationLanguage {
  code: string;
  label: string;
}

export interface TranslationMultiplierProps {
  /** Languages the system is translated into. Pass at least one. */
  languages?: TranslationLanguage[];
  /** Total number of system layers (used in the narrative copy). */
  layerCount?: number;
  className?: string;
}

const DEFAULT_LANGUAGES: TranslationLanguage[] = [
  { code: "pt", label: "Portuguese" },
  { code: "es", label: "Spanish" },
  { code: "ko", label: "Korean" },
];

export function TranslationMultiplier({
  languages = DEFAULT_LANGUAGES,
  layerCount = 8,
  className,
}: TranslationMultiplierProps) {
  const totalSystems = languages.length + 1; // +1 for the original

  return (
    <div className={cn("space-y-8", className)}>
      {/* Visual: stacked system representations */}
      <div className="flex flex-wrap items-end gap-4">
        {/* Original language — taller, primary accent */}
        <div className="flex flex-col items-center gap-2">
          <div className="flex flex-col gap-0.5">
            {Array.from({ length: layerCount }).map((_, i) => (
              <div
                key={i}
                className="h-2 w-16 rounded-sm bg-primary/80 sm:w-20"
                style={{ opacity: 1 - i * 0.08 }}
              />
            ))}
          </div>
          <p className="text-[0.65rem] font-medium text-foreground">
            Original
          </p>
        </div>

        {/* Arrow */}
        <div className="flex items-center self-center px-2 text-muted-foreground">
          <span className="text-lg">→</span>
        </div>

        {/* Translated language stacks */}
        {languages.map((lang) => (
          <div key={lang.code} className="flex flex-col items-center gap-2">
            <div className="flex flex-col gap-0.5">
              {Array.from({ length: layerCount }).map((_, i) => (
                <div
                  key={i}
                  className="h-2 w-16 rounded-sm bg-muted-foreground/30 sm:w-20"
                  style={{ opacity: 1 - i * 0.08 }}
                />
              ))}
            </div>
            <p className="text-[0.65rem] font-medium text-muted-foreground">
              {lang.label}
            </p>
          </div>
        ))}
      </div>

      {/* Narrative text */}
      <div className="max-w-(--prose-max)">
        <p className="text-sm leading-relaxed text-muted-foreground">
          Translation doesn&apos;t add a language — it replicates{" "}
          <span className="font-medium text-foreground">
            the entire {layerCount}-layer system
          </span>{" "}
          into a new market. Every book, article, pathway, course, and AI
          interaction becomes available to an audience that couldn&apos;t
          access it before.
        </p>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
          With {languages.length} translation{languages.length !== 1 ? "s" : ""},
          one leader&apos;s system becomes{" "}
          <span className="font-medium text-foreground">
            {totalSystems} parallel systems
          </span>
          .
        </p>
      </div>
    </div>
  );
}
