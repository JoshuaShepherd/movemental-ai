import Image from "next/image";
import { BookOpen, FileText, MapPin, Ruler, Siren, Users } from "lucide-react";
import { Fragment } from "react";
import Link from "next/link";

import { ToolkitDownloadForm } from "@/components/toolkit/ToolkitDownloadForm";
import {
  SAFETY_FIELD_GUIDE_COVER_IMAGE,
  SAFETY_FIELD_GUIDE_DOWNLOAD_FILENAME,
  SAFETY_FIELD_GUIDE_PDF_PATH,
} from "@/lib/safety-field-guide";

const fieldGuideDisclaimer = (
  <>
    We send the Field Guide immediately and one follow-up email a week later asking how it went. Nothing else.
  </>
);

function MetaStrip() {
  const items = ["33 pages", "Free", "Self-assessment included", "No drip campaign"];
  return (
    <div
      className="my-4 flex flex-wrap items-center gap-x-4 gap-y-2 border-y border-border py-4 font-sans text-sm font-semibold uppercase tracking-wider text-outline"
      aria-label="Field guide details"
    >
      {items.map((label, i) => (
        <Fragment key={label}>
          {i > 0 ? <span className="size-1 shrink-0 rounded-none bg-outline" aria-hidden /> : null}
          <span>{label}</span>
        </Fragment>
      ))}
    </div>
  );
}

export function FieldGuideSafetyLanding() {
  return (
    <div className="bg-background text-foreground">
      <div className="pt-24 md:pt-28">
        {/* Hero */}
        <section className="mx-auto grid max-w-7xl grid-cols-1 items-start gap-16 px-8 py-16 md:py-24 lg:grid-cols-2">
          <div className="flex flex-col gap-8">
            <span className="font-sans text-sm font-semibold uppercase tracking-widest text-primary">
              FREE FIELD GUIDE
            </span>
            <h1 className="font-serif-display text-6xl font-normal italic leading-tight tracking-tight text-foreground md:text-7xl">
              It Starts With Safety.
            </h1>
            <p className="max-w-xl font-sans text-xl leading-relaxed text-muted-foreground md:text-2xl">
              A 33-page protocol defining the seven foundational decisions required to protect your
              organization&apos;s mission and people in the era of artificial intelligence.
            </p>
            <MetaStrip />
            <div id="download" className="scroll-mt-28">
              <ToolkitDownloadForm
                source="field-guide-safety-hero"
                variant="page"
                layout="stacked"
                submitLabel="Send me the Field Guide"
                emailLabel="Email Address"
                organizationLabel="Organization"
                organizationOptional={false}
                disclaimer={fieldGuideDisclaimer}
                successMessage="Check your email for the Field Guide."
                className="mt-4 border-l-4 border-primary bg-elevated p-8"
                buttonClassName="!rounded-none w-full bg-inverse-surface text-inverse-foreground hover:bg-primary-dim"
              />
            </div>
          </div>
          <figure className="relative w-full overflow-hidden border border-border bg-section shadow-ambient aspect-video">
            <Image
              src={SAFETY_FIELD_GUIDE_COVER_IMAGE}
              alt="It Starts With Safety — Movemental Safety Field Guide cover"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
              priority
            />
            <figcaption className="sr-only">Movemental Safety Field Guide — Stage 01 · Vol. 01</figcaption>
          </figure>
        </section>

        {/* Five-layer architecture */}
        <section className="bg-section px-8 py-24 md:py-32">
          <div className="mx-auto max-w-7xl">
            <h2 className="mx-auto mb-6 max-w-3xl text-center font-serif-display text-4xl font-semibold italic md:text-5xl">
              Five layers. Seven deliverables. One ratifiable framework.
            </h2>
            <p className="mx-auto mb-16 max-w-2xl text-center font-sans text-lg leading-relaxed text-muted-foreground">
              The Field Guide organizes Safety into five layers — from the values statement at the top to the
              response plans at the bottom. Seven specific documents live across those layers. Each one is
              ratifiable by a board.
            </p>
            <div className="grid grid-cols-1 gap-px bg-border md:grid-cols-2 lg:grid-cols-3">
              {[
                {
                  icon: BookOpen,
                  number: "Layer 01",
                  title: "Statement",
                  body: "The values and posture the organization is willing to ratify in public. Sits above every other document and explains why this work exists at all.",
                  deliverables: ["AI Use Charter"],
                },
                {
                  icon: FileText,
                  number: "Layer 02",
                  title: "Policy",
                  body: "The operational guidance staff actually read. Translates the Charter into sanctioned tools, welcomed tasks, constrained tasks, and forbidden tasks.",
                  deliverables: ["Acceptable Use Policy"],
                },
                {
                  icon: MapPin,
                  number: "Layer 03",
                  title: "Context",
                  body: "Where the organization names the relational and pastoral situations that AI cannot enter. Specific to your ministry, your beneficiaries, your room.",
                  deliverables: ["Care Boundaries"],
                },
                {
                  icon: Ruler,
                  number: "Layer 04",
                  title: "Rules",
                  body: "The concrete standards that govern day-to-day practice — what data may be handled where, and how AI involvement is disclosed to readers and constituents.",
                  deliverables: [
                    "Data Handling Standards",
                    "Disclosure and Attribution Standard",
                  ],
                },
                {
                  icon: Siren,
                  number: "Layer 05",
                  title: "Response Plans",
                  body: "What the organization does when an incident actually happens. Pre-written so the response is calm, fast, and consistent — not improvised under pressure.",
                  deliverables: [
                    "Voice Cloning and Impersonation Response Plan",
                    "Constituent Communication template",
                  ],
                },
                {
                  icon: Users,
                  number: "Plus",
                  title: "Self-Assessment",
                  body: "A 30-minute diagnostic your leadership team takes together. Surfaces which of the five layers are weak, which deliverables are missing, and where to start.",
                  deliverables: [],
                },
              ].map(({ icon: Icon, number, title, body, deliverables }) => (
                <div key={title} className="flex flex-col gap-4 bg-section p-10">
                  <Icon className="size-7 text-primary" strokeWidth={1.25} aria-hidden />
                  <p className="font-sans text-xs font-semibold uppercase tracking-widest text-primary">{number}</p>
                  <h3 className="font-serif-display text-2xl font-semibold italic">{title}</h3>
                  <p className="font-sans text-base leading-relaxed text-muted-foreground">{body}</p>
                  {deliverables.length > 0 ? (
                    <ul className="mt-2 space-y-1.5 border-t border-border pt-4 font-sans text-sm text-foreground">
                      {deliverables.map((d) => (
                        <li key={d} className="flex gap-2">
                          <span className="text-primary" aria-hidden>·</span>
                          <span>{d}</span>
                        </li>
                      ))}
                    </ul>
                  ) : null}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Audiences */}
        <section className="bg-background px-8 py-24 md:py-32">
          <div className="mx-auto max-w-7xl">
            <h2 className="mx-auto mb-16 max-w-2xl text-center font-serif-display text-4xl font-semibold italic">
              Written for senior leaders at three kinds of mission-driven organizations.
            </h2>
            <div className="grid grid-cols-1 gap-12 md:grid-cols-3">
              {[
                {
                  title: "Executive Pastors",
                  body: "For leaders managing complex congregational dynamics, staff teams, and sensitive pastoral care data. The guide provides clarity on what AI should never touch, preserving the sanctity of human ministry.",
                },
                {
                  title: "Executive Directors",
                  body: "For non-profit leaders handling donor information, beneficiary data, and public trust. The guide offers a framework to ensure efficiency tools do not compromise ethical commitments or legal compliance.",
                },
                {
                  title: "Institutional Presidents",
                  body: "For heads of educational or legacy institutions overseeing academic integrity and institutional reputation. The guide establishes high-level policy requirements to guide faculty, staff, and student engagement.",
                },
              ].map((col) => (
                <div key={col.title} className="flex flex-col gap-4 border-t border-border pt-8">
                  <h3 className="font-sans text-sm font-bold uppercase tracking-widest text-primary">{col.title}</h3>
                  <p className="font-sans leading-relaxed text-muted-foreground">{col.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Self-assessment band */}
        <section className="bg-elevated px-8 py-24 md:py-32">
          <div className="mx-auto flex max-w-3xl flex-col gap-8 text-center">
            <Users className="mx-auto size-10 text-primary" strokeWidth={1.25} aria-hidden />
            <h2 className="font-serif-display text-3xl font-semibold italic leading-snug text-foreground md:text-4xl">
              Most leadership teams take the self-assessment within two weeks of receiving the Field Guide.
            </h2>
            <p className="font-sans text-xl leading-relaxed text-muted-foreground">
              The Field Guide is designed to be self-explanatory. Many teams use it independently to draft their initial
              AI policies. For organizations requiring deeper alignment, expert facilitation, or customized policy
              drafting, we offer dedicated engagement models following the self-assessment.
            </p>
          </div>
        </section>

        {/* Midnight + form */}
        <section className="bg-inverse-surface px-8 py-24 text-inverse-foreground md:py-32">
          <div className="mx-auto flex max-w-3xl flex-col gap-12 text-center">
            <div>
              <h2 className="mb-4 font-serif-display text-4xl font-semibold italic md:text-5xl">
                Thirty-three pages. Free. Read it in an evening.
              </h2>
              <p className="font-sans text-lg text-inverse-muted">The definitive starting point for institutional AI safety.</p>
            </div>
            <ToolkitDownloadForm
              source="field-guide-safety-footer"
              variant="page"
              layout="stacked"
              submitLabel="Send me the Field Guide"
              emailLabel="Email Address"
              organizationLabel="Organization"
              organizationOptional={false}
              disclaimer={fieldGuideDisclaimer}
              successMessage="Check your email for the Field Guide."
              className="border-l-4 border-inverse-border bg-inverse-surface/80 p-8 text-left"
              labelClassName="text-inverse-muted"
              footerClassName="text-center text-inverse-muted italic"
              successClassName="text-inverse-muted"
              inputClassName="border-inverse-border text-inverse-foreground placeholder:text-inverse-muted/50 focus:border-inverse-foreground"
              buttonClassName="!rounded-none w-full bg-inverse-foreground font-bold text-inverse-surface hover:bg-card"
            />
            <p className="font-sans text-sm text-inverse-muted">
              Prefer a file right now?{" "}
              <a
                href={SAFETY_FIELD_GUIDE_PDF_PATH}
                className="underline underline-offset-4 hover:text-inverse-foreground"
                download={SAFETY_FIELD_GUIDE_DOWNLOAD_FILENAME}
              >
                Download the PDF
              </a>{" "}
              ·{" "}
              <Link href="/pathway/safety" className="underline underline-offset-4 hover:text-inverse-foreground">
                Safety stage on the Path
              </Link>
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}
