"use client";

import type { EntityType } from "@/lib/knowledge-graph/types";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const TYPE_LABELS: Partial<Record<EntityType, string>> = {
  leader: "Leader",
  book: "Books",
  article: "Articles",
  video: "Video",
  audio: "Audio",
  transcript: "Transcripts",
  pathway: "Pathways",
  course: "Courses",
  ai_layer: "AI layer",
  topic: "Topics",
  language: "Languages",
  translation: "Translations",
  series: "Series",
  concept: "Concepts",
  publication: "Publications",
  organization: "Organizations",
};

export function GraphFilters({
  availableTypes,
  selectedTypes,
  onToggleType,
  onClear,
}: {
  availableTypes: EntityType[];
  selectedTypes: ReadonlySet<EntityType>;
  onToggleType: (t: EntityType) => void;
  onClear: () => void;
}) {
  return (
    <div className="space-y-3">
      <div className="flex flex-wrap items-center gap-2">
        {availableTypes.map((t) => {
          const selected = selectedTypes.has(t);
          const variant =
            selectedTypes.size === 0
              ? "outline"
              : selected
                ? "default"
                : "outline";
          return (
            <Button
              key={t}
              type="button"
              variant={variant}
              size="sm"
              className={cn(
                "rounded-full text-xs",
                selectedTypes.size > 0 && !selected && "opacity-55",
              )}
              onClick={() => onToggleType(t)}
            >
              {TYPE_LABELS[t] ?? t}
            </Button>
          );
        })}
      </div>
      <Button
        type="button"
        variant="ghost"
        size="sm"
        className="text-muted-foreground"
        onClick={onClear}
      >
        Reset filters
      </Button>
    </div>
  );
}
