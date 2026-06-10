/**
 * FAQ copy for /about-safestart.
 *
 * Q&A items are rendered via the shadcn `<Accordion>` primitive directly in
 * the page. We don't reuse `<FaqAccordion>` because this is a single
 * un-grouped list, not the multi-section structure that component expects.
 *
 * DRAFT(josh-revise): All seven answers are first-pass drafts written to the
 * spec for the SafeStart page refactor. Tone is intentionally direct; tighten
 * during your editorial pass before publish.
 */

import type { ReactNode } from "react";
import Link from "next/link";

export type SafeStartFaqItem = {
  slug: string;
  q: string;
  /** Render-prop so we can keep next/link out of the data file's static shape. */
  answer: ReactNode;
};

export const SAFESTART_FAQ_ITEMS: readonly SafeStartFaqItem[] = [
  {
    slug: "time-commitment",
    q: "How much time does my leadership team actually need to commit?",
    answer:
      "Roughly 6 hours of facilitated sessions over two weeks, plus team prep work between sessions. The cadence is designed to fit alongside existing leadership rhythms, not replace them.",
  },
  {
    slug: "cohort-dates",
    q: "What if our team can't make the proposed cohort dates?",
    answer:
      "Cohort dates are visible on the schedule page and you can indicate availability for any combination of slots. Once three leaders converge on the same slot, the cohort confirms. Flexibility is built in.",
  },
  {
    slug: "continuing-after-safestart",
    q: "What do we do if we want to continue with Movemental after SafeStart?",
    answer:
      "SafeStart is the entry to the four-stage Movemental Path (Safety → Sandbox → Skills → Solutions). Most organizations who complete SafeStart continue with Sandbox or pause for internal work, then return. There is no obligation to continue.",
  },
  {
    slug: "guidebook-ownership",
    q: "Who owns the Guidebook?",
    answer:
      "You do. Fully. Movemental retains no rights to your Guidebook content, your data, or your derivative artifacts. The Guidebook is yours to publish, share, file, or revise.",
  },
  {
    slug: "refund-policy",
    q: "What happens if we're not satisfied?",
    answer:
      "We refund the full $1,000 if at the end of week one you decide the engagement is not the right fit. After week two begins, the work is in motion and refunds are at our discretion based on circumstances.",
  },
  {
    slug: "audiences",
    q: "Is this just for churches?",
    answer: (
      <>
        No. SafeStart serves churches, nonprofits, and theological institutions.
        The methodology adapts to your governance structure — board, elder team,
        executive leadership, or faculty council. Find the playbook that fits
        your audience on our{" "}
        <Link
          href="/who-we-serve"
          className="font-medium text-primary underline-offset-4 hover:underline"
        >
          Audiences page
        </Link>
        .
      </>
    ),
  },
  {
    slug: "why-cap-at-100",
    q: "Why is it capped at 100 leaders?",
    answer:
      "Movemental is a network, not a SaaS product. The cap protects the cohort dynamic, the facilitator load, and the depth of attention each leader receives. Capping at 100 keeps the work serious.",
  },
];
