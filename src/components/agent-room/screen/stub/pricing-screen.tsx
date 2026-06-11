"use client";

import Link from "next/link";
import { useState } from "react";

import styles from "../../ink-band.module.css";
import type { ScreenProps } from "./stub-screen";
import { Crumb } from "./chrome";
import { ProcessAccordion } from "../process-accordion";
import { TwoWaysForward, type WayForwardOption } from "./two-ways-forward";

const REFUSALS = [
  "We don't negotiate the price. It's the same for a 500-person church and a 50,000-member denomination.",
  "We don't gate the methodology. The field guides are free, and any team can run the work itself.",
  "We don't run hidden enterprise tiers. There is no number above what's listed here.",
  "We don't charge per seat. Pricing is by engagement, because per-seat rewards lock-in, not belonging.",
  "We don't use urgency. No limited-time discounts, no \"spots filling fast.\"",
  "We don't pay our network in logos. The movement leaders behind the path are paid through a real agreement, with royalties, available on request.",
];

const SAFETY_FREE: WayForwardOption = {
  title: "Free, and we guide you.",
  price: "Free · about 1 to 2 months",
  description: (
    <>
      The field guide, <em>It Starts With Safety</em>. Your team drafts all five
      layers, and we guide you when you need it.
    </>
  ),
  ctaLabel: "Start free, we'll guide you",
  ctaHref: "/field-guide",
};

const SAFETY_PAID: WayForwardOption = {
  title: "We do it with you.",
  price: "$1,000 · two weeks",
  description:
    "We draft all five layers customized to your organization. Your team reviews and ratifies in the dashboard.",
  ctaLabel: "Have us do it · $1,000",
  ctaHref: "/enroll",
  paid: true,
};

const SANDBOX_FREE: WayForwardOption = {
  title: "Free, and we guide you.",
  price: "Free · self-paced",
  description: (
    <>
      The field guide, <em>It Continues With Exploration</em>. Your team runs the
      eight phases, and we guide you when you need it.
    </>
  ),
  ctaLabel: "Start free, we'll guide you",
  ctaHref: "/field-guide?guide=sandbox",
};

const SANDBOX_PAID: WayForwardOption = {
  title: "We do it with you.",
  price: "$15,000 · four to six weeks",
  description:
    "About ten hours of in-person teaching across the eight phases, an LMS, a custom AI recipe library, and dashboard integration. Produces a Future Plan with green, yellow, and red-light use cases.",
  ctaLabel: "Have us do it · $15,000",
  ctaHref: "/enroll",
  paid: true,
};

const TRAINING_FREE: WayForwardOption = {
  title: "Free, and we guide you.",
  price: "[Free entry point to confirm]",
  description: "Training has run cohort-only to date. We will confirm the free entry point before publishing a claim here.",
  ctaLabel: "",
  ctaHref: "",
  placeholder: true,
};

const TRAINING_PAID: WayForwardOption = {
  title: "We do it with you.",
  price: "$15,000 + $5,000 per year",
  description:
    "An eight-week formation cohort building three capacities: discernment, authorship, and stewardship, in the people who will steward AI inside your organization.",
  ctaLabel: "Talk to us about Training",
  ctaHref: "/enroll",
  paid: true,
};

const TECH_FREE: WayForwardOption = {
  title: "Free, and we guide you.",
  price: "[Free entry point to confirm]",
  description: "Tech is scoped per engagement. We will confirm the free entry point before publishing a claim here.",
  ctaLabel: "",
  ctaHref: "",
  placeholder: true,
};

const TECH_PAID: WayForwardOption = {
  title: "We do it with you.",
  price: "From $30,000 · scoped",
  description:
    "Scoped AI deployment across six configurations, from tool optimization to network-scale work for institutions and denominations.",
  ctaLabel: "Talk to us about Tech",
  ctaHref: "/enroll",
  paid: true,
};

function StageWays({
  reassurance,
  freeWay,
  paidWay,
  freeLead = false,
}: {
  reassurance: string;
  freeWay: WayForwardOption;
  paidWay: WayForwardOption;
  freeLead?: boolean;
}) {
  return (
    <TwoWaysForward
      sectionLabel="Two ways forward"
      reassurance={reassurance}
      freeWay={freeWay}
      paidWay={paidWay}
      freeLead={freeLead}
    />
  );
}

/** Full pricing schedule with plain stage names and two ways forward per stage. */
export function PricingScreen({ onHome }: ScreenProps) {
  const [active, setActive] = useState("safety");

  return (
    <div>
      <Crumb onHome={onHome} />
      <h1>Pricing.</h1>

      <ProcessAccordion
        ariaLabel="Pricing by stage"
        activeId={active}
        onActiveChange={(id) => setActive((cur) => (cur === id ? "" : id))}
        items={[
          {
            id: "safety",
            step: "01",
            title: "Safety",
            children: (
              <StageWays
                reassurance="Both routes produce the same ratified Handbook."
                freeWay={SAFETY_FREE}
                paidWay={SAFETY_PAID}
                freeLead
              />
            ),
          },
          {
            id: "sandbox",
            step: "02",
            title: "Sandbox",
            children: (
              <StageWays
                reassurance="Both routes produce the same Future Plan and shared record of what you tried."
                freeWay={SANDBOX_FREE}
                paidWay={SANDBOX_PAID}
              />
            ),
          },
          {
            id: "training",
            step: "03",
            title: "Training",
            children: (
              <StageWays
                reassurance="The paid cohort is live today. The free entry point is still being confirmed."
                freeWay={TRAINING_FREE}
                paidWay={TRAINING_PAID}
              />
            ),
          },
          {
            id: "tech",
            step: "04",
            title: "Tech",
            children: (
              <StageWays
                reassurance="Every Tech engagement is scoped. We will confirm the free entry point before publishing a claim here."
                freeWay={TECH_FREE}
                paidWay={TECH_PAID}
              />
            ),
          },
        ]}
      />

      <div className={styles.paOnlyNarrow}>
        <StageWays
          reassurance="Both routes produce the same ratified Handbook."
          freeWay={SAFETY_FREE}
          paidWay={SAFETY_PAID}
          freeLead
        />
        <StageWays
          reassurance="Both routes produce the same Future Plan and shared record of what you tried."
          freeWay={SANDBOX_FREE}
          paidWay={SANDBOX_PAID}
        />
        <StageWays
          reassurance="The paid cohort is live today. The free entry point is still being confirmed."
          freeWay={TRAINING_FREE}
          paidWay={TRAINING_PAID}
        />
        <StageWays
          reassurance="Every Tech engagement is scoped. We will confirm the free entry point before publishing a claim here."
          freeWay={TECH_FREE}
          paidWay={TECH_PAID}
        />
      </div>

      <div className={styles.sec}>
        <p className={styles.secLabel}>What this pricing refuses</p>
        {REFUSALS.map((line) => (
          <p key={line} className={styles.refuse}>
            {line}
          </p>
        ))}
        <p className={styles.body} style={{ marginTop: "0.85rem" }}>
          The full account of what we refuse in our own AI use — and the green, yellow, and red
          lights we apply — is on{" "}
          <Link className={styles.inlineLink} href="/agent/how-we-use-ai">
            How We Use AI
          </Link>
          .
        </p>
      </div>

      <div className={styles.sec}>
        <p className={styles.secLabel}>If the price isn't walkable</p>
        <p className={styles.body} style={{ marginTop: "0.2rem" }}>
          The same price for everyone means it isn't walkable for every organization, a
          90-person church on a $180k budget, a seminary in a non-USD economy. We treat
          that as a real problem, not a marketing one. If that's you, write to us before
          you rule anything out; we work access out case by case.
        </p>
      </div>

      <div className={styles.sec}>
        <p className={styles.secLabel}>Terms</p>
        <p className={styles.body} style={{ marginTop: "0.2rem" }}>
          Engagements are paid in two halves: 50% to begin, 50% on completion, Net 15
          each. Check, ACH, or card.
        </p>
      </div>

      <p className={styles.honest}>
        Questions about any of this? Get in touch, or map where you stand, and we'll
        know exactly what to talk about.
      </p>
    </div>
  );
}
