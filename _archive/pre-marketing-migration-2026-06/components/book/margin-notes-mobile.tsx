"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import { MarginNote } from "./margin-note";
import { EndorsementCard, type Endorsement } from "./endorsement-card";
import type { MarginNoteData } from "./margin-column";

type Props = {
  notes: MarginNoteData[];
  endorsements?: Endorsement[];
};

export function MarginNotesMobile({ notes, endorsements = [] }: Props) {
  if (notes.length === 0 && endorsements.length === 0) return null;

  return (
    <div className="mt-10 space-y-6 lg:hidden" data-slot="margin-notes-mobile">
      {notes.length > 0 && (
        <Accordion type="single" collapsible className="w-full rounded-xl border border-border/60 bg-card/40">
          {notes.map((note) => (
            <AccordionItem key={note.id} value={note.id} className="border-border/50 px-2">
              <AccordionTrigger className="text-left text-sm font-medium text-foreground hover:no-underline">
                Note · {note.type.replace(/_/g, " ")}
              </AccordionTrigger>
              <AccordionContent>
                <MarginNote
                  type={note.type}
                  body={note.body}
                  contributorName={note.contributorName}
                  contributorTitle={note.contributorTitle}
                  date={note.date}
                />
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      )}
      {endorsements.length > 0 && (
        <div className="space-y-3">
          <p className="text-[0.7rem] font-medium uppercase tracking-eyebrow text-muted-foreground">
            Reader voice
          </p>
          {endorsements.map((e) => (
            <EndorsementCard key={e.id} endorsement={e} />
          ))}
        </div>
      )}
    </div>
  );
}
