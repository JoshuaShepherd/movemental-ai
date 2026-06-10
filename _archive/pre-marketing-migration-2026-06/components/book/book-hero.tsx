import Link from "next/link";

import { Container, Display, Eyebrow, Prose, Section } from "@/components/primitives";
import type { AudienceLens } from "@/lib/book";
import { BOOK_SUBTITLE, BOOK_TITLE } from "@/lib/book-meta";
import { SSSS_FIELD_GUIDE_PATH } from "@/lib/canon-routes";

import { LensSelector } from "./lens-selector";
import { BookCover } from "./book-cover";

type BookHeroProps = {
  activeLens?: AudienceLens;
};

export function BookHero({ activeLens }: BookHeroProps) {
  return (
    <Section spacing="lg" className="-mt-16 pt-[calc(4rem+clamp(4rem,10vw,7rem))]">
      <Container>
        <div className="grid items-center gap-10 md:grid-cols-[minmax(0,320px)_1fr] md:gap-14">
          <BookCover />

          <div>
            <Eyebrow className="mb-4">Free book &middot; living manuscript</Eyebrow>
            <Display size="md" as="h1">
              {BOOK_TITLE}
            </Display>
            <Prose className="mt-4">
              <p className="text-lg font-light italic text-muted-foreground">{BOOK_SUBTITLE}</p>
              <p>
                Fragmentation is structural: voice, memory, relationships, and knowledge scatter
                across surfaces until the tax shows up in credibility, formation, and continuity.
                AI did not invent that tax — it made it visible — and it made integration practical.
              </p>
              <p>
                This book walks the six-stage trajectory from fragmentation to movement, with the
                unglamorous load-bearing work of integration at the center. Choose your edition below
                — the same core text, with contextual framing for your world.
              </p>
              <p className="text-sm text-muted-foreground">
                Prefer the narrative walkthrough first? See{" "}
                <Link href="/fragmentation" className="font-medium text-primary underline-offset-4 hover:underline">
                  the fragmentation story
                </Link>
                . For the Safety&nbsp;→&nbsp;Solutions operating sequence under constraint, see the{" "}
                <Link href={SSSS_FIELD_GUIDE_PATH} className="font-medium text-primary underline-offset-4 hover:underline">
                  AI Stewardship Sequence field guide
                </Link>
                .
              </p>
            </Prose>

            <div className="mt-6">
              <LensSelector activeLens={activeLens} showEmailCapture />
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
