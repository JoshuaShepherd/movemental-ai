"use client";

import { Button } from "@/components/ui/button";

export function GraphStoryControls({
  sceneIndex,
  sceneCount,
  onPrev,
  onNext,
  onJump,
  storyMode,
  onToggleStory,
}: {
  sceneIndex: number;
  sceneCount: number;
  onPrev: () => void;
  onNext: () => void;
  onJump: (i: number) => void;
  storyMode: boolean;
  onToggleStory: () => void;
}) {
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex flex-wrap items-center gap-2">
        <Button
          type="button"
          variant={storyMode ? "default" : "outline"}
          size="sm"
          onClick={onToggleStory}
        >
          Story mode
        </Button>
        {storyMode ? (
          <>
            <Button type="button" variant="outline" size="sm" onClick={onPrev}>
              Previous
            </Button>
            <Button type="button" variant="outline" size="sm" onClick={onNext}>
              Next
            </Button>
            <span className="text-xs text-muted-foreground">
              Step {sceneIndex + 1} of {sceneCount}
            </span>
          </>
        ) : null}
      </div>
      {storyMode ? (
        <div className="flex flex-wrap gap-1">
          {Array.from({ length: sceneCount }).map((_, i) => (
            <button
              key={i}
              type="button"
              className={
                i === sceneIndex
                  ? "h-2 w-6 rounded-full bg-primary"
                  : "h-2 w-2 rounded-full bg-border"
              }
              aria-label={`Go to scene ${i + 1}`}
              onClick={() => onJump(i)}
            />
          ))}
        </div>
      ) : null}
    </div>
  );
}
