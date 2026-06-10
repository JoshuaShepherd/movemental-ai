import { cn } from "@/lib/utils";
import { MarginNote, type MarginNoteType } from "./margin-note";
import { EndorsementCard, type Endorsement } from "./endorsement-card";

export type MarginNoteData = {
  id: string;
  type: MarginNoteType;
  body: string;
  anchorParagraphId: string;
  contributorName?: string;
  contributorTitle?: string;
  date?: string;
};

type MarginColumnProps = {
  notes: MarginNoteData[];
  /** Chapter-specific pull quotes (desktop margin). */
  endorsements?: Endorsement[];
  className?: string;
};

/**
 * MarginColumn — renders margin notes alongside the chapter prose.
 *
 * On desktop (lg+), this is a right-side column rendered by the parent grid.
 * On mobile/tablet, notes render inline between paragraphs (handled by the
 * chapter reader, not this component). This component only renders the
 * desktop margin.
 */
export function MarginColumn({ notes, endorsements = [], className }: MarginColumnProps) {
  if (notes.length === 0 && endorsements.length === 0) return null;

  return (
    <aside
      data-slot="margin-column"
      aria-label="Margin notes"
      className={cn("hidden lg:block", className)}
    >
      <div className="sticky top-32 space-y-4">
        {notes.map((note) => (
          <MarginNote
            key={note.id}
            type={note.type}
            body={note.body}
            contributorName={note.contributorName}
            contributorTitle={note.contributorTitle}
            date={note.date}
          />
        ))}
        {endorsements.length > 0 && (
          <div className="space-y-3">
            <p className="text-[0.7rem] font-medium uppercase tracking-eyebrow text-muted-foreground">
              Reader voice
            </p>
            {endorsements.map((e) => (
              <EndorsementCard key={e.id} endorsement={e} className="p-4" />
            ))}
          </div>
        )}
      </div>
    </aside>
  );
}
