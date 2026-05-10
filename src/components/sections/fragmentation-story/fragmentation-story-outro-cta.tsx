import Link from "next/link";

import { Container } from "@/components/primitives/container";
import { Section } from "@/components/primitives/section";
import { Button } from "@/components/ui/button";
import { BOOK_HUB_PATH, SSSS_FIELD_GUIDE_PATH } from "@/lib/canon-routes";

export function FragmentationStoryOutroCta() {
  return (
    <Section id="outro-cta" variant="midnight" spacing="lg">
      <Container className="text-center">
        <h2 className="mx-auto max-w-2xl text-balance text-3xl font-semibold tracking-tight text-inverse-foreground sm:text-4xl">
          You built the intelligence.
          <br />
          <em className="not-italic text-primary">Now give it a system — and a field.</em>
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-base text-inverse-foreground/75">
          Six stages. One library of artifacts. From fragmentation to movement — the platform, the
          infrastructure, and the network that together make your intelligence carry.
        </p>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
          <Button asChild size="lg">
            <Link href={BOOK_HUB_PATH}>Read the book</Link>
          </Button>
          <Button
            asChild
            variant="ghost"
            size="lg"
            className="text-inverse-foreground hover:bg-inverse-foreground/10"
          >
            <Link href={SSSS_FIELD_GUIDE_PATH}>Movemental Path field guide</Link>
          </Button>
          <Button
            asChild
            variant="ghost"
            size="lg"
            className="text-inverse-foreground hover:bg-inverse-foreground/10"
          >
            <Link href="/assess">Movemental Path assessment</Link>
          </Button>
          <Button
            asChild
            variant="ghost"
            size="lg"
            className="text-inverse-foreground hover:bg-inverse-foreground/10"
          >
            <Link href="/contact">Bring us your corpus</Link>
          </Button>
        </div>
      </Container>
    </Section>
  );
}
