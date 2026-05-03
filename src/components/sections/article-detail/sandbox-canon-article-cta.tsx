import {
  ArrowLink,
  Container,
  Display,
  Eyebrow,
  Prose,
  Reveal,
  Section,
} from "@/components/primitives";

/**
 * Orientation strip for sandbox curriculum articles (`docs/articles/sandbox/*.md`).
 * Keeps service, hub, methodology, and template requests one click away.
 */
export function SandboxCanonArticleCta() {
  return (
    <Section variant="section" spacing="sm">
      <Container>
        <Reveal>
          <div className="rounded-2xl bg-card p-8 sm:p-10">
            <Eyebrow className="mb-3">Sandbox</Eyebrow>
            <Display size="sm" as="h2" className="text-balance">
              When you are ready to run a season, not only read about it
            </Display>
            <Prose className="mt-4 max-w-2xl">
              <p>
                The articles describe the argument. The Sandbox Season is the fixed-scope engagement where a cohort
                does the work with facilitation, scoring discipline, and a Week 12 handoff.
              </p>
            </Prose>
            <div className="mt-6 flex flex-wrap gap-x-6 gap-y-3">
              <ArrowLink href="/services/sandbox-season">Sandbox Season</ArrowLink>
              <ArrowLink href="/articles/sandbox" tone="foreground">
                Canon hub
              </ArrowLink>
              <ArrowLink href="/methodology" tone="foreground">
                Methodology map
              </ArrowLink>
              <ArrowLink href="/methodology/eight-patterns" tone="foreground">
                Eight patterns (visual)
              </ArrowLink>
              <ArrowLink href="/resources/templates" tone="foreground">
                Template pack request
              </ArrowLink>
            </div>
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}
