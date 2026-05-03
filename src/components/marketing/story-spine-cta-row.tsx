import Link from "next/link";

import {
  Container,
  Display,
  Eyebrow,
  Prose,
  Section,
} from "@/components/primitives";

type StorySpineCtaRowProps = {
  /** One line of audience-specific context under the list. */
  audienceNote?: string;
  /** When true, sits on a midnight band (inverse text). */
  variant?: "default" | "midnight";
};

const PREFACE_HREF = "/book/read/preface-the-scatter-field";

/**
 * Shared “three beats” strip: fragmentation story → book preface → articles.
 * Used on audience landings so every path re-joins the canonical narrative spine.
 */
export function StorySpineCtaRow({
  audienceNote,
  variant = "default",
}: StorySpineCtaRowProps) {
  const isMidnight = variant === "midnight";

  return (
    <Section variant={isMidnight ? "midnight" : "elevated"} spacing="sm">
      <Container className="mx-auto max-w-3xl">
        <Eyebrow
          className={
            isMidnight ? "mb-3 text-inverse-foreground/70" : "mb-3 text-muted-foreground"
          }
        >
          Continue the arc
        </Eyebrow>
        <Display
          as="h2"
          size="sm"
          className={
            isMidnight ? "text-balance text-inverse-foreground" : "text-balance text-foreground"
          }
        >
          Three next steps
        </Display>
        <Prose
          className={
            isMidnight
              ? "mt-5 max-w-none text-inverse-foreground/80"
              : "mt-5 max-w-none text-muted-foreground"
          }
        >
          <ol className="mt-2 list-decimal space-y-3 pl-5 marker:font-semibold">
            <li>
              <Link
                href="/fragmentation"
                className={
                  isMidnight
                    ? "font-medium text-inverse-foreground underline-offset-4 hover:underline"
                    : "font-medium text-primary underline-offset-4 hover:underline"
                }
              >
                Read the fragmentation story
              </Link>{" "}
              — the six-stage path from scatter field to field (informational and relational
              intelligence re-composed).
            </li>
            <li>
              <Link
                href={PREFACE_HREF}
                className={
                  isMidnight
                    ? "font-medium text-inverse-foreground underline-offset-4 hover:underline"
                    : "font-medium text-primary underline-offset-4 hover:underline"
                }
              >
                Start the book at the preface
              </Link>{" "}
              — same argument in long form, free and citeable.
            </li>
            <li>
              <Link
                href="/articles"
                className={
                  isMidnight
                    ? "font-medium text-inverse-foreground underline-offset-4 hover:underline"
                    : "font-medium text-primary underline-offset-4 hover:underline"
                }
              >
                Browse articles
              </Link>{" "}
              — essays and playbooks on fragmentation, integration, and credibility.
            </li>
          </ol>
          {audienceNote ? (
            <p className={isMidnight ? "mt-6 text-sm text-inverse-foreground/70" : "mt-6 text-sm"}>
              {audienceNote}
            </p>
          ) : null}
        </Prose>
      </Container>
    </Section>
  );
}
