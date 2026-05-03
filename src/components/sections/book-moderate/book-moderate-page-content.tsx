import { notFound } from "next/navigation";

import {
  Container,
  Display,
  Eyebrow,
  Section,
} from "@/components/primitives";
import { getEndorsementsByStatus, getMarginNotesByStatus } from "@/lib/book-data";

import { ModerationForms } from "@/components/sections/book-moderate/moderation-forms";

export type BookModeratePageProps = {
  searchParams: Promise<{ token?: string }>;
};

export async function BookModeratePageContent({ searchParams }: BookModeratePageProps) {
  const { token } = await searchParams;
  if (!token || token !== process.env.BOOK_MODERATION_TOKEN) {
    notFound();
  }

  const [pendingNotes, pendingEndorsements] = await Promise.all([
    getMarginNotesByStatus("pending"),
    getEndorsementsByStatus("pending"),
  ]);

  return (
    <>
      <Section spacing="lg" className="-mt-16 pt-[calc(4rem+clamp(4rem,10vw,7rem))]">
        <Container>
          <Eyebrow className="mb-4">Internal</Eyebrow>
          <Display size="sm" as="h1">
            Book moderation
          </Display>
          <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
            Approve or reject margin notes and endorsements. This URL is secret — do not link it
            from the public site.
          </p>
        </Container>
      </Section>

      <ModerationForms
        token={token}
        pendingNotes={pendingNotes}
        pendingEndorsements={pendingEndorsements}
      />
    </>
  );
}
