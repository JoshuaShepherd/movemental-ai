"use client";

import { useState, type ReactNode } from "react";

import styles from "../../ink-band.module.css";
import type { ScreenProps } from "./stub-screen";
import { Crumb } from "./chrome";
import { ProcessAccordion } from "../process-accordion";
import { PATH_STAGE_LABELS } from "@/lib/agent-room/naming";
import {
  PRICING_SAFETY_FREE,
  PRICING_SAFETY_PAID,
  PRICING_SANDBOX_DIGITAL,
  PRICING_SANDBOX_FREE,
  PRICING_SANDBOX_IN_PERSON,
  PRICING_TECH_FREE,
  PRICING_TECH_MODULES,
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
const SANDBOX_DIGITAL = toWayOption(PRICING_SANDBOX_DIGITAL);
const SANDBOX_IN_PERSON = toWayOption(PRICING_SANDBOX_IN_PERSON);
const TRAINING_FREE = toWayOption(PRICING_TRAINING_FREE);
const TRAINING_PAID = toWayOption(PRICING_TRAINING_PAID);
const TECH_FREE = toWayOption(PRICING_TECH_FREE);

function StageWays({
  reassurance,
  freeWay,
  paidWay,
  extraWays,
  freeLead = false,
  sectionLabel = "Two ways forward",
}: {
  reassurance: string;
  freeWay: WayForwardOption;
  paidWay: WayForwardOption;
  extraWays?: WayForwardOption[];
  freeLead?: boolean;
  sectionLabel?: string;
}) {
  return (
    <TwoWaysForward
      sectionLabel={sectionLabel}
      reassurance={reassurance}
      freeWay={freeWay}
      paidWay={paidWay}
      extraWays={extraWays}
      freeLead={freeLead}
    />
  );
}

function TechBuildPricing({ reassurance }: { reassurance: string }) {
  return (
    <div className={styles.sec}>
      <p className={styles.secLabel}>Free field guide</p>
      <div className={styles.ways}>
        <div className={styles.way}>
          <h4>{TECH_FREE.title}</h4>
          <p className={styles.price}>{TECH_FREE.price}</p>
          <p>{TECH_FREE.description}</p>
          <p className={styles.wayPlaceholder}>Field guide · coming soon</p>
        </div>
      </div>

      <p className={styles.secLabel} style={{ marginTop: "1.25rem" }}>
        Modular builds
      </p>
      <p className={styles.body} style={{ marginTop: "0.2rem" }}>
        Tech is built in layers on top of your ratified foundation. Foundation is included in every
        platform. Add the modules your organization needs.
      </p>
      <div className={styles.techModules}>
        {PRICING_TECH_MODULES.map((mod) => (
          <div key={mod.name} className={`${styles.way} ${mod.price !== "Built in" ? styles.paid : ""}`}>
            <h4>{mod.name}</h4>
            <p className={styles.price}>{mod.price}</p>
            <p>{mod.description}</p>
          </div>
        ))}
      </div>
      <p className={styles.honest}>{reassurance}</p>
    </div>
  );
}

/** Full pricing schedule with plain stage names and two ways forward per stage. */
export function PricingScreen({ onHome }: ScreenProps) {
  const [active, setActive] = useState("safety");

  const sandboxWays = (
    <StageWays
      sectionLabel="Three ways forward"
      reassurance="All three routes produce the same Future Plan and shared record of what you tried."
      freeWay={SANDBOX_FREE}
      paidWay={SANDBOX_DIGITAL}
      extraWays={[SANDBOX_IN_PERSON]}
    />
  );

  const techReassurance =
    "Each module is scoped to your organization. Talk to us about which layers you need and in what order.";

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
            children: sandboxWays,
          },
          {
            id: "training",
            step: "03",
            title: "Training",
            children: (
              <StageWays
                reassurance="The paid cohort runs today through Movemental's LMS. The free field guide ships when it's ready."
                freeWay={TRAINING_FREE}
                paidWay={TRAINING_PAID}
              />
            ),
          },
          {
            id: "tech",
            step: "04",
            title: PATH_STAGE_LABELS.tech,
            children: <TechBuildPricing reassurance={techReassurance} />,
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
        {sandboxWays}
        <StageWays
          reassurance="The paid cohort runs today through Movemental's LMS. The free field guide ships when it's ready."
          freeWay={TRAINING_FREE}
          paidWay={TRAINING_PAID}
        />
        <TechBuildPricing reassurance={techReassurance} />
      </div>
    </div>
  );
}
