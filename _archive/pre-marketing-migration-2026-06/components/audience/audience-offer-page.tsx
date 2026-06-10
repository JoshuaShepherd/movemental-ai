import Link from "next/link";
import { Fragment } from "react";

import {
  AUDIENCE_HERO_COPY,
  AUDIENCE_OFFER_COPY,
  AUDIENCE_OFFER_OTHER_PATHS,
} from "@/components/audience/audience-offer-copy";
import { CaseStudyProse, CaseStudyToc } from "@/components/case-study";
import type { CaseStudyContent } from "@/components/case-study/types";
import { ArrowLink } from "@/components/primitives/arrow-link";
import { Container } from "@/components/primitives/container";
import { Eyebrow } from "@/components/primitives/eyebrow";
import { Section } from "@/components/primitives/section";
import type { AudienceKind } from "@/components/studio/segment/audience-contact";
import { audienceContactHref } from "@/components/studio/segment/audience-contact";
import { audienceOfferCaseStudySections } from "@/lib/audience-case-study";
import { cn } from "@/lib/utils";

export function AudienceOfferPage({
  audience,
  caseStudy,
}: {
  audience: AudienceKind;
  caseStudy: CaseStudyContent;
}) {
  const copy = AUDIENCE_OFFER_COPY[audience];
  const hero = AUDIENCE_HERO_COPY[audience];
  const other = AUDIENCE_OFFER_OTHER_PATHS[audience];
  const tocSections = audienceOfferCaseStudySections(caseStudy);
  const contactHref = audienceContactHref(audience);

  const midnightBtnRow = (
    <div className="mt-10 flex flex-wrap items-center gap-3 md:gap-4">
      <Link href="/field-guides/safety" className="btn-pill btn-pill--primary inline-flex items-center justify-center px-6 py-3 text-[0.95rem] font-medium">
        Read the Safety Field Guide
      </Link>
      <Link href={contactHref} className="btn-pill btn-pill--ghost inline-flex items-center justify-center px-6 py-3 text-[0.95rem] font-medium">
        Start a conversation
      </Link>
    </div>
  );

  const closingActions = copy.closingConversationPrimary ? (
    <div className="mt-10 flex flex-wrap items-center gap-3 md:gap-4">
      <Link
        href={contactHref}
        className="btn-pill btn-pill--primary inline-flex items-center justify-center px-6 py-3 text-[0.95rem] font-medium"
      >
        Start an institutional conversation
      </Link>
      <Link href="/field-guides/safety" className="btn-pill btn-pill--ghost inline-flex items-center justify-center px-6 py-3 text-[0.95rem] font-medium">
        Read the Safety Field Guide
      </Link>
      <Link
        href="/pathway"
        className="inline-flex items-center px-2 py-3 text-[0.95rem] font-medium text-inverse-foreground/85 underline decoration-inverse-border decoration-1 underline-offset-4 hover:text-inverse-foreground"
      >
        See the full path →
      </Link>
    </div>
  ) : (
    <div className="mt-10 flex flex-wrap items-center gap-3 md:gap-4">
      <Link href="/field-guides/safety" className="btn-pill btn-pill--primary inline-flex items-center justify-center px-6 py-3 text-[0.95rem] font-medium">
        Read the Safety Field Guide
      </Link>
      <Link href={contactHref} className="btn-pill btn-pill--ghost inline-flex items-center justify-center px-6 py-3 text-[0.95rem] font-medium">
        Start a conversation
      </Link>
      <Link
        href="/pathway"
        className="inline-flex items-center px-2 py-3 text-[0.95rem] font-medium text-inverse-foreground/85 underline decoration-inverse-border decoration-1 underline-offset-4 hover:text-inverse-foreground"
      >
        See the full path →
      </Link>
    </div>
  );

  return (
    <>
      <Section
        variant="midnight"
        spacing="lg"
        aria-labelledby="audience-offer-hero-h1"
        className="band-midnight scroll-mt-(--site-chrome-total) pt-8 md:pt-12"
      >
        <Container width="default">
          <Eyebrow inverse className="mb-6">
            {hero.eyebrow}
          </Eyebrow>
          <h1
            id="audience-offer-hero-h1"
            className="max-w-[22ch] font-serif text-[clamp(2.25rem,4.5vw,3.25rem)] font-normal leading-[1.12] tracking-[-0.02em] text-inverse-foreground"
          >
            {hero.title}
          </h1>
          <p className="mt-6 max-w-[40rem] text-[1.0625rem] leading-relaxed text-inverse-foreground/80">{hero.sub}</p>
          {midnightBtnRow}
          {hero.finePrint ? (
            <p
              className={cn(
                "mt-6 max-w-[40rem] text-[1.0625rem] leading-relaxed text-inverse-foreground/65",
                audience === "nonprofits" || audience === "institutions" ? "font-serif italic" : "",
              )}
            >
              {hero.finePrint}
            </p>
          ) : null}
        </Container>
      </Section>

      <Section variant="default" spacing="lg" className="border-t border-border">
        <Container width="default">
          <Eyebrow className="mb-4">{copy.situationEyebrow}</Eyebrow>
          <h2 className="max-w-[48rem] font-serif text-[clamp(1.75rem,3vw,2.35rem)] font-normal leading-[1.18] tracking-[-0.02em] text-foreground">
            {copy.situationHeading}
          </h2>
          <div className="mt-10 max-w-[45rem] space-y-7 text-[1.0625rem] leading-relaxed text-foreground">
            {copy.situationParas.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
            <p className="italic text-muted-foreground">{copy.situationClosing}</p>
          </div>
        </Container>
      </Section>

      <Section variant="section" spacing="lg" className="border-t border-border">
        <Container width="default">
          <Eyebrow className="mb-4">{copy.pathEyebrow}</Eyebrow>
          <h2 className="max-w-[52rem] font-serif text-[clamp(1.75rem,3vw,2.35rem)] font-normal leading-[1.18] tracking-[-0.02em] text-foreground">
            {copy.pathHeading}
          </h2>
          <div className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
            {copy.pathStages.map((s) => (
              <article
                key={s.num}
                className="border border-border bg-card/80 px-5 py-6 shadow-none backdrop-blur-[2px]"
              >
                <span className="font-serif text-[1.5rem] italic leading-none text-muted-foreground">{s.num}</span>
                <h3 className="mt-3 font-serif text-[1.125rem] font-normal text-foreground">{s.title}</h3>
                <p className="mt-2 text-[0.9375rem] leading-snug text-muted-foreground">{s.description}</p>
              </article>
            ))}
          </div>
          <p className="mt-10 max-w-[45rem] text-[1.0625rem] leading-relaxed text-foreground">{copy.pathFooter}</p>
        </Container>
      </Section>

      <Section variant="default" spacing="lg" className="border-t border-border">
        <Container width="default">
          <Eyebrow className="mb-4">{copy.caseStudyEyebrow}</Eyebrow>
          <h2 className="max-w-[48rem] font-serif text-[clamp(1.75rem,3vw,2.35rem)] font-normal leading-[1.18] tracking-[-0.02em] text-foreground">
            {copy.caseStudyTitle}
          </h2>
          <p className="mt-6 max-w-[40rem] font-serif text-[1.0625rem] italic leading-relaxed text-muted-foreground">
            {copy.caseStudyIntro}
          </p>

          <div className="case-study-grid mt-14">
            <aside className="case-study-grid__sidebar">
              <div className="case-study-grid__sidebar-inner">
                <CaseStudyToc sections={tocSections} ariaLabel="In this case study" />
              </div>
            </aside>
            <div className="case-study-grid__main">
              {tocSections.map((section, i) => (
                <Fragment key={section.id}>
                  {i > 0 ? <hr className="case-study-section__divider" aria-hidden /> : null}
                  <CaseStudyProse section={section} />
                </Fragment>
              ))}
            </div>
          </div>
        </Container>
      </Section>

      <Section variant="section" spacing="lg" className="border-t border-border">
        <Container width="default">
          <Eyebrow className="mb-4">{copy.patternEyebrow}</Eyebrow>
          <h2 className="max-w-[48rem] font-serif text-[clamp(1.75rem,3vw,2.35rem)] font-normal leading-[1.18] tracking-[-0.02em] text-foreground">
            {copy.patternHeading}
          </h2>
          <div className="mt-12 max-w-[42rem] space-y-10">
            {copy.patterns.map((block) => (
              <div key={block.lead}>
                <p className="font-serif text-[1.0625rem] italic text-foreground">{block.lead}</p>
                <p className="mt-3 text-[1.0625rem] leading-relaxed text-muted-foreground">{block.body}</p>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      <Section
        variant="midnight"
        spacing="lg"
        aria-labelledby="audience-offer-closing-h2"
        className="band-midnight border-t border-inverse-border/15"
      >
        <Container width="default">
          <Eyebrow inverse className="mb-6">
            {copy.closingEyebrow}
          </Eyebrow>
          <h2
            id="audience-offer-closing-h2"
            className="max-w-[40rem] font-serif text-[clamp(1.75rem,3vw,2.35rem)] font-normal leading-[1.18] text-inverse-foreground"
          >
            {copy.closingHeading}
          </h2>
          <p className="mt-6 max-w-[40rem] text-[1.0625rem] leading-relaxed text-inverse-foreground/80">{copy.closingBody}</p>
          {copy.closingItalic ? (
            <p className="mt-6 max-w-[40rem] font-serif text-[1.0625rem] italic leading-relaxed text-inverse-foreground/65">
              {copy.closingItalic}
            </p>
          ) : null}
          {closingActions}
        </Container>
      </Section>

      <Section variant="default" spacing="lg" className="border-t border-border">
        <Container width="default">
          <Eyebrow className="mb-4">{copy.otherPathsHeading}</Eyebrow>
          <h2 className="max-w-[48rem] font-serif text-[clamp(1.75rem,3vw,2.35rem)] font-normal leading-[1.18] tracking-[-0.02em] text-foreground">
            {copy.otherPathsIntro}
          </h2>
          <div className="mt-12 grid grid-cols-1 gap-12 md:grid-cols-3 md:gap-10">
            {other.cards.map((card) => (
              <article key={card.href}>
                <span className="font-serif text-[1.25rem] italic text-muted-foreground">{card.num}</span>
                <h3 className="mt-2 font-serif text-[1.2rem] font-normal text-foreground">{card.title}</h3>
                <p className="mt-3 text-[0.98rem] leading-relaxed text-muted-foreground">{card.body}</p>
                <div className="mt-5">
                  <ArrowLink href={card.href} tone="foreground" size="sm">
                    {card.linkLabel}
                  </ArrowLink>
                </div>
              </article>
            ))}
          </div>
        </Container>
      </Section>
    </>
  );
}
