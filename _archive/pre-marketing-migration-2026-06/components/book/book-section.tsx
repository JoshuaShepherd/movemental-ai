import Link from "next/link";

import {
  Container,
  Display,
  Eyebrow,
  Prose,
  Reveal,
  Section,
} from "@/components/primitives";
import { Button } from "@/components/ui/button";
import { BOOK_HUB_PATH, SSSS_FIELD_GUIDE_PATH } from "@/lib/canon-routes";

import { BookCover } from "./book-cover";

const bullets = [
  "Why fragmentation is a structural condition — not a content or willpower problem",
  "Why informational and relational intelligence both need a foundation that carries forward",
  "Why integration is the stage most organizations skip — and what changes when you do not",
] as const;

/**
 * Homepage landmark — positions the fragmentation book as intellectual foundation,
 * not a marketing download. Tonal band sits between consolidation and founder proof.
 */
export function BookSection() {
  return (
    <Section variant="section" spacing="lg">
      <Reveal>
        <Container>
          <div className="grid items-center gap-14 lg:grid-cols-12 lg:gap-16">
            <div className="flex justify-center lg:col-span-5 lg:justify-end">
              <div className="w-full max-w-[min(100%,320px)] lg:max-w-none lg:translate-x-2">
                <BookCover
                  variant="field-guide"
                  className="max-w-none shadow-ambient lg:mx-0"
                />
              </div>
            </div>
            <div className="lg:col-span-7">
              <Eyebrow className="mb-4">Book &amp; AI Stewardship Sequence field guide</Eyebrow>
              <Display size="md" as="h2" className="max-w-2xl text-balance">
                Two public works: the book on fragmentation and intelligence, and the field guide on
                the four-step adoption sequence.
              </Display>
              <Prose className="mt-6 max-w-xl">
                <p>
                  The <strong className="font-medium text-foreground">book</strong> is{" "}
                  <em className="font-serif not-italic">From Fragmentation to Movement</em> — free, in
                  progress — on the two intelligences, the six-stage map, and integration as the
                  load-bearing stage. The <strong className="font-medium text-foreground">AI Stewardship Sequence field guide</strong>{" "}
                  is the operating walkthrough: Safety, Sandbox, Skills, Solutions — the order that keeps trust from
                  collapsing while you adopt AI.
                </p>
              </Prose>
              <ul className="mt-8 max-w-xl space-y-3 text-muted-foreground">
                {bullets.map((line) => (
                  <li key={line} className="flex gap-3 text-sm leading-relaxed md:text-base">
                    <span
                      className="mt-2 size-1.5 shrink-0 rounded-full bg-primary"
                      aria-hidden="true"
                    />
                    {line}
                  </li>
                ))}
              </ul>
              <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:items-center">
                <Button
                  asChild
                  className="h-auto rounded-md px-8 py-4 text-base font-semibold shadow-none"
                >
                  <Link href={BOOK_HUB_PATH}>Read the book</Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  className="h-auto rounded-md border-border bg-card px-8 py-4 text-base font-semibold shadow-none hover:bg-elevated"
                >
                  <Link href={SSSS_FIELD_GUIDE_PATH}>AI Stewardship Sequence field guide</Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  className="h-auto rounded-md border-border bg-card px-8 py-4 text-base font-semibold shadow-none hover:bg-elevated"
                >
                  <Link href={`${BOOK_HUB_PATH}#chapters`}>Book chapters</Link>
                </Button>
              </div>
            </div>
          </div>
        </Container>
      </Reveal>
    </Section>
  );
}
