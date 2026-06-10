import Link from "next/link";

import {
  Container,
  Display,
  Eyebrow,
  Prose,
  Reveal,
  Section,
} from "@/components/primitives";

import { BOOK_READ_INSPECTABLE_DIAGNOSIS, proofRows } from "./home-data";

/**
 * §11 · Proof — "Built with trusted movement voices."
 *
 * Trust / ecosystem proof band. Real names, short roles, one line of how
 * their work sits inside this system. Follows the canonical doctrine:
 * trusted voices are an ecosystem layer, not an audience segment.
 * See `docs/build/strategy/movement-leaders-as-ecosystem-layer.md`.
 */
export function HomeProof() {
  return (
    <Section id="proof" spacing="lg">
      <Container>
        <Reveal className="mx-auto max-w-3xl text-center">
          <Eyebrow className="mb-4">Proof</Eyebrow>
          <Display size="md" as="h2" className="text-balance">
            Built with trusted movement voices.
          </Display>
          <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground">
            Not built in isolation from the field it serves. Movemental is shaped in
            conversation with movement leaders whose public work it is built to carry
            &mdash; a real ecosystem, not a category that doesn&apos;t exist yet.
          </p>
          <Prose className="mx-auto mt-8 max-w-xl text-center text-sm text-muted-foreground">
            <p>
              For the full arc in narrative form, read{" "}
              <Link href="/book" className="font-medium text-primary underline-offset-4 hover:underline">
                the book
              </Link>
              , begin with the inspectable diagnosis in{" "}
              <Link
                href={BOOK_READ_INSPECTABLE_DIAGNOSIS}
                className="font-medium text-primary underline-offset-4 hover:underline"
              >
                Chapter 1 · The invisible tax
              </Link>
              , browse the{" "}
              <Link href="/articles" className="font-medium text-primary underline-offset-4 hover:underline">
                article library
              </Link>
              , or read answers to common questions in the{" "}
              <Link href="/faq" className="font-medium text-primary underline-offset-4 hover:underline">
                FAQ
              </Link>
              .
            </p>
          </Prose>
        </Reveal>

        <Reveal delay={160} stagger className="mt-16 grid gap-6 md:grid-cols-3">
          {proofRows.map((row) => (
            <article
              key={row.name}
              className="rounded-(--radius-md) bg-card p-6 shadow-ambient"
            >
              <p className="text-lg font-semibold tracking-tight text-foreground">
                {row.name}
              </p>
              <p className="mt-2 text-xs font-semibold uppercase tracking-eyebrow text-primary">
                {row.role}
              </p>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                {row.blurb}
              </p>
            </article>
          ))}
        </Reveal>
      </Container>
    </Section>
  );
}
