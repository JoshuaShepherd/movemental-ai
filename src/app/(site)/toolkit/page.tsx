import type { Metadata } from "next";
import Link from "next/link";

import { Container } from "@/components/studio/Container";
import { Reveal } from "@/components/studio/Reveal";
import { ToolkitCover } from "@/components/toolkit/ToolkitCover";
import { ToolkitPageForm } from "@/components/toolkit/ToolkitPageForm";
import { canonicalPageUrl } from "@/lib/site-url";

const title = "It Starts With Safety — the free toolkit";
const description =
  "A 16-page Movemental field guide for organizational leaders navigating AI. Names the seven Safety artifacts, walks through why governance precedes deployment, and includes a 30-minute self-assessment for your leadership team.";
const ogTitle = "It Starts With Safety — Movemental";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: canonicalPageUrl("/toolkit") },
  openGraph: {
    url: canonicalPageUrl("/toolkit"),
    title: ogTitle,
    description,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: ogTitle,
    description,
  },
};

const INSIDE_SECTIONS: readonly { title: string; body: string }[] = [
  {
    title: "Why Safety is first",
    body: "The argument for governance preceding deployment, in plain terms a board can ratify in one sitting.",
  },
  {
    title: "The seven artifacts named",
    body: "Acceptable Use, Care Boundaries, Disclosure Standards, Vendor Inventory, Data Handling, Incident Response, and Named Refusals.",
  },
  {
    title: "The self-assessment",
    body: "A 30-minute exercise your leadership team can complete together. Surfaces the questions you didn't realize you hadn't answered.",
  },
  {
    title: "Common mistakes",
    body: "The four ways organizations stall after deciding AI matters. Each one is preventable; each one is endemic.",
  },
  {
    title: "The two-week MVP preview",
    body: "What the $1,000 facilitated engagement looks like, week-by-week. Use it to decide whether the work is yours to run alone.",
  },
  {
    title: "Named refusals",
    body: "How to write the list of applications your organization commits to refuse on principle, regardless of pressure.",
  },
];

export default function ToolkitPage() {
  return (
    <div className="toolkit-page">
      <section className="border-b border-border bg-background py-20 md:py-28" aria-labelledby="toolkit-hero-title">
        <Container>
          <Reveal>
            <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-12 lg:gap-16">
              <div className="lg:col-span-7">
                <span className="mb-6 block text-xs font-semibold uppercase tracking-eyebrow text-muted-foreground">
                  A free field guide
                </span>
                <h1
                  id="toolkit-hero-title"
                  className="mb-8 font-serif-display text-5xl leading-[0.95] tracking-tight text-foreground md:text-6xl lg:text-7xl"
                >
                  It Starts With <em className="italic">Safety.</em>
                </h1>
                <p className="mb-6 max-w-2xl font-serif-display text-2xl italic leading-snug text-muted-foreground md:text-3xl">
                  A field guide for organizational leaders navigating AI.
                </p>
                <p className="max-w-2xl text-lg leading-relaxed text-muted-foreground">
                  Sixteen pages. Read it in an evening. Run the 30-minute self-assessment with your leadership team
                  before you commit to a vendor, a tool, or a policy. The toolkit names the seven governance artifacts
                  that come out of a Safety engagement, walks through why governance precedes deployment, and gives
                  your team a shared vocabulary for the conversations you&apos;re already having.
                </p>
              </div>
              <div className="mx-auto w-full max-w-sm lg:col-span-5 lg:mx-0">
                <ToolkitCover />
              </div>
            </div>
          </Reveal>
        </Container>
      </section>

      <section className="bg-section py-20 md:py-28" aria-labelledby="toolkit-inside-title">
        <Container>
          <Reveal>
            <div className="mb-16 max-w-2xl">
              <span className="mb-4 block text-xs font-semibold uppercase tracking-eyebrow text-muted-foreground">
                What&apos;s inside
              </span>
              <h2
                id="toolkit-inside-title"
                className="font-serif-display text-4xl italic tracking-tight text-foreground md:text-5xl"
              >
                Six sections. Sixteen pages.
              </h2>
            </div>
            <div className="grid grid-cols-1 gap-x-12 gap-y-10 md:grid-cols-2">
              {INSIDE_SECTIONS.map((section, i) => (
                <div key={section.title} className="flex flex-col gap-3">
                  <span className="font-serif-display text-3xl italic text-muted-foreground/60">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="font-serif-display text-2xl text-foreground">{section.title}</h3>
                  <p className="text-base leading-relaxed text-muted-foreground">{section.body}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </Container>
      </section>

      <section
        className="bg-elevated py-20 md:py-28"
        aria-labelledby="toolkit-form-title"
        id="download"
      >
        <Container>
          <Reveal>
            <div className="mx-auto max-w-2xl text-center">
              <span className="mb-4 block text-xs font-semibold uppercase tracking-eyebrow text-muted-foreground">
                Send it to your inbox
              </span>
              <h2
                id="toolkit-form-title"
                className="mb-6 font-serif-display text-4xl italic tracking-tight text-foreground md:text-5xl"
              >
                Download the toolkit.
              </h2>
              <p className="mb-12 text-lg leading-relaxed text-muted-foreground">
                We&apos;ll send the PDF immediately and follow up once over the following week. That&apos;s it.
              </p>
              <ToolkitPageForm />
            </div>
          </Reveal>
        </Container>
      </section>

      <section className="bg-background py-20" aria-labelledby="toolkit-skip-title">
        <Container>
          <Reveal>
            <div className="mx-auto flex max-w-3xl flex-col items-start gap-6 text-left">
              <span className="text-xs font-semibold uppercase tracking-eyebrow text-muted-foreground">
                Or skip ahead
              </span>
              <h2 id="toolkit-skip-title" className="font-serif-display text-3xl italic tracking-tight text-foreground">
                If you already know Safety is your next move.
              </h2>
              <p className="text-lg leading-relaxed text-muted-foreground">
                The Safety stage page details the seven artifacts, the two-week process, and the $1,000 fee.
                You can also start a conversation directly — the toolkit will follow if it&apos;s useful.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link href="/pathway/safety" className="btn-pill btn-pill--ghost">
                  See the Safety stage
                </Link>
                <Link href="/contact?interest=safety" className="btn-pill btn-pill--primary">
                  Start a conversation
                </Link>
              </div>
            </div>
          </Reveal>
        </Container>
      </section>

      <section className="bg-section py-16" aria-labelledby="toolkit-after-title">
        <Container>
          <Reveal>
            <div className="mx-auto max-w-3xl border-t border-border pt-12">
              <h3
                id="toolkit-after-title"
                className="mb-6 text-xs font-semibold uppercase tracking-eyebrow text-muted-foreground"
              >
                What happens after you download
              </h3>
              <div className="space-y-4 text-base leading-relaxed text-muted-foreground">
                <p>
                  <span className="text-foreground">Day 0.</span> The toolkit PDF lands in your inbox immediately.
                  Read it on your own time.
                </p>
                <p>
                  <span className="text-foreground">Day 3.</span> A short note offering a 30-minute conversation
                  if you have questions on what you read.
                </p>
                <p>
                  <span className="text-foreground">Day 7.</span> Context on the $1,000 facilitated MVP and how to
                  begin if it&apos;s right for you.
                </p>
                <p>
                  After day 7, no further automated emails. We don&apos;t share your address. Unsubscribe at any
                  time from any email.
                </p>
              </div>
            </div>
          </Reveal>
        </Container>
      </section>
    </div>
  );
}
