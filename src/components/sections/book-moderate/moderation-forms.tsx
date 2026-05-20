"use client";

import { useRouter } from "next/navigation";
import { useTransition } from "react";

import { Container, Section } from "@/components/primitives";
import type { bookEndorsements, bookMarginNotes } from "@/lib/db/schema";

import { updateEndorsementStatus, updateMarginNoteStatus } from "./actions";

type Props = {
  token: string;
  pendingNotes: (typeof bookMarginNotes.$inferSelect)[];
  pendingEndorsements: (typeof bookEndorsements.$inferSelect)[];
};

export function ModerationForms({ token, pendingNotes, pendingEndorsements }: Props) {
  const router = useRouter();
  const [pending, start] = useTransition();

  return (
    <>
      <Section variant="section">
        <Container>
          <h2 className="text-lg font-medium text-foreground">Margin notes ({pendingNotes.length})</h2>
          <ul className="mt-4 space-y-4">
            {pendingNotes.map((n) => (
              <li key={n.id} className="rounded-xl bg-card p-4 text-sm shadow-ambient">
                <p className="font-medium text-foreground">
                  {n.contributor_display_name}
                  {n.contributor_title ? ` · ${n.contributor_title}` : ""}
                </p>
                <p className="mt-1 text-xs text-muted-foreground">
                  {n.chapter_slug} · {n.anchor_paragraph_id} · {n.type}
                </p>
                <p className="mt-2 text-muted-foreground">{n.body}</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  <button
                    type="button"
                    disabled={pending}
                    className="rounded-md bg-primary px-3 py-1.5 text-xs font-semibold text-primary-foreground disabled:opacity-50"
                    onClick={() =>
                      start(async () => {
                        await updateMarginNoteStatus(token, n.id, "approved");
                        router.refresh();
                      })
                    }
                  >
                    Approve
                  </button>
                  <button
                    type="button"
                    disabled={pending}
                    className="rounded-md border border-border bg-section px-3 py-1.5 text-xs font-medium text-foreground disabled:opacity-50"
                    onClick={() =>
                      start(async () => {
                        await updateMarginNoteStatus(token, n.id, "rejected");
                        router.refresh();
                      })
                    }
                  >
                    Reject
                  </button>
                </div>
              </li>
            ))}
            {pendingNotes.length === 0 && (
              <li className="text-sm text-muted-foreground">No pending margin notes.</li>
            )}
          </ul>
        </Container>
      </Section>

      <Section>
        <Container>
          <h2 className="text-lg font-medium text-foreground">
            Endorsements ({pendingEndorsements.length})
          </h2>
          <ul className="mt-4 space-y-4">
            {pendingEndorsements.map((e) => (
              <li key={e.id} className="rounded-xl bg-card p-4 text-sm shadow-ambient">
                <p className="text-muted-foreground">&ldquo;{e.quote}&rdquo;</p>
                <p className="mt-2 font-medium text-foreground">
                  {e.endorser_name}, {e.endorser_title}
                  {e.endorser_org ? ` · ${e.endorser_org}` : ""}
                </p>
                <div className="mt-3 flex flex-wrap gap-2">
                  <button
                    type="button"
                    disabled={pending}
                    className="rounded-md bg-primary px-3 py-1.5 text-xs font-semibold text-primary-foreground disabled:opacity-50"
                    onClick={() =>
                      start(async () => {
                        await updateEndorsementStatus(token, e.id, "approved", false);
                        router.refresh();
                      })
                    }
                  >
                    Approve
                  </button>
                  <button
                    type="button"
                    disabled={pending}
                    className="rounded-md bg-primary/90 px-3 py-1.5 text-xs font-semibold text-primary-foreground disabled:opacity-50"
                    onClick={() =>
                      start(async () => {
                        await updateEndorsementStatus(token, e.id, "approved", true);
                        router.refresh();
                      })
                    }
                  >
                    Approve + feature
                  </button>
                </div>
              </li>
            ))}
            {pendingEndorsements.length === 0 && (
              <li className="text-sm text-muted-foreground">No pending endorsements.</li>
            )}
          </ul>
        </Container>
      </Section>
    </>
  );
}
