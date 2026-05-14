import { Container, Eyebrow, Reveal, Section } from "@/components/primitives";

import { StageMap } from "./StageMap";

/**
 * PathIntro — page lede + 4-up StageMap.
 *
 * Renders the eyebrow ("The Movemental Path"), the H1, the lede paragraph,
 * and the four-stage `StageMap` overview card.
 */
export function PathIntro() {
  return (
    <Section variant="default" spacing="lg" aria-labelledby="path-intro-title">
      <Container>
        <Reveal>
          <Eyebrow withDot className="mb-5">
            The Movemental Path
          </Eyebrow>
        </Reveal>
        <Reveal>
          <h1
            id="path-intro-title"
            className="font-sans font-medium tracking-display text-foreground text-balance text-[clamp(2.4rem,5vw,4rem)] leading-[1.04] max-w-[22ch] mb-6"
          >
            One commitment <em>per stage</em> — before you move on.
          </h1>
        </Reveal>
        <Reveal>
          <p className="text-[clamp(1.05rem,1.4vw,1.2rem)] leading-[1.6] text-muted-foreground max-w-[56ch]">
            Most organizations that adopt AI well take the same four steps, in
            order. Each one protects the next. Scroll to see what has to be
            true before your organization can move on.
          </p>
        </Reveal>

        <div className="mt-12 sm:mt-14">
          <Reveal>
            <StageMap />
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}
