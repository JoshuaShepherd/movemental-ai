import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { NewsletterForm } from "@/components/forms/newsletter-form";
import {
  ArrowLink,
  Container,
  Display,
  Eyebrow,
  Prose,
  Reveal,
  Section,
  SurfaceCard,
} from "@/components/primitives";
import { BOOK_HUB_PATH, SSSS_FIELD_GUIDE_PATH } from "@/lib/canon-routes";

import { pricingZones } from "../services-sandbox-season/sandbox-season-data";

export function PricingPageContent() {
  return (
    <>
      <Section variant="midnight" spacing="lg" className="text-center">
        <Container>
          <Reveal>
            <Eyebrow className="mb-4 text-inverse-foreground/70">Pricing</Eyebrow>
            <Display size="lg" className="mx-auto max-w-4xl">
              Published fees, <em>fixed scope</em>
            </Display>
            <Prose className="mx-auto mt-6 max-w-2xl text-lg text-inverse-foreground/80 [&_p]:text-inverse-foreground/80">
              <p>
                Movemental publishes pricing because transparency shortens the wrong conversations and lengthens the
                right ones. Scope discipline is the product. When the fee is clear, both sides can decide faster whether
                a season is a serious match — especially across the Fragmentation →{" "}
                <strong>Integration</strong> transition, where hidden scope is how good work goes
                wrong.
              </p>
            </Prose>
            <div className="mt-10">
              <Link
                href="/services/sandbox-season"
                className="inline-flex h-auto items-center justify-center rounded-full bg-inverse-foreground px-8 py-3.5 text-base font-medium text-inverse-surface transition-transform duration-200 ease-out hover:-translate-y-0.5"
              >
                Sandbox Season detail
                <ArrowRight className="ml-2 size-4" aria-hidden />
              </Link>
            </div>
          </Reveal>
        </Container>
      </Section>

      <Section spacing="lg">
        <Container>
          <Reveal>
            <div className="mb-10 max-w-3xl">
              <Eyebrow className="mb-4">Sandbox Season</Eyebrow>
              <Display size="md" as="h2" className="text-balance">
                Fixed fee by zone, milestone-weighted payments
              </Display>
              <Prose className="mt-4">
                <p>
                  Not hourly, not a retainer, not outcome-based. The table below is the same structure that appears on
                  every proposal. Mid-zone example: ten thousand dollars at kickoff, eleven thousand at week six, eleven
                  thousand at week twelve.
                </p>
              </Prose>
            </div>
          </Reveal>
          <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
            {pricingZones.map((zone) => (
              <Reveal key={zone.zone}>
                <SurfaceCard tone="on-background" className="h-full gap-4">
                  <span className="text-[0.78rem] font-medium uppercase tracking-eyebrow text-ink-soft">
                    {zone.zone}
                  </span>
                  <div className="font-serif text-[clamp(1.35rem,2.2vw,1.75rem)] font-normal italic leading-tight tracking-[-0.005em] text-foreground">
                    {zone.fee}
                  </div>
                  <dl className="mt-1 space-y-3 text-[0.92rem] leading-normal text-muted-foreground">
                    <div>
                      <dt className="text-[0.72rem] font-medium uppercase tracking-eyebrow text-ink-soft">
                        Revenue band
                      </dt>
                      <dd className="mt-1">{zone.revenueBand}</dd>
                    </div>
                    <div>
                      <dt className="text-[0.72rem] font-medium uppercase tracking-eyebrow text-ink-soft">Scope</dt>
                      <dd className="mt-1">{zone.scope}</dd>
                    </div>
                    <div>
                      <dt className="text-[0.72rem] font-medium uppercase tracking-eyebrow text-ink-soft">Payment</dt>
                      <dd className="mt-1">{zone.payment}</dd>
                    </div>
                  </dl>
                </SurfaceCard>
              </Reveal>
            ))}
          </div>
          <Reveal>
            <Prose className="mx-auto mt-12 max-w-3xl">
              <p>
                Quarterly portfolio refresh, Skills-stage seasons, and Solutions-stage advisory are priced separately
                and named up front on the Sandbox Season page. How the platform layer relates to fixed-fee seasons is
                spelled out on the{" "}
                <Link href="/platform" className="font-medium text-primary underline-offset-4 hover:underline">
                  Platform
                </Link>{" "}
                overview; movement-leader economics beyond Sandbox stay in direct conversation.
              </p>
              <p className="mt-4">
                Not sure where you are before a pricing conversation? Take the{" "}
                <Link href="/assess" className="font-medium text-primary underline-offset-4 hover:underline">
                  AI Stewardship Sequence integrity diagnostic
                </Link>
                — Safety through Solutions in one flow, with stage integrity and a ninety-day focus.
              </p>
            </Prose>
            <div className="mx-auto mt-8 flex max-w-3xl flex-wrap gap-x-8 gap-y-3 text-sm text-muted-foreground">
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
                href="/assess"
                className="border-b border-border pb-0.5 font-medium text-foreground transition-colors hover:border-foreground"
              >
                AI Stewardship Sequence assessment
              </Link>
            </div>
            <div className="mt-8 flex flex-wrap gap-6">
              <ArrowLink href="/services/sandbox-season">Return to Sandbox Season</ArrowLink>
              <ArrowLink href="/contact" tone="foreground">
                Ask a scoped question
              </ArrowLink>
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
            <div className="relative mt-6">
              <NewsletterForm source="pricing-invitation" />
            </div>
          </Reveal>
        </Container>
      </Section>
    </>
  );
}
