"use client";

import Link from "next/link";
import { useState, type ReactNode } from "react";

import styles from "../../ink-band.module.css";
import type { ScreenProps } from "./stub-screen";
import { Crumb } from "./chrome";
import { ProcessAccordion } from "../process-accordion";
import { PATH_STAGE_LABELS } from "@/lib/agent-room/naming";
import {
  PRICING_REFUSALS,
  PRICING_SAFETY_FREE,
  PRICING_SAFETY_PAID,
  PRICING_SANDBOX_FREE,
  PRICING_SANDBOX_PAID,
  PRICING_TECH_FREE,
  PRICING_TECH_PAID,
  PRICING_TRAINING_FREE,
  PRICING_TRAINING_PAID,
  type PricingWayData,
} from "@/lib/agent-room/data/pricing";
import { TwoWaysForward, type WayForwardOption } from "./two-ways-forward";

function toWayOption(data: PricingWayData): WayForwardOption {
  let description: ReactNode;
  if (data.descriptionPlain) {
    description = data.descriptionPlain;
  } else {
    description = (
      <>
        {data.descriptionBefore}
        <em>{data.descriptionEmphasis}</em>
        {data.descriptionAfter}
      </>
    );
  }
  return {
    title: data.title,
    price: data.price,
    description,
    ctaLabel: data.ctaLabel,
    ctaHref: data.ctaHref,
    paid: data.paid,
    placeholder: data.placeholder,
  };
}

const SAFETY_FREE = toWayOption(PRICING_SAFETY_FREE);
const SAFETY_PAID = toWayOption(PRICING_SAFETY_PAID);
const SANDBOX_FREE = toWayOption(PRICING_SANDBOX_FREE);
const SANDBOX_PAID = toWayOption(PRICING_SANDBOX_PAID);
const TRAINING_FREE = toWayOption(PRICING_TRAINING_FREE);
const TRAINING_PAID = toWayOption(PRICING_TRAINING_PAID);
const TECH_FREE = toWayOption(PRICING_TECH_FREE);
const TECH_PAID = toWayOption(PRICING_TECH_PAID);

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
                reassurance="Both routes produce the same ratified AI Charter."
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
            title: PATH_STAGE_LABELS.tech,
            children: (
              <StageWays
                reassurance={`Every ${PATH_STAGE_LABELS.tech} engagement is scoped. We will confirm the free entry point before publishing a claim here.`}
                freeWay={TECH_FREE}
                paidWay={TECH_PAID}
              />
            ),
          },
        ]}
      />

      <div className={styles.paOnlyNarrow}>
        <StageWays
          reassurance="Both routes produce the same ratified AI Charter."
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
          reassurance={`Every ${PATH_STAGE_LABELS.tech} engagement is scoped. We will confirm the free entry point before publishing a claim here.`}
          freeWay={TECH_FREE}
          paidWay={TECH_PAID}
        />
      </div>

      <div className={styles.sec}>
        <p className={styles.secLabel}>What this pricing refuses</p>
        {PRICING_REFUSALS.map((line) => (
          <p key={line} className={styles.refuse}>
            {line}
          </p>
        ))}
        <p className={styles.body} style={{ marginTop: "0.85rem" }}>
          The full account of what we refuse in our own AI use, and the green, yellow, and red
          lights we apply, is on{" "}
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
