import Link from "next/link";

import { NewsletterForm } from "@/components/forms/newsletter-form";
import { TemplatesPackRequestForm } from "@/components/forms/templates-pack-request-form";
import {
  ArrowLink,
  Container,
  Display,
  Eyebrow,
  Prose,
  Reveal,
  Section,
} from "@/components/primitives";
import { BOOK_HUB_PATH, SSSS_FIELD_GUIDE_PATH } from "@/lib/canon-routes";

export function ResourcesTemplatesPageContent() {
  return (
    <>
      <Section variant="midnight" spacing="lg">
        <Container>
          <Reveal>
            <Eyebrow className="mb-4 text-inverse-foreground/70">Resources</Eyebrow>
            <Display size="lg" className="max-w-4xl text-balance">
              Sandbox <em>template pack</em>
            </Display>
            <Prose className="mt-6 max-w-2xl text-lg text-inverse-foreground/80 [&_p]:text-inverse-foreground/80">
              <p>
                Six templates used inside a Sandbox Season: season charter, eight-pattern scan worksheet, experiment
                brief, scoring sheet, ethical and relational flag paragraph, portfolio page. They exist so Sandbox work
                stays inspectable across <strong>informational</strong> and <strong>relational</strong> lines — the
                same integration posture the public arc names at{" "}
                <Link
                  href="/fragmentation"
                  className="font-medium text-inverse-foreground underline decoration-inverse-foreground/40 underline-offset-4 hover:decoration-inverse-foreground"
                >
                  /fragmentation
                </Link>
                . The exchange is simple: tell us who you are and we route a human reply with download instructions.
              </p>
            </Prose>
            <div className="mt-8">
              <ArrowLink href="/services/sandbox-season" className="text-inverse-foreground [&_svg]:text-inverse-foreground">
                Read how the season uses these
              </ArrowLink>
            </div>
          </Reveal>
        </Container>
      </Section>

      <Section spacing="lg">
        <Container>
          <Reveal>
            <div className="mx-auto max-w-xl">
              <Eyebrow className="mb-4">Request</Eyebrow>
              <Display size="sm" as="h2" className="text-balance">
                One form, routed like any serious inquiry
              </Display>
              <Prose className="mt-4">
                <p>
                  Submissions use the same contact pipeline as the rest of the site so nothing depends on a silent
                  drop folder. If you are already in an active sales thread, use email instead and reference this page.
                </p>
              </Prose>
              <div className="mt-10 rounded-2xl bg-card p-8">
                <TemplatesPackRequestForm />
              </div>
              <div className="mt-10 flex flex-wrap gap-x-8 gap-y-3 text-sm text-muted-foreground">
                <Link
                  href="/articles/two-intelligences-integration"
                  className="border-b border-border pb-0.5 font-medium text-foreground transition-colors hover:border-foreground"
                >
                  Two intelligences, one integration thesis
                </Link>
                <Link
                  href={SSSS_FIELD_GUIDE_PATH}
                  className="border-b border-border pb-0.5 font-medium text-foreground transition-colors hover:border-foreground"
                >
                  AI Stewardship Sequence field guide
                </Link>
                <Link
                  href={BOOK_HUB_PATH}
                  className="border-b border-border pb-0.5 font-medium text-foreground transition-colors hover:border-foreground"
                >
                  Read the field guide (book)
                </Link>
                <Link
                  href="/services/sandbox-season"
                  className="border-b border-border pb-0.5 font-medium text-foreground transition-colors hover:border-foreground"
                >
                  Sandbox Season detail
                </Link>
              </div>
            </div>
          </Reveal>
        </Container>
      </Section>

      <Section id="invitation" variant="section" spacing="lg">
        <Container className="mx-auto max-w-lg text-center">
          <Reveal>
            <Eyebrow className="mb-4">Stay close</Eyebrow>
            <Display size="sm" as="h2" className="text-balance">
              Or begin quieter
            </Display>
            <p className="mt-4 text-base text-muted-foreground">
              One note per month on formation, infrastructure, and what we&rsquo;re learning.
            </p>
            <div className="mt-6">
              <NewsletterForm source="resources-templates-invitation" />
            </div>
          </Reveal>
        </Container>
      </Section>
    </>
  );
}
