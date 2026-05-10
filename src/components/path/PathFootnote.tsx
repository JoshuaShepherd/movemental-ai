import Link from "next/link";

import { Container, Section } from "@/components/primitives";

import { stageMeta } from "./data/shared";

/**
 * PathFootnote — bottom strip placed *above* the global SiteFooter.
 *
 * Renders the Movemental brand mark + tagline, the four-stage path list,
 * "Go further" links, and the audience-specific tag (e.g. "For nonprofit
 * leaders.") with copyright. Uses `<aside aria-label="Page wrap-up">` so we
 * don't ship two `<footer>` landmarks per page.
 */
export function PathFootnote({ audienceLabel }: { audienceLabel: string }) {
  return (
    <Section
      variant="midnight"
      spacing="sm"
      as="aside"
      aria-label="Page wrap-up"
    >
      <Container>
        <div className="grid grid-cols-1 min-[720px]:grid-cols-3 gap-10">
          <div>
            <div className="flex items-center gap-2.5 mb-3">
              <span
                aria-hidden="true"
                className="relative inline-block w-[18px] h-[18px] rounded-full bg-inverse-foreground"
              >
                <span className="absolute inset-[5px] rounded-full bg-inverse-surface" />
              </span>
              <span className="text-inverse-foreground font-medium text-base">
                Movemental
              </span>
            </div>
            <p className="text-[0.92rem] leading-[1.6] text-inverse-muted max-w-[36ch]">
              The four-stage AI path for organizations that move at the speed
              of trust.
            </p>
          </div>

          <div>
            <h4 className="text-[0.78rem] font-medium uppercase tracking-eyebrow text-inverse-foreground/85 mb-3">
              The Path
            </h4>
            <ol className="m-0 p-0 list-none space-y-1.5">
              {stageMeta.map((stage) => (
                <li key={stage.num} className="flex items-baseline gap-3">
                  <span className="font-serif italic text-inverse-muted text-[0.95rem] w-7">
                    {stage.num}
                  </span>
                  <Link
                    href="#path"
                    className="text-inverse-foreground hover:underline underline-offset-4"
                  >
                    {stage.name}
                  </Link>
                </li>
              ))}
            </ol>
          </div>

          <div>
            <h4 className="text-[0.78rem] font-medium uppercase tracking-eyebrow text-inverse-foreground/85 mb-3">
              Go further
            </h4>
            <ul className="m-0 p-0 list-none space-y-1.5">
              <li>
                <Link
                  href="/contact"
                  className="text-inverse-foreground hover:underline underline-offset-4"
                >
                  Start a conversation
                </Link>
              </li>
              <li>
                <Link
                  href="#case-study"
                  className="text-inverse-foreground hover:underline underline-offset-4"
                >
                  Read the case study
                </Link>
              </li>
              <li>
                <Link
                  href="/path"
                  className="text-inverse-foreground hover:underline underline-offset-4"
                >
                  The full path
                </Link>
              </li>
              <li>
                <Link
                  href="/"
                  className="text-inverse-foreground hover:underline underline-offset-4"
                >
                  Movemental.com
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 pt-5 border-t border-inverse-border flex flex-wrap justify-between gap-3 text-[0.85rem] text-inverse-muted">
          <span className="font-serif italic text-inverse-foreground">
            {audienceLabel}
          </span>
          <span>© Movemental · The Movemental Path</span>
        </div>
      </Container>
    </Section>
  );
}
