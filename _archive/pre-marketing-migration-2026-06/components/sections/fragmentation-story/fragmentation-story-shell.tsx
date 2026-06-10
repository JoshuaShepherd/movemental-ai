"use client";

import { useEffect, useRef, useState } from "react";

import {
  type AudienceId,
  type ChapterId,
  type IntelligenceField,
} from "./fragmentation-story-content";
import { FragmentationStoryActs } from "./fragmentation-story-acts";
import { FragmentationStoryDock } from "./fragmentation-story-dock";
import { FragmentationStoryPartTwo } from "./fragmentation-story-part-two";
import { FragmentationStoryScatter } from "./fragmentation-story-scatter";
import { FragmentationStoryWayfinding } from "./fragmentation-story-wayfinding";

export type FragmentationStoryShellProps = {
  initialAudience: AudienceId;
  initialField: IntelligenceField;
  initialNodeCount: number;
};

export function FragmentationStoryShell({
  initialAudience,
  initialField,
  initialNodeCount,
}: FragmentationStoryShellProps) {
  const [audience, setAudience] = useState<AudienceId>(initialAudience);
  const [field, setField] = useState<IntelligenceField>(initialField);
  const [activeChapter, setActiveChapter] = useState<ChapterId>("unity");
  const [movementNodeCount, setMovementNodeCount] = useState<number>(initialNodeCount);
  const debugRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const visible = /\bdebug=1\b/.test(window.location.search);
    if (debugRef.current) {
      debugRef.current.hidden = !visible;
    }
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const url = new URL(window.location.href);
    url.searchParams.set("audience", audience);
    url.searchParams.set("field", field);
    url.searchParams.set("nodes", String(movementNodeCount));
    window.history.replaceState(null, "", url.toString());
  }, [audience, field, movementNodeCount]);

  return (
    <>
      <div className="sticky top-16 z-40">
        <FragmentationStoryDock
          audience={audience}
          onAudienceChange={setAudience}
          field={field}
          onFieldChange={setField}
        />
        <FragmentationStoryWayfinding activeChapter={activeChapter} />
      </div>
      <FragmentationStoryActs
        audience={audience}
        field={field}
        onActiveChapterChange={setActiveChapter}
      />
      <FragmentationStoryScatter audience={audience} field={field} />
      <FragmentationStoryPartTwo
        audience={audience}
        field={field}
        movementNodeCount={movementNodeCount}
        onMovementNodeCountChange={setMovementNodeCount}
      />
      <div
        ref={debugRef}
        hidden
        aria-live="polite"
        className="fixed bottom-4 left-1/2 z-50 -translate-x-1/2 rounded-full bg-card px-3 py-1.5 text-xs text-muted-foreground shadow-ambient"
      >
        Chapter
        <strong id="active-chapter" className="ml-2 font-semibold text-foreground">
          {activeChapter}
        </strong>
      </div>
    </>
  );
}
